/** URL-safe slug from English (preferred) or Arabic title. */
export function slugifyProductTitle(input: string): string {
  const raw = String(input || '').trim().toLowerCase()
  if (!raw) return `product-${Date.now()}`

  const ascii = raw
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  if (ascii.length >= 2) return ascii.slice(0, 80)

  // Arabic / non-latin fallback — stable short hash-ish slug
  let hash = 0
  for (let i = 0; i < raw.length; i++) hash = (hash * 31 + raw.charCodeAt(i)) >>> 0
  return `product-${hash.toString(36)}`
}
