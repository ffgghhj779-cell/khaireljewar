'use client'

import { memo, useEffect, useState } from 'react'
import { buildTickerItems, type Product } from '@/lib/data/products'
import Sparkline from '@/components/ui/Sparkline'
import { cn } from '@/lib/utils/cn'

const SPARK_DATA: Record<string, number[]> = {
  'Egyptian Valencia Oranges': [410, 415, 418, 420, 422, 419, 420],
  'Premium Navel Oranges': [420, 435, 428, 445, 450, 448, 452],
  'Premium Medjool Dates': [3100, 3120, 3150, 3180, 3190, 3200, 3210],
  'Fresh Barhi Dates': [2700, 2720, 2740, 2760, 2780, 2800, 2800],
  'Hass Avocados': [1750, 1780, 1800, 1820, 1830, 1850, 1860],
  'Spunta Table Potatoes': [360, 365, 370, 375, 378, 380, 382],
  'Egyptian Red Onions': [500, 505, 510, 515, 518, 520, 522],
  'White Egyptian Garlic': [1100, 1120, 1150, 1180, 1190, 1200, 1210],
  'Wonderful Pomegranates': [870, 860, 855, 850, 848, 850, 849],
  'IQF Frozen Strawberries': [2750, 2760, 2770, 2780, 2790, 2800, 2800],
  'IQF Mixed Vegetables': [1920, 1930, 1935, 1940, 1945, 1950, 1950],
  'Kent Mangoes': [1050, 1060, 1070, 1080, 1090, 1100, 1100],
}

const TickerClock = memo(function TickerClock({ isAr }: { isAr: boolean }) {
  const [liveTime, setLiveTime] = useState<string | null>(null)

  useEffect(() => {
    const formatTime = () =>
      new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })

    setLiveTime(formatTime())
    const timer = window.setInterval(() => setLiveTime(formatTime()), 1000)
    return () => window.clearInterval(timer)
  }, [isAr])

  return (
    <span className="text-[9px] font-mono text-gray-400 hidden sm:inline tabular-nums">
      {liveTime ?? (isAr ? '--:--:--' : '--:--:-- --')}
    </span>
  )
})

export default function MarketTicker({ lang, products }: { lang: string; products: Product[] }) {
  const isAr = lang === 'ar'
  const items = buildTickerItems(products)
  const duplicated = [...items, ...items, ...items]

  return (
    <div className="w-full bg-white border-y border-gray-200 overflow-hidden py-3 relative">
      <div className="absolute inset-y-0 start-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 end-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-6 px-4 mb-2">
        <span className="terminal-badge terminal-badge-live shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {isAr ? 'مؤشر السلع المباشر' : 'Live Commodity Index'}
        </span>
        <TickerClock isAr={isAr} />
      </div>

      <div className="flex whitespace-nowrap relative overflow-hidden">
        <div
          className={cn(
            'marquee-ticker flex gap-8 px-6 items-center',
            isAr ? 'marquee-ticker-rtl' : 'marquee-ticker-ltr'
          )}
        >
          {duplicated.map((item, idx) => {
            const sparkData = SPARK_DATA[item.name] ?? [100, 102, 101, 103, 105, 104, 106]
            const isPositive = item.trend.startsWith('+')
            return (
              <div
                key={idx}
                className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider shrink-0 px-3 py-1.5 rounded-lg border border-transparent"
              >
                <Sparkline data={sparkData} positive={isPositive} width={48} height={20} />
                <span className="text-dark">{item.name}</span>
                <span className="text-primary">{item.price}</span>
                <span className={isPositive ? 'text-green-600' : 'text-red-500'}>{item.trend}</span>
                <span
                  className={cn(
                    'text-[9px] px-1.5 py-0.5 rounded border',
                    item.availability === 'In Stock'
                      ? 'text-green-700 bg-green-50 border-green-200'
                      : 'text-orange-700 bg-orange-50 border-orange-200'
                  )}
                >
                  {item.availability}
                </span>
                <span className="text-gray-400">MOQ: {item.moq}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
