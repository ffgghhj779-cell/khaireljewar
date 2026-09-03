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
} from '@/lib/seo'
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
  const isAr = lang === 'ar'
  const brand = isAr ? BRAND.nameFull.ar : BRAND.nameFull.en
  const title = `${brand} | ${isAr ? BRAND.tagline.ar : BRAND.tagline.en}`
  const description = `${brand} — ${isAr ? BRAND.tagline.ar : BRAND.tagline.en}. ${
    isAr ? BRAND.positioning.ar : BRAND.positioning.en
  }`

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${isAr ? BRAND.name.ar : BRAND.name.en}`,
    },
    description,
    applicationName: brand,
    robots: { index: true, follow: true },
    icons: {
      icon: '/images/logo/khair-aljewar-icon.png',
      apple: '/images/logo/khair-aljewar-icon.png',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: 'website',
      siteName: brand,
      locale: isAr ? 'ar_SA' : 'en_US',
      alternateLocale: isAr ? ['en_US'] : ['ar_SA'],
      url: `${SITE_URL}/${lang}`,
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
  return [{ lang: 'en' }, { lang: 'ar' }]
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const isAr = lang === 'ar'

  return (
    <html lang={lang} dir={isAr ? 'rtl' : 'ltr'} className={fontVariables}>
      <body
        className={cn(
          fontVariables,
          isAr ? 'font-arabic text-[15px] sm:text-base' : 'font-sans text-[15px] sm:text-base',
          'antialiased text-dark min-h-screen bg-canvas'
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphJsonLd()) }}
        />
        <Header lang={lang} />
        <main className="relative z-0 min-h-screen pt-[68px] md:pt-[88px]">{children}</main>
        <SiteBio lang={lang} />
        <Footer lang={lang} />
        <MobileAppChrome lang={lang} />
        <FloatingWhatsApp lang={lang} />
      </body>
    </html>
  )
}
