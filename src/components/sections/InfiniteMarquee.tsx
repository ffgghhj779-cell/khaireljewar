'use client'

import { cn } from '@/lib/utils/cn'

export default function InfiniteMarquee({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const text = isAr
    ? ' • تصدير عالمي موثوق • جودة مصرية فاخرة • محاصيل عضوية معتمدة • لوجستيات متكاملة بدون مساومات '
    : ' • GLOBAL EXPORT EXCELLENCE • UNMATCHED EGYPTIAN QUALITY • PREMIUM ORGANIC HARVEST • TRUSTED SUPPLY CHAIN '

  return (
    <div className="bg-gradient-to-r from-primary to-cyan-400 py-5 overflow-hidden flex whitespace-nowrap relative z-10 skew-y-1 origin-bottom-left -mt-6 shadow-xl">
      <div
        className={cn(
          'marquee-track flex items-center text-dark text-2xl md:text-3xl font-black uppercase tracking-widest select-none',
          isAr ? 'font-ibm-arabic marquee-track-rtl' : 'font-manrope marquee-track-ltr'
        )}
      >
        <span className="flex-shrink-0">{text}{text}</span>
        <span className="flex-shrink-0">{text}{text}</span>
      </div>
    </div>
  )
}
