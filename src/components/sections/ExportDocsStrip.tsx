'use client'

import { FileCheck2, ClipboardList, Thermometer, Ship } from 'lucide-react'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'
import { localeFontClass, localeDisplayClass, tx } from '@/lib/i18n/localize'

const DOCS = [
  {
    icon: FileCheck2,
    title: {
      en: 'Commercial docs',
      ar: 'وثائق تجارية',
      ur: 'تجارتی دستاویزات',
      hi: 'व्यावसायिक दस्तावेज़',
    },
    text: {
      en: 'Invoice, packing list, and Certificate of Origin as required.',
      ar: 'فاتورة وقائمة تعبئة وشهادة منشأ حسب الطلب.',
      ur: 'انوائس، پیکنگ لسٹ اور سرٹیفکیٹ آف اوریجن حسبِ ضرورت۔',
      hi: 'इनवॉइस, पैकिंग लिस्ट और सर्टिफिकेट ऑफ़ ओरिजिन आवश्यकतानुसार।',
    },
  },
  {
    icon: ClipboardList,
    title: {
      en: 'Quality pack',
      ar: 'حزمة الجودة',
      ur: 'کوالٹی پیک',
      hi: 'क्वालिटी पैक',
    },
    text: {
      en: 'Grade specs, lot notes, and partner-ready paperwork.',
      ar: 'مواصفات الدرجة وملاحظات الدفعات وأوراق جاهزة للشريك.',
      ur: 'گریڈ وضاحتیں، لاٹ نوٹس اور پارٹنر کے لیے تیار کاغذات۔',
      hi: 'ग्रेड स्पेक्स, लॉट नोट्स और पार्टनर-रेडी पेपरवर्क।',
    },
  },
  {
    icon: Thermometer,
    title: {
      en: 'Cold-chain notes',
      ar: 'ملاحظات التبريد',
      ur: 'کولڈ چین نوٹس',
      hi: 'कोल्ड-चेन नोट्स',
    },
    text: {
      en: 'Temperature-minded handling guidance for chilled and frozen lines.',
      ar: 'إرشادات مناولة تراعي الحرارة للخطوط المبردة والمجمدة.',
      ur: 'ٹھنڈی اور منجمد لائنز کے لیے درجۂ حرارت کے مطابق ہینڈلنگ۔',
      hi: 'चिल्ड और फ्रोज़न लाइनों के लिए तापमान-आधारित हैंडलिंग।',
    },
  },
  {
    icon: Ship,
    title: {
      en: 'Shipping support',
      ar: 'دعم الشحن',
      ur: 'شپنگ سپورٹ',
      hi: 'शिपिंग सपोर्ट',
    },
    text: {
      en: 'FOB Jeddah coordination; CIF/CFR available by lane and volume.',
      ar: 'تنسيق FOB جدة؛ CIF/CFR حسب المسار والحجم.',
      ur: 'FOB جدّہ کوآرڈینیشن؛ CIF/CFR راستے اور حجم کے مطابق۔',
      hi: 'FOB जेद्दाह समन्वय; CIF/CFR लेन व वॉल्यूम के अनुसार।',
    },
  },
] as const

/** B2B export documents strip — what partners can expect without opening a PDF */
export default function ExportDocsStrip({ lang }: { lang: string }) {
  return (
    <section className="relative z-0 border-y border-secondary/20 bg-cream py-10 md:py-12">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-secondary" aria-hidden />
      <Container>
        <div className="mb-6 md:mb-8 max-w-2xl">
          <p className={cn('mb-2 text-sm font-semibold text-secondary-600', localeDisplayClass(lang))}>
            {tx(lang, {
              en: 'Export readiness',
              ar: 'جاهزية التصدير',
              ur: 'برآمد کی تیاری',
              hi: 'निर्यात तत्परता',
            })}
          </p>
          <h2
            className={cn(
              'text-[clamp(1.35rem,5vw,1.875rem)] font-medium text-primary tracking-tight text-balance',
              localeDisplayClass(lang)
            )}
          >
            {tx(lang, {
              en: 'Documents and support importers expect.',
              ar: 'وثائق ودعم يحتاجه المستورد.',
              ur: 'دستاویزات اور سپورٹ جو درآمد کنندگان چاہتے ہیں۔',
              hi: 'दस्तावेज़ और सपोर्ट जो आयातक अपेक्षा करते हैं।',
            })}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOCS.map(({ icon: Icon, title, text }) => (
            <div
              key={title.en}
              className="rounded-2xl border border-primary/10 bg-white p-4 md:p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className={cn('mb-1.5 text-base font-semibold text-primary', localeDisplayClass(lang))}>
                {tx(lang, title)}
              </h3>
              <p className={cn('text-[13px] leading-relaxed text-primary/65', localeFontClass(lang))}>
                {tx(lang, text)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
