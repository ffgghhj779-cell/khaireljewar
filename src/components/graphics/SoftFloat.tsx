'use client'

import type { ReactNode } from 'react'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

/** Soft float — disabled on mobile / reduced-motion for smoother scroll */
export default function SoftFloat({
  children,
  className,
  speed = 'normal',
}: {
  children: ReactNode
  className?: string
  speed?: 'slow' | 'normal' | 'delay'
}) {
  const light = useLightMotion()

  if (light) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      className={cn(
        speed === 'slow' && 'soft-float-slow',
        speed === 'delay' && 'soft-float-delay',
        speed === 'normal' && 'soft-float',
        className
      )}
    >
      {children}
    </div>
  )
}
