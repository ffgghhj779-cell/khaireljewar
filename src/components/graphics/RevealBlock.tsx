'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

/** Scroll reveal with soft 3D lift — one job: make sections arrive with presence */
export default function RevealBlock({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const light = useLightMotion()
  const reduce = useReducedMotion()
  const skip = light || !!reduce

  return (
    <motion.div
      className={cn(className)}
      initial={skip ? false : { opacity: 0, y: 36, rotateX: 6, filter: 'blur(6px)' }}
      whileInView={skip ? undefined : { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      viewport={SCROLL_VIEWPORT_INSTANT}
      transition={{ duration: 0.85, delay, ease: BRAND_EASE }}
      style={{ transformPerspective: 900, transformOrigin: 'center top' }}
    >
      {children}
    </motion.div>
  )
}
