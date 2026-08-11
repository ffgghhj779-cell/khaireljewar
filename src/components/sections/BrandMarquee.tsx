'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import BotanicalMotif, { BotanicalCorners } from '@/components/graphics/BotanicalMotif'
import Container from '@/components/ui/Container'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

const PILLARS = {
  en: [
    {
      title: 'Quality',
      desc: 'Certified care in every carton — standards partners can trust.',
      href: '/quality',
      motif: 'leaf' as const,
    },
    {
      title: 'Cold chain',
      desc: 'Temperature-minded handling from packing through to port.',
      href: '/logistics',
      motif: 'stem' as const,
    },
    {
      title: 'Jeddah hub',
      desc: 'Export logistics rooted in Jeddah, reaching partners worldwide.',
      href: '/export-markets',
      motif: 'palm' as const,
    },
    {
      title: 'Neighborly',
      desc: 'Hospitality and clarity in every conversation and shipment.',
      href: '/about',
      motif: 'berry' as const,
    },
  ],
  ar: [
    {
      title: 'الجودة',
      desc: 'عناية معتمدة في كل كرتونة — معايير يثق بها الشركاء.',
      href: '/quality',
      motif: 'leaf' as const,
    },
    {
      title: 'سلسلة التبريد',
      desc: 'مناولة تراعي الحرارة من التعبئة حتى الميناء.',
      href: '/logistics',
      motif: 'stem' as const,
    },
    {
      title: 'مركز جدة',
      desc: 'لوجستيات تصدير من جدة إلى شركاء حول العالم.',
      href: '/export-markets',
      motif: 'palm' as const,
    },
    {
      title: 'الجوار',
      desc: 'ضيافة ووضوح في كل محادثة وكل شحنة.',
      href: '/about',
      motif: 'berry' as const,
    },
  ],
}

export default function BrandMarquee({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const items = PILLARS[isAr ? 'ar' : 'en']

  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      <BotanicalCorners tone="cream" className="opacity-40" />

      <Container size="large" className="relative z-10">
        <motion.h2
          initial={lightMotion ? false : { opacity: 0, y: 12 }}
          whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT_INSTANT}
          transition={{ duration: 0.5, ease: BRAND_EASE }}
          className={cn(
            'mx-auto mb-14 max-w-3xl text-center text-[clamp(1.85rem,4vw,3rem)] font-medium text-cream leading-[1.15]',
            isAr ? 'font-arabic' : 'font-display'
          )}
        >
          {isAr
            ? 'خير الجوار يصنع مستقبل الغذاء.'
            : 'Khair Aljaar is shaping trusted food trade.'}
        </motion.h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={lightMotion ? false : { opacity: 0, y: 14 }}
              whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT_INSTANT}
              transition={{ duration: 0.45, delay: i * 0.06, ease: BRAND_EASE }}
              className="group text-center"
            >
              <div className="mb-4 flex justify-center">
                <BotanicalMotif
                  kind={item.motif}
                  tone="cream"
                  className={cn(
                    'h-14 w-14 opacity-70 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100',
                    i % 2 === 0 ? 'soft-float' : 'soft-float-delay'
                  )}
                />
              </div>
              <h3
                className={cn(
                  'mb-3 text-xl md:text-2xl text-cream font-medium',
                  isAr ? 'font-arabic' : 'font-display'
                )}
              >
                {item.title}
              </h3>
              <p className={cn('mb-5 text-sm text-cream/65 leading-relaxed', isAr ? 'font-arabic' : 'font-sans')}>
                {item.desc}
              </p>
              <Link
                href={`/${lang}${item.href}`}
                className={cn(
                  'inline-flex min-h-[40px] items-center justify-center rounded-lg border border-cream/35 px-4 text-sm font-semibold text-cream transition-all duration-300 hover:bg-cream hover:text-primary hover:-translate-y-0.5',
                  isAr ? 'font-arabic' : 'font-sans'
                )}
              >
                {isAr ? 'اقرأ المزيد' : 'Read more'}
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
