'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PremiumImage from '@/components/ui/PremiumImage'
import BotanicalMotif from '@/components/graphics/BotanicalMotif'
import SoftFloat from '@/components/graphics/SoftFloat'
import Container from '@/components/ui/Container'
import { BRAND } from '@/lib/constants/brand'
import { SECTION_IMAGES } from '@/lib/constants/images'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

export default function OriginStory({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()

  return (
    <section className="relative z-0 overflow-hidden bg-cream py-12 md:py-36">
      <BotanicalMotif
        kind="stem"
        className="absolute start-[8%] bottom-[12%] hidden w-10 h-24 opacity-20 md:block soft-float-slow"
      />
      <BotanicalMotif
        kind="orange"
        className="absolute end-[10%] bottom-[18%] hidden w-16 h-16 opacity-25 lg:block soft-float"
      />

      <Container size="large" className="relative">
        <motion.div
          initial={lightMotion ? false : { opacity: 0, y: 12 }}
          whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT_INSTANT}
          transition={{ duration: 0.5, ease: BRAND_EASE }}
          className="pointer-events-none absolute -start-2 top-0 hidden w-[160px] md:block lg:w-[200px]"
          aria-hidden
        >
          <SoftFloat>
            <div className="relative aspect-square">
              <PremiumImage
                src={SECTION_IMAGES.datesIsolated}
                alt=""
                fill
                sizes="200px"
                quality={90}
                className="object-contain drop-shadow-[0_18px_28px_rgba(26,51,42,0.12)]"
              />
            </div>
          </SoftFloat>
        </motion.div>

        <motion.div
          initial={lightMotion ? false : { opacity: 0, y: 12 }}
          whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT_INSTANT}
          transition={{ duration: 0.55, delay: 0.06, ease: BRAND_EASE }}
          className="pointer-events-none absolute -end-4 top-8 hidden w-[180px] md:block lg:w-[220px]"
          aria-hidden
        >
          <SoftFloat speed="delay">
            <div className="relative aspect-square">
              <PremiumImage
                src={SECTION_IMAGES.orangesIsolated}
                alt=""
                fill
                sizes="220px"
                quality={90}
                className="object-contain drop-shadow-[0_18px_28px_rgba(26,51,42,0.12)]"
              />
            </div>
          </SoftFloat>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <motion.div
            initial={lightMotion ? false : { opacity: 0, scale: 0.92 }}
            whileInView={lightMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={SCROLL_VIEWPORT_INSTANT}
            transition={{ duration: 0.5, ease: BRAND_EASE }}
            className="mb-5 flex justify-center"
          >
            <BotanicalMotif kind="leaf" className="h-10 w-8 opacity-50" />
          </motion.div>

          <motion.p
            initial={lightMotion ? false : { opacity: 0, y: 10 }}
            whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT_INSTANT}
            transition={{ duration: 0.45, ease: BRAND_EASE }}
            className={cn('mb-4 text-primary font-semibold text-sm md:text-base', isAr ? 'font-arabic' : 'font-display')}
          >
            {isAr ? 'خير الجوار' : 'Khair Aljaar'}
          </motion.p>

          <motion.h2
            initial={lightMotion ? false : { opacity: 0, y: 14 }}
            whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT_INSTANT}
            transition={{ duration: 0.5, delay: 0.04, ease: BRAND_EASE }}
            className={cn(
              'text-[clamp(2.5rem,5.5vw,4.25rem)] font-medium text-primary leading-[1.08] tracking-tight mb-6',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'خير الجوار يبدأ من جدة.' : 'A neighborly harvest.'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT_INSTANT}
            transition={{ duration: 0.4, delay: 0.08, ease: BRAND_EASE }}
            className={cn(
              'mx-auto mb-6 max-w-md text-sm md:mb-10 md:text-lg text-primary/65 leading-relaxed',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr ? BRAND.sourcing.ar : BRAND.sourcing.en}
          </motion.p>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 md:hidden">
            {[
              { en: 'Partner farms', ar: 'مزارع شريكة' },
              { en: 'Jeddah hub', ar: 'مركز جدة' },
              { en: 'Export ready', ar: 'جاهز للتصدير' },
            ].map((chip) => (
              <span
                key={chip.en}
                className={cn(
                  'inline-flex items-center rounded-full border border-primary/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-primary/75',
                  isAr ? 'font-arabic' : 'font-sans'
                )}
              >
                {isAr ? chip.ar : chip.en}
              </span>
            ))}
          </div>

          <Link
            href={`/${lang}/about`}
            className={cn(
              'inline-flex items-center justify-center min-h-[48px] px-7 rounded-xl touch-manipulation',
              'bg-secondary text-primary font-semibold active:opacity-90',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr ? 'اعرف قصتنا' : 'Our story'}
          </Link>
        </div>

        <div className="mt-8 flex justify-center gap-4 md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT_INSTANT}
            transition={{ duration: 0.35, delay: 0.1, ease: BRAND_EASE }}
            className="relative h-28 w-28"
          >
            <PremiumImage
              src={SECTION_IMAGES.datesIsolated}
              alt={isAr ? 'تمر' : 'Dates'}
              fill
              sizes="112px"
              quality={75}
              className="object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT_INSTANT}
            transition={{ duration: 0.35, delay: 0.16, ease: BRAND_EASE }}
            className="relative h-28 w-28"
          >
            <PremiumImage
              src={SECTION_IMAGES.orangesIsolated}
              alt={isAr ? 'برتقال' : 'Oranges'}
              fill
              sizes="112px"
              quality={75}
              className="object-contain"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
