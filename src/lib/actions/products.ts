'use server'

import { MOCK_PRODUCTS, type Product } from '@/lib/data/products'
import { createAnonClient } from '@/lib/supabase/anon'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { mapProductRow } from '@/lib/supabase/mappers'
import type { ProductRow } from '@/lib/supabase/types'

/**
 * Catalog source: Supabase `products` when reachable.
 * Falls back to local MOCK_PRODUCTS if DB is down / unset (keeps site live).
 * Commerce cart/checkout is separate — this site is brand + catalog + contact.
 */
export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return MOCK_PRODUCTS

  try {
    const supabase = createAnonClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.warn('[products] Supabase read failed, using mock:', error.message)
      return MOCK_PRODUCTS
    }

    if (!data?.length) return MOCK_PRODUCTS
    return (data as ProductRow[]).map(mapProductRow)
  } catch (err) {
    console.warn('[products] Supabase unreachable, using mock:', err)
    return MOCK_PRODUCTS
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug)
  }

  try {
    const supabase = createAnonClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle()

    if (error) {
      console.warn('[products] slug lookup failed:', error.message)
      return MOCK_PRODUCTS.find((p) => p.slug === slug)
    }
    if (data) return mapProductRow(data as ProductRow)
  } catch (err) {
    console.warn('[products] slug lookup unreachable:', err)
  }

  return MOCK_PRODUCTS.find((p) => p.slug === slug)
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts()
  return products.map((p) => p.slug)
}
