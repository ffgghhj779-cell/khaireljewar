'use client'

import MobileBottomNav from './MobileBottomNav'
import QuoteCartFAB from './QuoteCartFAB'

export default function MobileAppChrome({ lang }: { lang: string }) {
  return (
    <>
      <MobileBottomNav lang={lang} />
      <QuoteCartFAB lang={lang} />
    </>
  )
}
