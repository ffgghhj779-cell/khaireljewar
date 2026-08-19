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
}: PageMetaInput): Metadata {
  const canonical = `${SITE_URL}/${lang}${path}`
  const brand = brandName(lang)
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
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
      url: `${SITE_URL}/images/logo/khair-aljaar-mark.svg`,
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
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/${input.lang}/contact?product=${encodeURIComponent(input.slug)}`,
      availability: 'https://schema.org/InStock',
      businessFunction: 'http://purl.org/goodrelations/v1#Sell',
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  }
}
