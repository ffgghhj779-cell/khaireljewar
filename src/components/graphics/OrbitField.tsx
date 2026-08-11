'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * CSS 3D orbit field — premium depth without WebGL.
 * Tracks pointer via window (never blocks clicks).
 */
export default function OrbitField({ className, variant = 'hero' }: { className?: string; variant?: 'hero' | 'soft' }) {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      const el = rootRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        setOffset({ x: 0, y: 0 })
        return
      }
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setOffset({ x, y })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduce])

  const isHero = variant === 'hero'
  const ring = isHero ? 'border-secondary/30' : 'border-primary/20'
  const ringSoft = isHero ? 'border-white/15' : 'border-secondary/25'

  return (
    <div
      ref={rootRef}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{ perspective: '1200px' }}
      aria-hidden
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${offset.y * -6}deg) rotateY(${offset.x * 8}deg)`,
        }}
      >
        <motion.div
          className={cn('absolute end-[-4%] top-[12%] h-[22rem] w-[22rem] rounded-full border', ring)}
          style={{ transform: 'translateZ(40px)' }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={cn('absolute end-[6%] top-[20%] h-[14rem] w-[14rem] rounded-full border', ringSoft)}
          style={{ transform: 'translateZ(80px)' }}
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 72, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={cn(
            'absolute end-[14%] top-[28%] h-24 w-24 rounded-full blur-2xl',
            isHero ? 'bg-secondary/30' : 'bg-primary/20'
          )}
          style={{ transform: 'translateZ(120px)' }}
          animate={reduce ? undefined : { scale: [1, 1.18, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={cn('absolute start-[8%] bottom-[22%] h-3 w-3 rounded-full', isHero ? 'bg-secondary' : 'bg-primary')}
          style={{ transform: 'translateZ(160px)' }}
          animate={reduce ? undefined : { y: [0, -18, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={cn('absolute start-[18%] bottom-[36%] h-1.5 w-1.5 rounded-full', isHero ? 'bg-white/70' : 'bg-secondary')}
          style={{ transform: 'translateZ(100px)' }}
          animate={reduce ? undefined : { y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <motion.svg
          className="absolute start-[12%] top-[30%] h-10 w-10 text-secondary/50"
          style={{ transform: 'translateZ(90px)' }}
          viewBox="0 0 40 40"
          fill="none"
          animate={reduce ? undefined : { rotate: [0, 12, 0], y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M8 22C13 12 17 12 20 22C23 12 27 12 32 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 12C16 9 18 8 20 8C22 8 24 9 26 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.7" />
        </motion.svg>
      </div>
    </div>
  )
}
