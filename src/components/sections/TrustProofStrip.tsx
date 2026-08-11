'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldCheck, Snowflake, MapPinned, FileCheck2 } from 'lucide-react'
import Container from '@/components/ui/Container'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

const PROOFS = {
  en: [
    { icon: ShieldCheck, title: 'Quality care', text: 'Graded lots, packing integrity, export-minded specs.' },
    { icon: Snowflake, title: 'Cold chain', text: 'Temperature-minded handling from hub to destination.' },
    { icon: FileCheck2, title: 'Documentation', text: 'Origin, packing lists, and partner-ready paperwork.' },
    { icon: MapPinned, title: 'Jeddah hub', text: 'Red Sea logistics base for GCC and beyond.' },
  ],
  ar: [
    { icon: ShieldCheck, title: 'عناية بالجودة', text: 'دفعات مفرزة وتعبئة سليمة ومواصفات تصدير.' },
    { icon: Snowflake, title: 'سلسلة التبريد', text: 'مناولة تراعي الحرارة من المركز إلى الوجهة.' },
    { icon: FileCheck2, title: 'وثائق', text: 'منشأ وقوائم تعبئة وأوراق جاهزة للشريك.' },
    { icon: MapPinned, title: 'مركز جدة', text: 'قاعدة لوجستية على البحر الأحمر للخليج وما بعده.' },
  ],
} as const

export default function TrustProofStrip({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const items = PROOFS[isAr ? 'ar' : 'en']

  return (
    <section className="relative z-0 border-y border-primary/8 bg-cream-soft py-10 md:py-16">
      <Container>
        <div className="mb-6 flex flex-col items-start justify-between gap-3 md:mb-12 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className={cn('mb-2 text-sm font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
              {isAr ? 'ثقة بهدوء' : 'Quiet confidence'}
            </p>
            <h2
              className={cn(
                'text-[clamp(1.35rem,5vw,1.875rem)] font-medium text-primary tracking-tight text-balance',
                isAr ? 'font-arabic' : 'font-display'
              )}
            >
              {isAr ? 'أربعة أعمدة يعتمد عليها الشريك.' : 'Four pillars partners can lean on.'}
            </h2>
          </div>
          <Link
            href={`/${lang}/quality`}
            className={cn(
              'text-sm font-semibold text-primary underline-offset-4 hover:underline',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr ? 'نظام الجودة ←' : 'Quality system →'}
          </Link>
        </div>

        {/* Mobile: horizontal icon cards */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 sm:hidden">
          {items.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={SCROLL_VIEWPORT_INSTANT}
              transition={{ duration: 0.35, delay: i * 0.05, ease: BRAND_EASE }}
              className="w-[70vw] max-w-[240px] shrink-0 rounded-2xl border border-primary/10 bg-cream p-4 shadow-soft"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className={cn('mb-1.5 text-base font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
                {title}
              </h3>
              <p className={cn('text-[12px] leading-relaxed text-primary/60', isAr ? 'font-arabic' : 'font-sans')}>
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={lightMotion ? { opacity: 0, y: 10 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT_INSTANT}
              transition={{ duration: 0.4, delay: i * 0.05, ease: BRAND_EASE }}
              className="group"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-cream">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className={cn('mb-2 text-lg font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
                {title}
              </h3>
              <p className={cn('text-sm leading-relaxed text-primary/60', isAr ? 'font-arabic' : 'font-sans')}>
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
