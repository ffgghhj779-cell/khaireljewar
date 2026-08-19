import type { MetadataRoute } from 'next'
import { MOCK_PRODUCTS } from '@/lib/data/products'
import { languageAlternates, SITE_URL } from '@/lib/seo'

const STATIC_PATHS = [
  '',
  '/about',
  '/partners',
  '/products',
  '/logistics',
  '/quality',
  '/export-markets',
  '/contact',
  '/privacy',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = MOCK_PRODUCTS.map((product) => product.slug)
  const langs = ['en', 'ar'] as const
  const now = new Date()

  const staticEntries = langs.flatMap((lang) =>
    STATIC_PATHS.map((path) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : path === '/products' || path === '/contact' ? 0.9 : 0.8,
      alternates: {
        languages: languageAlternates(path),
      },
    }))
  )

  const productEntries = langs.flatMap((lang) =>
    slugs.map((slug) => ({
      url: `${SITE_URL}/${lang}/products/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: languageAlternates(`/products/${slug}`),
      },
    }))
  )

  return [...staticEntries, ...productEntries]
}
