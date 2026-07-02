'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Tag } from 'lucide-react'
import { LOGISTICS_GALLERY, type LogisticsPhoto } from '@/lib/constants/brandAssets'
import { IMAGE_BLUR_DATA_URL } from '@/lib/constants/images'
import { SCROLL_VIEWPORT, TAP_SCALE } from '@/lib/constants/motion'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

const TAG_COLORS: Record<LogisticsPhoto['tag'], string> = {
  'Cold Chain': 'bg-sky-900/80 text-sky-200 border-sky-700/50',
  'Port Ops': 'bg-indigo-900/80 text-indigo-200 border-indigo-700/50',
  'Warehouse': 'bg-amber-900/80 text-amber-200 border-amber-700/50',
  'Transport': 'bg-emerald-900/80 text-emerald-200 border-emerald-700/50',
  'Farm Gate': 'bg-lime-900/80 text-lime-200 border-lime-700/50',
}

export default function LogisticsEditorialGallery({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const [lightbox, setLightbox] = useState<LogisticsPhoto | null>(null)
  const [activeTag, setActiveTag] = useState<LogisticsPhoto['tag'] | 'All'>('All')

  const tags: Array<LogisticsPhoto['tag'] | 'All'> = [
    'All', 'Port Ops', 'Cold Chain', 'Warehouse', 'Transport', 'Farm Gate'
  ]

  const filtered = activeTag === 'All'
    ? LOGISTICS_GALLERY
    : LOGISTICS_GALLERY.filter((p) => p.tag === activeTag)

  return (
    <section className="py-20 md:py-28 bg-dark relative overflow-x-clip">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 industrial-grid opacity-10 pointer-events-none" />

      <Container size="large">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/15 rounded-md bg-white/5 text-white/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {isAr ? 'محطة العمليات' : 'Operations Terminal'}
          </span>
          <h2 className={cn('text-3xl md:text-5xl font-black text-white tracking-tight mb-4 editorial-heading', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'اللوجستيات في الميدان' : 'Logistics in the Field'}
          </h2>
          <p className={cn('text-base text-white/55 max-w-xl leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr
              ? 'لحظات حقيقية من عمليات التصدير — الموانئ، الحاويات، المستودعات، والطريق.'
              : 'Real moments from our export operations — ports, containers, packhouses, and the road.'}
          </p>
        </motion.div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <motion.button
              key={tag}
              type="button"
              whileTap={TAP_SCALE}
              onClick={() => setActiveTag(tag)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 touch-manipulation',
                activeTag === tag
                  ? 'bg-primary text-dark border-primary'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
              )}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, i) => (
              <motion.button
                key={photo.id}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={TAP_SCALE}
                onClick={() => setLightbox(photo)}
                className={cn(
                  'group relative overflow-hidden rounded-2xl text-start will-change-transform',
                  photo.span === 2 ? 'col-span-2' : 'col-span-1',
                  photo.span === 2 ? 'aspect-[16/7]' : 'aspect-[4/3]'
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.titleEn}
                  fill
                  sizes={photo.span === 2 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
                  className="object-cover will-change-transform"
                />

                {/* Dark overlay — appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />

                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span
                    className={cn(
                      'self-start mb-2 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest border',
                      TAG_COLORS[photo.tag]
                    )}
                  >
                    <Tag className="w-2.5 h-2.5 inline me-1" />
                    {photo.tag}
                  </span>
                  <h4 className={cn('text-white font-bold text-sm leading-snug mb-1', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                    {isAr ? photo.titleAr : photo.titleEn}
                  </h4>
                  <p className="text-white/60 text-[10px] flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 shrink-0" />
                    {photo.location}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      {/* Full-screen lightbox */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 bg-dark/90 backdrop-blur-lg z-[150]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="fixed inset-4 sm:inset-8 md:inset-12 z-[151] rounded-3xl overflow-hidden shadow-2xl will-change-transform"
            >
              <Image
                src={lightbox.src}
                alt={lightbox.titleEn}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-transparent to-dark/30" />

              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute top-4 end-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/25 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                <span
                  className={cn(
                    'inline-block mb-2 px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border',
                    TAG_COLORS[lightbox.tag]
                  )}
                >
                  {lightbox.tag}
                </span>
                <h3 className={cn('text-white font-black text-xl md:text-2xl mb-1', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                  {isAr ? lightbox.titleAr : lightbox.titleEn}
                </h3>
                <p className="text-white/60 text-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {lightbox.location}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
