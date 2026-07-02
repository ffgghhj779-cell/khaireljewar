import type { Metadata } from 'next'
import { BRAND } from '@/lib/constants/brand'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://khaireljewar.vercel.app'

type PageMetaInput = {
  lang: string
  title: string
  description: string
  path?: string
}

export function buildPageMetadata({ lang, title, description, path = '' }: PageMetaInput): Metadata {
  const canonical = `${SITE_URL}/${lang}${path}`

  return {
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
      title: `${title} | ${BRAND.name.en}`,
      description,
      url: canonical,
      siteName: BRAND.name.en,
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
  }
}
