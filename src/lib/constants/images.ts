/** Tiny blur placeholder — prevents CLS while images load */
export const IMAGE_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AJOld7Wm0FpK8jqCOaKiv/Z'

const BRAND_SECTIONS = '/images/brand/sections'
const BRAND_PRODUCTS = '/images/brand/products'

/** Premium fallback when product image is missing */
export const PRODUCT_IMAGE_FALLBACK = '/images/products/supermarket-kiosk.jpeg'

/** About page hero — brand storytelling (not product catalog) */
export const ABOUT_HERO_IMAGE = `${BRAND_SECTIONS}/people.webp`

/**
 * One dedicated studio shot per product slug — never reuse across unrelated items.
 */
export const PRODUCT_SLUG_IMAGES: Record<string, string> = {
  'valencia-oranges': `${BRAND_PRODUCTS}/valencia-oranges.webp`,
  'navel-oranges': `${BRAND_PRODUCTS}/navel-oranges.webp`,
  'medjool-dates': `${BRAND_PRODUCTS}/medjool-dates.webp`,
  'barhi-dates': `${BRAND_PRODUCTS}/barhi-dates.webp`,
  'hass-avocados': `${BRAND_PRODUCTS}/hass-avocados.webp`,
  'kent-mangoes': `${BRAND_PRODUCTS}/kent-mangoes.webp`,
  'pomegranates': `${BRAND_PRODUCTS}/pomegranates.webp`,
  'spunta-potatoes': `${BRAND_PRODUCTS}/spunta-potatoes.webp`,
  'red-onions': `${BRAND_PRODUCTS}/red-onions.webp`,
  'fresh-garlic': `${BRAND_PRODUCTS}/fresh-garlic.webp`,
  'frozen-strawberries': `${BRAND_PRODUCTS}/frozen-strawberries.webp`,
  'frozen-mixed-vegetables': `${BRAND_PRODUCTS}/frozen-mixed-vegetables.webp`,
  'fresh-tomatoes': `${BRAND_PRODUCTS}/fresh-tomatoes.webp`,
  'long-grain-rice': `${BRAND_PRODUCTS}/long-grain-rice.webp`,
  'white-sugar': `${BRAND_PRODUCTS}/white-sugar.webp`,
  'vegetable-oil': `${BRAND_PRODUCTS}/vegetable-oil.webp`,
  'chilled-chicken': `${BRAND_PRODUCTS}/chilled-chicken.webp`,
  'frozen-fries': `${BRAND_PRODUCTS}/frozen-fries.webp`,
  'fresh-carrots': `${BRAND_PRODUCTS}/fresh-carrots.webp`,
  'bell-peppers': `${BRAND_PRODUCTS}/bell-peppers.webp`,
  'table-grapes': `${BRAND_PRODUCTS}/table-grapes.webp`,
  'green-beans': `${BRAND_PRODUCTS}/green-beans.webp`,
  'fresh-okra': `${BRAND_PRODUCTS}/fresh-okra.webp`,
  'fresh-molokhia': `${BRAND_PRODUCTS}/fresh-molokhia.webp`,
  'fresh-tangerines': `${BRAND_PRODUCTS}/fresh-tangerines.webp`,
  'fresh-lemons': `${BRAND_PRODUCTS}/fresh-lemons.webp`,
  'sweet-potatoes': `${BRAND_PRODUCTS}/sweet-potatoes.webp`,
}

const CATEGORY_FALLBACKS: Record<string, string> = {
  Citrus: `${BRAND_PRODUCTS}/valencia-oranges.webp`,
  Dates: `${BRAND_PRODUCTS}/medjool-dates.webp`,
  Fruits: `${BRAND_PRODUCTS}/kent-mangoes.webp`,
  Vegetables: `${BRAND_PRODUCTS}/spunta-potatoes.webp`,
  Frozen: `${BRAND_PRODUCTS}/frozen-strawberries.webp`,
  Grocery: `${BRAND_PRODUCTS}/long-grain-rice.webp`,
  Poultry: `${BRAND_PRODUCTS}/chilled-chicken.webp`,
  Oils: `${BRAND_PRODUCTS}/vegetable-oil.webp`,
  Grains: `${BRAND_PRODUCTS}/long-grain-rice.webp`,
  Meats: `${BRAND_PRODUCTS}/chilled-chicken.webp`,
}

export function isValidImageUrl(url?: string | null): url is string {
  if (!url?.trim()) return false
  const trimmed = url.trim()
  if (trimmed.startsWith('/')) return true
  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

/** Resolve the best display URL for a product image */
export function resolveProductImage(
  image?: string | null,
  categoryEn?: string,
  slug?: string
): string {
  // If an explicit image URL is stored in the DB (e.g. uploaded via bot), always prefer it
  if (isValidImageUrl(image)) return image.trim()

  // Then fall back to curated slug shots
  if (slug && PRODUCT_SLUG_IMAGES[slug]) return PRODUCT_SLUG_IMAGES[slug]

  if (categoryEn && CATEGORY_FALLBACKS[categoryEn]) return CATEGORY_FALLBACKS[categoryEn]
  return PRODUCT_IMAGE_FALLBACK
}

export function isProductImagePending(image?: string | null, slug?: string): boolean {
  if (slug && PRODUCT_SLUG_IMAGES[slug]) return false
  if (isValidImageUrl(image)) return false
  return true
}

export function getCategoryFallback(categoryEn?: string): string {
  if (categoryEn && CATEGORY_FALLBACKS[categoryEn]) return CATEGORY_FALLBACKS[categoryEn]
  return PRODUCT_IMAGE_FALLBACK
}

/** Prefer dedicated slug photography */
export function normalizeProductImage(
  image: string | null | undefined,
  categoryEn: string,
  slug: string
): string {
  return resolveProductImage(image, categoryEn, slug)
}

/** Official brand lockup + calligraphic mark */
export const BRAND_LOGO = '/images/logo/khair-aljewar-logo.png'
export const BRAND_LOGO_AR = '/images/logo/khair-aljewar-logo.png'
export const BRAND_MARK = '/images/logo/khair-aljewar-mark.png'
export const BRAND_MARK_PREMIUM = '/images/logo/khair-aljewar-mark.png'
export const BRAND_SEAL = '/images/logo/khair-aljewar-mark.png'
export const BRAND_LOGO_WHITE = '/images/logo/khair-aljewar-logo.png'
export const BRAND_ICON = '/images/logo/khair-aljewar-icon.png'

export const IMAGE_QUALITY = 90
export const IMAGE_QUALITY_PRODUCT = 92
export const IMAGE_QUALITY_THUMB = 80

export function isLocalBrandImage(src: string): boolean {
  return src.startsWith('/images/')
}

/**
 * Brand storytelling imagery — section-specific, never mixed randomly.
 */
export const SECTION_IMAGES = {
  farm: `${BRAND_SECTIONS}/farm.webp`,
  farmWorkers: `${BRAND_SECTIONS}/people.webp`,
  warehouse: `${BRAND_SECTIONS}/logistics.webp`,
  logisticsPort: `${BRAND_SECTIONS}/logistics.webp`,
  logisticsHub: `${BRAND_SECTIONS}/logistics.webp`,
  coldChain: `${BRAND_SECTIONS}/logistics.webp`,
  retail: '/images/products/supermarket-kiosk.jpeg',
  heroBg: '/images/brand/studio/hero-stage.webp',
  heroFeature: `${BRAND_PRODUCTS}/valencia-oranges.webp`,
  softCanvas: `${BRAND_SECTIONS}/soft-canvas.webp`,
  hospitality: `${BRAND_SECTIONS}/hospitality.webp`,
  heroProduce: `${BRAND_SECTIONS}/hero-produce.webp`,
  datesIsolated: '/images/brand/studio/dates-isolated.webp',
  orangesIsolated: '/images/brand/studio/oranges-isolated.webp',
  editorialBoard: '/images/brand/studio/editorial-board.webp',
  medjoolFeature: `${BRAND_PRODUCTS}/medjool-dates.webp`,
  mangoFeature: `${BRAND_PRODUCTS}/kent-mangoes.webp`,
  heroReelPoster: '/images/brand/hero-reel/warehouse.png',
  heroVideoWebm: '/videos/hero.webm',
  heroVideoMp4: '/videos/hero.mp4',
  packTomatoes: '/images/brand/packaging/tomatoes-crate.webp',
  packRice: '/images/brand/packaging/rice-bag.webp',
  packSugar: '/images/brand/packaging/sugar-bag.webp',
  packFries: '/images/brand/packaging/fries-bag.webp',
  packOil: '/images/brand/packaging/vegetable-oil.webp',
  packChicken: '/images/brand/packaging/chilled-chicken.webp',
} as const
