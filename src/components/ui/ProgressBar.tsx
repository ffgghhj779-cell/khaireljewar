'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface ProgressBarProps {
  value: number
  label?: string
  showValue?: boolean
  color?: 'primary' | 'secondary' | 'green' | 'blue'
  size?: 'sm' | 'md'
  className?: string
}

const COLORS = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
}

export default function ProgressBar({
  value,
  label,
  showValue = true,
  color = 'primary',
  size = 'sm',
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>}
          {showValue && <span className="text-[10px] font-mono font-bold text-dark">{clamped}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <motion.div
          className={cn('h-full rounded-full', COLORS[color])}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
