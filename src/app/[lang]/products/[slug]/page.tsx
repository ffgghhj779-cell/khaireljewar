import { tx, txList, localeFontClass, localeDisplayClass } from '@/lib/i18n/localize'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getProductBySlug, getProductSlugs, getProducts } from '@/lib/actions/products'
import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import ProductGallery from '@/components/ecom/ProductGallery'
import ProductStickyCta from '@/components/ecom/ProductStickyCta'
import ProductCard from '@/components/sections/ProductCard'
import AddToCartButton from '@/components/ecom/AddToCartButton'
import { formatEgp, getConsumerUnit, getRetailPriceEgp } from '@/lib/commerce/pricing'
import { buildPageMetadata, breadcrumbJsonLd, productJsonLd, productSearchCopy } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { cleanShotFor, resolveProductImage, SECTION_IMAGES } from '@/lib/constants/images'
import { GALLERY_EXTRAS } from '@/lib/data/seasonCatalog'
import { COMPLIANCE_CERTIFICATES } from '@/lib/constants/brandAssets'
import { cn } from '@/lib/utils/cn'
import { ArrowLeft, MapPin, ShieldCheck, Snowflake, Package } from 'lucide-react'

export const dynamicParams = true
export const revalidate = 60

export async function generateStaticParams() {
  const langs = ['ar', 'en', 'ur', 'hi'] as const
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
  const search = productSearchCopy({
    lang,
    name: tx(lang, product.title),
    minOrder: product.quoteOnly ? undefined : product.minOrder,
    unit: product.unit,
  })
  const image = resolveProductImage(product.image, product.category.en, product.slug)
  return buildPageMetadata({
    lang,
    path: `/products/${slug}`,
    title: search.title,
    description: search.description,
    image,
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
  const toGalleryImage = (img: NonNullable<typeof product.gallery>[number]) => ({
    src: img.src,
    alt: tx(lang, img.alt),
    fit: img.fit ?? ('contain' as const),
  })
  const extras = GALLERY_EXTRAS[product.slug]
  const cleanShot = cleanShotFor(product.image)
  const productTitle = tx(lang, product.title)
  const gallery = product.gallery?.length
    ? product.gallery.map(toGalleryImage)
    : [
        {
          src: mainSrc,
          alt: productTitle,
          fit: product.imageFit ?? (cleanShot ? ('cover' as const) : ('contain' as const)),
        },
        ...(cleanShot
          ? [{ src: cleanShot, alt: isAr ? `${productTitle} عن قرب` : `${productTitle}, close-up`, fit: 'cover' as const }]
          : []),
        ...(extras?.length
          ? extras.map(toGalleryImage)
          : cleanShot
            ? []
            : [
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
            ]),
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
      <JsonLd
        data={[
          productJsonLd({
            lang,
            slug: product.slug,
            name: tx(lang, product.title),
            description: tx(lang, product.desc),
            image: mainSrc,
            sku: product.id,
            category: tx(lang, product.category),
            origin: tx(lang, product.origin),
          }),
          breadcrumbJsonLd(lang, [
            { name: isAr ? 'المنتجات' : 'Products', path: '/products' },
            { name: tx(lang, product.title), path: `/products/${product.slug}` },
          ]),
        ]}
      />
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
                localeFontClass(lang)
              )}
            >
              <ArrowLeft className={cn('w-4 h-4', isAr && 'rotate-180')} />
              {isAr ? 'كل المنتجات' : 'All products'}
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  'inline-flex px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold',
                  localeFontClass(lang)
                )}
              >
                {tx(lang, product.category)}
              </span>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 text-xs text-primary/55',
                  localeFontClass(lang)
                )}
              >
                <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                {tx(lang, product.origin)}
              </span>
            </div>

            <h1
              className={cn(
                'text-3xl md:text-5xl font-bold text-primary tracking-tight mb-5',
                localeDisplayClass(lang)
              )}
            >
              {tx(lang, product.title)}
            </h1>

            <p
              className={cn(
                'text-base md:text-lg text-primary/65 leading-relaxed mb-8 max-w-xl',
                localeFontClass(lang)
              )}
            >
              {tx(lang, product.desc)}
            </p>

            {/* Season bar */}
            <div className="mb-10 rounded-2xl border border-primary/10 bg-cream-soft px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={cn('text-xs text-primary/45 mb-1', localeFontClass(lang))}>
                    {isAr ? 'موسم الحصاد' : 'Harvest season'}
                  </p>
                  <p className={cn('text-sm font-semibold text-primary', localeDisplayClass(lang))}>
                    {tx(lang, product.harvestSeason)}
                  </p>
                </div>
                <div className="text-end">
                  <p className={cn('text-xs text-primary/45 mb-1', localeFontClass(lang))}>
                    {isAr ? 'التوفر' : 'Availability'}
                  </p>
                  <p className={cn('text-sm font-semibold text-primary', localeDisplayClass(lang))}>
                    {tx(lang, product.availability)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-x-6 gap-y-5 border-b border-primary/10 pb-10 sm:grid-cols-2 sm:gap-y-6">
              <Spec label={isAr ? 'المعايرة' : 'Sizing'} value={tx(lang, product.sizes)} lang={lang} />
              <Spec
                label={isAr ? 'التعبئة' : 'Packaging'}
                value={tx(lang, product.packaging)}
                lang={lang}
              />
              {product.brix && <Spec label={isAr ? 'نسبة السكر' : 'Brix'} value={product.brix} lang={lang} />}
              <Spec
                label={isAr ? 'التصنيف' : 'Class'}
                value={tx(lang, product.commodityClass)}
                lang={lang}
              />
            </div>

            <div className="mb-10">
              <h2 className={cn('text-lg font-bold text-primary mb-4', localeDisplayClass(lang))}>
                {isAr ? 'المواصفات' : 'Specifications'}
              </h2>
              <ul className="space-y-3">
                {txList(lang, product.specs).map((spec) => (
                  <li
                    key={spec}
                    className={cn(
                      'flex items-start gap-3 text-[15px] text-primary/65 leading-relaxed',
                      localeFontClass(lang)
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
                  <span className={cn('text-xs font-semibold text-primary', localeFontClass(lang))}>
                    {t}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <p className={cn('text-xs font-semibold text-primary/45 mb-3', localeFontClass(lang))}>
                {isAr ? 'إطار الامتثال' : 'Compliance frame'}
              </p>
              <div className="flex flex-wrap gap-2">
                {certs.map((c) => (
                  <span
                    key={c.id}
                    className={cn(
                      'inline-flex rounded-full border border-primary/12 bg-cream-soft px-3 py-1.5 text-[11px] font-semibold text-primary/80',
                      localeFontClass(lang)
                    )}
                  >
                    {isAr ? c.nameAr : c.nameEn}
                  </span>
                ))}
                <Link
                  href={`/${lang}/quality`}
                  className={cn(
                    'inline-flex rounded-full border border-secondary/40 bg-secondary/20 px-3 py-1.5 text-[11px] font-semibold text-primary',
                    localeFontClass(lang)
                  )}
                >
                  {isAr ? 'التفاصيل ←' : 'Details →'}
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-farm/25 bg-farm-soft p-6 md:p-8 text-primary shadow-soft">
              {product.quoteOnly ? (
                <>
                  <p className={cn('text-sm text-primary/60 mb-1', localeFontClass(lang))}>
                    {isAr ? 'جملة' : 'Wholesale'}
                  </p>
                  <p className={cn('text-3xl font-bold mb-3', localeDisplayClass(lang))}>
                    {isAr ? 'السعر بعرض مكتوب' : 'Price by written quote'}
                  </p>
                  <p className={cn('text-sm text-primary/70 mb-5 leading-relaxed', localeFontClass(lang))}>
                    {isAr
                      ? 'السعر يتحدد حسب الكمية والعبوة والوجهة. عرض السعر المكتوب هو اللي يثبت الصفقة.'
                      : 'Price depends on quantity, pack, and destination. The written quotation confirms the deal.'}
                  </p>
                  <Link
                    href={`/${lang}/contact`}
                    className={cn(
                      'inline-flex min-h-[48px] items-center justify-center rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-primary',
                      localeFontClass(lang)
                    )}
                  >
                    {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
                  </Link>
                </>
              ) : (
                <>
                  <p className={cn('text-sm text-primary/60 mb-1', localeFontClass(lang))}>
                    {isAr ? 'سعر التجزئة (مصر)' : 'Retail price (Egypt)'}
                  </p>
                  <p className={cn('text-3xl font-bold mb-1', localeDisplayClass(lang))}>
                    {formatEgp(getRetailPriceEgp(product), lang)}
                  </p>
                  <p className={cn('text-sm text-farm font-semibold mb-4', localeFontClass(lang))}>
                    {isAr
                      ? `لكل ${getConsumerUnit(product).ar} · شحن ${formatEgp(49, lang)} داخل مصر`
                      : `Per ${getConsumerUnit(product).en} · ${formatEgp(49, lang)} shipping in Egypt`}
                  </p>
                  <AddToCartButton lang={lang} product={product} variant="accent" />
                  <p className={cn('mt-4 text-xs text-primary/55', localeFontClass(lang))}>
                    {isAr
                      ? 'أضف للسلة ثم ادفع بالبطاقة أو المحفظة عبر Paymob.'
                      : 'Add to cart, then pay by card or wallet via Paymob.'}
                  </p>
                </>
              )}
              <p className={cn('mt-4 text-xs text-primary/50', localeFontClass(lang))}>
                {product.quoteOnly
                  ? isAr
                    ? 'الكمية والحد الأدنى يتحددوا في عرض السعر'
                    : 'Quantity and minimum order are set in the quote'
                  : isAr
                    ? `حد أدنى للجملة: ${product.minOrder} ${unitLabel}`
                    : `Wholesale MOQ: ${product.minOrder} ${unitLabel}`}
              </p>
            </div>
          </Container>
        </div>
      </div>

      {relatedFallback.length > 0 && (
        <section className="border-t border-primary/8 bg-cream-soft py-16 md:py-20">
          <Container>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className={cn('text-2xl md:text-3xl font-medium text-primary', localeDisplayClass(lang))}>
                {isAr ? 'منتجات ذات صلة' : 'Related products'}
              </h2>
              <Link
                href={`/${lang}/products`}
                className={cn('text-sm font-semibold text-primary hover:underline', localeFontClass(lang))}
              >
                {isAr ? 'الكل' : 'View all'}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
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

function Spec({
  label,
  value,
  lang,
}: {
  label: string
  value: string
  lang: string
  isAr?: boolean
}) {
  return (
    <div>
      <p className={cn('text-xs text-primary/40 mb-1', localeFontClass(lang))}>{label}</p>
      <p className={cn('text-sm font-semibold text-primary leading-snug', localeFontClass(lang))}>
        {value}
      </p>
    </div>
  )
}
