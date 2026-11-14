'use client'

import { cn } from '@/lib/utils/cn'

const INK = '#1A332A'
const LEAF = '#2F5C48'
const GOLD = '#D4A83A'

/** Editorial SVG — Jeddah hub radiating to world lanes */
export default function ExportRoutesDiagram({ lang, className }: { lang: string; className?: string }) {
  const isAr = lang === 'ar'
  const label = { textAnchor: 'middle' as const, fontFamily: 'DM Sans, Cairo, sans-serif' }

  return (
    <div className={cn('relative overflow-hidden rounded-3xl border border-primary/10 bg-white text-primary', className)}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(229,184,74,0.18), transparent 55%), radial-gradient(ellipse 40% 50% at 80% 30%, rgba(43,182,115,0.10), transparent 50%)',
        }}
        aria-hidden
      />
      <svg viewBox="0 0 720 360" className="relative z-[1] h-auto w-full" role="img" aria-label={isAr ? 'مسارات التصدير من جدة' : 'Export routes from Jeddah'}>
        {/* Soft globe arc */}
        <ellipse cx="360" cy="190" rx="260" ry="110" fill="none" stroke={INK} strokeOpacity="0.1" strokeWidth="1.5" />
        <ellipse cx="360" cy="190" rx="200" ry="85" fill="none" stroke={GOLD} strokeOpacity="0.3" strokeWidth="1.25" />

        {/* Routes from Jeddah */}
        <path d="M290 210 C240 160 180 130 120 115" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" className="ka-route-draw" />
        <path d="M300 200 C340 120 420 95 500 100" fill="none" stroke={LEAF} strokeOpacity="0.7" strokeWidth="1.75" strokeLinecap="round" className="ka-route-draw" style={{ animationDelay: '0.2s' }} />
        <path d="M310 220 C380 240 480 250 580 230" fill="none" stroke={LEAF} strokeOpacity="0.55" strokeWidth="1.75" strokeLinecap="round" className="ka-route-draw" style={{ animationDelay: '0.4s' }} />
        <path d="M295 230 C250 270 200 300 150 310" fill="none" stroke={GOLD} strokeOpacity="0.85" strokeWidth="1.75" strokeLinecap="round" className="ka-route-draw" style={{ animationDelay: '0.55s' }} />

        {/* Destination dots */}
        <circle cx="120" cy="115" r="5" fill={GOLD} />
        <circle cx="500" cy="100" r="5" fill={LEAF} />
        <circle cx="580" cy="230" r="5" fill={LEAF} fillOpacity="0.8" />
        <circle cx="150" cy="310" r="5" fill={GOLD} />

        {/* Jeddah hub */}
        <circle cx="300" cy="210" r="14" fill={GOLD} />
        <circle cx="300" cy="210" r="7" fill="#FFFFFF" />
        <circle cx="300" cy="210" r="22" fill="none" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1.25" className="ka-hub-pulse" />

        <text x="300" y="255" {...label} fill={INK} fontSize="13" fontWeight="700">
          {isAr ? 'جدة' : 'Jeddah'}
        </text>
        <text x="120" y="100" {...label} fill={INK} fillOpacity="0.7" fontSize="11">
          {isAr ? 'أوروبا' : 'Europe'}
        </text>
        <text x="500" y="85" {...label} fill={INK} fillOpacity="0.7" fontSize="11">
          {isAr ? 'آسيا' : 'Asia'}
        </text>
        <text x="580" y="255" {...label} fill={INK} fillOpacity="0.7" fontSize="11">
          {isAr ? 'الخليج' : 'GCC'}
        </text>
        <text x="150" y="335" {...label} fill={INK} fillOpacity="0.7" fontSize="11">
          {isAr ? 'أفريقيا' : 'Africa'}
        </text>
      </svg>
    </div>
  )
}
