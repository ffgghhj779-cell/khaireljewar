'use server'

import { MOCK_PRODUCTS, type Product } from '@/lib/data/products'

/**
 * Local MOCK_PRODUCTS is the catalog source of truth (Jeddah hub).
 * Commerce cart/checkout live on Zid — this site is brand + catalog + contact.
 */
export async function getProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return MOCK_PRODUCTS.find((p) => p.slug === slug)
}

export async function getProductSlugs(): Promise<string[]> {
  return MOCK_PRODUCTS.map((p) => p.slug)
}
