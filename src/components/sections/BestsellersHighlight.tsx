'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function BestsellersHighlight({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const products = [
    {
      id: 'bs1',
      name: isAr ? 'عسل نحل طبيعي' : 'Natural Honey',
      price: '$12.00',
      rating: 4.9,
      image: 'https://picsum.photos/seed/honey/800/800'
    },
    {
      id: 'bs2',
      name: isAr ? 'زيت زيتون بكر' : 'Extra Virgin Olive Oil',
      price: '$18.50',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'bs3',
      name: isAr ? 'تمر مجدول فاخر' : 'Premium Medjool Dates',
      price: '$22.00',
      rating: 5.0,
      image: 'https://picsum.photos/seed/dates/800/800'
    },
    {
      id: 'bs4',
      name: isAr ? 'لوز محمص مقرمش' : 'Crunchy Roasted Almonds',
      price: '$14.00',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=800&auto=format&fit=crop'
    }
  ]

  return (
    <section id="bestsellers" className="py-20 bg-[#FDFDFD]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className={cn("text-3xl md:text-5xl font-black text-gray-900 mb-4", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'الأكثر مبيعاً' : 'Best Sellers'}
            </h2>
            <p className="text-gray-500 text-lg">
              {isAr ? 'المنتجات المفضلة لدى عملائنا' : 'Our customers favorite products'}
            </p>
          </div>
          <button className="hidden md:block text-primary font-bold hover:underline">
            {isAr ? 'عرض الكل' : 'View All'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={product.id}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
            >
              <div className="relative h-60 w-full overflow-hidden bg-gray-50">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {product.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 text-xl mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-primary font-black text-2xl">{product.price}</span>
                  <button className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
