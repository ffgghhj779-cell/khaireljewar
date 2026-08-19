'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import BotanicalMotif, { BotanicalCorners } from '@/components/graphics/BotanicalMotif'
import Container from '@/components/ui/Container'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
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
  const items = PILLARS[isAr ? 'ar' : 'en']

  return (
    <section className="relative z-0 overflow-hidden bg-harvest py-12 md:py-28 border-t border-harvest-deep/30">
      <BotanicalCorners tone="cream" className="opacity-40 hidden md:block" />

      <Container size="large" className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT_INSTANT}
          transition={{ duration: 0.4, ease: BRAND_EASE }}
          className={cn(
            'mx-auto mb-8 max-w-3xl text-center text-[clamp(1.5rem,6vw,3rem)] font-medium text-cream leading-[1.2] text-balance md:mb-14',
            isAr ? 'font-arabic' : 'font-display'
          )}
        >
          {isAr
            ? 'خير الجوار يصنع مستقبل الغذاء.'
            : 'Khair Aljaar is shaping trusted food trade.'}
        </motion.h2>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT_INSTANT}
              transition={{ duration: 0.35, delay: i * 0.05, ease: BRAND_EASE }}
              className="group text-center"
            >
              <div className="mb-3 flex justify-center md:mb-4">
                <BotanicalMotif
                  kind={item.motif}
                  tone="cream"
                  className={cn(
                    'h-10 w-10 opacity-100 md:h-14 md:w-14 transition-transform duration-500 group-hover:scale-110',
                    'md:soft-float'
                  )}
                />
              </div>
              <h3
                className={cn(
                  'mb-2 text-base md:mb-3 md:text-2xl text-cream font-medium',
                  isAr ? 'font-arabic' : 'font-display'
                )}
              >
                {item.title}
              </h3>
              <p
                className={cn(
                  'mb-3 text-[11px] leading-snug text-cream/65 md:mb-5 md:text-sm md:leading-relaxed line-clamp-3 md:line-clamp-none',
                  isAr ? 'font-arabic' : 'font-sans'
                )}
              >
                {item.desc}
              </p>
              <Link
                href={`/${lang}${item.href}`}
                className={cn(
                  'inline-flex min-h-[36px] items-center justify-center rounded-lg border border-cream/35 px-3 text-[11px] font-semibold text-cream md:min-h-[40px] md:px-4 md:text-sm',
                  'active:bg-cream active:text-primary',
                  isAr ? 'font-arabic' : 'font-sans'
                )}
              >
                {isAr ? 'المزيد' : 'More'}
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
