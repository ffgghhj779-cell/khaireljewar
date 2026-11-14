import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { BRAND } from '@/lib/constants/brand'
import { fontVariables } from '@/lib/fonts'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SiteBio from '@/components/layout/SiteBio'
import MobileAppChrome from '@/components/layout/MobileAppChrome'
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp'
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
  graphJsonLd,
  languageAlternates,
  localeCode,
} from '@/lib/seo'
import { i18n, localeOg } from '@/lib/i18n/config'
import { asLocale, isRtl, localeFontClass, tx } from '@/lib/i18n/localize'
import { cn } from '@/lib/utils/cn'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F7F4EC',
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const locale = asLocale(lang)
  const brand = tx(locale, BRAND.nameFull)
  const title = `${brand} | ${tx(locale, BRAND.tagline)}`
  const description = `${brand} — ${tx(locale, BRAND.tagline)}. ${tx(locale, BRAND.positioning)}`
  const alternateLocales = i18n.locales.filter((l) => l !== locale).map((l) => localeOg[l])

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${tx(locale, BRAND.name)}`,
    },
    description,
    applicationName: brand,
    robots: { index: true, follow: true },
    icons: {
      icon: '/images/logo/khair-aljewar-icon.png',
      apple: '/images/logo/khair-aljewar-icon.png',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: 'website',
      siteName: brand,
      locale: localeCode(locale),
      alternateLocale: alternateLocales,
      url: `${SITE_URL}/${locale}`,
      title,
      description,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: brand }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const locale = asLocale(lang)
  const rtl = isRtl(locale)

  return (
    <html lang={locale} dir={rtl ? 'rtl' : 'ltr'} className={fontVariables}>
      <body
        className={cn(
          fontVariables,
          localeFontClass(locale),
          'text-[15px] sm:text-base antialiased text-dark min-h-screen bg-canvas'
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphJsonLd()) }}
        />
        <Header lang={locale} />
        <main className="relative z-0 min-h-screen pt-[68px] md:pt-[88px]">{children}</main>
        <SiteBio lang={locale} />
        <Footer lang={locale} />
        <MobileAppChrome lang={locale} />
        <FloatingWhatsApp lang={locale} />
      </body>
    </html>
  )
}
