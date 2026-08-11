'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import PremiumImage from '@/components/ui/PremiumImage'
import BotanicalMotif from '@/components/graphics/BotanicalMotif'
import Container from '@/components/ui/Container'
import { SECTION_IMAGES } from '@/lib/constants/images'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

const SLIDES = {
  en: [
    {
      image: SECTION_IMAGES.editorialBoard,
      category: 'HARVEST · EDITORIAL',
      title: 'Harvest board',
    },
    {
      image: SECTION_IMAGES.medjoolFeature,
      category: 'DATES · PREMIUM',
      title: 'Medjool dates',
    },
    {
      image: SECTION_IMAGES.mangoFeature,
      category: 'FRUITS · SEASONAL',
      title: 'Kent mangoes',
    },
    {
      image: SECTION_IMAGES.hospitality,
      category: 'HOSPITALITY · JEDDAH',
      title: 'Neighborly table',
    },
  ],
  ar: [
    {
      image: SECTION_IMAGES.editorialBoard,
      category: 'حصاد · تحريري',
      title: 'لوحة الحصاد',
    },
    {
      image: SECTION_IMAGES.medjoolFeature,
      category: 'تمور · فاخر',
      title: 'تمر مجدول',
    },
    {
      image: SECTION_IMAGES.mangoFeature,
      category: 'فواكه · موسمي',
      title: 'مانجو كينت',
    },
    {
      image: SECTION_IMAGES.hospitality,
      category: 'ضيافة · جدة',
      title: 'مائدة الجوار',
    },
  ],
}

export default function TrustQuiet({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const slides = SLIDES[isAr ? 'ar' : 'en']
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <section className="relative z-0 overflow-hidden bg-cream py-12 md:py-32">
      <BotanicalMotif
        kind="palm"
        tone="soft"
        className="absolute -top-4 end-[8%] hidden w-28 h-28 opacity-25 md:block soft-float-slow"
      />
      <BotanicalMotif
        kind="date"
        tone="soft"
        className="absolute bottom-10 start-[6%] hidden w-16 h-20 opacity-20 lg:block soft-float"
      />

      <Container size="large">
        <motion.div
          initial={lightMotion ? false : { opacity: 0, y: 14 }}
          whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT_INSTANT}
          transition={{ duration: 0.5, ease: BRAND_EASE }}
          className="mx-auto mb-8 max-w-xl text-center md:mb-16"
        >
          <p className={cn('mb-3 text-primary font-semibold', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? 'من المزرعة إلى المائدة' : 'From farm to table'}
          </p>
          <h2
            className={cn(
              'text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium text-primary leading-[1.1]',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'ثقة تُرى.' : 'Trust you can see.'}
          </h2>
        </motion.div>

        <div className="relative mx-auto flex max-w-lg items-center gap-3 md:gap-6 md:max-w-xl">
          <button
            type="button"
            onClick={prev}
            aria-label={isAr ? 'السابق' : 'Previous'}
            className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/15 text-primary hover:bg-primary hover:text-cream transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft className={cn('h-5 w-5', isAr && 'rotate-180')} />
          </button>

          <motion.article
            key={slide.title}
            initial={lightMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: BRAND_EASE }}
            className="card-lift w-full overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(26,51,42,0.12)]"
          >
            <div className="relative aspect-[5/4] sm:aspect-[4/5] bg-cream overflow-hidden">
              <PremiumImage
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                quality={90}
                className={cn(
                  'transition-transform duration-700 ease-out',
                  'object-contain p-4 md:p-6'
                )}
              />
            </div>
            <div className="bg-primary px-6 py-7 md:px-8 md:py-8">
              <p
                className={cn(
                  'mb-2 text-[10px] uppercase tracking-[0.16em] text-cream/65 font-semibold',
                  isAr ? 'font-arabic normal-case tracking-normal text-xs' : 'font-sans'
                )}
              >
                {slide.category}
              </p>
              <h3
                className={cn(
                  'text-2xl md:text-3xl text-cream font-medium',
                  isAr ? 'font-arabic' : 'font-display'
                )}
              >
                {slide.title}
              </h3>
            </div>
          </motion.article>

          <button
            type="button"
            onClick={next}
            aria-label={isAr ? 'التالي' : 'Next'}
            className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/15 text-primary hover:bg-primary hover:text-cream transition-all duration-300 hover:scale-105"
          >
            <ChevronRight className={cn('h-5 w-5', isAr && 'rotate-180')} />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-1.5" aria-hidden>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                'h-1 rounded-full transition-all duration-400',
                i === index ? 'w-8 bg-primary soft-bar-pulse' : 'w-4 bg-primary/25'
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={prev}
            className="h-10 w-10 rounded-full border border-primary/15 text-primary"
            aria-label={isAr ? 'السابق' : 'Previous'}
          >
            <ChevronLeft className={cn('mx-auto h-5 w-5', isAr && 'rotate-180')} />
          </button>
          <button
            type="button"
            onClick={next}
            className="h-10 w-10 rounded-full border border-primary/15 text-primary"
            aria-label={isAr ? 'التالي' : 'Next'}
          >
            <ChevronRight className={cn('mx-auto h-5 w-5', isAr && 'rotate-180')} />
          </button>
        </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href={`/${lang}/quality`}
              className={cn(
                'magnetic-cta inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-7 font-semibold text-cream hover:bg-primary-700',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'تحميل الشهادات' : 'Download certificates'}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className={cn(
                'magnetic-cta inline-flex min-h-[48px] items-center justify-center rounded-xl border border-primary/20 px-7 font-semibold text-primary hover:bg-primary hover:text-cream',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'اطلب وثيقة محددة' : 'Request a specific doc'}
            </Link>
          </div>
      </Container>
    </section>
  )
}
