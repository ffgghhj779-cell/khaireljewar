import Image from 'next/image'
import Link from 'next/link'
import { PARTNERS } from '@/lib/constants/partners'
import { cn } from '@/lib/utils/cn'

type Props = {
  lang: string
  /** When true, skip the page-level title (used on dedicated partners page) */
  hideTitle?: boolean
  className?: string
}

export default function OurPartners({ lang, hideTitle = false, className }: Props) {
  const isAr = lang === 'ar'

  return (
    <div className={cn('w-full', className)}>
      {!hideTitle && (
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className={cn('mb-3 text-sm font-semibold text-primary', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr ? 'خير الجوار' : 'Khair Aljaar'}
          </p>
          <h2
            className={cn(
              'mb-4 text-3xl font-bold tracking-tight text-dark editorial-heading md:text-4xl',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'شركاؤنا' : 'Our Partners'}
          </h2>
          <p className={cn('text-base leading-relaxed text-gray-600 md:text-lg', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr
              ? 'براندات اشتغلنا معها فعلياً — كارفور، بنده، نينجا، ونون — إلى جانب شركات المجموعة: تسامي الوطنية، الرهان الماسي، وثمار أرضنا.'
              : 'Brands we’ve actually worked with — Carrefour, Panda, ninja, and noon — alongside group companies Tasami, Al Rehan Al Masi, and Thimar Ardina.'}
          </p>
        </div>
      )}

      <div className="mx-auto flex max-w-4xl flex-col gap-12 md:gap-16">
        {PARTNERS.map((partner) => (
          <article
            key={partner.id}
            className="grid items-center gap-8 md:grid-cols-[minmax(11rem,15rem)_1fr] md:gap-10"
          >
            <div className="mx-auto grid aspect-square w-full max-w-[15rem] place-items-center border border-farm/30 bg-farm-mist p-6 shadow-soft">
              <Image
                src={partner.logo}
                alt={isAr ? partner.name.ar : partner.name.en}
                width={280}
                height={280}
                unoptimized={partner.logo.endsWith('.svg')}
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p
                className={cn(
                  'mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-primary/55',
                  isAr ? 'font-arabic normal-case tracking-normal text-xs' : 'font-sans'
                )}
              >
                {isAr ? partner.tag.ar : partner.tag.en}
              </p>
              <h3
                className={cn(
                  'mb-3 text-2xl font-bold tracking-tight text-primary md:text-[1.85rem]',
                  isAr ? 'font-arabic' : 'font-display'
                )}
              >
                {isAr ? partner.name.ar : partner.name.en}
              </h3>
              <p className={cn('mb-5 text-[1.02rem] leading-relaxed text-primary/80', isAr ? 'font-arabic' : 'font-sans')}>
                {isAr ? partner.brief.ar : partner.brief.en}
              </p>
              <ul className="mb-6 flex flex-wrap gap-2">
                {(isAr ? partner.focus.ar : partner.focus.en).map((item) => (
                  <li
                    key={item}
                    className={cn(
                      'border border-farm/25 bg-farm-soft px-3 py-1.5 text-xs font-semibold text-primary',
                      isAr ? 'font-arabic' : 'font-sans'
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={partner.href.startsWith('http') ? partner.href : `/${lang}${partner.href}`}
                target={partner.href.startsWith('http') ? '_blank' : undefined}
                rel={partner.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={cn(
                  'inline-flex min-h-[48px] items-center rounded-xl bg-secondary px-5 text-sm font-semibold text-primary hover:bg-secondary/90',
                  isAr ? 'font-arabic' : 'font-sans'
                )}
              >
                {partner.href.startsWith('http')
                  ? isAr
                    ? 'زيارة الموقع'
                    : 'Visit website'
                  : isAr
                    ? 'تعرف علينا'
                    : 'Learn more'}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
