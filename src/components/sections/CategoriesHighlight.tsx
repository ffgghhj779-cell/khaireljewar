'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import { ArrowUpRight } from 'lucide-react'

export default function CategoriesHighlight({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const categories = [
    {
      id: 'fruits',
      title: isAr ? 'فواكه طازجة' : 'Fresh Fruits',
      items: isAr ? '١٢ منتج' : '12 Items',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop',
      color: 'bg-orange-50',
      span: 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]'
    },
    {
      id: 'veg',
      title: isAr ? 'خضروات عضوية' : 'Organic Veggies',
      items: isAr ? '٢٤ منتج' : '24 Items',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=800&auto=format&fit=crop',
      color: 'bg-green-50',
      span: 'col-span-1 h-[300px]'
    },
    {
      id: 'dates',
      title: isAr ? 'تمور فاخرة' : 'Premium Dates',
      items: isAr ? '٨ منتجات' : '8 Items',
      image: 'https://picsum.photos/seed/dates/800/800',
      color: 'bg-amber-50',
      span: 'col-span-1 h-[300px]'
    },
    {
      id: 'dairy',
      title: isAr ? 'ألبان وأجبان' : 'Dairy & Cheese',
      items: isAr ? '١٦ منتج' : '16 Items',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=800&auto=format&fit=crop',
      color: 'bg-blue-50',
      span: 'md:col-span-2 h-[276px]'
    }
  ]

  return (
    <section id="categories" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className={cn("text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'عالم من المذاق' : 'A World of Taste'}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              {isAr ? 'اكتشف مجموعتنا المختارة بعناية من أفضل المزارع العالمية، حيث تلتقي الجودة الفائقة بالمذاق الأصيل في كل صنف.' : 'Discover our carefully curated selection from top global farms, where superior quality meets authentic taste in every category.'}
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors">
            {isAr ? 'عرض كافة الأقسام' : 'View All Categories'}
            <ArrowUpRight className={cn("w-5 h-5", isAr && "rotate-[-90deg]")} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min">
          {categories.map((cat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              key={cat.id}
              className={cn("group rounded-[2rem] p-8 cursor-pointer overflow-hidden relative flex flex-col justify-end shadow-sm hover:shadow-2xl transition-shadow duration-500", cat.span)}
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src={cat.image} 
                  alt={cat.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              </div>
              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className={cn("text-3xl font-black text-white mb-2", isAr ? 'font-ibm-arabic' : 'font-manrope')}>{cat.title}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-white/80 font-medium tracking-wide">{cat.items}</p>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className={cn("w-5 h-5 text-white", isAr && "rotate-[-90deg]")} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
