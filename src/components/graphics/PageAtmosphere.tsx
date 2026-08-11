'use client'

import LiveMesh from '@/components/graphics/LiveMesh'
import OrbitField from '@/components/graphics/OrbitField'
import { cn } from '@/lib/utils/cn'

/** Drop-in live atmosphere for interior pages (server-safe via client island) */
export default function PageAtmosphere({
  tone = 'light',
  orbit = false,
  className,
}: {
  tone?: 'light' | 'dark' | 'hero'
  orbit?: boolean
  className?: string
}) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <LiveMesh tone={tone} density={tone === 'hero' ? 5 : 4} />
      {orbit && <OrbitField variant={tone === 'hero' || tone === 'dark' ? 'hero' : 'soft'} />}
      <div className="absolute inset-0 brand-grain opacity-25" />
    </div>
  )
}
