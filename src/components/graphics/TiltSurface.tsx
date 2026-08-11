'use client'

import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

/**
 * Premium 3D tilt surface for product panels / imagery.
 * Fine pointer only — no fake tilt on touch.
 */
export default function TiltSurface({
  children,
  className,
  maxTilt = 8,
}: {
  children: ReactNode
  className?: string
  maxTilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
  })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const ry = (px - 0.5) * maxTilt * 2
    const rx = (0.5 - py) * maxTilt * 2
    setStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 80ms ease-out',
    })
  }

  const onLeave = () => {
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
    })
  }

  return (
    <div
      ref={ref}
      className={cn('will-change-transform transform-gpu', className)}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
