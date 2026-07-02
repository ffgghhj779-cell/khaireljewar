import type { MetadataRoute } from 'next'
import { getProductSlugs } from '@/lib/actions/products'
import { SITE_URL } from '@/lib/seo'

const STATIC_PATHS = [
  '',
  '/about',
  '/products',
  '/logistics',
  '/quality',
  '/export-markets',
  '/contact',
  '/portal',
  '/privacy',
  '/terms',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProductSlugs()
  const langs = ['en', 'ar'] as const
  const now = new Date()

  const staticEntries = langs.flatMap((lang) =>
    STATIC_PATHS.map((path) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : 0.8,
    }))
  )

  const productEntries = langs.flatMap((lang) =>
    slugs.map((slug) => ({
      url: `${SITE_URL}/${lang}/products/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  return [...staticEntries, ...productEntries]
}
