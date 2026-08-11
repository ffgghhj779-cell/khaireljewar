'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

/** Soft scroll reveal — opacity + slight rise only (fast, no blur/3D) */
export default function SoftReveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const light = useLightMotion()
  const reduce = useReducedMotion()
  const skip = light || !!reduce

  return (
    <motion.div
      className={cn(className)}
      initial={skip ? false : { opacity: 0, y }}
      whileInView={skip ? undefined : { opacity: 1, y: 0 }}
      viewport={SCROLL_VIEWPORT_INSTANT}
      transition={{ duration: 0.55, delay, ease: BRAND_EASE }}
    >
      {children}
    </motion.div>
  )
}
