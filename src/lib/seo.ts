import type { Metadata } from 'next'
import { BRAND } from '@/lib/constants/brand'
import { HOME_FAQ } from '@/lib/data/faq'

export const CANONICAL_HOST = 'khairaljewargroup.com'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? `https://${CANONICAL_HOST}`

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/brand/studio/hero-stage.webp`

const LEGACY_HOSTS = ['www.khairaljewargroup.com', 'khaireljewar.vercel.app'] as const

export function shouldRedirectHost(host: string): boolean {
  const hostname = host.split(':')[0]?.toLowerCase() ?? ''
  return LEGACY_HOSTS.includes(hostname as (typeof LEGACY_HOSTS)[number])
}

type PageMetaInput = {
  lang: string
  title: string
  description: string
  path?: string
  image?: string
  noindex?: boolean
}

function brandName(lang: string) {
  return lang === 'ar' ? BRAND.nameFull.ar : BRAND.nameFull.en
}

function localeCode(lang: string) {
  return lang === 'ar' ? 'ar_SA' : 'en_US'
}

export function languageAlternates(path = '') {
  return {
    en: `${SITE_URL}/en${path}`,
    ar: `${SITE_URL}/ar${path}`,
    'x-default': `${SITE_URL}/en${path}`,
  }
}

export function buildPageMetadata({
  lang,
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageMetaInput): Metadata {
  const canonical = `${SITE_URL}/${lang}${path}`
  const brand = brandName(lang)
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: `${title} | ${brand}`,
      description,
      url: canonical,
      siteName: brand,
      locale: localeCode(lang),
      alternateLocale: lang === 'ar' ? ['en_US'] : ['ar_SA'],
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${title} | ${brand}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${brand}`,
      description,
      images: [imageUrl],
    },
  }
}

export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.nameFull.en,
    alternateName: [BRAND.nameFull.ar, BRAND.nameGroup.en, BRAND.nameGroup.ar],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo/khair-aljewar-logo.png`,
    },
    image: DEFAULT_OG_IMAGE,
    description: BRAND.positioning.en,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressRegion: 'Al-Safa',
      addressCountry: 'SA',
      streetAddress: "Abu Ma'ali Al-Hadari",
      postalCode: '23454',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BRAND.contact.phoneTel,
        contactType: 'sales',
        areaServed: ['SA', 'AE', 'BH', 'KW', 'OM', 'QA', 'EG', 'EU'],
        availableLanguage: ['en', 'ar'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BRAND.contact.egypt.phoneTel,
        contactType: 'sales',
        areaServed: 'EG',
        availableLanguage: ['ar', 'en'],
      },
    ],
    email: BRAND.contact.email,
  }
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND.nameFull.en,
    alternateName: BRAND.nameFull.ar,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function graphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationJsonLd(), websiteJsonLd()],
  }
}

export function faqJsonLd(lang: string) {
  const items = HOME_FAQ[lang === 'ar' ? 'ar' : 'en']
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

function minimumOrderLabel(minOrder: number, unit: 'MT' | 'Containers', lang: string): string {
  const isAr = lang === 'ar'
  if (unit === 'Containers') {
    if (isAr) return minOrder === 1 ? 'حاوية واحدة' : `${minOrder} حاويات`
    return minOrder === 1 ? '1 container' : `${minOrder} containers`
  }
  return isAr ? `${minOrder} طن` : `${minOrder} MT`
}

/** Search title and description for one product. Jeddah / Saudi / GCC only. */
export function productSearchCopy(input: {
  lang: string
  name: string
  minOrder: number
  unit: 'MT' | 'Containers'
}): { title: string; description: string } {
  const order = minimumOrderLabel(input.minOrder, input.unit, input.lang)
  if (input.lang === 'ar') {
    return {
      title: `${input.name} للتصدير`,
      description: `${input.name} بالجملة من جدة إلى السعودية والخليج. الحد الأدنى ${order}. اطلب عرض سعر.`,
    }
  }
  return {
    title: `${input.name} Exporter`,
    description: `${input.name} wholesale from Jeddah to Saudi Arabia and the GCC. Minimum order ${order}. Request a quote.`,
  }
}

export function productJsonLd(input: {
  lang: string
  slug: string
  name: string
  description: string
  image: string
  sku?: string
  category?: string
  origin?: string
}) {
  const url = `${SITE_URL}/${input.lang}/products/${input.slug}`
  const image = input.image.startsWith('http') ? input.image : `${SITE_URL}${input.image}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image,
    sku: input.sku ?? input.slug,
    category: input.category,
    brand: {
      '@type': 'Brand',
      name: BRAND.nameFull.en,
    },
    countryOfOrigin: input.origin,
    url,
  }
}

export function breadcrumbJsonLd(lang: string, trail: { name: string; path: string }[]) {
  const items = [{ name: lang === 'ar' ? 'الرئيسية' : 'Home', path: '' }, ...trail]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${lang}${item.path}`,
    })),
  }
}

export function productListJsonLd(lang: string, products: { slug: string; name: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
      url: `${SITE_URL}/${lang}/products/${product.slug}`,
    })),
  }
}

export function logisticsServiceJsonLd(lang: string) {
  const isAr = lang === 'ar'
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isAr ? 'شحن مبرد وتصدير من جدة' : 'Cold-chain export from Jeddah',
    serviceType: isAr ? 'تنسيق التصدير والشحن المبرد' : 'Export coordination and cold-chain shipping',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['SA', 'AE', 'BH', 'KW', 'OM', 'QA'],
    url: `${SITE_URL}/${lang}/logistics`,
    description: isAr
      ? 'مناولة مبردة ونقل بالحاويات المبردة وتنسيق شحن التصدير من جدة، مع متابعة الشحنة.'
      : 'Temperature-controlled handling, reefer transport, and export shipping coordinated from Jeddah, with shipment follow-up.',
  }
}
