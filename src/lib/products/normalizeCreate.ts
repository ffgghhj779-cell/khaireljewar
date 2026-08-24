import type { ProductUnit } from '@/lib/data/products'
import { PRODUCT_CATEGORIES } from '@/lib/data/products'
import { slugifyProductTitle } from '@/lib/products/slugify'

const CATEGORY_AR: Record<string, string> = {
  Citrus: 'الموالح',
  Dates: 'التمور',
  Fruits: 'الفواكه',
  Vegetables: 'الخضروات',
  Frozen: 'المجمدات',
}

export type ProductCreateInput = {
  title_en: string
  title_ar: string
  category_en: string
  category_ar?: string
  desc_en: string
  desc_ar: string
  specs_en?: string[]
  specs_ar?: string[]
  image: string
  min_order?: number
  unit?: ProductUnit
  availability_en?: string
  availability_ar?: string
  harvest_season_en?: string
  harvest_season_ar?: string
  sizes_en?: string
  sizes_ar?: string
  packaging_en?: string
  packaging_ar?: string
  commodity_class_en?: string
  commodity_class_ar?: string
  origin_en?: string
  origin_ar?: string
  brix?: string | null
  index_price?: string | null
  trend?: string | null
  slug?: string
  sort_order?: number
  is_active?: boolean
}

function asString(v: unknown, fallback = ''): string {
  if (v == null) return fallback
  return String(v).trim() || fallback
}

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  if (typeof v === 'string' && v.trim()) {
    return v
      .split(/\n|•|;|\|/)
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

function normalizeCategoryEn(raw: string): string {
  const allowed = PRODUCT_CATEGORIES.map((c) => c.id).filter((id) => id !== 'All')
  const hit = allowed.find((id) => id.toLowerCase() === raw.toLowerCase())
  if (hit) return hit
  // Arabic labels
  const arMap: Record<string, string> = {
    الموالح: 'Citrus',
    التمور: 'Dates',
    الفواكه: 'Fruits',
    الخضروات: 'Vegetables',
    المجمدات: 'Frozen',
  }
  if (arMap[raw]) return arMap[raw]
  return 'Fruits'
}

export function normalizeProductCreateInput(body: Record<string, unknown>): {
  ok: true
  data: ProductCreateInput
} | { ok: false; error: string } {
  const title_en = asString(body.title_en ?? body.titleEn ?? body.name_en ?? body.name)
  const title_ar = asString(body.title_ar ?? body.titleAr ?? body.name_ar ?? title_en)
  if (!title_en && !title_ar) {
    return { ok: false, error: 'title_en or title_ar is required' }
  }

  const category_en = normalizeCategoryEn(
    asString(body.category_en ?? body.categoryEn ?? body.category, 'Fruits')
  )
  const category_ar = asString(
    body.category_ar ?? body.categoryAr,
    CATEGORY_AR[category_en] || 'الفواكه'
  )

  const desc_en = asString(body.desc_en ?? body.descEn ?? body.description_en ?? body.description)
  const desc_ar = asString(body.desc_ar ?? body.descAr ?? body.description_ar ?? desc_en)
  if (!desc_en && !desc_ar) {
    return { ok: false, error: 'desc_en or desc_ar is required' }
  }

  const image = asString(body.image ?? body.image_url ?? body.imageUrl)
  if (!image) {
    return { ok: false, error: 'image URL is required (upload first or pass image)' }
  }

  const unitRaw = asString(body.unit, 'MT')
  const unit: ProductUnit = unitRaw === 'Containers' ? 'Containers' : 'MT'

  const min_order = Number(body.min_order ?? body.minOrder ?? 1)
  if (!Number.isFinite(min_order) || min_order <= 0) {
    return { ok: false, error: 'min_order must be > 0' }
  }

  const slug = asString(body.slug) || slugifyProductTitle(title_en || title_ar)

  return {
    ok: true,
    data: {
      title_en: title_en || title_ar,
      title_ar: title_ar || title_en,
      category_en,
      category_ar,
      desc_en: desc_en || desc_ar,
      desc_ar: desc_ar || desc_en,
      specs_en: asStringArray(body.specs_en ?? body.specsEn ?? body.specs),
      specs_ar: asStringArray(body.specs_ar ?? body.specsAr ?? body.specs),
      image,
      min_order,
      unit,
      availability_en: asString(body.availability_en ?? body.availabilityEn, 'In Stock'),
      availability_ar: asString(body.availability_ar ?? body.availabilityAr, 'متوفر'),
      harvest_season_en: asString(body.harvest_season_en ?? body.harvestSeasonEn, 'Year-round'),
      harvest_season_ar: asString(body.harvest_season_ar ?? body.harvestSeasonAr, 'على مدار العام'),
      sizes_en: asString(body.sizes_en ?? body.sizesEn, 'Standard'),
      sizes_ar: asString(body.sizes_ar ?? body.sizesAr, 'قياسي'),
      packaging_en: asString(body.packaging_en ?? body.packagingEn, 'Export cartons'),
      packaging_ar: asString(body.packaging_ar ?? body.packagingAr, 'كراتين تصدير'),
      commodity_class_en: asString(body.commodity_class_en ?? body.commodityClassEn, category_en),
      commodity_class_ar: asString(body.commodity_class_ar ?? body.commodityClassAr, category_ar),
      origin_en: asString(body.origin_en ?? body.originEn, 'Jeddah, Saudi Arabia'),
      origin_ar: asString(body.origin_ar ?? body.originAr, 'جدة، المملكة العربية السعودية'),
      brix: asString(body.brix) || null,
      index_price: asString(body.index_price ?? body.indexPrice ?? body.price) || null,
      trend: asString(body.trend) || null,
      slug,
      sort_order: Number(body.sort_order ?? body.sortOrder ?? 100) || 100,
      is_active: body.is_active === false || body.isActive === false ? false : true,
    },
  }
}
