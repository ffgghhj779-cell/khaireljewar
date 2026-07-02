'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface RouteMapProps {
  lang: string
}

const ROUTES = [
  { id: 'alex', x: 42, y: 38, label: { en: 'Alexandria', ar: 'الإسكندرية' }, active: true },
  { id: 'dam', x: 48, y: 32, label: { en: 'Damietta', ar: 'دمياط' }, active: true },
  { id: 'rot', x: 18, y: 22, label: { en: 'Rotterdam', ar: 'روتردام' }, active: false },
  { id: 'jeb', x: 62, y: 42, label: { en: 'Jebel Ali', ar: 'جبل علي' }, active: false },
  { id: 'jed', x: 58, y: 38, label: { en: 'Jeddah', ar: 'جدة' }, active: false },
  { id: 'lag', x: 12, y: 52, label: { en: 'Lagos', ar: 'لاغوس' }, active: false },
]

const CONNECTIONS = [
  { from: 'alex', to: 'rot' },
  { from: 'alex', to: 'jeb' },
  { from: 'dam', to: 'jed' },
  { from: 'alex', to: 'lag' },
]

export default function RouteMap({ lang }: RouteMapProps) {
  const isAr = lang === 'ar'

  const getPoint = (id: string) => ROUTES.find((r) => r.id === id)!

  return (
    <div className="relative glass-panel rounded-2xl border border-gray-200 p-6 overflow-hidden">
      <div className="absolute inset-0 industrial-grid-dense opacity-30 pointer-events-none" />
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <span className="terminal-badge terminal-badge-live mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {isAr ? 'شبكة التصدير المباشرة' : 'Live Export Network'}
          </span>
          <h3 className={cn('text-lg font-bold text-dark', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'مسارات الشحن النشطة' : 'Active Shipping Lanes'}
          </h3>
        </div>
        <div className="text-end">
          <div className="text-2xl font-black text-primary">40+</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase">{isAr ? 'ميناء' : 'Ports'}</div>
        </div>
      </div>

      <svg viewBox="0 0 100 60" className="w-full h-auto relative z-10" style={{ minHeight: 280 }}>
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C9D7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00C9D7" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {CONNECTIONS.map((conn, i) => {
          const from = getPoint(conn.from)
          const to = getPoint(conn.to)
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#routeGrad)"
              strokeWidth="0.4"
              strokeDasharray="2 1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            />
          )
        })}

        {ROUTES.map((point, i) => (
          <g key={point.id}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={point.active ? 2.5 : 1.8}
              fill={point.active ? '#00C9D7' : '#CED4DA'}
              stroke="#fff"
              strokeWidth="0.5"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
            />
            {point.active && (
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={4}
                fill="none"
                stroke="#00C9D7"
                strokeWidth="0.3"
                opacity="0.5"
                animate={{ r: [4, 6, 4], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <text
              x={point.x}
              y={point.y + 4}
              textAnchor="middle"
              className="text-[2.5px] font-bold fill-dark"
              style={{ fontFamily: 'system-ui' }}
            >
              {isAr ? point.label.ar : point.label.en}
            </text>
          </g>
        ))}
      </svg>

      <div className="grid grid-cols-3 gap-3 mt-4 relative z-10">
        {[
          { label: isAr ? 'شحنات نشطة' : 'Active Lanes', value: '12' },
          { label: isAr ? 'متوسط العبور' : 'Avg Transit', value: '14d' },
          { label: isAr ? 'معدل التسليم' : 'On-Time Rate', value: '98.4%' },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-2 bg-white/60 rounded-lg border border-gray-200">
            <div className="text-lg font-black text-dark font-mono">{stat.value}</div>
            <div className="text-[9px] font-bold text-gray-500 uppercase">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
