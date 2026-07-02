'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronDown, Package } from 'lucide-react'
import { calculateVolumetrics } from '@/lib/utils/volumetrics'
import { useQuoteStore } from '@/store/useQuoteStore'
import { cn } from '@/lib/utils/cn'

export default function VolumetricCalculator({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'sea' | 'air'>('sea')
  const [dims, setDims] = useState({ l: 12.0, w: 2.35, h: 2.39 })
  const totalMt = useQuoteStore((s) => s.getTotalMt())

  const result = useMemo(
    () =>
      calculateVolumetrics({
        lengthM: dims.l,
        widthM: dims.w,
        heightM: dims.h,
        grossWeightKg: totalMt * 1000,
        mode,
      }),
    [dims, totalMt, mode]
  )

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-primary" />
          <span className={cn('text-xs font-bold text-dark', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr ? 'حاسبة الوزن الحجمي' : 'Volumetric Freight Estimator'}
          </span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4 border-t border-gray-200">
              <div className="flex gap-2">
                {(['sea', 'air'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      'flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md border transition-all',
                      mode === m ? 'bg-dark text-white border-dark' : 'bg-white text-gray-500 border-gray-200'
                    )}
                  >
                    {m === 'sea' ? (isAr ? 'بحري' : 'Sea') : isAr ? 'جوي' : 'Air'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'l' as const, label: isAr ? 'الطول (م)' : 'L (m)' },
                  { key: 'w' as const, label: isAr ? 'العرض (م)' : 'W (m)' },
                  { key: 'h' as const, label: isAr ? 'الارتفاع (م)' : 'H (m)' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-[9px] font-bold text-gray-400 uppercase">{label}</label>
                    <input
                      type="number"
                      step="0.01"
                      value={dims[key]}
                      onChange={(e) => setDims({ ...dims, [key]: parseFloat(e.target.value) || 0 })}
                      className="w-full mt-0.5 px-2 py-1.5 text-xs font-mono border border-gray-200 rounded-md focus:outline-none focus:border-primary"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'CBM', value: result.cbm },
                  { label: isAr ? 'وزن حجمي (كجم)' : 'Vol. Wt (kg)', value: result.volumetricWeightKg },
                  { label: isAr ? 'وزن محاسب (كجم)' : 'Chargeable (kg)', value: result.chargeableWeightKg },
                  { label: isAr ? 'حاويات تقديرية' : 'Est. Containers', value: result.containersEstimate },
                ].map((stat) => (
                  <div key={stat.label} className="data-cell rounded-lg p-2.5">
                    <div className="text-[9px] font-bold text-gray-400 uppercase">{stat.label}</div>
                    <div className="text-sm font-black text-dark font-mono mt-0.5">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[10px] text-gray-500 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
                <Package className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className={isAr ? 'font-ibm-arabic' : 'font-inter'}>
                  {isAr
                    ? `بناءً على ${totalMt} طن في قائمة التسعير`
                    : `Based on ${totalMt} MT in your quote list`}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
