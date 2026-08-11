import type { Metadata } from 'next'
import Link from 'next/link'
import { getProductBySlug, getProductSlugs, getProducts } from '@/lib/actions/products'
import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import ProductGallery from '@/components/ecom/ProductGallery'
import ProductStickyCta from '@/components/ecom/ProductStickyCta'
import ProductCard from '@/components/sections/ProductCard'
import AddToCartButton from '@/components/ecom/AddToCartButton'
import { buildPageMetadata } from '@/lib/seo'
import { resolveProductImage, SECTION_IMAGES } from '@/lib/constants/images'
import { COMPLIANCE_CERTIFICATES } from '@/lib/constants/brandAssets'
import { cn } from '@/lib/utils/cn'
import { ArrowLeft, MapPin, ShieldCheck, Snowflake, Package } from 'lucide-react'

export async function generateStaticParams() {
  const langs = ['ar', 'en'] as const
  const slugs = await getProductSlugs()
  return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata> {
  const product = await getProductBySlug(slug)
  if (!product) return {}
  const isAr = lang === 'ar'
  const title = isAr ? product.title.ar : product.title.en
  const description = isAr ? product.desc.ar : product.desc.en
  return buildPageMetadata({
    lang,
    path: `/products/${slug}`,
    title,
    description: description.slice(0, 160),
  })
}

export default async function SingleProductPage({
  params: { lang, slug },
}: {
  params: { lang: string; slug: string }
}) {
  const isAr = lang === 'ar'
  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  const all = await getProducts()
  const related = all
    .filter((p) => p.slug !== product.slug && p.category.en === product.category.en)
    .slice(0, 3)
  const relatedFallback =
    related.length > 0
      ? related
      : all.filter((p) => p.slug !== product.slug).slice(0, 3)

  const mainSrc = resolveProductImage(product.image, product.category.en, product.slug)
  const gallery = [
    {
      src: mainSrc,
      alt: isAr ? product.title.ar : product.title.en,
      fit: 'contain' as const,
    },
    {
      src: SECTION_IMAGES.editorialBoard,
      alt: isAr ? 'لوحة الحصاد' : 'Harvest board',
      fit: 'cover' as const,
    },
    {
      src: SECTION_IMAGES.hospitality,
      alt: isAr ? 'ضيافة جدة' : 'Jeddah hospitality',
      fit: 'cover' as const,
    },
  ]

  const unitLabel =
    product.unit === 'Containers'
      ? isAr
        ? 'حاوية'
        : 'container(s)'
      : isAr
        ? 'طن متري'
        : 'MT'

  const certs = COMPLIANCE_CERTIFICATES.slice(0, 4)

  return (
    <div className="min-h-screen bg-cream pb-[calc(10rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[48%] lg:sticky lg:top-[76px] lg:self-start lg:max-h-[calc(100dvh-76px)] overflow-hidden">
          <ProductGallery images={gallery} lang={lang} />
        </div>

        <div className="lg:w-[52%] py-10 md:py-14 lg:py-16">
          <Container size="small">
            <Link
              href={`/${lang}/products`}
              className={cn(
                'inline-flex items-center gap-2 text-sm font-semibold text-primary/55 hover:text-primary transition-colors mb-8',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              <ArrowLeft className={cn('w-4 h-4', isAr && 'rotate-180')} />
              {isAr ? 'كل المنتجات' : 'All products'}
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  'inline-flex px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold',
                  isAr ? 'font-arabic' : 'font-sans'
                )}
              >
                {isAr ? product.category.ar : product.category.en}
              </span>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 text-xs text-primary/55',
                  isAr ? 'font-arabic' : 'font-sans'
                )}
              >
                <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                {isAr ? product.origin.ar : product.origin.en}
              </span>
            </div>

            <h1
              className={cn(
                'text-3xl md:text-5xl font-bold text-primary tracking-tight mb-5',
                isAr ? 'font-arabic' : 'font-display'
              )}
            >
              {isAr ? product.title.ar : product.title.en}
            </h1>

            <p
              className={cn(
                'text-base md:text-lg text-primary/65 leading-relaxed mb-8 max-w-xl',
                isAr ? 'font-arabic' : 'font-sans'
              )}
            >
              {isAr ? product.desc.ar : product.desc.en}
            </p>

            {/* Season bar */}
            <div className="mb-10 rounded-2xl border border-primary/10 bg-cream-soft px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={cn('text-xs text-primary/45 mb-1', isAr ? 'font-arabic' : 'font-sans')}>
                    {isAr ? 'موسم الحصاد' : 'Harvest season'}
                  </p>
                  <p className={cn('text-sm font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
                    {isAr ? product.harvestSeason.ar : product.harvestSeason.en}
                  </p>
                </div>
                <div className="text-end">
                  <p className={cn('text-xs text-primary/45 mb-1', isAr ? 'font-arabic' : 'font-sans')}>
                    {isAr ? 'التوفر' : 'Availability'}
                  </p>
                  <p className={cn('text-sm font-semibold text-primary', isAr ? 'font-arabic' : 'font-display')}>
                    {isAr ? product.availability.ar : product.availability.en}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-10 pb-10 border-b border-primary/10">
              <Spec label={isAr ? 'المعايرة' : 'Sizing'} value={isAr ? product.sizes.ar : product.sizes.en} isAr={isAr} />
              <Spec
                label={isAr ? 'التعبئة' : 'Packaging'}
                value={isAr ? product.packaging.ar : product.packaging.en}
                isAr={isAr}
              />
              {product.brix && <Spec label={isAr ? 'نسبة السكر' : 'Brix'} value={product.brix} isAr={isAr} />}
              <Spec
                label={isAr ? 'التصنيف' : 'Class'}
                value={isAr ? product.commodityClass.ar : product.commodityClass.en}
                isAr={isAr}
              />
            </div>

            <div className="mb-10">
              <h2 className={cn('text-lg font-bold text-primary mb-4', isAr ? 'font-arabic' : 'font-display')}>
                {isAr ? 'المواصفات' : 'Specifications'}
              </h2>
              <ul className="space-y-3">
                {(isAr ? product.specs.ar : product.specs.en).map((spec) => (
                  <li
                    key={spec}
                    className={cn(
                      'flex items-start gap-3 text-[15px] text-primary/65 leading-relaxed',
                      isAr ? 'font-arabic' : 'font-sans'
                    )}
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust chips */}
            <div className="mb-10 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  t: isAr ? 'درجة تصدير' : 'Export grade',
                },
                {
                  icon: Snowflake,
                  t: isAr ? 'سلسلة تبريد' : 'Cold chain',
                },
                {
                  icon: Package,
                  t: isAr ? 'تعبئة منضبطة' : 'Pack discipline',
                },
              ].map(({ icon: Icon, t }) => (
                <div
                  key={t}
                  className="flex items-center gap-2.5 rounded-xl border border-primary/10 bg-white/60 px-3.5 py-3"
                >
                  <Icon className="h-4 w-4 text-primary shrink-0" strokeWidth={1.75} />
                  <span className={cn('text-xs font-semibold text-primary', isAr ? 'font-arabic' : 'font-sans')}>
                    {t}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <p className={cn('text-xs font-semibold text-primary/45 mb-3', isAr ? 'font-arabic' : 'font-sans')}>
                {isAr ? 'إطار الامتثال' : 'Compliance frame'}
              </p>
              <div className="flex flex-wrap gap-2">
                {certs.map((c) => (
                  <span
                    key={c.id}
                    className={cn(
                      'inline-flex rounded-full border border-primary/12 bg-cream-soft px-3 py-1.5 text-[11px] font-semibold text-primary/80',
                      isAr ? 'font-arabic' : 'font-sans'
                    )}
                  >
                    {isAr ? c.nameAr : c.nameEn}
                  </span>
                ))}
                <Link
                  href={`/${lang}/quality`}
                  className={cn(
                    'inline-flex rounded-full border border-secondary/40 bg-secondary/20 px-3 py-1.5 text-[11px] font-semibold text-primary',
                    isAr ? 'font-arabic' : 'font-sans'
                  )}
                >
                  {isAr ? 'التفاصيل ←' : 'Details →'}
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-primary p-6 md:p-8 text-cream shadow-soft">
              <p className={cn('text-sm text-cream/65 mb-1', isAr ? 'font-arabic' : 'font-sans')}>
                {isAr ? 'الحد الأدنى للطلب' : 'Minimum order'}
              </p>
              <p className={cn('text-3xl font-bold mb-1', isAr ? 'font-arabic' : 'font-display')}>
                {product.minOrder}{' '}
                <span className="text-lg font-semibold text-cream/65">{unitLabel}</span>
              </p>
              {product.indexPrice && (
                <p className={cn('text-sm text-secondary mb-4', isAr ? 'font-arabic' : 'font-sans')}>
                  {isAr ? `مؤشر: ${product.indexPrice}` : `Index: ${product.indexPrice}`}
                </p>
              )}
              <AddToCartButton lang={lang} product={product} variant="onDark" />
              <p className={cn('mt-4 text-xs text-cream/50', isAr ? 'font-arabic' : 'font-sans')}>
                {isAr
                  ? 'أضف للتسعير ثم أرسل الطلب عبر واتساب من السلة.'
                  : 'Add to quote, then send via WhatsApp from the cart.'}
              </p>
            </div>
          </Container>
        </div>
      </div>

      {relatedFallback.length > 0 && (
        <section className="border-t border-primary/8 bg-cream-soft py-16 md:py-20">
          <Container>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className={cn('text-2xl md:text-3xl font-medium text-primary', isAr ? 'font-arabic' : 'font-display')}>
                {isAr ? 'منتجات ذات صلة' : 'Related products'}
              </h2>
              <Link
                href={`/${lang}/products`}
                className={cn('text-sm font-semibold text-primary hover:underline', isAr ? 'font-arabic' : 'font-sans')}
              >
                {isAr ? 'الكل' : 'View all'}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {relatedFallback.map((p, i) => (
                <ProductCard key={p.id} product={p} lang={lang} index={i} compact />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ProductStickyCta product={product} lang={lang} />
    </div>
  )
}

function Spec({ label, value, isAr }: { label: string; value: string; isAr: boolean }) {
  return (
    <div>
      <p className={cn('text-xs text-primary/40 mb-1', isAr ? 'font-arabic' : 'font-sans')}>{label}</p>
      <p className={cn('text-sm font-semibold text-primary leading-snug', isAr ? 'font-arabic' : 'font-sans')}>
        {value}
      </p>
    </div>
  )
}
