'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import type { Product } from '@/lib/data/products'
import { BRAND_EASE, SCROLL_VIEWPORT_INSTANT } from '@/lib/constants/motion'
import { useLightMotion } from '@/hooks/useLightMotion'
import { cn } from '@/lib/utils/cn'

/** Bento placement for the desktop grid: one hero tile, a 2×2 block, then a wide closing row. */
const DESKTOP_SPANS = [
  'lg:col-span-2 lg:row-span-2',
  '',
  '',
  '',
  '',
  'lg:col-span-2',
  'lg:col-span-2',
]

function Tile({
  product,
  lang,
  index,
  hero,
  className,
}: {
  product: Product
  lang: string
  index: number
  hero?: boolean
  className?: string
}) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const title = isAr ? product.title.ar : product.title.en
  const category = isAr ? product.category.ar : product.category.en
  const badge = product.badge ? (isAr ? product.badge.ar : product.badge.en) : null
  const packshot = (product.imageFit ?? 'contain') === 'contain'

  return (
    <motion.div
      initial={lightMotion ? false : { opacity: 0, y: 18 }}
      whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={SCROLL_VIEWPORT_INSTANT}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3), ease: BRAND_EASE }}
      className={cn('h-full', className)}
    >
      <Link
        href={`/${lang}/products/${product.slug}`}
        className={cn(
          'group relative flex h-full min-h-[22rem] overflow-hidden rounded-[1.75rem] ring-1 ring-cream/10',
          'shadow-[0_24px_60px_-30px_rgba(0,0,0,0.65)] lg:min-h-0',
          packshot ? 'bg-gradient-to-b from-cream to-cream-deep' : 'bg-primary-800'
        )}
      >
        <Image
          src={product.image}
          alt={title}
          fill
          quality={82}
          priority={hero}
          sizes={hero ? '(max-width: 1024px) 80vw, 50vw' : '(max-width: 1024px) 80vw, 25vw'}
          className={cn(
            'transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]',
            packshot ? 'object-contain p-8 pb-28 md:p-10 md:pb-32' : 'object-cover',
            hero && !packshot && 'object-[50%_70%]'
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0',
            packshot
              ? 'bg-gradient-to-t from-primary/90 via-primary/10 to-transparent'
              : 'bg-gradient-to-t from-primary-900/95 via-primary-900/25 to-transparent'
          )}
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-5">
          {badge && (
            <span
              className={cn(
                'rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-primary shadow-sm',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {badge}
            </span>
          )}
          <span className="ms-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-primary opacity-90 shadow-sm transition-all duration-300 group-hover:bg-secondary group-hover:opacity-100">
            <ArrowUpRight className={cn('h-4 w-4', isAr && '-scale-x-100')} />
          </span>
        </div>

        <div className="relative mt-auto w-full p-5 md:p-6">
          <p
            className={cn(
              'mb-1.5 text-xs font-semibold text-secondary',
              isAr ? 'font-arabic' : 'font-sans uppercase tracking-[0.14em]'
            )}
          >
            {category}
          </p>
          <h3
            className={cn(
              'font-semibold leading-snug text-cream text-balance',
              hero ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {title}
          </h3>
          {hero && (
            <p
              className={cn(
                'mt-3 hidden max-w-md text-base leading-relaxed text-cream/75 lg:block',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? product.desc.ar : product.desc.en}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default function NewArrivals({ lang, products }: { lang: string; products: Product[] }) {
  const isAr = lang === 'ar'
  const lightMotion = useLightMotion()
  const items = products.filter((p) => p.isNew)
  if (!items.length) return null

  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 40% at 100% 0%, rgba(229,184,74,0.18), transparent 60%), radial-gradient(ellipse 45% 40% at 0% 100%, rgba(43,182,115,0.16), transparent 60%)',
        }}
      />

      <Container size="large" className="relative z-10">
        <motion.div
          initial={lightMotion ? false : { opacity: 0, y: 16 }}
          whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT_INSTANT}
          transition={{ duration: 0.5, ease: BRAND_EASE }}
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p
              className={cn(
                'mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3.5 py-1.5 text-sm font-semibold text-secondary',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              <Sparkles className="h-4 w-4" />
              {isAr ? 'وصل حديثاً' : 'Just arrived'}
            </p>
            <h2
              className={cn(
                'text-[clamp(2rem,6vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-cream text-balance',
                isAr ? 'font-arabic' : 'font-display'
              )}
            >
              {isAr ? 'جديد الموسم في خير الجوار.' : 'New this season at Khair Aljaar.'}
            </h2>
            <p className={cn('mt-4 text-base leading-relaxed text-cream/70 md:text-lg', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr
                ? 'عجوة المدينة، فراولة وكيوي، فلفل أحمر، ومجمدات جديدة. كل منتج له صفحة بصوره ومواصفاته، والسعر بعرض مكتوب.'
                : 'Ajwa from Al Madinah, strawberries and kiwi, red peppers, and new frozen lines. Each has its own page with photos and specs, priced by written quote.'}
            </p>
          </div>
          <Link
            href={`/${lang}/products?category=New`}
            className={cn(
              'inline-flex min-h-[48px] shrink-0 items-center gap-2 self-start rounded-xl bg-secondary px-6 font-semibold text-primary transition-colors hover:bg-secondary-400 md:self-auto',
              isAr ? 'font-arabic' : 'font-sans'
            )}
          >
            {isAr ? 'كل المنتجات الجديدة' : 'All new products'}
            <ArrowUpRight className={cn('h-4 w-4', isAr && '-scale-x-100')} />
          </Link>
        </motion.div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide lg:hidden">
          {items.map((product, index) => (
            <div key={product.id} className="w-[78vw] max-w-[340px] shrink-0 snap-start">
              <Tile product={product} lang={lang} index={index} hero={index === 0} />
            </div>
          ))}
        </div>

        <div className="hidden auto-rows-[17rem] grid-cols-4 gap-5 lg:grid">
          {items.slice(0, DESKTOP_SPANS.length).map((product, index) => (
            <Tile
              key={product.id}
              product={product}
              lang={lang}
              index={index}
              hero={index === 0}
              className={DESKTOP_SPANS[index]}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
