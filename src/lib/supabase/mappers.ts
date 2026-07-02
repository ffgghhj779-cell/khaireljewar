import type { Product } from '@/lib/data/products'
import type { ProductRow } from '@/lib/supabase/types'
import { normalizeProductImage } from '@/lib/constants/images'

/** Maps a Supabase `products` row to the front-end `Product` shape. */
export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    category: { en: row.category_en, ar: row.category_ar },
    title: { en: row.title_en, ar: row.title_ar },
    desc: { en: row.desc_en, ar: row.desc_ar },
    specs: { en: row.specs_en, ar: row.specs_ar },
    image: normalizeProductImage(row.image, row.category_en, row.slug),
    minOrder: Number(row.min_order),
    unit: row.unit,
    availability: { en: row.availability_en, ar: row.availability_ar },
    harvestSeason: { en: row.harvest_season_en, ar: row.harvest_season_ar },
    sizes: { en: row.sizes_en, ar: row.sizes_ar },
    packaging: { en: row.packaging_en, ar: row.packaging_ar },
    commodityClass: { en: row.commodity_class_en, ar: row.commodity_class_ar },
    origin: { en: row.origin_en, ar: row.origin_ar },
    brix: row.brix ?? undefined,
    indexPrice: row.index_price ?? undefined,
    trend: row.trend ?? undefined,
  }
}

/** Normalize line-item quantity to MT (matches Zustand `getTotalMt` logic). */
export function toQuantityMt(quantity: number, unit: 'MT' | 'Containers'): number {
  return unit === 'MT' ? quantity : quantity * 12
}
