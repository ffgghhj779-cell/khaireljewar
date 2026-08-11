'use client'

import { useReducedMotion } from 'framer-motion'
import PremiumImage from '@/components/ui/PremiumImage'

const HERO_VIDEO_WEBM = '/videos/hero.webm'
const HERO_VIDEO_MP4 = '/videos/hero.mp4'
const HERO_POSTER = '/images/brand/hero-reel/warehouse.png'

/**
 * Full-bleed cinematic backdrop — dedicated hero reel (webm/mp4),
 * static poster when reduced-motion is on.
 */
export default function HeroLivingBackdrop({ alt }: { alt: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden bg-primary" aria-hidden>
      {reduceMotion ? (
        <PremiumImage
          src={HERO_POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-center"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
        >
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
        </video>
      )}

      {/* Forest → mustard cinematic wash for readable cream type */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-secondary/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-transparent to-primary/30" />
      <span className="sr-only">{alt}</span>
    </div>
  )
}
