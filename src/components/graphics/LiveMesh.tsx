'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

type Tone = 'light' | 'dark' | 'hero'

/**
 * Soft live mesh — premium atmospheric motion (not particle spam).
 * Brand greens + harvest gold orbs with gentle drift.
 */
export default function LiveMesh({
  className,
  tone = 'light',
  density = 5,
}: {
  className?: string
  tone?: Tone
  density?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1

    const palette =
      tone === 'hero'
        ? [
            { r: 42, g: 107, b: 92, a: 0.18 },
            { r: 212, g: 174, b: 74, a: 0.14 },
            { r: 247, g: 248, b: 246, a: 0.06 },
          ]
        : tone === 'dark'
          ? [
              { r: 42, g: 107, b: 92, a: 0.28 },
              { r: 212, g: 174, b: 74, a: 0.16 },
              { r: 255, g: 255, b: 255, a: 0.05 },
            ]
          : [
              { r: 42, g: 107, b: 92, a: 0.11 },
              { r: 212, g: 174, b: 74, a: 0.09 },
              { r: 20, g: 40, b: 32, a: 0.04 },
            ]

    const blobs = Array.from({ length: density }, (_, i) => {
      const c = palette[i % palette.length]
      return {
        x: Math.random(),
        y: Math.random(),
        r: 0.18 + Math.random() * 0.28,
        vx: (Math.random() - 0.5) * 0.00012,
        vy: (Math.random() - 0.5) * 0.0001,
        c,
        phase: Math.random() * Math.PI * 2,
      }
    })

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const b of blobs) {
        b.x += b.vx
        b.y += b.vy
        if (b.x < -0.2 || b.x > 1.2) b.vx *= -1
        if (b.y < -0.2 || b.y > 1.2) b.vy *= -1
        const pulse = 1 + Math.sin(t * 0.0006 + b.phase) * 0.08
        const cx = b.x * w
        const cy = b.y * h
        const radius = b.r * Math.min(w, h) * pulse
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        g.addColorStop(0, `rgba(${b.c.r},${b.c.g},${b.c.b},${b.c.a})`)
        g.addColorStop(1, `rgba(${b.c.r},${b.c.g},${b.c.b},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduce, tone, density])

  if (reduce) {
    return <div className={cn('pointer-events-none absolute inset-0', className)} aria-hidden />
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none absolute inset-0', className)}
      aria-hidden
    />
  )
}
