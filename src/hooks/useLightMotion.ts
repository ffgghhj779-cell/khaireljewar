'use client'

import { useReducedMotion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'

/** Mobile + reduced-motion: skip heavy scroll reveals and page transitions */
export function useLightMotion() {
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()
  return isMobile || !!reduceMotion
}
