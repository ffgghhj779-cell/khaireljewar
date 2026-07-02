import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { BRAND } from '@/lib/constants/brand'
import { fontVariables } from '@/lib/fonts'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileAppChrome from '@/components/layout/MobileAppChrome'
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp'
import ClientQuoteShell from '@/components/ecom/ClientQuoteShell'
import { cn } from '@/lib/utils/cn'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: `${BRAND.name.en} | ${BRAND.tagline.en}`,
  description: `${BRAND.name.en} — ${BRAND.tagline.en}. Premium food export serving GCC, Europe, and Africa.`,
  icons: {
    icon: '/images/branding/logo-official.png',
    apple: '/images/branding/logo-official.png',
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
          isAr ? 'font-ibm-arabic' : 'font-inter',
          'antialiased text-dark min-h-screen'
        )}
      >
        <Header lang={lang} />
        <main className="min-h-screen pt-[56px] md:pt-[76px] mobile-safe-bottom">{children}</main>
        <Footer lang={lang} />
        <MobileAppChrome lang={lang} />
        <FloatingWhatsApp lang={lang} />
        <ClientQuoteShell lang={lang} />
      </body>
    </html>
  )
}
