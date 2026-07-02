'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe2, Ship, Anchor } from 'lucide-react'
import Container from '@/components/ui/Container'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { SCROLL_VIEWPORT, SPRING_HOVER } from '@/lib/constants/motion'
import { cn } from '@/lib/utils/cn'

const ROUTES = [
  { id: 'gcc', d: 'M 320 280 Q 380 220 440 200', label: 'GCC', labelAr: 'الخليج' },
  { id: 'eu', d: 'M 320 280 Q 200 180 120 140', label: 'Europe', labelAr: 'أوروبا' },
  { id: 'af', d: 'M 320 280 Q 280 360 240 400', label: 'Africa', labelAr: 'أفريقيا' },
]

const STATS = [
  { value: '15+', labelEn: 'Export Countries', labelAr: 'دولة تصدير' },
  { value: '50,000+', labelEn: 'Tons Exported Annually', labelAr: 'طن تصدير سنوياً' },
  { value: '40+', labelEn: 'Global Partner Ports', labelAr: 'ميناء شريك' },
  { value: '100%', labelEn: 'Cold-Chain Integrity', labelAr: 'سلسلة تبريد' },
]

const HUBS = [
  { cx: 320, cy: 280, name: 'Egypt', nameAr: 'مصر', primary: true },
  { cx: 440, cy: 200, name: 'Dubai', nameAr: 'دبي' },
  { cx: 120, cy: 140, name: 'Rotterdam', nameAr: 'روتردام' },
  { cx: 240, cy: 400, name: 'Lagos', nameAr: 'لاغوس' },
]

export default function GlobalFootprint({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, SCROLL_VIEWPORT)

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden border-y border-gray-200 bg-white/60 backdrop-blur-sm"
    >
      <div className="absolute inset-0 industrial-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <Container size="large" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="terminal-badge terminal-badge-live mb-5">
            <Globe2 className="w-3.5 h-3.5" />
            {isAr ? 'الشبكة العالمية' : 'Global Network'}
          </span>
          <h2
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-black text-dark tracking-tight editorial-heading mb-5',
              isAr ? 'font-ibm-arabic' : 'font-manrope'
            )}
          >
            {isAr ? 'بصمتنا العالمية وشبكة التصدير' : 'Global Footprint & Export Network'}
          </h2>
          <p className={cn('text-lg text-gray-600 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr
              ? 'من موانئ الإسكندرية وبورسعيد إلى الخليج وأوروبا — لوجستيات دقيقة لسلاسل التوريد B2B.'
              : 'From Alexandria & Port Said to the GCC and Europe — precision logistics for enterprise B2B supply chains.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={SCROLL_VIEWPORT}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 md:p-10 shadow-soft overflow-hidden will-change-transform"
          >
            <div className="absolute top-4 end-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <Ship className="w-3.5 h-3.5 text-primary" />
              {isAr ? 'مسارات حية' : 'Live Routes'}
            </div>

            <svg viewBox="0 0 520 480" className="w-full h-auto rtl-flip" aria-hidden>
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00C9D7" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#00C9D7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FF8A00" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Stylized land masses */}
              <ellipse cx="320" cy="300" rx="140" ry="90" fill="#0D1B2A" opacity="0.04" />
              <ellipse cx="130" cy="150" rx="80" ry="60" fill="#0D1B2A" opacity="0.05" />
              <ellipse cx="450" cy="190" rx="70" ry="50" fill="#0D1B2A" opacity="0.05" />

              {ROUTES.map((route, i) => (
                <motion.path
                  key={route.id}
                  d={route.d}
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 1.4, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}

              {HUBS.map((hub, i) => (
                <g key={hub.name}>
                  <motion.circle
                    cx={hub.cx}
                    cy={hub.cy}
                    r={hub.primary ? 10 : 6}
                    fill={hub.primary ? '#00C9D7' : '#0D1B2A'}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ ...SPRING_HOVER, delay: 0.5 + i * 0.08 }}
                    style={{ transformOrigin: `${hub.cx}px ${hub.cy}px` }}
                  />
                  {hub.primary && (
                    <motion.circle
                      cx={hub.cx}
                      cy={hub.cy}
                      r={18}
                      fill="none"
                      stroke="#00C9D7"
                      strokeWidth="1"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={isInView ? { scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] } : {}}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <text
                    x={hub.cx}
                    y={hub.cy - (hub.primary ? 22 : 16)}
                    textAnchor="middle"
                    className="fill-dark text-[11px] font-bold"
                    style={{ fontFamily: isAr ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif' }}
                  >
                    {isAr ? hub.nameAr : hub.name}
                  </text>
                </g>
              ))}
            </svg>
          </motion.div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.labelEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={SCROLL_VIEWPORT}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: SPRING_HOVER }}
                className="glass-panel rounded-2xl p-6 border border-gray-200 will-change-transform"
              >
                <Anchor className="w-5 h-5 text-primary mb-3 opacity-80" />
                <AnimatedCounter
                  value={stat.value}
                  className={cn(
                    'text-3xl md:text-4xl font-black text-dark block mb-1 tracking-tight',
                    isAr ? 'font-ibm-arabic' : 'font-manrope'
                  )}
                />
                <p className={cn('text-xs font-bold text-gray-500 uppercase tracking-wide leading-snug', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {isAr ? stat.labelAr : stat.labelEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
