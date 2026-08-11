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

/** Hero — text beside image on all breakpoints (desktop language, mobile scale) */
export default function HeroBrand({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const reduceMotion = useReducedMotion()
  const skip = !!reduceMotion

  return (
    <section className="relative z-0 w-full overflow-hidden bg-cream">
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-secondary md:h-[42%]" aria-hidden />

      <BotanicalMotif
        kind="palm"
        className="absolute top-[14%] start-[3%] w-10 h-12 opacity-20 md:top-[18%] md:start-[4%] md:w-16 md:h-20 md:opacity-25 soft-float-slow"
      />
      <BotanicalMotif
        kind="date"
        className="absolute top-[16%] end-[2%] hidden w-14 h-16 opacity-20 lg:block soft-float-delay"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 items-center gap-3 px-3 pb-8 pt-4 sm:gap-5 sm:px-6 sm:pb-10 sm:pt-8 lg:grid-cols-12 lg:items-end lg:gap-6 lg:px-10 lg:pb-14 lg:pt-12">
        <div className="col-span-1 flex flex-col justify-center lg:col-span-5 lg:pb-16">
          <motion.p
            initial={skip ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: BRAND_EASE }}
            className={cn(
              'mb-1.5 text-primary text-[11px] sm:text-sm md:mb-3 md:text-xl font-medium',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'من جدة' : 'From Jeddah'}
          </motion.p>

          <motion.h1
            initial={skip ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04, ease: BRAND_EASE }}
            className={cn(
              'text-[clamp(1.35rem,5.2vw,5.25rem)] font-semibold text-primary leading-[1.12] tracking-tight mb-2 sm:mb-3 md:mb-5 text-balance',
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
            initial={skip ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: BRAND_EASE }}
            className={cn(
              'mb-3 max-w-[16rem] text-[11px] leading-snug text-primary/65 sm:mb-5 sm:max-w-xs sm:text-[13px] md:mb-8 md:max-w-md md:text-base md:leading-relaxed',
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
            transition={{ duration: 0.4, delay: 0.12, ease: BRAND_EASE }}
            className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3"
          >
            <Link
              href={`/${lang}/products`}
              className={cn(
                'inline-flex items-center justify-center min-h-[40px] px-3.5 rounded-lg text-[12px] touch-manipulation sm:min-h-[48px] sm:px-6 sm:rounded-xl sm:text-sm',
                'bg-primary text-cream font-semibold active:opacity-90',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'المنتجات' : 'Products'}
            </Link>
            <Link
              href={`/${lang}/about`}
              className={cn(
                'hidden sm:inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl touch-manipulation',
                'border border-primary/20 text-primary font-semibold active:bg-primary/5',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'قصتنا' : 'Our story'}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={skip ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.06, ease: BRAND_EASE }}
          className="relative col-span-1 lg:col-span-7"
        >
          <div className="relative aspect-square w-full sm:aspect-[5/4] md:aspect-[16/10]">
            <SoftFloat speed="slow" className="absolute inset-0">
              <PremiumImage
                src={SECTION_IMAGES.heroBg}
                alt={isAr ? `${BRAND.name.ar} — منتجات طازجة` : `${BRAND.name.en} — fresh produce`}
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 58vw"
                quality={lightMotion ? 80 : 90}
                className="object-contain object-bottom drop-shadow-[0_12px_24px_rgba(26,51,42,0.12)]"
              />
            </SoftFloat>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
