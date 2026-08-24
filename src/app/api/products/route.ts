import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/actions/products'
import { createAdminClient, isAdminClientConfigured } from '@/lib/supabase/admin'
import { mapProductRow } from '@/lib/supabase/mappers'
import { normalizeProductCreateInput } from '@/lib/products/normalizeCreate'
import { slugifyProductTitle } from '@/lib/products/slugify'
import type { ProductRow } from '@/lib/supabase/types'

export const runtime = 'nodejs'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function assertBotAuth(request: Request): boolean {
  const expected = process.env.PRODUCT_BOT_SECRET?.trim()
  if (!expected) return false
  const header = request.headers.get('x-product-bot-secret') || ''
  const bearer = request.headers.get('authorization') || ''
  const token = header || (bearer.toLowerCase().startsWith('bearer ') ? bearer.slice(7).trim() : '')
  return Boolean(token) && token === expected
}

export async function GET() {
  const products = await getProducts()
  return NextResponse.json({ products, count: products.length, source: 'catalog' })
}

/**
 * Create / upsert a product (Telegram bot + admin tools).
 * Auth: header `x-product-bot-secret` or `Authorization: Bearer <PRODUCT_BOT_SECRET>`
 *
 * Body JSON:
 * - product fields (title_en/ar, category_en, desc_*, image, …)
 * - optional: image_base64 + image_filename to upload into Storage first
 */
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

    let imageUrl = String(body.image ?? body.image_url ?? body.imageUrl ?? '').trim()

    const b64 = String(body.image_base64 ?? body.imageBase64 ?? '').trim()
    if (b64) {
      const filenameRaw = String(body.image_filename ?? body.imageFilename ?? 'product.jpg')
      const safeName = filenameRaw.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80) || 'product.jpg'
      const slugHint = slugifyProductTitle(
        String(body.title_en ?? body.title_ar ?? body.slug ?? 'product')
      )
      const path = `${slugHint}/${Date.now()}-${safeName}`

      const raw = b64.includes(',') ? b64.split(',').pop()! : b64
      const buffer = Buffer.from(raw, 'base64')
      const contentType =
        String(body.image_mime ?? body.imageMime ?? '').trim() ||
        (safeName.endsWith('.png')
          ? 'image/png'
          : safeName.endsWith('.webp')
            ? 'image/webp'
            : 'image/jpeg')

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(path, buffer, { contentType, upsert: true })

      if (uploadError) {
        return NextResponse.json(
          { error: 'Image upload failed', detail: uploadError.message },
          { status: 502 }
        )
      }

      const { data: pub } = supabase.storage.from('product-images').getPublicUrl(path)
      imageUrl = pub.publicUrl
    }

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
      is_active: row.is_active ?? true,
      sort_order: row.sort_order ?? 100,
    }

    const { data, error } = await supabase
      .from('products')
      .upsert(payload, { onConflict: 'slug' })
      .select('*')
      .single()

    if (error) {
      return NextResponse.json({ error: 'DB upsert failed', detail: error.message }, { status: 502 })
    }

    const product = mapProductRow(data as ProductRow)
    const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || ''
    return NextResponse.json({
      ok: true,
      product,
      urls: {
        en: site ? `${site}/en/products/${product.slug}` : undefined,
        ar: site ? `${site}/ar/products/${product.slug}` : undefined,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to create product', detail: message }, { status: 500 })
  }
}
