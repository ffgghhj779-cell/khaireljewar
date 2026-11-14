'use server'

import { MOCK_PRODUCTS, type Product } from '@/lib/data/products'
import { RICE_SLUGS } from '@/lib/data/riceCatalog'
import { SEASON_ANCHORS } from '@/lib/data/seasonCatalog'
import { createAnonClient } from '@/lib/supabase/anon'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { mapProductRow } from '@/lib/supabase/mappers'
import type { ProductRow } from '@/lib/supabase/types'

/** Kept in code so galleries and origin names are not rewritten by the catalog mapper. */
const LOCAL_PRODUCTS = MOCK_PRODUCTS.filter((p) => RICE_SLUGS.has(p.slug) || p.slug in SEASON_ANCHORS)
const LOCAL_CATALOG_SLUGS = new Set(LOCAL_PRODUCTS.map((p) => p.slug))

function mergeLocalCatalog(products: Product[]): Product[] {
  const list = products.filter((p) => !LOCAL_CATALOG_SLUGS.has(p.slug))
  let riceAnchor = 'long-grain-rice'
  for (const local of LOCAL_PRODUCTS) {
    const after = SEASON_ANCHORS[local.slug] ?? riceAnchor
    let index = list.findIndex((p) => p.slug === after)
    if (index === -1) {
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].category.en === local.category.en) {
          index = i
          break
        }
      }
    }
    if (index === -1) list.push(local)
    else list.splice(index + 1, 0, local)
    if (RICE_SLUGS.has(local.slug)) riceAnchor = local.slug
  }
  return list
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
