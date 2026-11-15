'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'
import { HOME_FAQ } from '@/lib/data/faq'
import { cn } from '@/lib/utils/cn'
import { localeFontClass, localeDisplayClass, tx } from '@/lib/i18n/localize'

export default function HomeFaq({ lang }: { lang: string }) {
  const isAr = lang === 'ar' || lang === 'ur'
  const items = HOME_FAQ[isAr ? 'ar' : 'en']
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative z-0 bg-cream-soft py-10 md:py-14">
      <Container size="large">
        <div className="mx-auto max-w-3xl">
          <p className={cn('mb-2 text-center text-sm font-semibold text-secondary-600', localeDisplayClass(lang))}>
            {tx(lang, {
              en: 'FAQ',
              ar: 'أسئلة شائعة',
              ur: 'عمومی سوالات',
              hi: 'अक्सर पूछे जाने वाले प्रश्न',
            })}
          </p>
          <h2
            className={cn(
              'mb-8 text-center text-[clamp(1.4rem,5vw,2rem)] font-medium text-primary tracking-tight text-balance',
              localeDisplayClass(lang)
            )}
          >
            {tx(lang, {
              en: 'Quick answers for trading partners.',
              ar: 'إجابات سريعة للشركاء.',
              ur: 'تجارتی شراکت داروں کے لیے فوری جوابات۔',
              hi: 'ट्रेडिंग पार्टनर्स के लिए त्वरित उत्तर।',
            })}
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
                      localeFontClass(lang)
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
                        localeFontClass(lang)
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
