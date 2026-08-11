'use client'

import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, Award, Snowflake, FileCheck, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'

const MARKS = [
  { en: 'SFDA-aligned', ar: 'امتثال SFDA', Icon: ShieldCheck },
  { en: 'GLOBALG.A.P.', ar: 'جلوبال جاب', Icon: Leaf },
  { en: 'Halal', ar: 'حلال', Icon: Award },
  { en: 'ISO 22000', ar: 'آيزو 22000', Icon: FileCheck },
  { en: 'HACCP', ar: 'هاسب', Icon: Snowflake },
  { en: 'Jeddah Chamber', ar: 'غرفة جدة', Icon: Building2 },
]

export default function PartnerStrip({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()

  return (
    <section className="relative z-0 border-y border-primary/8 bg-cream py-5 md:py-12 overflow-hidden">
      <motion.div
        initial={lightMotion ? { opacity: 0, y: 8 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={SCROLL_VIEWPORT_INSTANT}
        transition={{ duration: 0.4, ease: BRAND_EASE }}
        className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10"
      >
        <p
          className={cn(
            'mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45 md:mb-6 md:text-[11px]',
            isAr ? 'font-arabic normal-case tracking-normal text-xs' : 'font-sans'
          )}
        >
          {isAr ? 'إطار الثقة والمعايير' : 'Trust & standards'}
        </p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5 md:flex-wrap md:items-center md:justify-center md:gap-3 md:overflow-visible">
          {MARKS.map(({ en, ar, Icon }, i) => (
            <motion.span
              key={en}
              initial={lightMotion ? { opacity: 0, scale: 0.92 } : false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={SCROLL_VIEWPORT_INSTANT}
              transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.2), ease: BRAND_EASE }}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 min-h-[34px] rounded-full border border-primary/12 bg-white px-3 py-1.5',
                'text-[11px] font-semibold text-primary/80 md:min-h-[40px] md:gap-2 md:px-4 md:text-xs',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              <Icon className="h-3.5 w-3.5 text-secondary shrink-0" strokeWidth={2} aria-hidden />
              {isAr ? ar : en}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
