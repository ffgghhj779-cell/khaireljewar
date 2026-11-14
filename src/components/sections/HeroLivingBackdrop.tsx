'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import PremiumImage from '@/components/ui/PremiumImage'
import { cn } from '@/lib/utils/cn'

const HERO_VIDEO_WEBM = '/videos/hero.webm'
const HERO_VIDEO_MP4 = '/videos/hero.mp4'
const HERO_POSTER = '/images/brand/hero-reel/warehouse.webp'

type NetworkInformation = { saveData?: boolean; effectiveType?: string }

/** The reel is ~4 MB, so it waits for the page’s images and skips data-saver or slow links. */
function canStreamVideo(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (!connection) return true
  if (connection.saveData) return false
  return !['slow-2g', '2g', '3g'].includes(connection.effectiveType ?? '')
}

/**
 * Full-bleed cinematic backdrop: optimized poster first, hero reel after load,
 * static poster only when reduced-motion is on; pauses when off-screen.
 */
export default function HeroLivingBackdrop({ alt }: { alt: string }) {
  const reduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const [mountVideo, setMountVideo] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (reduceMotion || !canStreamVideo()) return
    let idle: number | undefined
    const start = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
      if (w.requestIdleCallback) idle = w.requestIdleCallback(() => setMountVideo(true), { timeout: 2500 })
      else idle = window.setTimeout(() => setMountVideo(true), 1200)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      if (idle !== undefined) {
        const w = window as Window & { cancelIdleCallback?: (id: number) => void }
        if (w.cancelIdleCallback) w.cancelIdleCallback(idle)
        window.clearTimeout(idle)
      }
    }
  }, [reduceMotion])

  useEffect(() => {
    if (!mountVideo) return
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
  }, [mountVideo])

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-primary">
      <PremiumImage
        src={HERO_POSTER}
        alt={alt}
        fill
        priority
        sizes="100vw"
        quality={78}
        className="object-cover object-center"
      />

      {mountVideo && (
        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
            playing ? 'opacity-100' : 'opacity-0'
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onPlaying={() => setPlaying(true)}
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
