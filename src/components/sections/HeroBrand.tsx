'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import PremiumImage from '@/components/ui/PremiumImage'
import BotanicalMotif from '@/components/graphics/BotanicalMotif'
import SoftFloat from '@/components/graphics/SoftFloat'
import { BRAND } from '@/lib/constants/brand'
import { SECTION_IMAGES } from '@/lib/constants/images'
import { BRAND_EASE } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

/** Staged hero — Jeddah harvest band; static on mobile for speed */
export default function HeroBrand({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const reduceMotion = useReducedMotion()
  const skip = lightMotion || !!reduceMotion

  return (
    <section className="relative isolate w-full overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-cream" />
      <div className="absolute inset-x-0 bottom-0 h-[34%] md:h-[42%] bg-secondary ka-mustard-wipe" />

      <BotanicalMotif
        kind="palm"
        className="absolute top-[18%] start-[4%] hidden w-16 h-20 opacity-25 md:block soft-float-slow"
      />
      <BotanicalMotif
        kind="date"
        className="absolute top-[22%] end-[6%] hidden w-14 h-16 opacity-20 lg:block soft-float-delay"
      />
      <div
        className="pointer-events-none absolute top-[12%] end-[18%] h-24 w-24 rounded-full bg-primary/5 blur-2xl soft-breathe hidden md:block"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-end gap-5 px-4 pb-8 pt-6 sm:px-6 sm:gap-8 sm:pb-10 sm:pt-8 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pb-14 lg:pt-12">
        <div className="lg:col-span-5 lg:pb-16">
          <motion.p
            initial={skip ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: BRAND_EASE }}
            className={cn('mb-2.5 md:mb-3 text-primary text-base md:text-xl font-medium', isAr ? 'font-arabic' : 'font-display')}
          >
            {isAr ? 'من جدة' : 'From Jeddah'}
          </motion.p>

          <motion.h1
            initial={skip ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: BRAND_EASE }}
            className={cn(
              'text-[clamp(2.35rem,9vw,5.25rem)] font-semibold text-primary leading-[1.08] tracking-tight mb-4 md:mb-5 text-balance',
              isAr ? 'font-arabic-display' : 'font-display'
            )}
          >
            {isAr ? (
              <>
                خير الجوار
                <br />
                يبدأ هنا
              </>
            ) : (
              <>
                Neighborly
                <br />
                goodness starts here
              </>
            )}
          </motion.h1>

          <motion.p
            initial={skip ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: BRAND_EASE }}
            className={cn(
              'mb-6 md:mb-8 max-w-md text-[15px] md:text-base text-primary/65 leading-relaxed',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr
              ? 'منتجات مميزة من مركز جدة — طازجة ومجمدة وجاهزة للتصدير.'
              : 'Premium produce from the Jeddah hub — fresh, frozen, and export-ready.'}
          </motion.p>

          <motion.div
            initial={skip ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: BRAND_EASE }}
            className="flex flex-col gap-2.5 xs:flex-row sm:flex-row sm:flex-wrap sm:gap-3"
          >
            <Link
              href={`/${lang}/products`}
              className={cn(
                'magnetic-cta inline-flex items-center justify-center min-h-[48px] px-6 md:px-7 rounded-xl touch-manipulation',
                'bg-primary text-cream font-semibold hover:bg-primary-700 active:scale-[0.98]',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'اكتشف المنتجات' : 'Explore products'}
            </Link>
            <Link
              href={`/${lang}/about`}
              className={cn(
                'magnetic-cta inline-flex items-center justify-center min-h-[48px] px-6 md:px-7 rounded-xl touch-manipulation',
                'border border-primary/20 text-primary font-semibold hover:bg-primary/5 active:scale-[0.98]',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'قصتنا' : 'Our story'}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={skip ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: BRAND_EASE }}
          className="relative lg:col-span-7 aspect-[5/4] sm:aspect-[16/11] md:aspect-[16/10] w-full"
        >
          <SoftFloat speed="slow" className="absolute inset-0">
            <PremiumImage
              src={SECTION_IMAGES.heroBg}
              alt={isAr ? `${BRAND.name.ar} — منتجات طازجة` : `${BRAND.name.en} — fresh produce`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              quality={lightMotion ? 78 : 90}
              className="object-cover object-bottom md:object-contain drop-shadow-[0_16px_28px_rgba(26,51,42,0.14)]"
            />
          </SoftFloat>
        </motion.div>
      </div>

      <div className="absolute bottom-4 end-5 md:bottom-8 md:end-10 z-20 hidden md:flex gap-1.5" aria-hidden>
        <span className="h-1 w-10 rounded-full bg-cream soft-bar-pulse" />
        <span className="h-1 w-3 rounded-full bg-primary/30" />
      </div>
    </section>
  )
}
