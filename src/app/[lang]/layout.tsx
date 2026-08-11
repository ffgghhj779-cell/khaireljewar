import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { BRAND } from '@/lib/constants/brand'
import { fontVariables } from '@/lib/fonts'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileAppChrome from '@/components/layout/MobileAppChrome'
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp'
import { DEFAULT_OG_IMAGE, SITE_URL, organizationJsonLd } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F7F4EC',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${BRAND.nameFull.en} | ${BRAND.tagline.en}`,
  description: `${BRAND.nameFull.en} — ${BRAND.tagline.en}. ${BRAND.positioning.en}`,
  icons: {
    icon: '/images/logo/khair-aljaar-mark.svg',
    apple: '/images/logo/khair-aljaar-mark.svg',
  },
  openGraph: {
    siteName: BRAND.nameFull.en,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: BRAND.nameFull.en }],
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Header lang={lang} />
        <main className="relative z-0 min-h-screen pt-[56px] md:pt-[76px]">{children}</main>
        <Footer lang={lang} />
        <MobileAppChrome lang={lang} />
        <FloatingWhatsApp lang={lang} />
      </body>
    </html>
  )
}
