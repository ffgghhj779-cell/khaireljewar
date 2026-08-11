'use client'

import { cn } from '@/lib/utils/cn'

/** Soft organic brand orbs — Chobani-like graphic atmosphere */
export default function BrandOrbs({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className="absolute -top-24 -end-20 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl animate-float" />
      <div
        className="absolute -bottom-32 -start-16 h-[22rem] w-[22rem] rounded-full bg-secondary/15 blur-3xl animate-float"
        style={{ animationDelay: '1.2s' }}
      />
      <div className="absolute top-1/3 start-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/5 blur-2xl" />
    </div>
  )
}
