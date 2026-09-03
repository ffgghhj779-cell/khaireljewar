'use client'

import { motion } from 'framer-motion'
import PremiumImage from '@/components/ui/PremiumImage'
import SoftFloat from '@/components/graphics/SoftFloat'
import BotanicalMotif from '@/components/graphics/BotanicalMotif'
import Container from '@/components/ui/Container'
import { SECTION_IMAGES } from '@/lib/constants/images'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

type Pack = {
  key: string
  src: string
  altAr: string
  altEn: string
  labelAr: string
  labelEn: string
}

const PACKS: Pack[] = [
  {
    key: 'rice',
    src: SECTION_IMAGES.packRice,
    altAr: 'كيس أرز خير الجوار — 1 كجم',
    altEn: 'Khair Aljewar long-grain rice — 1 kg',
    labelAr: 'أرز',
    labelEn: 'Rice',
  },
  {
    key: 'tomatoes',
    src: SECTION_IMAGES.packTomatoes,
    altAr: 'كرتون طماطم خير الجوار',
    altEn: 'Khair Aljewar tomato crate',
    labelAr: 'طماطم',
    labelEn: 'Tomatoes',
  },
  {
    key: 'sugar',
    src: SECTION_IMAGES.packSugar,
    altAr: 'كيس سكر خير الجوار — 1 كجم',
    altEn: 'Khair Aljewar white sugar — 1 kg',
    labelAr: 'سكر',
    labelEn: 'Sugar',
  },
]

const KITCHEN: Pack[] = [
  {
    key: 'fries',
    src: SECTION_IMAGES.packFries,
    altAr: 'بطاطس شرائح مجمدة — خير الجوار',
    altEn: 'Khair Aljewar frozen potato strips',
    labelAr: 'بطاطس شرائح',
    labelEn: 'Potato strips',
  },
  {
    key: 'oil',
    src: SECTION_IMAGES.packOil,
    altAr: 'زيت نباتي خير الجوار — 1 لتر',
    altEn: 'Khair Aljewar vegetable oil — 1 L',
    labelAr: 'زيت نباتي',
    labelEn: 'Vegetable oil',
  },
  {
    key: 'chicken',
    src: SECTION_IMAGES.packChicken,
    altAr: 'دجاج مبرد فريش — خير الجوار',
    altEn: 'Khair Aljewar chilled chicken',
    labelAr: 'دجاج مبرد',
    labelEn: 'Chilled chicken',
  },
]

function PackFigure({
  pack,
  isAr,
  hero,
  delay,
  lightMotion,
}: {
  pack: Pack
  isAr: boolean
  hero?: boolean
  delay: number
  lightMotion: boolean
}) {
  const image = (
    <div className={cn('relative w-full', hero ? 'aspect-[5/4]' : 'aspect-[4/5]')}>
      <PremiumImage
        src={pack.src}
        alt={isAr ? pack.altAr : pack.altEn}
        fill
        sizes={hero ? '(max-width: 768px) 92vw, 420px' : '(max-width: 768px) 44vw, 220px'}
        quality={90}
        className="object-contain drop-shadow-[0_22px_36px_rgba(26,51,42,0.14)]"
      />
    </div>
  )

  return (
    <motion.figure
      initial={lightMotion ? false : { opacity: 0, y: 16 }}
      whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={SCROLL_VIEWPORT_INSTANT}
      transition={{ duration: 0.5, delay: lightMotion ? 0 : delay, ease: BRAND_EASE }}
      className="flex flex-col items-center"
    >
      {hero && !lightMotion ? <SoftFloat className="w-full">{image}</SoftFloat> : image}
      <figcaption
        className={cn(
          'mt-3 text-sm font-semibold text-primary/80 md:mt-4 md:text-base',
          isAr ? 'font-arabic' : 'font-display'
        )}
      >
        {isAr ? pack.labelAr : pack.labelEn}
      </figcaption>
    </motion.figure>
  )
}

export default function BrandPackaging({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const rice = PACKS[0]
  const tomatoes = PACKS[1]
  const sugar = PACKS[2]

  return (
    <section className="relative z-0 overflow-hidden bg-cream-soft py-12 md:py-32">
      <BotanicalMotif
        kind="leaf"
        tone="soft"
        className="absolute top-10 start-[6%] hidden h-16 w-12 opacity-25 md:block soft-float-slow"
      />
      <BotanicalMotif
        kind="stem"
        tone="soft"
        className="absolute bottom-12 end-[8%] hidden h-24 w-10 opacity-20 lg:block soft-float"
      />

      <Container size="large" className="relative z-10">
        <motion.div
          initial={lightMotion ? false : { opacity: 0, y: 14 }}
          whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT_INSTANT}
          transition={{ duration: 0.5, ease: BRAND_EASE }}
          className="mx-auto mb-10 max-w-xl text-center md:mb-16"
        >
          <p className={cn('mb-2.5 text-primary font-semibold', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? 'التغليف' : 'Packaging'}
          </p>
          <h2
            className={cn(
              'mb-4 text-[clamp(2.15rem,5vw,3.75rem)] font-medium leading-[1.1] tracking-tight text-primary text-balance',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'الاسم يصل مع الشحنة.' : 'The name travels with the goods.'}
          </h2>
          <p
            className={cn(
              'mx-auto max-w-md text-sm leading-relaxed text-primary/65 md:text-base',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr
              ? 'كرتون وأكياس وخطوط المطبخ — الاسم واضح قبل ما تتفتح العلبة.'
              : 'Cartons, bags, and kitchen lines — the mark is clear before the pack is opened.'}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 items-end gap-x-4 gap-y-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)_minmax(0,0.9fr)] md:gap-x-10 lg:gap-x-14">
          <div className="col-span-2 md:col-span-1 md:col-start-2 md:row-start-1">
            <PackFigure pack={tomatoes} isAr={isAr} hero delay={0.08} lightMotion={lightMotion} />
          </div>
          <div className="md:col-start-1 md:row-start-1">
            <PackFigure pack={rice} isAr={isAr} delay={0.14} lightMotion={lightMotion} />
          </div>
          <div className="md:col-start-3 md:row-start-1">
            <PackFigure pack={sugar} isAr={isAr} delay={0.2} lightMotion={lightMotion} />
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 items-end gap-3 md:mt-16 md:gap-10">
          {KITCHEN.map((pack, i) => (
            <PackFigure key={pack.key} pack={pack} isAr={isAr} delay={0.1 + i * 0.06} lightMotion={lightMotion} />
          ))}
        </div>
      </Container>
    </section>
  )
}
