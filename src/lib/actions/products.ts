'use server'

import { MOCK_PRODUCTS, type Product } from '@/lib/data/products'
import { RICE_SLUGS } from '@/lib/data/riceCatalog'
import { createAnonClient } from '@/lib/supabase/anon'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { mapProductRow } from '@/lib/supabase/mappers'
import type { ProductRow } from '@/lib/supabase/types'

/** Kept in code so the gallery and Egyptian product name are not rewritten by the catalog mapper. */
const LOCAL_CATALOG_SLUGS = RICE_SLUGS

function mergeLocalCatalog(products: Product[]): Product[] {
  const local = MOCK_PRODUCTS.filter((p) => LOCAL_CATALOG_SLUGS.has(p.slug))
  if (!local.length) return products
  const rest = products.filter((p) => !LOCAL_CATALOG_SLUGS.has(p.slug))
  const anchor = rest.findIndex((p) => p.slug === 'long-grain-rice')
  if (anchor === -1) return [...rest, ...local]
  return [...rest.slice(0, anchor + 1), ...local, ...rest.slice(anchor + 1)]
}

/**
 * Catalog source: Supabase `products` when reachable.
 * Falls back to local MOCK_PRODUCTS if DB is down / unset (keeps site live).
 * Commerce cart/checkout is separate — this site is brand + catalog + contact.
 */
export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return mergeLocalCatalog(MOCK_PRODUCTS)

  try {
    const supabase = createAnonClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.warn('[products] Supabase read failed, using mock:', error.message)
      return mergeLocalCatalog(MOCK_PRODUCTS)
    }

    if (!data?.length) return mergeLocalCatalog(MOCK_PRODUCTS)
    return mergeLocalCatalog((data as ProductRow[]).map(mapProductRow))
  } catch (err) {
    console.warn('[products] Supabase unreachable, using mock:', err)
    return mergeLocalCatalog(MOCK_PRODUCTS)
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (LOCAL_CATALOG_SLUGS.has(slug)) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug)
  }

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
