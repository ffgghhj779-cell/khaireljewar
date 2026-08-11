'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import BotanicalMotif from '@/components/graphics/BotanicalMotif'
import Container from '@/components/ui/Container'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { cn } from '@/lib/utils/cn'

export default function HomeCloser({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  return (
    <section className="relative z-0 overflow-hidden border-t border-secondary/30 bg-primary py-12 md:py-40">
      <div className="absolute inset-x-0 top-0 h-1 bg-secondary" aria-hidden />
      <div
        className="pointer-events-none absolute -top-16 start-1/2 hidden h-56 w-56 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl soft-breathe md:block"
        aria-hidden
      />
      <BotanicalMotif
        kind="cluster"
        tone="mustard"
        className="absolute -bottom-6 -start-4 hidden h-28 w-36 opacity-30 soft-float-slow md:block"
      />
      <BotanicalMotif
        kind="leaf"
        tone="cream"
        className="absolute top-10 -end-2 hidden h-24 w-20 opacity-20 soft-float md:block"
      />

      <Container size="large" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT_INSTANT}
          transition={{ duration: 0.4, ease: BRAND_EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <BotanicalMotif kind="leaf" tone="mustard" className="mx-auto mb-4 h-8 w-7 opacity-70 md:hidden" />
          <p
            className={cn(
              'mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary md:mb-3',
              isAr ? 'font-arabic normal-case tracking-normal text-xs' : 'font-sans'
            )}
          >
            {isAr ? 'دفعة الجوار' : 'Neighborly Batch'}
          </p>
          <h2
            className={cn(
              'mb-5 text-[clamp(2rem,8vw,4rem)] font-medium leading-[1.12] tracking-tight text-cream text-balance md:mb-6',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'جاهزون عندما تكون جاهزًا.' : 'Ready when you are.'}
          </h2>
          <p
            className={cn(
              'mx-auto mb-8 max-w-md text-[15px] leading-relaxed text-cream/75 md:mb-10 md:text-lg',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr
              ? 'اطلب عرض سعر أو تواصل معنا من جدة — وضوح وثقة.'
              : 'Request a quote or reach us in Jeddah — clear answers, trusted care.'}
          </p>

          <div className="flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={`/${lang}/products`}
              className={cn(
                'magnetic-cta inline-flex min-h-[48px] items-center justify-center rounded-xl px-8 touch-manipulation active:scale-[0.98]',
                'bg-secondary text-primary font-semibold hover:bg-secondary-400',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'تسوق الآن' : 'Shop now'}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className={cn(
                'magnetic-cta inline-flex min-h-[48px] items-center justify-center rounded-xl border border-secondary/45 px-8 touch-manipulation active:scale-[0.98]',
                'text-cream font-semibold hover:bg-secondary/15',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
