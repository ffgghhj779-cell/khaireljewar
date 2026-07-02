'use client'

import dynamic from 'next/dynamic'

const QuoteDrawer = dynamic(() => import('@/components/ecom/QuoteDrawer'), { ssr: false })
const QuoteCheckoutModal = dynamic(() => import('@/components/ecom/QuoteCheckoutModal'), { ssr: false })

export default function ClientQuoteShell({ lang }: { lang: string }) {
  return (
    <>
      <QuoteDrawer lang={lang} />
      <QuoteCheckoutModal lang={lang} />
    </>
  )
}
