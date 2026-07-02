'use client'

import { useQuoteStore } from '@/store/useQuoteStore'
import { CURRENCIES, type CurrencyCode } from '@/lib/utils/currency'
import { cn } from '@/lib/utils/cn'

interface CurrencyToggleProps {
  lang: string
  compact?: boolean
  className?: string
}

export default function CurrencyToggle({ lang, compact, className }: CurrencyToggleProps) {
  const isAr = lang === 'ar'
  const currency = useQuoteStore((s) => s.currency)
  const setCurrency = useQuoteStore((s) => s.setCurrency)

  return (
    <div className={cn('flex items-center gap-1 p-1 bg-gray-100 border border-gray-200 rounded-lg', className)}>
      {CURRENCIES.map((c) => (
        <button
          key={c.code}
          onClick={() => setCurrency(c.code as CurrencyCode)}
          title={isAr ? c.label.ar : c.label.en}
          className={cn(
            'px-2 py-1 text-[10px] font-bold rounded-md transition-all',
            currency === c.code
              ? 'bg-white text-dark shadow-sm border border-gray-200'
              : 'text-gray-500 hover:text-dark'
          )}
        >
          {compact ? c.code : `${c.symbol} ${c.code}`}
        </button>
      ))}
    </div>
  )
}
