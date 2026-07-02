import { getProductBySlug, getProductSlugs } from '@/lib/actions/products'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'
import AddToCartButton from '@/components/ecom/AddToCartButton'
import { CheckCircle2, Calendar, Ruler, Package, MapPin } from 'lucide-react'

export async function generateStaticParams() {
  const langs = ['ar', 'en'] as const
  const slugs = await getProductSlugs()
  return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}

export default async function SingleProductPage({
  params: { lang, slug },
}: {
  params: { lang: string; slug: string }
}) {
  const isAr = lang === 'ar'
  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  const sizeMatrix = (isAr ? product.specs.ar : product.specs.en)[0]?.split(': ')[1]?.split('/') ?? []
  const seasons = product.harvestSeason.en.split(' – ')

  return (
    <div className="min-h-screen py-12">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 lg:h-screen lg:sticky top-0 bg-gray-50 relative overflow-hidden h-[50vh] border-e border-gray-200">
          <Image alt={product.slug} className="object-cover object-center" fill priority src={product.image} />
          <div className="absolute top-6 start-6 z-10">
            <span className="terminal-badge terminal-badge-live bg-white/90">
              {isAr ? product.availability.ar : product.availability.en}
            </span>
          </div>
        </div>

        <div className="lg:w-1/2 py-20 lg:py-28">
          <Container size="small">
            <div className="mb-6 flex items-center gap-3 flex-wrap">
              <span className="glass-badge px-3 py-1.5 text-micro text-dark rounded-lg">
                {isAr ? product.category.ar : product.category.en}
              </span>
              <span className="glass-badge px-3 py-1.5 text-micro text-dark-500 rounded-lg flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary" />
                {isAr ? product.origin.ar : product.origin.en}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                {isAr ? 'متاح للتصدير' : 'Export Ready'}
              </span>
            </div>

            <h1 className={cn('text-display-md font-black text-dark mb-6 leading-tight', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? product.title.ar : product.title.en}
            </h1>

            <p className={cn('text-lg text-gray-600 leading-relaxed mb-10', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr ? product.desc.ar : product.desc.en}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="data-cell rounded-xl">
                <Ruler className="w-4 h-4 text-primary mb-2" />
                <p className="text-[10px] font-bold text-gray-400 uppercase">{isAr ? 'المعايرة' : 'Sizing'}</p>
                <p className={cn('text-sm font-bold text-dark mt-1', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {isAr ? product.sizes.ar : product.sizes.en}
                </p>
              </div>
              <div className="data-cell rounded-xl">
                <Package className="w-4 h-4 text-primary mb-2" />
                <p className="text-[10px] font-bold text-gray-400 uppercase">{isAr ? 'التعبئة' : 'Packaging'}</p>
                <p className={cn('text-sm font-bold text-dark mt-1', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {isAr ? product.packaging.ar : product.packaging.en}
                </p>
              </div>
            </div>

            {sizeMatrix.length > 1 && (
              <div className="mb-10 border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                  <h3 className={cn('text-sm font-bold text-dark uppercase tracking-wider', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                    {isAr ? 'مصفوفة الأحجام' : 'Sizing Matrix'}
                  </h3>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-0">
                  {sizeMatrix.map((size, idx) => (
                    <div key={idx} className="p-3 text-center border-e border-b border-gray-100 text-sm font-mono font-bold text-dark hover:bg-primary/5 transition-colors">
                      {size.trim()}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-10 border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-secondary" />
                <h3 className={cn('text-lg font-bold text-dark', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                  {isAr ? 'التقويم الموسمي' : 'Seasonal Calendar'}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </div>
                <span className={cn('text-sm font-bold text-dark shrink-0', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {isAr ? product.harvestSeason.ar : product.harvestSeason.en}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6">
              <h3 className={cn('text-lg font-bold text-dark mb-4 border-b border-gray-200 pb-3', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                {isAr ? 'المواصفات الفنية' : 'Technical Specifications'}
              </h3>
              <ul className="space-y-3">
                {(isAr ? product.specs.ar : product.specs.en).map((spec, idx) => (
                  <li key={idx} className={cn('flex items-start gap-3 text-sm text-gray-700', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                    <span className="text-primary mt-0.5">●</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border-2 border-dark rounded-2xl p-6">
              <p className={cn('text-gray-500 text-sm font-medium mb-1', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {isAr ? 'الحد الأدنى للطلب (MOQ)' : 'Minimum Order Quantity (MOQ)'}
              </p>
              <div className="text-3xl font-black text-dark mb-2">
                {product.minOrder} {product.unit === 'Containers' ? (isAr ? 'حاوية' : 'Container(s)') : isAr ? 'طن متري' : 'Metric Tons'}
              </div>
              <AddToCartButton lang={lang} product={product} />
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
