'use client'

import Image from 'next/image'
import { PARTNER_LOGOS } from '@/lib/constants/partners'
import { cn } from '@/lib/utils/cn'

function LogoCard({
  partner,
  lang,
  delay,
}: {
  partner: (typeof PARTNER_LOGOS)[number]
  lang: string
  delay: number
}) {
  const isAr = lang === 'ar'
  const isRaster = /\.(png|jpe?g|webp)$/i.test(partner.logo)

  const inner = (
    <>
      <Image
        src={partner.logo}
        alt={isAr ? partner.name.ar : partner.name.en}
        width={220}
        height={88}
        unoptimized={!isRaster}
        className="h-[4.6rem] w-auto max-w-[10.5rem] object-contain md:h-[5.4rem] md:max-w-[11.5rem]"
      />
      <span className={cn('mt-2 text-[11px] font-semibold text-primary/70', isAr ? 'font-arabic' : 'font-sans')}>
        {isAr ? partner.name.ar : partner.name.en}
      </span>
    </>
  )

  const className = cn(
    'partner-logo-float flex h-[7.25rem] w-[10.5rem] shrink-0 flex-col items-center justify-center rounded-2xl',
    'px-4 shadow-soft md:h-[8rem] md:w-[12rem]',
    'transition-transform duration-500 hover:-translate-y-1',
    'border border-farm/30 bg-white'
  )

  if (partner.href?.startsWith('http')) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ animationDelay: `${delay}s` }}
      >
        {inner}
      </a>
    )
  }

  return (
    <div className={className} style={{ animationDelay: `${delay}s` }}>
      {inner}
    </div>
  )
}

export default function PartnerLogoMarquee({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const loop = [...PARTNER_LOGOS, ...PARTNER_LOGOS]

  return (
    <section className="relative z-0 overflow-hidden border-y border-farm/25 bg-farm-mist py-8 md:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(127,166,138,0.14),transparent_68%)]" aria-hidden />
      <p
        className={cn(
          'relative mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-farm md:mb-8 md:text-xs',
          isAr ? 'font-arabic normal-case tracking-normal text-sm' : 'font-sans'
        )}
      >
        {isAr ? 'براندات اشتغلنا معها — شركاء التجزئة والمجموعة' : 'Brands we’ve worked with — retail & group partners'}
      </p>

      <div className="relative mx-auto hidden max-w-6xl grid-cols-4 gap-4 px-4 md:grid">
        {PARTNER_LOGOS.map((partner, i) => (
          <LogoCard key={partner.id} partner={partner} lang={lang} delay={i * 0.35} />
        ))}
      </div>

      <div className="partner-logo-marquee relative md:hidden" dir="ltr">
        <div className="partner-logo-marquee__track flex w-max gap-3 px-4">
          {loop.map((partner, i) => (
            <LogoCard key={`${partner.id}-${i}`} partner={partner} lang={lang} delay={(i % 7) * 0.3} />
          ))}
        </div>
      </div>
    </section>
  )
}
