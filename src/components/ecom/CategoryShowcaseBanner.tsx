'use client'
import { tx, localeFontClass } from '@/lib/i18n/localize'

import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import type { Product } from '@/lib/data/products'
import { BRAND } from '@/lib/constants/brand'
import { isOrchardImage, resolveProductImage } from '@/lib/constants/images'
import BrandStamp from '@/components/ui/BrandStamp'
import { cn } from '@/lib/utils/cn'

type Copy = { en: string; ar: string }

interface Showcase {
  eyebrow: Copy
  title: Copy
  subtitle: Copy
  hero: string
}

export const CATEGORY_SHOWCASES: Record<string, Showcase> = {
  Citrus: {
    eyebrow: { en: 'Citrus', ar: 'الموالح' },
    title: { en: 'Sun-ripened citrus, packed fresh', ar: 'موالح ناضجة بلون الشمس' },
    subtitle: {
      en: 'Valencia and navel oranges, tangerines and lemons in multiple calibers for retail and food service.',
      ar: 'برتقال فالنسيا وأبو سرة ويوسفي وليمون بمقاسات متعددة للتجزئة والمطاعم.',
    },
    hero: 'valencia-oranges',
  },
  Fruits: {
    eyebrow: { en: 'Fresh fruit', ar: 'الفواكه الطازجة' },
    title: { en: 'Fruit that sells itself', ar: 'فواكه تبيع نفسها' },
    subtitle: {
      en: 'Pomegranates, mangoes, grapes, avocados, strawberries and kiwi from trusted partner farms.',
      ar: 'رمان ومانجو وعنب وأفوكادو وفراولة وكيوي من مزارع شريكة موثوقة.',
    },
    hero: 'pomegranates',
  },
  Vegetables: {
    eyebrow: { en: 'Fresh vegetables', ar: 'الخضروات الطازجة' },
    title: { en: 'Daily vegetables, kitchen-ready', ar: 'خضار يومي جاهز للمطبخ' },
    subtitle: {
      en: 'Tomatoes, peppers, potatoes, onions, carrots, garlic, okra and molokhia for retail and food service.',
      ar: 'طماطم وفلفل وبطاطس وبصل وجزر وثوم وبامية وملوخية للتجزئة والمطاعم.',
    },
    hero: 'fresh-tomatoes',
  },
  Frozen: {
    eyebrow: { en: 'Frozen', ar: 'المجمدات' },
    title: { en: 'IQF frozen, available all year', ar: 'مجمدات IQF متوفرة طوال السنة' },
    subtitle: {
      en: 'Strawberries, mixed vegetables, fries and green fava beans for kitchens and retail freezers.',
      ar: 'فراولة وخضار مشكل وبطاطس مقلية وفول أخضر للمطابخ وثلاجات التجزئة.',
    },
    hero: 'frozen-strawberries',
  },
  Dates: {
    eyebrow: { en: 'Dates', ar: 'التمور' },
    title: { en: 'Premium dates', ar: 'تمور فاخرة' },
    subtitle: {
      en: 'Medjool, Barhi and Ajwa Al Madinah for gifting, retail and wholesale.',
      ar: 'مجدول وبرحي وعجوة المدينة للهدايا والتجزئة والجملة.',
    },
    hero: 'ajwa-al-madinah-dates',
  },
  Poultry: {
    eyebrow: { en: 'Poultry', ar: 'الدواجن' },
    title: { en: 'Chilled chicken, cold-chain ready', ar: 'دجاج مبرد جاهز للسلسلة الباردة' },
    subtitle: {
      en: 'Whole chilled chicken for retail shelves and food-service kitchens.',
      ar: 'دجاج كامل مبرد لرفوف التجزئة ومطابخ المطاعم.',
    },
    hero: 'chilled-chicken',
  },
}

const MAX_THUMBS = 8

function isLocalImage(src: string) {
  return src.startsWith('/images/')
}

interface CategoryShowcaseBannerProps {
  categoryId: string
  products: Product[]
  lang: string
  primaryAction: { label: string; onClick?: () => void; href?: string }
}

export default function CategoryShowcaseBanner({
  categoryId,
  products,
  lang,
  primaryAction,
}: CategoryShowcaseBannerProps) {
  const showcase = CATEGORY_SHOWCASES[categoryId]
  if (!showcase) return null

  const isAr = lang === 'ar'
  const pool = products.filter((p) => p.category.en === categoryId && isLocalImage(p.image))
  if (pool.length === 0) return null

  const hero = pool.find((p) => p.slug === showcase.hero) ?? pool[0]
  const thumbs = [hero, ...pool.filter((p) => p.id !== hero.id)].slice(0, MAX_THUMBS)
  const title = tx(lang, showcase.title)
  const heroTitle = tx(lang, hero.title)
  const waText = isAr
    ? `مرحبًا خير الجوار، أرغب في عرض سعر لقسم ${showcase.eyebrow.ar}.`
    : `Hello Khair Al-Jewar, I'd like a quote for your ${showcase.eyebrow.en} range.`
  const waUrl = `https://wa.me/${BRAND.contact.phoneWa}?text=${encodeURIComponent(waText)}`
  const font = localeFontClass(lang)

  const primaryClass = cn(
    'flex-1 sm:flex-none inline-flex items-center justify-center min-h-[44px] px-3 sm:px-5 rounded-xl bg-secondary text-primary font-bold text-[13px] sm:text-sm text-center leading-tight touch-manipulation transition-colors hover:bg-secondary-200',
    font
  )

  return (
    <section
      aria-label={title}
      className="mb-5 overflow-hidden rounded-[1.35rem] border border-primary/15 bg-[linear-gradient(145deg,#0C1812_0%,#1A332A_55%,#2F5C48_100%)] shadow-[0_24px_60px_-36px_rgba(12,24,18,0.8)] sm:mb-8 sm:rounded-[1.75rem]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <Link
          href={`/${lang}/products/${hero.slug}`}
          className="relative block min-h-[190px] overflow-hidden bg-cream sm:min-h-[280px] lg:min-h-[340px]"
          aria-label={heroTitle}
        >
          <Image
            src={resolveProductImage(hero.image, hero.category.en, hero.slug)}
            alt={heroTitle}
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1812]/55 via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#0C1812]/40" />
          {isOrchardImage(hero.image) && <BrandStamp size="md" />}
        </Link>

        <div className={cn('relative flex min-w-0 flex-col justify-center gap-3 p-4 text-cream sm:gap-4 sm:p-8', font)}>
          <p className={cn('text-[11px] font-bold text-secondary sm:text-xs', isAr ? '' : 'uppercase tracking-[0.18em]')}>
            {tx(lang, showcase.eyebrow)}
          </p>
          <h2
            className={cn(
              'text-[1.45rem] font-bold leading-tight text-cream sm:text-3xl',
              isAr ? 'font-arabic-display' : 'font-display'
            )}
          >
            {title}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">
            {tx(lang, showcase.subtitle)}
          </p>

          {thumbs.length > 1 && (
            <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-1 scrollbar-hide">
              {thumbs.map((item) => {
                const label = tx(lang, item.title)
                return (
                  <Link
                    key={item.id}
                    href={`/${lang}/products/${item.slug}`}
                    className="w-[76px] shrink-0 snap-start overflow-hidden rounded-xl border border-cream/15 bg-cream/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 sm:w-[88px]"
                    aria-label={label}
                  >
                    <span className="relative block h-[4.25rem] w-full bg-cream sm:h-20">
                      <Image
                        src={resolveProductImage(item.image, item.category.en, item.slug)}
                        alt={label}
                        fill
                        sizes="88px"
                        className="object-cover"
                      />
                    </span>
                    <span className="line-clamp-2 block px-1.5 py-1.5 text-center text-[10.5px] font-semibold leading-tight text-cream/90 sm:text-[11px]">
                      {label}
                    </span>
                  </Link>
                )
              })}
            </div>
          )}

          <div className="flex gap-2 pt-1 sm:gap-2.5">
            {primaryAction.href ? (
              <a href={primaryAction.href} className={primaryClass}>
                {primaryAction.label}
              </a>
            ) : (
              <button type="button" onClick={primaryAction.onClick} className={primaryClass}>
                {primaryAction.label}
              </button>
            )}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 text-center text-[13px] font-bold leading-tight text-white touch-manipulation transition-colors hover:bg-[#1FB959] sm:flex-none sm:px-5 sm:text-sm"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
              {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
