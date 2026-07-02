'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Send, ShoppingBag, FileDown, Scale } from 'lucide-react'
import { useQuoteStore } from '@/store/useQuoteStore'
import { formatCurrency, parsePricePerMt, convertFromUsd } from '@/lib/utils/currency'
import { downloadQuoteSheet } from '@/lib/utils/quotePdf'
import CurrencyToggle from './CurrencyToggle'
import VolumetricCalculator from './VolumetricCalculator'
import { cn } from '@/lib/utils/cn'
import { useEffect, useMemo } from 'react'

export default function QuoteDrawer({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const {
    isOpen,
    toggleCart,
    items,
    removeItem,
    updateQuantity,
    notification,
    clearNotification,
    toggleCheckout,
    currency,
    getTotalMt,
  } = useQuoteStore()

  useEffect(() => {
    if (notification?.show) {
      const timer = setTimeout(() => clearNotification(), 4000)
      return () => clearTimeout(timer)
    }
  }, [notification, clearNotification])

  const estimate = useMemo(() => {
    let totalUsd = 0
    items.forEach((item) => {
      const price = item.indexPrice ? parsePricePerMt(item.indexPrice) : 0
      const qty = item.unit === 'MT' ? item.quantity : item.quantity * 12
      totalUsd += price * qty
    })
    return convertFromUsd(totalUsd, currency)
  }, [items, currency])

  const unitLabel = (unit: string, count: number) => {
    if (unit === 'Containers') return isAr ? `${count} حاوية` : `${count} Container${count > 1 ? 's' : ''}`
    return isAr ? `${count} طن` : `${count} MT`
  }

  const handleDownloadPdf = () => {
    downloadQuoteSheet({ items, currency, lang })
  }

  return (
    <>
      <AnimatePresence>
        {notification?.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] glass-panel text-dark px-6 py-4 rounded-xl shadow-2xl border border-gray-200 flex items-center gap-4 min-w-[320px]"
          >
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className={cn('font-bold text-sm', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {isAr ? 'تم تحديث طلب التسعير' : 'Quote List Updated'}
              </p>
              <p className={cn('text-xs text-gray-500 mt-0.5', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {notification.productName} — {unitLabel(notification.unit, notification.count)}
              </p>
            </div>
            <button onClick={clearNotification} className="ms-auto text-gray-400 hover:text-dark">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
              className="fixed inset-0 bg-dark/40 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{ x: isAr ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className={cn(
                'fixed top-0 bottom-0 w-full max-w-lg z-[111] shadow-2xl flex flex-col',
                'backdrop-blur-2xl bg-white/75 border-gray-200/80',
                isAr ? 'left-0 border-e' : 'right-0 border-s'
              )}
            >
              <div className="p-5 border-b border-gray-200/80 flex items-center justify-between bg-white/50 backdrop-blur-xl">
                <div>
                  <h2 className={cn('text-lg font-bold tracking-tight text-dark', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                    {isAr ? 'محطة التسعير B2B' : 'B2B Quote Terminal'}
                  </h2>
                  <p className="text-[10px] text-primary mt-0.5 font-bold uppercase tracking-wider">
                    {items.length} {isAr ? 'أصناف' : 'line items'} · {getTotalMt()} MT
                  </p>
                </div>
                <button onClick={toggleCart} className="p-2 hover:bg-gray-200 rounded-lg transition text-dark">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 py-3 border-b border-gray-200 bg-white flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{isAr ? 'العملة' : 'Currency'}</span>
                <CurrencyToggle lang={lang} compact />
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                      <ShoppingBag className="w-14 h-14 text-gray-200 mb-4" />
                    </motion.div>
                    <p className={cn('font-bold text-dark mb-1', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                      {isAr ? 'المحطة فارغة' : 'Terminal Empty'}
                    </p>
                    <p className={cn('text-sm text-gray-400 max-w-xs', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                      {isAr ? 'أضف سلعاً من مصفوفة المنتجات لبدء طلب التسعير.' : 'Add commodities from the product matrix to begin your quote request.'}
                    </p>
                  </div>
                ) : (
                  <>
                    {items.map((item) => {
                      const unitPrice = item.indexPrice ? parsePricePerMt(item.indexPrice) : 0
                      const qty = item.unit === 'MT' ? item.quantity : item.quantity * 12
                      const lineTotal = convertFromUsd(unitPrice * qty, currency)

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-3 glass-panel border border-gray-200 p-3 rounded-xl"
                        >
                          {item.image && (
                            <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-lg bg-gray-100 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className={cn('font-bold text-dark text-sm truncate', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                                {isAr ? item.title.ar : item.title.en}
                              </h4>
                              <span className="text-xs font-mono font-bold text-primary shrink-0">
                                {formatCurrency(lineTotal, currency, lang)}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-0.5 truncate">{item.packaging}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-0.5 bg-gray-50 hover:bg-gray-100 font-bold text-dark text-xs"
                                >
                                  −
                                </button>
                                <span className="px-2 text-[10px] font-bold text-dark font-mono">
                                  {item.quantity} {item.unit === 'Containers' ? 'CTR' : 'MT'}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-0.5 bg-gray-50 hover:bg-gray-100 font-bold text-dark text-xs"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}

                    <VolumetricCalculator lang={lang} />

                    <div className="data-cell rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Scale className="w-3.5 h-3.5" />
                          {isAr ? 'إجمالي الوزن' : 'Total Weight'}
                        </span>
                        <span className="font-mono font-bold">{getTotalMt()} MT</span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                        <span className="font-bold text-dark">{isAr ? 'التقدير الإجمالي' : 'Grand Estimate'}</span>
                        <span className="font-black text-primary font-mono">{formatCurrency(estimate, currency, lang)}</span>
                      </div>
                      <p className="text-[9px] text-gray-400">
                        {isAr ? '* تقديري — الأسعار الفعلية تخضع للتفاوض' : '* Indicative — final pricing subject to negotiation'}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-5 bg-white/40 backdrop-blur-xl border-t border-gray-200/80 space-y-2">
                  <button
                    onClick={handleDownloadPdf}
                    className="w-full bg-white text-dark border border-gray-200 hover:border-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    <FileDown className="w-4 h-4" />
                    <span className={isAr ? 'font-ibm-arabic' : 'font-inter'}>
                      {isAr ? 'تحميل عرض السعر PDF' : 'Download Quote as PDF'}
                    </span>
                  </button>
                  <button
                    onClick={toggleCheckout}
                    className="w-full bg-primary text-dark hover:bg-dark hover:text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-primary"
                  >
                    <Send className="w-5 h-5" />
                    <span className={isAr ? 'font-ibm-arabic' : 'font-inter'}>
                      {isAr ? 'إرسال طلب التسعير' : 'Submit Quote Request'}
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
