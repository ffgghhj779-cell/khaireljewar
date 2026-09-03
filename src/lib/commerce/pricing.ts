import type { Product } from '@/lib/data/products'
import type { ProductRow } from '@/lib/supabase/types'

/** Default retail prices (EGP per consumer unit) when DB column is empty */
const RETAIL_EGP_BY_SLUG: Record<string, number> = {
  'valencia-oranges': 225,
  'navel-oranges': 245,
  'medjool-dates': 520,
  'barhi-dates': 380,
  'hass-avocados': 195,
  pomegranates: 210,
  'spunta-potatoes': 85,
  'red-onions': 72,
  'fresh-garlic': 95,
  'kent-mangoes': 165,
  'frozen-strawberries': 140,
  'frozen-mixed-vegetables': 118,
}

export function getRetailPriceEgp(product: Product, row?: Pick<ProductRow, 'retail_price_egp'> | null): number {
  const fromRow = row?.retail_price_egp != null ? Number(row.retail_price_egp) : null
  if (fromRow != null && fromRow > 0) return fromRow
  if (product.retailPriceEgp != null && product.retailPriceEgp > 0) return product.retailPriceEgp
  return RETAIL_EGP_BY_SLUG[product.slug] ?? 199
}

export function getConsumerUnit(product: Product, row?: Pick<ProductRow, 'consumer_unit_en' | 'consumer_unit_ar'> | null) {
  return {
    en: row?.consumer_unit_en || product.consumerUnit?.en || 'Carton',
    ar: row?.consumer_unit_ar || product.consumerUnit?.ar || 'كرتون',
  }
}

export function egpToPiasters(amountEgp: number): number {
  return Math.round(amountEgp * 100)
}

export function piastersToEgp(piasters: number): number {
  return piasters / 100
}

export function formatEgp(amount: number, lang: string): string {
  const locale = lang === 'ar' ? 'ar-EG' : 'en-EG'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(amount)
}
