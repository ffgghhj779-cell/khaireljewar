import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { BRAND } from '@/lib/constants/brand'
import { fontVariables } from '@/lib/fonts'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileAppChrome from '@/components/layout/MobileAppChrome'
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp'
import { cn } from '@/lib/utils/cn'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F7F4EC',
}

export const metadata: Metadata = {
  title: `${BRAND.nameFull.en} | ${BRAND.tagline.en}`,
  description: `${BRAND.nameFull.en} — ${BRAND.tagline.en}. ${BRAND.positioning.en}`,
  icons: {
    icon: '/images/logo/khair-aljaar-mark.svg',
    apple: '/images/logo/khair-aljaar-mark.svg',
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
        <Header lang={lang} />
        <main className="min-h-screen pt-[60px] md:pt-[76px] mobile-safe-bottom">{children}</main>
        <Footer lang={lang} />
        <MobileAppChrome lang={lang} />
        <FloatingWhatsApp lang={lang} />
      </body>
    </html>
  )
}
