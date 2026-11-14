import type { Metadata } from 'next'
import { BRAND } from '@/lib/constants/brand'
import { HOME_FAQ } from '@/lib/data/faq'
import { i18n, localeOg, type Locale } from '@/lib/i18n/config'
import { asLocale, tx } from '@/lib/i18n/localize'
import { UI } from '@/lib/i18n/ui'

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
  return tx(lang, BRAND.nameFull)
}

export function localeCode(lang: string) {
  return localeOg[asLocale(lang)]
}

export function languageAlternates(path = '') {
  const languages = Object.fromEntries(
    i18n.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
  ) as Record<Locale, string> & { 'x-default': string }
  languages['x-default'] = `${SITE_URL}/en${path}`
  return languages
}

export function buildPageMetadata({
  lang,
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageMetaInput): Metadata {
  const locale = asLocale(lang)
  const canonical = `${SITE_URL}/${locale}${path}`
  const brand = brandName(locale)
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const alternateLocales = i18n.locales.filter((l) => l !== locale).map((l) => localeOg[l])

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
      locale: localeCode(locale),
      alternateLocale: alternateLocales,
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
    alternateName: [
      BRAND.nameFull.ar,
      BRAND.nameFull.ur,
      BRAND.nameFull.hi,
      BRAND.nameGroup.en,
      BRAND.nameGroup.ar,
    ],
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
        areaServed: ['SA', 'AE', 'BH', 'KW', 'OM', 'QA', 'EG', 'EU', 'PK', 'IN', 'BD'],
        availableLanguage: [...i18n.locales],
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
    alternateName: [BRAND.nameFull.ar, BRAND.nameFull.ur, BRAND.nameFull.hi],
    inLanguage: [...i18n.locales],
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
  const locale = asLocale(lang)
  const faqKey = locale === 'ar' || locale === 'ur' ? 'ar' : 'en'
  const items = HOME_FAQ[faqKey]
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
  const locale = asLocale(lang)
  if (unit === 'Containers') {
    if (locale === 'ar') return minOrder === 1 ? 'حاوية واحدة' : `${minOrder} حاويات`
    if (locale === 'ur') return minOrder === 1 ? '1 کنٹینر' : `${minOrder} کنٹینرز`
    if (locale === 'hi') return minOrder === 1 ? '1 कंटेनर' : `${minOrder} कंटेनर`
    return minOrder === 1 ? '1 container' : `${minOrder} containers`
  }
  if (locale === 'ar') return `${minOrder} طن`
  if (locale === 'ur') return `${minOrder} میٹرک ٹن`
  if (locale === 'hi') return `${minOrder} मीट्रिक टन`
  return `${minOrder} MT`
}

/** Search title and description for one product. Jeddah / Saudi / GCC only. */
export function productSearchCopy(input: {
  lang: string
  name: string
  /** Omit when the minimum is set in the quote */
  minOrder?: number
  unit: 'MT' | 'Containers'
}): { title: string; description: string } {
  const locale = asLocale(input.lang)
  const order = input.minOrder == null ? null : minimumOrderLabel(input.minOrder, input.unit, locale)
  if (locale === 'ar') {
    return {
      title: `${input.name} للتصدير`,
      description: order
        ? `${input.name} بالجملة من جدة إلى السعودية والخليج. الحد الأدنى ${order}. اطلب عرض سعر.`
        : `${input.name} بالجملة من جدة إلى السعودية والخليج. الكمية تتحدد في عرض السعر. اطلب عرض سعر.`,
    }
  }
  if (locale === 'ur') {
    return {
      title: `${input.name} برآمد کنندہ`,
      description: order
        ? `${input.name} بالجملہ جدّہ سے سعودی عرب اور خلیج تک۔ کم از کم آرڈر ${order}۔ قیمت کی درخواست کریں۔`
        : `${input.name} بالجملہ جدّہ سے سعودی عرب اور خلیج تک۔ مقدار کوٹیشن میں طے ہوتی ہے۔ قیمت کی درخواست کریں۔`,
    }
  }
  if (locale === 'hi') {
    return {
      title: `${input.name} निर्यातक`,
      description: order
        ? `${input.name} थोक — जेद्दाह से सऊदी अरब और जीसीसी तक। न्यूनतम ऑर्डर ${order}। कोटेशन माँगें।`
        : `${input.name} थोक — जेद्दाह से सऊदी अरब और जीसीसी तक। मात्रा कोटेशन में तय होती है। कोटेशन माँगें।`,
    }
  }
  return {
    title: `${input.name} Exporter`,
    description: order
      ? `${input.name} wholesale from Jeddah to Saudi Arabia and the GCC. Minimum order ${order}. Request a quote.`
      : `${input.name} wholesale from Jeddah to Saudi Arabia and the GCC. Quantity is set in the quote. Request a quote.`,
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
  const locale = asLocale(lang)
  const items = [{ name: tx(locale, UI.nav.home), path: '' }, ...trail]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
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
  const locale = asLocale(lang)
  const copy = {
    name: {
      en: 'Cold-chain export from Jeddah',
      ar: 'شحن مبرد وتصدير من جدة',
      ur: 'جدّہ سے کولڈ چین برآمد',
      hi: 'जेद्दाह से कोल्ड-चेन निर्यात',
    },
    serviceType: {
      en: 'Export coordination and cold-chain shipping',
      ar: 'تنسيق التصدير والشحن المبرد',
      ur: 'برآمد کی ہم آہنگی اور کولڈ چین شپنگ',
      hi: 'निर्यात समन्वय और कोल्ड-चेन शिपिंग',
    },
    description: {
      en: 'Temperature-controlled handling, reefer transport, and export shipping coordinated from Jeddah, with shipment follow-up.',
      ar: 'مناولة مبردة ونقل بالحاويات المبردة وتنسيق شحن التصدير من جدة، مع متابعة الشحنة.',
      ur: 'درجہ حرارت کنٹرولڈ ہینڈلنگ، ریفر ٹرانسپورٹ، اور جدّہ سے مربوط برآمدی شپنگ بمع شپمنٹ فالو اپ۔',
      hi: 'तापमान-नियंत्रित हैंडलिंग, रीफ़र परिवहन, और जेद्दाह से समन्वयित निर्यात शिपिंग, शिपमेंट फ़ॉलो-अप के साथ।',
    },
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: tx(locale, copy.name),
    serviceType: tx(locale, copy.serviceType),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['SA', 'AE', 'BH', 'KW', 'OM', 'QA', 'PK', 'IN', 'BD'],
    url: `${SITE_URL}/${locale}/logistics`,
    description: tx(locale, copy.description),
  }
}
