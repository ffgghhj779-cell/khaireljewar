'use client'

import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { X, Trash2, Send, ShoppingBag, FileDown, Scale } from 'lucide-react'
import { useQuoteDrawer } from '@/store/useQuoteStore'
import ProductImage from '@/components/ui/ProductImage'
import { formatCurrency, parsePricePerMt, convertFromUsd } from '@/lib/utils/currency'
import { downloadQuoteSheet } from '@/lib/utils/quotePdf'
import CurrencyToggle from './CurrencyToggle'
import VolumetricCalculator from './VolumetricCalculator'
import { cn } from '@/lib/utils/cn'
import { useEffect, useMemo } from 'react'
import { MOBILE_DRAWER_SPRING, MOBILE_EASE_OUT, TAP_SCALE } from '@/lib/constants/motion'

const DISMISS_THRESHOLD = 120

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
  } = useQuoteDrawer()

  useEffect(() => {
    if (notification?.show) {
      const timer = setTimeout(() => clearNotification(), 4000)
      return () => clearTimeout(timer)
    }
  }, [notification, clearNotification])

  useEffect(() => {
    if (!isOpen) return

    const scrollY = window.scrollY
    const { style } = document.body
    const prevOverflow = style.overflow
    const prevPosition = style.position
    const prevTop = style.top
    const prevWidth = style.width

    style.overflow = 'hidden'
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.width = '100%'

    return () => {
      style.overflow = prevOverflow
      style.position = prevPosition
      style.top = prevTop
      style.width = prevWidth
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

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

  const handleDrawerDragEnd = (_: unknown, info: PanInfo) => {
    const dismissX = isAr ? info.offset.x > DISMISS_THRESHOLD : info.offset.x < -DISMISS_THRESHOLD
    if (dismissX) toggleCart()
  }

  return (
    <>
      <AnimatePresence>
        {notification?.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18, ease: MOBILE_EASE_OUT }}
            className="fixed top-20 md:top-24 left-1/2 -translate-x-1/2 z-[200] glass-panel text-dark px-4 md:px-6 py-4 rounded-xl shadow-2xl border border-gray-200 flex items-center gap-4 min-w-[280px] max-w-[calc(100vw-2rem)] mobile-overlay"
          >
            <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className={cn('font-bold text-sm', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {isAr ? 'تم تحديث طلب التسعير' : 'Quote List Updated'}
              </p>
              <p className={cn('text-xs text-gray-500 mt-0.5 truncate', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {notification.productName} — {unitLabel(notification.unit, notification.count)}
              </p>
            </div>
            <motion.button
              whileTap={TAP_SCALE}
              onClick={clearNotification}
              className="ms-auto min-w-[48px] min-h-[48px] flex items-center justify-center text-gray-400 hover:text-dark touch-manipulation"
            >
              <X className="w-4 h-4" />
            </motion.button>
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
              transition={{ duration: 0.2, ease: MOBILE_EASE_OUT }}
              onClick={toggleCart}
              className="fixed inset-0 bg-dark/40 backdrop-blur-md z-[110] mobile-overlay touch-manipulation"
            />
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDrawerDragEnd}
              initial={{ x: isAr ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? '-100%' : '100%' }}
              transition={MOBILE_DRAWER_SPRING}
              className={cn(
                'fixed top-0 bottom-0 w-full max-w-lg z-[111] shadow-2xl flex flex-col mobile-overlay',
                'backdrop-blur-2xl bg-white/80 border-gray-200/80 gpu-accelerated will-change-transform',
                isAr ? 'left-0 border-e' : 'right-0 border-s'
              )}
            >
              <div className="p-4 md:p-5 border-b border-gray-200/80 flex items-center justify-between bg-white/50 backdrop-blur-xl">
                <div>
                  <h2 className={cn('text-lg font-bold tracking-tight text-dark', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                    {isAr ? 'محطة التسعير B2B' : 'B2B Quote Terminal'}
                  </h2>
                  <p className="text-[10px] text-primary mt-0.5 font-bold uppercase tracking-wider">
                    {items.length} {isAr ? 'أصناف' : 'line items'} · {getTotalMt()} MT
                  </p>
                </div>
                <motion.button
                  whileTap={TAP_SCALE}
                  onClick={toggleCart}
                  className="min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-gray-200 rounded-xl transition text-dark touch-manipulation"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="px-4 md:px-5 py-3 border-b border-gray-200 bg-white flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{isAr ? 'العملة' : 'Currency'}</span>
                <CurrencyToggle lang={lang} compact />
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 overscroll-contain">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                      <ShoppingBag className="w-14 h-14 text-gray-200 mb-4" />
                    </motion.div>
                    <p className={cn('font-bold text-dark mb-1', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                      {isAr ? 'المحطة فارغة' : 'Terminal Empty'}
                    </p>
                    <p className={cn('text-sm text-gray-400 max-w-xs px-4', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                      {isAr ? 'أضف سلعاً من الكتالوج لبدء طلب التسعير.' : 'Add commodities from the catalog to begin your quote request.'}
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
                          <ProductImage
                            src={item.image}
                            alt={isAr ? item.title.ar : item.title.en}
                            variant="thumb"
                            lang={lang}
                          />
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
                                <motion.button
                                  whileTap={TAP_SCALE}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="min-w-[48px] min-h-[48px] flex items-center justify-center bg-gray-50 hover:bg-gray-100 font-bold text-dark text-sm touch-manipulation"
                                >
                                  −
                                </motion.button>
                                <span className="px-2 text-[10px] font-bold text-dark font-mono min-w-[3rem] text-center">
                                  {item.quantity} {item.unit === 'Containers' ? 'CTR' : 'MT'}
                                </span>
                                <motion.button
                                  whileTap={TAP_SCALE}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="min-w-[48px] min-h-[48px] flex items-center justify-center bg-gray-50 hover:bg-gray-100 font-bold text-dark text-sm touch-manipulation"
                                >
                                  +
                                </motion.button>
                              </div>
                              <motion.button
                                whileTap={TAP_SCALE}
                                onClick={() => removeItem(item.id)}
                                className="text-red-400 hover:text-red-600 min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-red-50 rounded-lg transition touch-manipulation"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
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
                <div className="p-4 md:p-5 bg-white/40 backdrop-blur-xl border-t border-gray-200/80 space-y-2 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
                  <motion.button
                    whileTap={TAP_SCALE}
                    onClick={handleDownloadPdf}
                    className="w-full bg-white text-dark border border-gray-200 hover:border-primary py-3 min-h-[48px] rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm touch-manipulation"
                  >
                    <FileDown className="w-4 h-4" />
                    <span className={isAr ? 'font-ibm-arabic' : 'font-inter'}>
                      {isAr ? 'تحميل عرض السعر PDF' : 'Download Quote as PDF'}
                    </span>
                  </motion.button>
                  <motion.button
                    whileTap={TAP_SCALE}
                    onClick={toggleCheckout}
                    className="w-full bg-primary text-dark hover:bg-dark hover:text-white py-3.5 min-h-[48px] rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-primary touch-manipulation"
                  >
                    <Send className="w-5 h-5" />
                    <span className={isAr ? 'font-ibm-arabic' : 'font-inter'}>
                      {isAr ? 'إرسال طلب التسعير' : 'Submit Quote Request'}
                    </span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
