'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: string
  className?: string
}

export default function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const numericMatch = value.match(/[\d,]+/)
    if (!numericMatch) {
      setDisplay(value)
      return
    }
    const target = parseInt(numericMatch[0].replace(/,/g, ''), 10)
    const suffix = value.replace(numericMatch[0], '')
    const duration = 1500
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(target * eased)
      setDisplay(current.toLocaleString() + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <motion.span ref={ref} className={className} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}>
      {display}
    </motion.span>
  )
}
