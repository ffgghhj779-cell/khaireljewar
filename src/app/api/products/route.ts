import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getProducts } from '@/lib/actions/products'
import { createAdminClient, isAdminClientConfigured } from '@/lib/supabase/admin'
import { mapProductRow } from '@/lib/supabase/mappers'
import { normalizeProductCreateInput } from '@/lib/products/normalizeCreate'
import { slugifyProductTitle } from '@/lib/products/slugify'
import type { Database, ProductRow } from '@/lib/supabase/types'

export const runtime = 'nodejs'

type ProductUpdate = Database['public']['Tables']['products']['Update']

const BOT_SECRET_HEADER = 'x-product-bot-secret'

function bustProductCaches(slug?: string) {
  revalidatePath('/', 'layout')
  revalidatePath('/ar')
  revalidatePath('/en')
  revalidatePath('/ar/products')
  revalidatePath('/en/products')
  if (slug) {
    revalidatePath(`/ar/products/${slug}`)
    revalidatePath(`/en/products/${slug}`)
  }
}

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function assertBotAuth(request: Request): boolean {
  const expected = process.env.PRODUCT_BOT_SECRET?.trim()
  if (!expected) return false
  const header = request.headers.get(BOT_SECRET_HEADER) || ''
  const bearer = request.headers.get('authorization') || ''
  const token = header || (bearer.toLowerCase().startsWith('bearer ') ? bearer.slice(7).trim() : '')
  return Boolean(token) && token === expected
}

function asTrim(value: unknown): string {
  return String(value ?? '').trim()
}

function productUrls(slug: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://khairaljewargroup.com'
  return {
    en: `${site}/en/products/${slug}`,
    ar: `${site}/ar/products/${slug}`,
  }
}

function compactProduct(row: ProductRow) {
  const product = mapProductRow(row)
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    category: product.category,
    indexPrice: product.indexPrice ?? null,
    image: product.image,
    is_active: row.is_active,
    minOrder: product.minOrder,
    unit: product.unit,
    urls: productUrls(product.slug),
  }
}

async function resolveSlug(
  supabase: ReturnType<typeof createAdminClient>,
  body: Record<string, unknown>,
  opts?: { activeOnly?: boolean }
): Promise<{ slug?: string; error?: string }> {
  const slugRaw = asTrim(body.slug ?? body.product_slug ?? body.productSlug)
  const titleRaw = asTrim(body.title ?? body.product_title ?? body.productTitle ?? body.name ?? body.q)

  if (slugRaw) return { slug: slugifyProductTitle(slugRaw) }
  if (!titleRaw) return { error: 'Provide `slug` or `title`.' }

  let query = supabase
    .from('products')
    .select('slug,title_ar,title_en,is_active')
    .or(`title_ar.ilike.%${titleRaw}%,title_en.ilike.%${titleRaw}%,slug.ilike.%${titleRaw}%`)
    .limit(5)

  if (opts?.activeOnly !== false) query = query.eq('is_active', true)

  const { data, error } = await query
  if (error) return { error: error.message }
  if (!data?.length) return { error: `No product matched "${titleRaw}".` }
  if (data.length > 1) {
    return { error: `More than one match. Use slug: ${data.map((r) => r.slug).join(', ')}` }
  }
  return { slug: data[0].slug }
}

async function uploadImageBase64(
  supabase: ReturnType<typeof createAdminClient>,
  body: Record<string, unknown>,
  slugHint: string
): Promise<{ url?: string; error?: string; bytes?: number }> {
  const b64 = asTrim(body.image_base64 ?? body.imageBase64)
  if (!b64) return {}

  const filenameRaw = asTrim(body.image_filename ?? body.imageFilename) || 'product.jpg'
  const safeName = filenameRaw.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80) || 'product.jpg'
  const path = `${slugHint}/${Date.now()}-${safeName}`
  const raw = b64.includes(',') ? b64.split(',').pop()! : b64
  const buffer = Buffer.from(raw, 'base64')

  if (buffer.length < 4096) {
    return { error: `Image too small (${buffer.length} bytes). Re-send the Telegram photo.` }
  }

  const magic = buffer.subarray(0, 12)
  const isJpeg = magic[0] === 0xff && magic[1] === 0xd8
  const isPng = magic[0] === 0x89 && magic[1] === 0x50 && magic[2] === 0x4e && magic[3] === 0x47
  const isWebp = magic.toString('ascii', 0, 4) === 'RIFF' && magic.toString('ascii', 8, 12) === 'WEBP'
  if (!isJpeg && !isPng && !isWebp) {
    return { error: 'Image is not a valid JPEG/PNG/WebP file' }
  }

  const contentType =
    asTrim(body.image_mime ?? body.imageMime) ||
    (isPng ? 'image/png' : isWebp ? 'image/webp' : 'image/jpeg')

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(path, buffer, { contentType, upsert: true })

  if (uploadError) return { error: uploadError.message }

  const { data: pub } = supabase.storage.from('product-images').getPublicUrl(path)
  return { url: pub.publicUrl, bytes: buffer.length }
}

function siteJson(product: ReturnType<typeof mapProductRow>, extra?: Record<string, unknown>) {
  return {
    ok: true,
    product,
    urls: productUrls(product.slug),
    ...extra,
  }
}

/** Public catalog, or authenticated bot admin list/search. */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const botMode = url.searchParams.get('bot') === '1' || url.searchParams.get('admin') === '1'

  if (!botMode) {
    const products = await getProducts()
    return NextResponse.json({ products, count: products.length, source: 'catalog' })
  }

  if (!assertBotAuth(request)) return unauthorized()
  if (!isAdminClientConfigured()) {
    return NextResponse.json({ error: 'Supabase admin is not configured' }, { status: 503 })
  }

  try {
    const supabase = createAdminClient()
    const q = asTrim(url.searchParams.get('q'))
    const slug = asTrim(url.searchParams.get('slug'))
    const includeInactive = url.searchParams.get('include_inactive') === '1'
    const inactiveOnly = url.searchParams.get('inactive') === '1'
    const limit = Math.min(Number(url.searchParams.get('limit') || 40) || 40, 100)

    let query = supabase
      .from('products')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(limit)

    if (inactiveOnly) query = query.eq('is_active', false)
    else if (!includeInactive) query = query.eq('is_active', true)

    if (slug) query = query.eq('slug', slugifyProductTitle(slug))
    else if (q) {
      query = query.or(
        `title_ar.ilike.%${q}%,title_en.ilike.%${q}%,slug.ilike.%${q}%,category_en.ilike.%${q}%,category_ar.ilike.%${q}%`
      )
    }

    const { data, error } = await query
    if (error) {
      return NextResponse.json({ error: 'List failed', detail: error.message }, { status: 502 })
    }

    const items = ((data || []) as ProductRow[]).map(compactProduct)
    return NextResponse.json({ ok: true, count: items.length, products: items })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to list products', detail: message }, { status: 500 })
  }
}

/** Create / upsert product (Telegram bot). */
export async function POST(request: Request) {
  if (!assertBotAuth(request)) return unauthorized()
  if (!isAdminClientConfigured()) {
    return NextResponse.json(
      { error: 'Supabase admin is not configured (check SUPABASE_SERVICE_ROLE_KEY)' },
      { status: 503 }
    )
  }

  try {
    const body = (await request.json()) as Record<string, unknown>
    const supabase = createAdminClient()

    let imageUrl = asTrim(body.image ?? body.image_url ?? body.imageUrl)
    const slugHint = slugifyProductTitle(
      String(body.title_en ?? body.title_ar ?? body.slug ?? 'product')
    )

    const uploaded = await uploadImageBase64(supabase, body, slugHint)
    if (uploaded.error) {
      return NextResponse.json({ error: 'Image upload failed', detail: uploaded.error }, { status: 400 })
    }
    if (uploaded.url) imageUrl = uploaded.url

    const normalized = normalizeProductCreateInput({ ...body, image: imageUrl })
    if (!normalized.ok) {
      return NextResponse.json({ error: normalized.error }, { status: 400 })
    }

    const row = normalized.data
    const payload = {
      slug: row.slug!,
      category_en: row.category_en,
      category_ar: row.category_ar!,
      title_en: row.title_en,
      title_ar: row.title_ar,
      desc_en: row.desc_en,
      desc_ar: row.desc_ar,
      specs_en: row.specs_en ?? [],
      specs_ar: row.specs_ar ?? [],
      image: row.image,
      min_order: row.min_order!,
      unit: row.unit!,
      availability_en: row.availability_en!,
      availability_ar: row.availability_ar!,
      harvest_season_en: row.harvest_season_en!,
      harvest_season_ar: row.harvest_season_ar!,
      sizes_en: row.sizes_en!,
      sizes_ar: row.sizes_ar!,
      packaging_en: row.packaging_en!,
      packaging_ar: row.packaging_ar!,
      commodity_class_en: row.commodity_class_en!,
      commodity_class_ar: row.commodity_class_ar!,
      origin_en: row.origin_en!,
      origin_ar: row.origin_ar!,
      brix: row.brix ?? null,
      index_price: row.index_price ?? null,
      trend: row.trend ?? null,
      retail_price_egp: null,
      consumer_unit_en: 'Carton',
      consumer_unit_ar: 'كرتون',
      is_active: row.is_active ?? true,
      sort_order: row.sort_order ?? 100,
    }

    const { data: existing } = await supabase
      .from('products')
      .select('slug,is_active')
      .eq('slug', payload.slug)
      .maybeSingle()

    const { data, error } = await supabase
      .from('products')
      .upsert(payload, { onConflict: 'slug' })
      .select('*')
      .single()

    if (error) {
      return NextResponse.json({ error: 'DB upsert failed', detail: error.message }, { status: 502 })
    }

    const product = mapProductRow(data as ProductRow)
    bustProductCaches(product.slug)
    return NextResponse.json(
      siteJson(product, {
        updated: Boolean(existing),
        created: !existing,
        image_bytes: uploaded.bytes,
      })
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to create product', detail: message }, { status: 500 })
  }
}

/**
 * Partial update / restore / photo replace.
 * Body: { slug|title, restore?: true, ...fields, image_base64? }
 */
export async function PATCH(request: Request) {
  if (!assertBotAuth(request)) return unauthorized()
  if (!isAdminClientConfigured()) {
    return NextResponse.json({ error: 'Supabase admin is not configured' }, { status: 503 })
  }

  try {
    const body = (await request.json()) as Record<string, unknown>
    const supabase = createAdminClient()
    const restore = body.restore === true || body.is_active === true

    const target = await resolveSlug(supabase, body, { activeOnly: !restore })
    if (target.error || !target.slug) {
      return NextResponse.json({ error: target.error || 'Target not found' }, { status: 400 })
    }

    const { data: current, error: loadError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', target.slug)
      .maybeSingle()

    if (loadError) {
      return NextResponse.json({ error: 'Lookup failed', detail: loadError.message }, { status: 502 })
    }
    if (!current) {
      return NextResponse.json({ error: `Product "${target.slug}" not found` }, { status: 404 })
    }

    const patch: ProductUpdate = {}
    if (restore) patch.is_active = true

    if (asTrim(body.title_ar)) patch.title_ar = asTrim(body.title_ar)
    if (asTrim(body.title_en)) patch.title_en = asTrim(body.title_en)
    if (asTrim(body.category_en)) patch.category_en = asTrim(body.category_en)
    if (asTrim(body.category_ar)) patch.category_ar = asTrim(body.category_ar)
    if (asTrim(body.desc_ar)) patch.desc_ar = asTrim(body.desc_ar)
    if (asTrim(body.desc_en)) patch.desc_en = asTrim(body.desc_en)
    if (asTrim(body.index_price)) patch.index_price = asTrim(body.index_price)
    if (asTrim(body.packaging_ar)) patch.packaging_ar = asTrim(body.packaging_ar)
    if (asTrim(body.packaging_en)) patch.packaging_en = asTrim(body.packaging_en)
    if (asTrim(body.sizes_ar)) patch.sizes_ar = asTrim(body.sizes_ar)
    if (asTrim(body.sizes_en)) patch.sizes_en = asTrim(body.sizes_en)
    if (asTrim(body.harvest_season_ar)) patch.harvest_season_ar = asTrim(body.harvest_season_ar)
    if (asTrim(body.harvest_season_en)) patch.harvest_season_en = asTrim(body.harvest_season_en)
    if (asTrim(body.image)) patch.image = asTrim(body.image)
    if (asTrim(body.unit) === 'MT' || asTrim(body.unit) === 'Containers') {
      patch.unit = asTrim(body.unit) as 'MT' | 'Containers'
    }

    if (body.min_order != null && Number(body.min_order) > 0) {
      patch.min_order = Number(body.min_order)
    }

    if (asTrim(body.category_en) && !asTrim(body.category_ar)) {
      const map: Record<string, string> = {
        Citrus: 'الموالح',
        Dates: 'التمور',
        Fruits: 'الفواكه',
        Vegetables: 'الخضروات',
        Frozen: 'المجمدات',
      }
      const cat = asTrim(body.category_en)
      if (map[cat]) {
        patch.category_en = cat
        patch.category_ar = map[cat]
        patch.commodity_class_en = cat
        patch.commodity_class_ar = map[cat]
      }
    }

    const uploaded = await uploadImageBase64(supabase, body, target.slug)
    if (uploaded.error) {
      return NextResponse.json({ error: 'Image upload failed', detail: uploaded.error }, { status: 400 })
    }
    if (uploaded.url) patch.image = uploaded.url

    if (!Object.keys(patch).length) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('products')
      .update(patch)
      .eq('slug', target.slug)
      .select('*')
      .single()

    if (error) {
      return NextResponse.json({ error: 'DB update failed', detail: error.message }, { status: 502 })
    }

    const product = mapProductRow(data as ProductRow)
    bustProductCaches(product.slug)
    return NextResponse.json(
      siteJson(product, {
        patched: true,
        restored: restore,
        fields: Object.keys(patch),
        image_bytes: uploaded.bytes,
      })
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to update product', detail: message }, { status: 500 })
  }
}

/** Soft-delete (is_active=false). */
export async function DELETE(request: Request) {
  if (!assertBotAuth(request)) return unauthorized()
  if (!isAdminClientConfigured()) {
    return NextResponse.json({ error: 'Supabase admin is not configured' }, { status: 503 })
  }

  try {
    const body = (await request.json()) as Record<string, unknown>
    const supabase = createAdminClient()
    const target = await resolveSlug(supabase, body)

    if (target.error || !target.slug) {
      return NextResponse.json({ error: target.error || 'Delete target not found' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('slug', target.slug)
      .eq('is_active', true)
      .select('*')
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: 'DB delete failed', detail: error.message }, { status: 502 })
    }
    if (!data) {
      return NextResponse.json(
        { error: `Product "${target.slug}" is already inactive or missing.` },
        { status: 404 }
      )
    }

    const product = mapProductRow(data as ProductRow)
    bustProductCaches(product.slug)
    return NextResponse.json({
      ok: true,
      deleted: true,
      product: compactProduct(data as ProductRow),
      urls: productUrls(product.slug),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to delete product', detail: message }, { status: 500 })
  }
}
