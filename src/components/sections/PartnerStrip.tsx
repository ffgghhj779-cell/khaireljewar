'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'

/** Abstract standards / trust marks — not fake partner logos */
const MARKS = {
  en: ['SFDA-aligned', 'GLOBALG.A.P.', 'Halal', 'ISO 22000', 'HACCP', 'Jeddah Chamber'],
  ar: ['امتثال SFDA', 'جلوبال جاب', 'حلال', 'آيزو 22000', 'هاسب', 'غرفة جدة'],
}

export default function PartnerStrip({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const marks = MARKS[isAr ? 'ar' : 'en']

  return (
    <section className="relative z-0 border-y border-primary/8 bg-cream py-6 md:py-12 overflow-hidden">
      <motion.div
        initial={lightMotion ? false : { opacity: 0, y: 10 }}
        whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={SCROLL_VIEWPORT_INSTANT}
        transition={{ duration: 0.5, ease: BRAND_EASE }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10"
      >
        <p
          className={cn(
            'mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/45 md:mb-6',
            isAr ? 'font-arabic normal-case tracking-normal text-xs' : 'font-sans'
          )}
        >
          {isAr ? 'إطار الثقة والمعايير' : 'Trust & standards frame'}
        </p>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide snap-carousel pb-1 md:flex-wrap md:items-center md:justify-center md:gap-4 md:overflow-visible md:pb-0">
          {marks.map((mark) => (
            <span
              key={mark}
              className={cn(
                'inline-flex shrink-0 snap-center min-h-[36px] items-center rounded-full border border-primary/12 bg-white/80 px-3.5 py-1.5',
                'text-[11px] font-semibold text-primary/75 md:min-h-[40px] md:px-4 md:py-2 md:text-xs md:shadow-soft',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {mark}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
