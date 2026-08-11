'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import HeroLivingBackdrop from '@/components/sections/HeroLivingBackdrop'
import { BRAND } from '@/lib/constants/brand'
import { BRAND_EASE } from '@/lib/constants/motion'
import { cn } from '@/lib/utils/cn'

/** Full-bleed cinematic hero — living produce backdrop, brand-first copy, mustard CTA */
export default function HeroBrand({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const reduceMotion = useReducedMotion()
  const skip = !!reduceMotion

  return (
    <section className="relative z-0 flex min-h-[78svh] w-full flex-col justify-end overflow-hidden md:min-h-[88vh]">
      <HeroLivingBackdrop
        alt={isAr ? `${BRAND.name.ar} — منتجات ومخازن` : `${BRAND.name.en} — produce and hub`}
      />

      {/* Mustard harvest edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-secondary md:h-2"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 sm:pb-14 md:px-10 md:pb-20 md:pt-28">
        <motion.p
          initial={skip ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: BRAND_EASE }}
          className={cn(
            'mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary sm:text-xs md:mb-3 md:text-sm',
            isAr ? 'font-arabic normal-case tracking-normal' : 'font-sans'
          )}
        >
          {isAr ? 'من جدة' : 'From Jeddah'}
        </motion.p>

        <motion.h1
          initial={skip ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.04, ease: BRAND_EASE }}
          className={cn(
            'mb-2 max-w-[18ch] text-[clamp(2.35rem,9vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-cream text-balance md:mb-3',
            isAr ? 'font-arabic-display' : 'font-display'
          )}
        >
          {isAr ? BRAND.name.ar : BRAND.name.en}
        </motion.h1>

        <motion.p
          initial={skip ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: BRAND_EASE }}
          className={cn(
            'mb-3 max-w-md text-[clamp(1.05rem,3.8vw,1.65rem)] font-medium leading-snug text-cream/92 text-balance md:mb-4',
            isAr ? 'font-arabic' : 'font-display'
          )}
        >
          {isAr ? 'خير الجوار يبدأ هنا' : 'Neighborly goodness starts here'}
        </motion.p>

        <motion.p
          initial={skip ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: BRAND_EASE }}
          className={cn(
            'mb-6 max-w-sm text-[13px] leading-relaxed text-cream/75 sm:mb-8 sm:text-[15px] md:max-w-md md:text-base',
            isAr ? 'font-arabic' : 'font-sans'
          )}
        >
          {isAr
            ? 'منتجات مميزة من جدة — طازجة ومجمدة وجاهزة للتصدير.'
            : 'Premium produce from Jeddah — fresh, frozen, export-ready.'}
        </motion.p>

        <motion.div
          initial={skip ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16, ease: BRAND_EASE }}
          className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3"
        >
            <Link
              href={`/${lang}/contact`}
              className={cn(
                'magnetic-cta inline-flex min-h-[48px] items-center justify-center rounded-xl px-7 touch-manipulation',
                'bg-secondary text-primary font-semibold shadow-[0_10px_28px_-12px_rgba(229,184,74,0.55)] active:opacity-90',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
            </Link>
            <Link
              href={`/${lang}/products`}
              className={cn(
                'inline-flex min-h-[48px] items-center justify-center rounded-xl border border-cream/35 px-7 touch-manipulation',
                'text-cream font-semibold active:bg-cream/10',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'المنتجات' : 'Products'}
            </Link>
        </motion.div>
      </div>
    </section>
  )
}
