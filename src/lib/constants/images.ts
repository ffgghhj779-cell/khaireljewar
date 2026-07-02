/** Premium fallback when product / Supabase storage URLs fail */
export const PRODUCT_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=90&w=1600&auto=format&fit=crop'

/** About page — premium agricultural export corridor */
export const ABOUT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=90&w=2070&auto=format&fit=crop'

/** Tiny blur placeholder — prevents CLS while remote images load */
export const IMAGE_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AJOld7Wm0FpK8jqCOaKiv/Z'

const CATEGORY_FALLBACKS: Record<string, string> = {
  Citrus: 'https://images.unsplash.com/photo-1547514704-5ce3b3f7ef9b?q=90&w=1600&auto=format&fit=crop',
  Dates: 'https://images.unsplash.com/photo-1589112479395-2f649d907212?q=90&w=1600&auto=format&fit=crop',
  Fruits: 'https://images.unsplash.com/photo-1553279768-865e971e4d0b?q=90&w=1600&auto=format&fit=crop',
  Vegetables: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=90&w=1600&auto=format&fit=crop',
  Frozen: 'https://images.unsplash.com/photo-1574484995002-28a0c77a4e0d?q=90&w=1600&auto=format&fit=crop',
}

function isValidImageUrl(url?: string | null): url is string {
  if (!url?.trim()) return false
  try {
    const parsed = new URL(url.trim())
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

/** Resolve the best display URL for a product image */
export function resolveProductImage(image?: string | null, categoryEn?: string): string {
  if (isValidImageUrl(image)) return image.trim()
  if (categoryEn && CATEGORY_FALLBACKS[categoryEn]) return CATEGORY_FALLBACKS[categoryEn]
  return PRODUCT_IMAGE_FALLBACK
}

/** True when no real product image exists in the database */
export function isProductImagePending(image?: string | null): boolean {
  return !isValidImageUrl(image)
}

export function getCategoryFallback(categoryEn?: string): string {
  if (categoryEn && CATEGORY_FALLBACKS[categoryEn]) return CATEGORY_FALLBACKS[categoryEn]
  return PRODUCT_IMAGE_FALLBACK
}
