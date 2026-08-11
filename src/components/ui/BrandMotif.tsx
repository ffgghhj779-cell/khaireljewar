'use client'

import { cn } from '@/lib/utils/cn'

/**
 * Signature Hijazi / Red Sea motif — geometric arches + wave.
 * Use as section accent, never as product imagery.
 */
export default function BrandMotif({
  className,
  variant = 'mark',
}: {
  className?: string
  variant?: 'mark' | 'divider' | 'corner'
}) {
  if (variant === 'divider') {
    return (
      <div className={cn('flex items-center justify-center gap-3 py-2', className)} aria-hidden>
        <span className="h-px flex-1 max-w-[4rem] bg-gradient-to-r from-transparent to-secondary/50" />
        <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
          <path
            d="M2 12C6 4 10 4 14 12C18 4 22 4 26 12"
            stroke="#D4AE4A"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <span className="h-px flex-1 max-w-[4rem] bg-gradient-to-l from-transparent to-secondary/50" />
      </div>
    )
  }

  if (variant === 'corner') {
    return (
      <svg
        className={cn('pointer-events-none text-secondary/40', className)}
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
      >
        <path d="M8 56V24C8 14 14 8 24 8H56" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 56V32C16 22 22 16 32 16H56" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    )
  }

  return (
    <svg
      className={cn('text-primary', className)}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      <path
        d="M10 26C13.5 18 16.5 18 20 26C23.5 18 26.5 18 30 26"
        stroke="#D4AE4A"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M14 14C16 11 18 10 20 10C22 10 24 11 26 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
