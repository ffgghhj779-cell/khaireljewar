'use client'

import { FileCheck2, ClipboardList, Thermometer, Ship } from 'lucide-react'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

const DOCS = {
  en: [
    { icon: FileCheck2, title: 'Commercial docs', text: 'Invoice, packing list, and Certificate of Origin as required.' },
    { icon: ClipboardList, title: 'Quality pack', text: 'Grade specs, lot notes, and partner-ready paperwork.' },
    { icon: Thermometer, title: 'Cold-chain notes', text: 'Temperature-minded handling guidance for chilled and frozen lines.' },
    { icon: Ship, title: 'Shipping support', text: 'FOB Jeddah coordination; CIF/CFR available by lane and volume.' },
  ],
  ar: [
    { icon: FileCheck2, title: 'وثائق تجارية', text: 'فاتورة وقائمة تعبئة وشهادة منشأ حسب الطلب.' },
    { icon: ClipboardList, title: 'حزمة الجودة', text: 'مواصفات الدرجة وملاحظات الدفعات وأوراق جاهزة للشريك.' },
    { icon: Thermometer, title: 'ملاحظات التبريد', text: 'إرشادات مناولة تراعي الحرارة للخطوط المبردة والمجمدة.' },
    { icon: Ship, title: 'دعم الشحن', text: 'تنسيق FOB جدة؛ CIF/CFR حسب المسار والحجم.' },
  ],
} as const

/** B2B export documents strip — what partners can expect without opening a PDF */
export default function ExportDocsStrip({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const items = DOCS[isAr ? 'ar' : 'en']

  return (
    <section className="relative z-0 border-y border-secondary/20 bg-cream py-10 md:py-14">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-secondary" aria-hidden />
      <Container>
        <div className="mb-6 md:mb-8 max-w-2xl">
          <p className={cn('mb-2 text-sm font-semibold text-secondary-600', isAr ? 'font-arabic' : 'font-display')}>
            {isAr ? 'جاهزية التصدير' : 'Export readiness'}
          </p>
          <h2
            className={cn(
              'text-[clamp(1.35rem,5vw,1.875rem)] font-medium text-primary tracking-tight text-balance',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'وثائق ودعم يحتاجه المستورد.' : 'Documents and support importers expect.'}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-primary/10 bg-white p-4 md:p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className={cn('mb-1.5 text-base font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
                {title}
              </h3>
              <p className={cn('text-[13px] leading-relaxed text-primary/65', isAr ? 'font-arabic' : 'font-sans')}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
