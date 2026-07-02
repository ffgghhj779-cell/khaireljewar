'use server'

import { createClient } from '@/lib/supabase/server'
import { createAnonClient } from '@/lib/supabase/anon'
import { createAdminClient, isAdminClientConfigured } from '@/lib/supabase/admin'
import { mapProductRow, toQuantityMt } from '@/lib/supabase/mappers'
import { MOCK_PRODUCTS, type Product } from '@/lib/data/products'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import type { Database } from '@/lib/supabase/types'
import type { QuoteItem } from '@/store/useQuoteStore'

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS
  }

  const supabase = createAnonClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getProducts]', error.message)
    return []
  }

  return (data ?? []).map(mapProductRow)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug)
  }

  const supabase = createAnonClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    console.error('[getProductBySlug]', slug, error?.message)
    return undefined
  }

  return mapProductRow(data)
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts()
  return products.map((p) => p.slug)
}

export interface SubmitQuoteInput {
  companyName: string
  email: string
  phone?: string
  country: string
  incoterm: string
  destinationPort: string
  currency?: string
  items: QuoteItem[]
}

export interface SubmitQuoteResult {
  success: boolean
  quoteId?: string
  error?: string
}

/**
 * Persists a B2B quote to Supabase.
 * - Authenticated users: RLS ties quote to auth.uid()
 * - Guest users: requires SUPABASE_SERVICE_ROLE_KEY (admin client)
 */
export async function submitQuoteRequest(input: SubmitQuoteInput): Promise<SubmitQuoteResult> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const totalMt = input.items.reduce(
    (sum, item) => sum + toQuantityMt(item.quantity, item.unit),
    0
  )

  const quotePayload: Database['public']['Tables']['quote_requests']['Insert'] = {
    user_id: user?.id ?? null,
    company_name: input.companyName,
    email: input.email,
    phone: input.phone ?? null,
    country: input.country,
    incoterm: input.incoterm,
    destination_port: input.destinationPort,
    currency: input.currency ?? 'USD',
    total_mt: totalMt,
    status: 'pending',
  }

  let quoteId: string
  const admin = isAdminClientConfigured() ? createAdminClient() : null

  if (user) {
    const { data: quote, error: quoteError } = await supabase
      .from('quote_requests')
      .insert(quotePayload)
      .select('id')
      .single()

    if (quoteError || !quote) {
      return { success: false, error: quoteError?.message ?? 'Failed to create quote' }
    }
    quoteId = quote.id
  } else {
    if (!admin) {
      return { success: false, error: 'Guest quotes require SUPABASE_SERVICE_ROLE_KEY' }
    }
    const { data: quote, error: quoteError } = await admin
      .from('quote_requests')
      .insert(quotePayload)
      .select('id')
      .single()

    if (quoteError || !quote) {
      return { success: false, error: quoteError?.message ?? 'Failed to create guest quote' }
    }
    quoteId = quote.id
  }

  const lineItems: Database['public']['Tables']['quote_items']['Insert'][] = input.items.map((item) => ({
    quote_request_id: quoteId,
    product_id: /^[0-9a-f-]{36}$/i.test(item.id) ? item.id : null,
    product_slug: item.slug,
    title_en: item.title.en,
    title_ar: item.title.ar,
    quantity: item.quantity,
    unit: item.unit,
    packaging: item.packaging,
    quantity_mt: toQuantityMt(item.quantity, item.unit),
  }))

  const writer = user ? supabase : admin!
  const { error: itemsError } = await writer.from('quote_items').insert(lineItems)

  if (itemsError) {
    return { success: false, error: itemsError.message }
  }

  return { success: true, quoteId }
}

export async function getMyQuoteRequests() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('quote_requests')
    .select(
      `
      *,
      quote_items (*)
    `
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getMyQuoteRequests]', error.message)
    return []
  }

  return data ?? []
}
