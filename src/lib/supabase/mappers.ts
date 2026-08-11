import type { Product } from '@/lib/data/products'
import type { ProductRow } from '@/lib/supabase/types'
import { normalizeProductImage } from '@/lib/constants/images'

const ORIGIN_JEDDAH_EN = 'Jeddah, Saudi Arabia'
const ORIGIN_JEDDAH_AR = 'جدة، المملكة العربية السعودية'

const EGYPT_EN =
  /\b(egypt|egyptian|ismailia|beheira|sinai|fayoum|fayum|minya|giza|sharqia|beni\s*suef|new\s*valley|nile\s*delta|alexandria|damietta|port\s*said|10th\s*of\s*ramadan|north\s*coast)\b/gi
const EGYPT_AR =
  /(مصر|مصري|المصرية|الإسماعيلية|الاسماعيلية|البحيرة|سيناء|الفيوم|المنيا|الجيزة|الشرقية|بني سويف|الوادي الجديد|دلتا النيل|الإسكندرية|الاسكندرية|دمياط|بورسعيد|العاشر من رمضان|الساحل الشمالي)/g

function scrubEgyptCopy(text: string, locale: 'en' | 'ar'): string {
  if (!text) return text
  const cleaned = text.replace(locale === 'en' ? EGYPT_EN : EGYPT_AR, '').replace(/\s{2,}/g, ' ').replace(/\s([,.])/g, '$1').trim()
  return cleaned
}

function scrubOrigin(en: string, ar: string): { en: string; ar: string } {
  const hasEgypt =
    EGYPT_EN.test(en) ||
    EGYPT_AR.test(ar) ||
    /partner farms/i.test(en)
  // reset regex lastIndex
  EGYPT_EN.lastIndex = 0
  EGYPT_AR.lastIndex = 0
  if (hasEgypt || !en.trim()) {
    return { en: ORIGIN_JEDDAH_EN, ar: ORIGIN_JEDDAH_AR }
  }
  return { en, ar }
}

/** Maps a Supabase `products` row to the front-end `Product` shape — Egypt scrubbed. */
export function mapProductRow(row: ProductRow): Product {
  const origin = scrubOrigin(row.origin_en, row.origin_ar)
  return {
    id: row.id,
    slug: row.slug,
    category: { en: row.category_en, ar: row.category_ar },
    title: {
      en: scrubEgyptCopy(row.title_en, 'en').replace(/^Oranges$/i, 'Valencia Oranges') || row.title_en,
      ar: scrubEgyptCopy(row.title_ar, 'ar') || row.title_ar,
    },
    desc: {
      en: scrubEgyptCopy(row.desc_en, 'en'),
      ar: scrubEgyptCopy(row.desc_ar, 'ar'),
    },
    specs: { en: row.specs_en, ar: row.specs_ar },
    image: normalizeProductImage(row.image, row.category_en, row.slug),
    minOrder: Number(row.min_order),
    unit: row.unit,
    availability: { en: row.availability_en, ar: row.availability_ar },
    harvestSeason: { en: row.harvest_season_en, ar: row.harvest_season_ar },
    sizes: { en: row.sizes_en, ar: row.sizes_ar },
    packaging: { en: row.packaging_en, ar: row.packaging_ar },
    commodityClass: { en: row.commodity_class_en, ar: row.commodity_class_ar },
    origin,
    brix: row.brix ?? undefined,
    indexPrice: row.index_price ?? undefined,
    trend: row.trend ?? undefined,
  }
}

/** Normalize line-item quantity to MT (matches Zustand `getTotalMt` logic). */
export function toQuantityMt(quantity: number, unit: 'MT' | 'Containers'): number {
  return unit === 'MT' ? quantity : quantity * 12
}
