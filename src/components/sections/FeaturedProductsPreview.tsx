'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import { MOCK_PRODUCTS } from '@/lib/data/products'
import { cn } from '@/lib/utils/cn'

export default function FeaturedProductsPreview({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  return (
    <section className="py-24 bg-white relative z-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm block mb-2">
              {isAr ? 'كتالوج المحاصيل الفاخرة' : 'EXPORT READY STOCK'}
            </span>
            <h2 className={cn("text-4xl md:text-6xl font-black text-dark tracking-tight", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'أفضل المنتجات للتصدير' : 'Premium Harvest Catalog'}
            </h2>
          </div>
          <Link className="px-8 py-4 bg-dark text-white rounded-xl font-bold hover:bg-primary hover:text-dark transition-all duration-300" href={`/${lang}/products`}>
            {isAr ? 'عرض الكتالوج الكامل' : 'Browse All Products'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_PRODUCTS.map((product) => (
            <div className="group bg-[#F8F9FA] rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row h-auto md:h-80" key={product.id}>
              <div className="relative w-full md:w-2/5 h-64 md:h-full overflow-hidden">
                <Image alt={product.title.en} className="object-cover transition-transform duration-700 group-hover:scale-105" fill sizes="(max-width: 768px) 100vw, 20vw" src={product.image}/>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-primary tracking-wider block mb-1">
                    {isAr ? product.category.ar : product.category.en}
                  </span>
                  <h3 className={cn("text-2xl font-bold text-dark mb-2 group-hover:text-primary transition-colors", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                    {isAr ? product.title.ar : product.title.en}
                  </h3>
                  <p className={cn("text-gray-500 text-sm leading-relaxed line-clamp-3", isAr ? 'font-ibm-arabic' : 'font-inter')}>
                    {isAr ? product.desc.ar : product.desc.en}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gray-200/60 pt-4">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    MOQ: {product.minOrder} {isAr ? 'طن' : 'Tons'}
                  </span>
                  <Link className="text-sm font-bold text-dark underline decoration-2 decoration-primary underline-offset-4 hover:text-primary transition" href={`/${lang}/products/${product.slug}`}>
                    {isAr ? 'عرض التفاصيل والطلب' : 'View Specs'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
