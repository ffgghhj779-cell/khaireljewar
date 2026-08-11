import type { Metadata } from 'next'
import { BRAND } from '@/lib/constants/brand'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://khaireljewar.vercel.app'

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/brand/studio/hero-stage.webp`

type PageMetaInput = {
  lang: string
  title: string
  description: string
  path?: string
  image?: string
}

export function buildPageMetadata({
  lang,
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
}: PageMetaInput): Metadata {
  const canonical = `${SITE_URL}/${lang}${path}`

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en${path}`,
        ar: `${SITE_URL}/ar${path}`,
      },
    },
    openGraph: {
      title: `${title} | ${BRAND.nameFull.en}`,
      description,
      url: canonical,
      siteName: BRAND.nameFull.en,
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: BRAND.nameFull.en }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${BRAND.nameFull.en}`,
      description,
      images: [image],
    },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.nameFull.en,
    alternateName: BRAND.nameFull.ar,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/khair-aljaar-mark.svg`,
    description: BRAND.positioning.en,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BRAND.city.en,
      addressCountry: 'SA',
      streetAddress: 'Jeddah Islamic Port area',
      postalCode: '21483',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BRAND.contact.phoneTel,
        contactType: 'sales',
        areaServed: ['SA', 'AE', 'BH', 'KW', 'OM', 'QA', 'EG', 'EU'],
        availableLanguage: ['en', 'ar'],
      },
    ],
    email: BRAND.contact.email,
    sameAs: [],
  }
}
