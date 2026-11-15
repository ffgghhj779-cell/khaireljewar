'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import HeroLivingBackdrop from '@/components/sections/HeroLivingBackdrop'
import { BRAND } from '@/lib/constants/brand'
import { BRAND_EASE } from '@/lib/constants/motion'
import { localeDisplayClass, localeFontClass, tx } from '@/lib/i18n/localize'
import { UI } from '@/lib/i18n/ui'
import { cn } from '@/lib/utils/cn'

/** Full-bleed cinematic hero — brand first, one line, one support, CTA pair */
export default function HeroBrand({ lang }: { lang: string }) {
  const reduceMotion = useReducedMotion()
  const skip = !!reduceMotion

  return (
    <section className="relative z-0 flex min-h-[72svh] w-full flex-col justify-end overflow-hidden md:min-h-[82vh]">
      <HeroLivingBackdrop
        alt={tx(lang, {
          en: `${BRAND.name.en} — produce and hub`,
          ar: `${BRAND.name.ar} — منتجات ومخازن`,
          ur: `${BRAND.name.ur} — پیداوار اور ہب`,
          hi: `${BRAND.name.hi} — उपज और हब`,
        })}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-secondary md:h-2"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 sm:pb-14 md:px-10 md:pb-16 md:pt-28">
        <motion.p
          initial={skip ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: BRAND_EASE }}
          className={cn(
            'mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary-600 sm:text-xs md:mb-3 md:text-sm',
            localeFontClass(lang),
            lang !== 'en' && 'normal-case tracking-normal'
          )}
        >
          {tx(lang, {
            en: 'From Jeddah',
            ar: 'من جدة',
            ur: 'جدّہ سے',
            hi: 'जेद्दाह से',
          })}
        </motion.p>

        <motion.h1
          initial={skip ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.04, ease: BRAND_EASE }}
          className={cn(
            'mb-2 max-w-[18ch] text-[clamp(2.35rem,9vw,5.25rem)] font-semibold leading-[1.05] tracking-tight text-primary text-balance md:mb-3',
            localeDisplayClass(lang)
          )}
        >
          {tx(lang, BRAND.name)}
        </motion.h1>

        <motion.p
          initial={skip ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: BRAND_EASE }}
          className={cn(
            'mb-3 max-w-lg text-[clamp(1.05rem,3.8vw,1.55rem)] font-medium leading-snug text-primary/85 text-balance md:mb-4',
            localeDisplayClass(lang)
          )}
        >
          {tx(lang, {
            en: 'Neighborly goodness starts here',
            ar: 'خير الجوار يبدأ هنا',
            ur: 'خیر الجوار یہاں سے شروع ہوتا ہے',
            hi: 'पड़ोस की भलाई यहीं से शुरू होती है',
          })}
        </motion.p>

        <motion.p
          initial={skip ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: BRAND_EASE }}
          className={cn(
            'mb-6 max-w-md text-[13px] leading-relaxed text-primary/70 sm:mb-7 sm:text-[15px] md:text-base',
            localeFontClass(lang)
          )}
        >
          {tx(lang, {
            en: 'Premium produce from Jeddah — fresh, frozen, export-ready.',
            ar: 'منتجات مميزة من جدة — طازجة ومجمدة وجاهزة للتصدير.',
            ur: 'جدّہ سے ممتاز پیداوار — تازہ، منجمد، برآمد کے لیے تیار۔',
            hi: 'जेद्दाह से प्रीमियम उपज — ताज़ा, फ्रोज़न, निर्यात-तैयार।',
          })}
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
              localeFontClass(lang)
            )}
          >
            {tx(lang, UI.cta.requestQuote)}
          </Link>
          <Link
            href={`/${lang}/products`}
            className={cn(
              'inline-flex min-h-[48px] items-center justify-center rounded-xl border border-primary/20 bg-white/80 px-7 backdrop-blur-sm touch-manipulation',
              'text-primary font-semibold hover:bg-white active:bg-white',
              localeFontClass(lang)
            )}
          >
            {tx(lang, UI.cta.viewProducts)}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
