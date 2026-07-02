'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface SparklineProps {
  data: number[]
  positive?: boolean
  className?: string
  width?: number
  height?: number
}

export default function Sparkline({ data, positive = true, className, width = 64, height = 24 }: SparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * (height - 4) - 2
      return `${x},${y}`
    })
    .join(' ')

  const color = positive ? '#00C9D7' : '#EF4444'

  return (
    <svg width={width} height={height} className={cn('shrink-0', className)} viewBox={`0 0 ${width} ${height}`}>
      <motion.polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <circle cx={width} cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2} r="2" fill={color} />
    </svg>
  )
}
