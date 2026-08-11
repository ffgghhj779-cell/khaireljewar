'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import PremiumImage from '@/components/ui/PremiumImage'

const HERO_VIDEO_WEBM = '/videos/hero.webm'
const HERO_VIDEO_MP4 = '/videos/hero.mp4'
const HERO_POSTER = '/images/brand/hero-reel/warehouse.png'

/**
 * Full-bleed cinematic backdrop — dedicated hero reel (webm/mp4),
 * static poster when reduced-motion is on; pauses when off-screen.
 */
export default function HeroLivingBackdrop({ alt }: { alt: string }) {
  const reduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion) return
    const video = videoRef.current
    const root = rootRef.current
    if (!video || !root) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(root)
    return () => io.disconnect()
  }, [reduceMotion])

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-primary">
      {reduceMotion ? (
        <PremiumImage
          src={HERO_POSTER}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-center"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          aria-label={alt}
        >
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
        </video>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-secondary/50" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/65 via-transparent to-primary/30" aria-hidden />
    </div>
  )
}
