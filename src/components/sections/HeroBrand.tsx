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

/** Staged hero — clean mobile stack: copy then full product shot */
export default function HeroBrand({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const reduceMotion = useReducedMotion()
  const skip = lightMotion || !!reduceMotion

  return (
    <section className="relative z-0 w-full overflow-hidden bg-cream">
      <div className="absolute inset-x-0 bottom-0 hidden h-[42%] bg-secondary md:block" aria-hidden />

      <BotanicalMotif
        kind="palm"
        className="absolute top-[18%] start-[4%] hidden w-16 h-20 opacity-25 md:block soft-float-slow"
      />
      <BotanicalMotif
        kind="date"
        className="absolute top-[22%] end-[6%] hidden w-14 h-16 opacity-20 lg:block soft-float-delay"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-end gap-6 px-4 pb-6 pt-5 sm:px-6 sm:pb-10 sm:pt-8 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pb-14 lg:pt-12">
        <div className="lg:col-span-5 lg:pb-16">
          <motion.p
            initial={skip ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: BRAND_EASE }}
            className={cn('mb-2 text-primary text-sm md:text-xl font-medium', isAr ? 'font-arabic' : 'font-display')}
          >
            {isAr ? 'من جدة' : 'From Jeddah'}
          </motion.p>

          <motion.h1
            initial={skip ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: BRAND_EASE }}
            className={cn(
              'text-[clamp(2.1rem,8.5vw,5.25rem)] font-semibold text-primary leading-[1.12] tracking-tight mb-3 md:mb-5 text-balance',
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
              'mb-5 md:mb-8 max-w-md text-[14px] md:text-base text-primary/65 leading-relaxed',
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
            className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3"
          >
            <Link
              href={`/${lang}/products`}
              className={cn(
                'inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl touch-manipulation',
                'bg-primary text-cream font-semibold active:opacity-90',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'اكتشف المنتجات' : 'Explore products'}
            </Link>
            <Link
              href={`/${lang}/about`}
              className={cn(
                'inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl touch-manipulation',
                'border border-primary/20 text-primary font-semibold active:bg-primary/5',
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
          className="relative lg:col-span-7 w-full"
        >
          {/* Mobile: mustard stage frame under contained product shot */}
          <div className="relative mx-auto w-full max-w-lg md:max-w-none">
            <div className="absolute inset-x-0 bottom-0 h-[42%] rounded-t-[1.25rem] bg-secondary md:hidden" aria-hidden />
            <div className="relative aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] w-full">
              <SoftFloat speed="slow" className="absolute inset-0">
                <PremiumImage
                  src={SECTION_IMAGES.heroBg}
                  alt={isAr ? `${BRAND.name.ar} — منتجات طازجة` : `${BRAND.name.en} — fresh produce`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  quality={lightMotion ? 80 : 90}
                  className="object-contain object-bottom"
                />
              </SoftFloat>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
