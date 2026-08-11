'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

/** Live signature wave — brand motif in motion */
export default function LiveWave({
  className,
  tone = 'gold',
}: {
  className?: string
  tone?: 'gold' | 'green' | 'white'
}) {
  const reduce = useReducedMotion()
  const stroke = tone === 'green' ? '#2A6B5C' : tone === 'white' ? 'rgba(255,255,255,0.55)' : '#D4AE4A'

  return (
    <svg
      className={cn('overflow-visible', className)}
      viewBox="0 0 240 40"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M4 28C40 8 60 8 80 28C100 48 120 48 140 28C160 8 180 8 216 28"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={false}
        animate={
          reduce
            ? undefined
            : {
                d: [
                  'M4 28C40 8 60 8 80 28C100 48 120 48 140 28C160 8 180 8 216 28',
                  'M4 22C40 36 60 36 80 18C100 4 120 4 140 22C160 36 180 36 216 18',
                  'M4 28C40 8 60 8 80 28C100 48 120 48 140 28C160 8 180 8 216 28',
                ],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M4 28C40 8 60 8 80 28C100 48 120 48 140 28C160 8 180 8 216 28"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
        fill="none"
        animate={reduce ? undefined : { pathLength: [0.2, 1, 0.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}
