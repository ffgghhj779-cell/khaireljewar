/** Premium fallback when product image is missing */
export const PRODUCT_IMAGE_FALLBACK = '/images/products/supermarket-kiosk.jpeg'

/** About page hero */
export const ABOUT_HERO_IMAGE = '/images/team/farm-workers.jpeg'

/** Tiny blur placeholder — prevents CLS while images load */
export const IMAGE_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AJOld7Wm0FpK8jqCOaKiv/Z'

/** Per-slug product photography */
export const PRODUCT_SLUG_IMAGES: Record<string, string> = {
  'valencia-oranges': '/images/products/cold-shelf-display.jpeg',
  'navel-oranges': '/images/products/cold-shelf-display.jpeg',
  'medjool-dates': '/images/products/dates-luxury-display.jpeg',
  'barhi-dates': '/images/products/dates-luxury-display.jpeg',
  'hass-avocados': '/images/products/fruits-shopping-cart.jpeg',
  'spunta-potatoes': '/images/products/potatoes-display-stand.jpeg',
  'red-onions': '/images/products/herbs-greens-packed.jpeg',
  'fresh-garlic': '/images/products/herbs-greens-packed.jpeg',
  'pomegranates': '/images/products/fruits-shopping-cart.jpeg',
  'frozen-strawberries': '/images/products/strawberries-banner.jpeg',
  'frozen-mixed-vegetables': '/images/products/okra-box.jpeg',
  'kent-mangoes': '/images/products/mangoes-display.jpeg',
}

const CATEGORY_FALLBACKS: Record<string, string> = {
  Citrus: '/images/products/cold-shelf-display.jpeg',
  Dates: '/images/products/dates-luxury-display.jpeg',
  Fruits: '/images/products/mangoes-display.jpeg',
  Vegetables: '/images/products/potatoes-retail.jpeg',
  Frozen: '/images/products/frozen-proteins-box.jpeg',
  Poultry: '/images/products/chicken-fresh-ice.jpeg',
  Oils: '/images/products/olive-oil-lifestyle.jpeg',
  Grains: '/images/products/rice-bags-display.jpeg',
  Meats: '/images/products/meats-display.jpeg',
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
  if (isValidImageUrl(image)) return image.trim()
  if (slug && PRODUCT_SLUG_IMAGES[slug]) return PRODUCT_SLUG_IMAGES[slug]
  if (categoryEn && CATEGORY_FALLBACKS[categoryEn]) return CATEGORY_FALLBACKS[categoryEn]
  return PRODUCT_IMAGE_FALLBACK
}

export function isProductImagePending(image?: string | null, slug?: string): boolean {
  if (isValidImageUrl(image)) return false
  if (slug && PRODUCT_SLUG_IMAGES[slug]) return false
  return true
}

export function getCategoryFallback(categoryEn?: string): string {
  if (categoryEn && CATEGORY_FALLBACKS[categoryEn]) return CATEGORY_FALLBACKS[categoryEn]
  return PRODUCT_IMAGE_FALLBACK
}

/** Prefer local brand photos over legacy Unsplash URLs in Supabase */
export function normalizeProductImage(
  image: string | null | undefined,
  categoryEn: string,
  slug: string
): string {
  const trimmed = image?.trim() ?? ''
  if (trimmed.startsWith('/images/')) return trimmed
  if (trimmed.includes('unsplash.com') || !trimmed) {
    return resolveProductImage(null, categoryEn, slug)
  }
  return resolveProductImage(trimmed, categoryEn, slug)
}

/** Brand logo paths */
export const BRAND_LOGO = '/images/branding/logo-full.jpeg'

/** Section hero images */
export const SECTION_IMAGES = {
  farm: '/images/team/farm-facility.jpeg',
  farmWorkers: '/images/team/farm-workers.jpeg',
  warehouse: '/images/team/warehouse-worker.jpeg',
  logisticsPort: '/images/logistics/refrigerated-truck-port.jpeg',
  logisticsHub: '/images/logistics/warehouse-trucks-loading.jpeg',
  coldChain: '/images/logistics/cold-chain-van.jpeg',
  retail: '/images/products/supermarket-kiosk.jpeg',
  heroBg: '/images/products/strawberries-banner.jpeg',
  heroFeature: '/images/products/mangoes-display.jpeg',
} as const
