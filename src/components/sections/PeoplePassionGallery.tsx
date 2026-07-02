'use client'

import { useState } from 'react'
import PremiumImage from '@/components/ui/PremiumImage'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Quote } from 'lucide-react'
import { TEAM_GALLERY, type TeamPhoto } from '@/lib/constants/brandAssets'
import { IMAGE_BLUR_DATA_URL } from '@/lib/constants/images'
import { SCROLL_VIEWPORT, TAP_SCALE } from '@/lib/constants/motion'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

const QUOTES = {
  en: [
    'Every orange you export carries the story of a farm, a family, and a season of hard work.',
    'Quality is not what you inspect — it is what you plant, nurture, and protect.',
    'Our cold chain is only as strong as the people who build it, every single morning.',
  ],
  ar: [
    'كل برتقالة تُصدّرها تحمل قصة مزرعة، وعائلة، وموسم من العمل الشاق.',
    'الجودة ليست ما تفحصه — بل ما تزرعه وترعاه وتحميه.',
    'سلسلة التبريد لدينا لا تكون قوية إلا بقوة الأشخاص الذين يبنونها كل صباح.',
  ],
}

export default function PeoplePassionGallery({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const [lightbox, setLightbox] = useState<TeamPhoto | null>(null)
  const quotes = isAr ? QUOTES.ar : QUOTES.en

  return (
    <section className="py-20 md:py-28 bg-gray-50 border-t border-gray-100">
      <Container size="large">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="terminal-badge mb-4">
            {isAr ? 'الناس والشغف' : 'People & Passion'}
          </span>
          <h2 className={cn('text-3xl md:text-5xl font-black text-dark tracking-tight mb-4 editorial-heading', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'وجوه خلف الشحنة' : 'The Faces Behind Every Shipment'}
          </h2>
          <p className={cn('text-base md:text-lg text-gray-500 max-w-xl leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr
              ? 'من الحقل إلى الميناء — العاملون والمزارعون الذين يمثلون وعدنا للجودة.'
              : 'From field to port — the workers and agronomists who embody our promise of quality.'}
          </p>
        </motion.div>

        {/* Pull-quote strip */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-panel rounded-2xl border border-gray-200 p-5 relative overflow-hidden"
            >
              <Quote className="w-8 h-8 text-primary/15 absolute top-4 start-4" />
              <p className={cn('text-sm text-gray-600 leading-relaxed ps-6', isAr ? 'font-ibm-arabic text-right' : 'font-inter')}>
                {q}
              </p>
              <div className="w-8 h-0.5 bg-primary rounded-full mt-4" />
            </motion.div>
          ))}
        </div>

        {/* Magazine-grid gallery — 3 photos: hero left + 2 stacked right */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:grid-rows-2">
          {TEAM_GALLERY.map((photo, i) => {
            const isHero = i === 0
            return (
              <motion.button
                key={photo.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={SCROLL_VIEWPORT}
                transition={{ duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={TAP_SCALE}
                onClick={() => setLightbox(photo)}
                className={cn(
                  'group relative overflow-hidden rounded-2xl text-start will-change-transform',
                  isHero
                    ? 'col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[440px]'
                    : 'col-span-1 aspect-[3/4] md:min-h-[210px]'
                )}
              >
                <PremiumImage
                  src={photo.src}
                  alt={photo.captionEn}
                  fill
                  sizes={isHero ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
                  className="object-cover will-change-transform group-hover:scale-[1.04] transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-400" />

                <div className="absolute bottom-0 inset-x-0 p-3 md:p-4">
                  <span className={cn('text-primary text-[9px] font-bold uppercase tracking-widest block mb-0.5', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                    {isAr ? photo.roleAr : photo.roleEn}
                  </span>
                  <p className={cn('text-white font-bold text-xs md:text-sm leading-snug line-clamp-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                    {isAr ? photo.captionAr : photo.captionEn}
                  </p>
                  <p className={cn('text-white/55 text-[10px] mt-0.5', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                    {photo.location}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 bg-dark/80 backdrop-blur-lg z-[150]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="fixed inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 z-[151] w-full sm:max-w-md rounded-3xl overflow-hidden shadow-2xl will-change-transform"
            >
              <div className="relative aspect-[4/3]">
                <PremiumImage
                  src={lightbox.src}
                  alt={lightbox.captionEn}
                  fill
                  sizes="(max-width: 480px) 100vw, 480px"
                  className="object-cover"
                  priority
                />
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="absolute top-3 end-3 w-9 h-9 rounded-xl bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-white p-5">
                <span className={cn('text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {isAr ? lightbox.roleAr : lightbox.roleEn}
                </span>
                <p className={cn('font-bold text-dark text-sm leading-snug', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                  {isAr ? lightbox.captionAr : lightbox.captionEn}
                </p>
                <p className="text-gray-500 text-xs mt-1">{lightbox.location}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
