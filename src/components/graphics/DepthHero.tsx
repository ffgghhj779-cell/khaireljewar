'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PremiumImage from '@/components/ui/PremiumImage'
import { BRAND_EASE } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'
import Container from '@/components/ui/Container'

/** Light cinematic page hero — image + soft parallax only */
export default function DepthHero({
  lang,
  src,
  alt,
  eyebrow,
  title,
  subtitle,
  minHeightClass = 'min-h-[50vh] md:min-h-[62vh]',
}: {
  lang: string
  src: string
  alt: string
  eyebrow: string
  title: string
  subtitle?: string
  minHeightClass?: string
}) {
  const isAr = lang === 'ar'
  const light = useLightMotion()
  const reduce = useReducedMotion()
  const skip = light || !!reduce
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.1])

  return (
    <section ref={ref} className={cn('relative overflow-hidden bg-dark', minHeightClass)}>
      <motion.div className="absolute inset-0" style={skip ? undefined : { y: imgY, scale: imgScale }}>
        <PremiumImage src={src} alt={alt} fill priority sizes="100vw" quality={88} className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/15" />

      <Container size="large" className={cn('relative z-10 flex items-end pb-14 md:pb-20', minHeightClass)}>
        <div className="max-w-3xl">
          <motion.p
            initial={skip ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: BRAND_EASE }}
            className={cn('text-white/70 text-sm font-medium mb-3', isAr ? 'font-arabic' : 'font-sans')}
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={skip ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: BRAND_EASE }}
            className={cn(
              'text-4xl md:text-6xl font-bold text-white tracking-tight editorial-heading mb-4',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={skip ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: BRAND_EASE }}
              className={cn('text-white/70 text-base md:text-lg max-w-xl', isAr ? 'font-arabic' : 'font-sans')}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  )
}
