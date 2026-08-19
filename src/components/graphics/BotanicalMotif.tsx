'use client'

import { cn } from '@/lib/utils/cn'

type MotifKind = 'leaf' | 'orange' | 'date' | 'berry' | 'palm' | 'stem' | 'cluster'

/**
 * Botanical SVGs — Hijazi / harvest accents for Khair Aljaar (palm, date, citrus).
 * Pure SVG, almost zero cost.
 */
export default function BotanicalMotif({
  kind = 'leaf',
  className,
  tone = 'forest',
}: {
  kind?: MotifKind
  className?: string
  tone?: 'forest' | 'cream' | 'mustard' | 'soft' | 'farm'
}) {
  const color =
    tone === 'cream'
      ? '#F7F4EC'
      : tone === 'mustard'
        ? '#E5B84A'
        : tone === 'soft'
          ? '#8FB09F'
          : tone === 'farm'
            ? '#C5D9B8'
            : '#1A332A'

  const common = cn('pointer-events-none select-none', className)

  if (kind === 'orange') {
    return (
      <svg className={common} viewBox="0 0 80 80" fill="none" aria-hidden>
        <circle cx="40" cy="42" r="26" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.6" />
        <path d="M40 18c0 8 6 12 12 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M40 18c-2-6 2-10 8-10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M28 40c4 2 8 2 12 0M34 50c3 1.5 6 1.5 9 0" stroke={color} strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'date') {
    return (
      <svg className={common} viewBox="0 0 64 80" fill="none" aria-hidden>
        <ellipse cx="32" cy="46" rx="14" ry="22" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.5" />
        <path d="M32 24v-8M28 18c2-4 6-6 10-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M26 40c4 2 8 2 12 0M28 52c3 1.5 6 1.5 8 0" stroke={color} strokeOpacity="0.4" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'berry') {
    return (
      <svg className={common} viewBox="0 0 72 72" fill="none" aria-hidden>
        <circle cx="28" cy="40" r="12" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="1.4" />
        <circle cx="44" cy="36" r="11" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.4" />
        <circle cx="36" cy="50" r="10" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.3" />
        <path d="M36 18c0 8 4 12 10 14M36 18c-1-5 2-8 7-8" stroke={color} strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'palm') {
    return (
      <svg className={common} viewBox="0 0 90 90" fill="none" aria-hidden>
        <path
          d="M45 78V42M45 48c-14-6-22-18-24-30M45 52c14-6 22-18 24-30M45 56c-10-2-18-10-22-20M45 56c10-2 18-10 22-20"
          stroke={color}
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="45" cy="40" r="3" fill={color} fillOpacity="0.35" />
      </svg>
    )
  }

  if (kind === 'stem') {
    return (
      <svg className={common} viewBox="0 0 40 100" fill="none" aria-hidden>
        <path d="M20 96C18 70 10 52 20 28C28 10 26 4 20 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 40c-10-2-14-10-12-18M20 58c10-2 14-10 12-18" stroke={color} strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'cluster') {
    return (
      <svg className={common} viewBox="0 0 120 100" fill="none" aria-hidden>
        <path d="M20 70c8-18 18-22 30-8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="28" cy="58" r="10" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.3" />
        <circle cx="46" cy="50" r="12" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.3" />
        <path d="M78 30c0 10 6 16 14 18" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="88" cy="52" r="16" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.4" />
        <path d="M88 36c-2-8 2-12 8-12" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
        <path d="M60 82c6-4 12-4 18 0" stroke={color} strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }

  /* leaf default */
  return (
    <svg className={common} viewBox="0 0 72 88" fill="none" aria-hidden>
      <path
        d="M36 80C20 62 14 40 22 22C28 10 36 8 36 8s8 2 14 14c8 18 2 40-14 58Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M36 78V20" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M36 36c-8 2-12 8-14 14M36 48c8 2 12 8 14 14" stroke={color} strokeOpacity="0.45" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

/** Decorative corner cluster for cream/green sections */
export function BotanicalCorners({
  tone = 'forest',
  className,
}: {
  tone?: 'forest' | 'cream' | 'soft'
  className?: string
}) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <BotanicalMotif
        kind="palm"
        tone={tone}
        className="absolute -top-2 -start-3 w-24 h-24 md:w-32 md:h-32 opacity-40 soft-float-slow"
      />
      <BotanicalMotif
        kind="cluster"
        tone={tone}
        className="absolute -bottom-4 -end-2 w-28 h-24 md:w-36 md:h-28 opacity-35 soft-float"
      />
      <BotanicalMotif
        kind="berry"
        tone={tone}
        className="absolute top-1/3 -end-1 w-14 h-14 md:w-16 md:h-16 opacity-30 soft-float-delay"
      />
    </div>
  )
}
