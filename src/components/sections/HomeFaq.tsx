'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

const FAQ = {
  en: [
    {
      q: 'What is the minimum order?',
      a: 'Most lines start from 1 MT or 1 container depending on the product. Exact MOQ is shown on each product card and confirmed on quote.',
    },
    {
      q: 'Which Incoterms do you offer?',
      a: 'FOB Jeddah is our default. CIF, CFR, EXW, and DAP can be quoted by destination, volume, and season.',
    },
    {
      q: 'How fast can you ship?',
      a: 'Lead time depends on product season and packing slot. Share your ship window in the RFQ and we confirm a realistic schedule.',
    },
    {
      q: 'Are the listed prices final?',
      a: 'No. Index prices on cards are indicative only and subject to confirmation. Final offers follow grade, volume, and Incoterm.',
    },
    {
      q: 'What documents do you provide?',
      a: 'Commercial invoice, packing list, and Certificate of Origin as required, plus quality notes and cold-chain guidance for relevant lines.',
    },
  ],
  ar: [
    {
      q: 'ما الحد الأدنى للطلب؟',
      a: 'معظم الخطوط تبدأ من طن واحد أو حاوية حسب المنتج. الحد الأدنى يظهر على كرت المنتج ويُؤكد في عرض السعر.',
    },
    {
      q: 'ما شروط الشحن المتوفرة؟',
      a: 'FOB جدة هو الافتراضي. يمكن تسعير CIF وCFR وEXW وDAP حسب الوجهة والحجم والموسم.',
    },
    {
      q: 'ما سرعة الشحن؟',
      a: 'زمن التجهيز يعتمد على موسم المنتج وموعد التعبئة. اذكر نافذة الشحن في الطلب ونؤكد جدولاً واقعياً.',
    },
    {
      q: 'هل الأسعار المعروضة نهائية؟',
      a: 'لا. الأسعار على الكروت استرشادية فقط وتخضع للتأكيد. العرض النهائي حسب الدرجة والحجم وشرط الشحن.',
    },
    {
      q: 'ما الوثائق التي توفرونها؟',
      a: 'فاتورة تجارية وقائمة تعبئة وشهادة منشأ حسب الطلب، مع ملاحظات جودة وإرشادات تبريد للخطوط المعنية.',
    },
  ],
} as const

export default function HomeFaq({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const items = FAQ[isAr ? 'ar' : 'en']
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative z-0 bg-cream-soft py-10 md:py-16">
      <Container size="large">
        <div className="mx-auto max-w-3xl">
          <p className={cn('mb-2 text-center text-sm font-semibold text-secondary-600', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? 'أسئلة شائعة' : 'FAQ'}
          </p>
          <h2
            className={cn(
              'mb-8 text-center text-[clamp(1.4rem,5vw,2rem)] font-medium text-primary tracking-tight text-balance',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'إجابات سريعة للشركاء.' : 'Quick answers for trading partners.'}
          </h2>

          <ul className="space-y-2">
            {items.map((item, i) => {
              const isOpen = open === i
              return (
                <li key={item.q} className="rounded-2xl border border-primary/10 bg-white overflow-hidden">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 px-4 py-4 text-start min-h-[52px] touch-manipulation',
                      isAr ? 'font-arabic' : 'font-sans'
                    )}
                  >
                    <span className="text-[15px] font-semibold text-primary">{item.q}</span>
                    <ChevronDown
                      className={cn('h-5 w-5 shrink-0 text-secondary transition-transform', isOpen && 'rotate-180')}
                    />
                  </button>
                  {isOpen && (
                    <p
                      className={cn(
                        'border-t border-primary/8 px-4 pb-4 pt-3 text-[14px] leading-relaxed text-primary/70',
                        isAr ? 'font-arabic' : 'font-sans'
                      )}
                    >
                      {item.a}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
