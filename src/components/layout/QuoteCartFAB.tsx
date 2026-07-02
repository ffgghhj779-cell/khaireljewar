'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useQuoteStore } from '@/store/useQuoteStore'
import { cn } from '@/lib/utils/cn'
import { MOBILE_EASE_OUT, TAP_SCALE } from '@/lib/constants/motion'

export default function QuoteCartFAB({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const { items, toggleCart } = useQuoteStore()
  const count = items.length

  return (
    <div className="lg:hidden fixed z-[95] bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] end-4">
      <motion.button
        type="button"
        onClick={toggleCart}
        whileTap={TAP_SCALE}
        transition={{ duration: 0.12, ease: MOBILE_EASE_OUT }}
        aria-label={isAr ? 'فتح سلة التسعير' : 'Open quote cart'}
        className={cn(
          'relative flex items-center justify-center w-14 h-14 min-w-[48px] min-h-[48px]',
          'rounded-2xl bg-primary text-dark shadow-[0_12px_40px_rgba(0,201,215,0.45)]',
          'border border-primary/30 touch-manipulation gpu-accelerated will-change-transform'
        )}
      >
        <ShoppingBag className="w-6 h-6" strokeWidth={2.25} />
        <AnimatePresence>
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute -top-1.5 -end-1.5 min-w-[22px] h-[22px] px-1 rounded-full bg-dark text-white text-[10px] font-bold flex items-center justify-center"
            >
              {count > 9 ? '9+' : count}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
