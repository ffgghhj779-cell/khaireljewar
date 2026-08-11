'use client'

import { cn } from '@/lib/utils/cn'

/** Editorial SVG — Jeddah hub radiating to world lanes */
export default function ExportRoutesDiagram({ lang, className }: { lang: string; className?: string }) {
  const isAr = lang === 'ar'

  return (
    <div className={cn('relative overflow-hidden rounded-3xl bg-primary text-cream', className)}>
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(229,184,74,0.25), transparent 55%), radial-gradient(ellipse 40% 50% at 80% 30%, rgba(247,244,236,0.08), transparent 50%)',
        }}
        aria-hidden
      />
      <svg viewBox="0 0 720 360" className="relative z-[1] h-auto w-full" role="img" aria-label={isAr ? 'مسارات التصدير من جدة' : 'Export routes from Jeddah'}>
        {/* Soft globe arc */}
        <ellipse cx="360" cy="190" rx="260" ry="110" fill="none" stroke="#F7F4EC" strokeOpacity="0.12" strokeWidth="1.5" />
        <ellipse cx="360" cy="190" rx="200" ry="85" fill="none" stroke="#E5B84A" strokeOpacity="0.2" strokeWidth="1.25" />

        {/* Routes from Jeddah */}
        <path d="M290 210 C240 160 180 130 120 115" fill="none" stroke="#E5B84A" strokeWidth="1.75" strokeLinecap="round" className="ka-route-draw" />
        <path d="M300 200 C340 120 420 95 500 100" fill="none" stroke="#F7F4EC" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" className="ka-route-draw" style={{ animationDelay: '0.2s' }} />
        <path d="M310 220 C380 240 480 250 580 230" fill="none" stroke="#F7F4EC" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" className="ka-route-draw" style={{ animationDelay: '0.4s' }} />
        <path d="M295 230 C250 270 200 300 150 310" fill="none" stroke="#E5B84A" strokeOpacity="0.65" strokeWidth="1.5" strokeLinecap="round" className="ka-route-draw" style={{ animationDelay: '0.55s' }} />

        {/* Destination dots */}
        <circle cx="120" cy="115" r="5" fill="#E5B84A" />
        <circle cx="500" cy="100" r="5" fill="#F7F4EC" fillOpacity="0.85" />
        <circle cx="580" cy="230" r="5" fill="#F7F4EC" fillOpacity="0.7" />
        <circle cx="150" cy="310" r="5" fill="#E5B84A" fillOpacity="0.85" />

        {/* Jeddah hub */}
        <circle cx="300" cy="210" r="14" fill="#E5B84A" />
        <circle cx="300" cy="210" r="7" fill="#1A332A" />
        <circle cx="300" cy="210" r="22" fill="none" stroke="#E5B84A" strokeOpacity="0.35" strokeWidth="1.25" className="ka-hub-pulse" />

        <text x="300" y="255" textAnchor="middle" fill="#F7F4EC" fontSize="13" fontFamily="DM Sans, Cairo, sans-serif" fontWeight="600">
          {isAr ? 'جدة' : 'Jeddah'}
        </text>
        <text x="120" y="100" textAnchor="middle" fill="#F7F4EC" fillOpacity="0.7" fontSize="11" fontFamily="DM Sans, Cairo, sans-serif">
          {isAr ? 'أوروبا' : 'Europe'}
        </text>
        <text x="500" y="85" textAnchor="middle" fill="#F7F4EC" fillOpacity="0.7" fontSize="11" fontFamily="DM Sans, Cairo, sans-serif">
          {isAr ? 'آسيا' : 'Asia'}
        </text>
        <text x="580" y="255" textAnchor="middle" fill="#F7F4EC" fillOpacity="0.7" fontSize="11" fontFamily="DM Sans, Cairo, sans-serif">
          {isAr ? 'الخليج' : 'GCC'}
        </text>
        <text x="150" y="335" textAnchor="middle" fill="#F7F4EC" fillOpacity="0.7" fontSize="11" fontFamily="DM Sans, Cairo, sans-serif">
          {isAr ? 'أفريقيا' : 'Africa'}
        </text>
      </svg>
    </div>
  )
}
