import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp'
import QuoteDrawer from '@/components/ecom/QuoteDrawer'
import QuoteCheckoutModal from '@/components/ecom/QuoteCheckoutModal'

export const metadata: Metadata = {
  title: 'KHAIR ALJAAR FOODS | Reliable Food Supply Without Compromise',
  description:
    'Premium Egyptian food exporter serving GCC, Europe, and Africa. Fresh fruits, vegetables, frozen foods, and more.',
  keywords: 'food export, egyptian food, frozen vegetables, fresh fruits, khair aljaar, B2B food supplier',
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
    <html lang={lang} dir={isAr ? 'rtl' : 'ltr'}>
      <body
        className={`${isAr ? 'font-ibm-arabic' : 'font-inter'} antialiased text-dark overflow-x-hidden`}
      >
        <Header lang={lang} />
        <main className="min-h-screen pt-[76px]">{children}</main>
        <Footer lang={lang} />
        <FloatingWhatsApp lang={lang} />
        <QuoteDrawer lang={lang} />
        <QuoteCheckoutModal lang={lang} />
      </body>
    </html>
  )
}
