'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Plus, Check, ChevronRight, Info } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useQuoteStore } from '@/store/useQuoteStore'

export default function ProductsShowcase({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const { addItem, toggleCart } = useQuoteStore()

  const categories = [
    { id: 'all', name: isAr ? 'الكل' : 'All' },
    { id: 'citrus', name: isAr ? 'موالح' : 'Citrus' },
    { id: 'vegetables', name: isAr ? 'خضروات' : 'Vegetables' },
    { id: 'fruits', name: isAr ? 'فواكه' : 'Fruits' },
  ]

  const products = [
    {
      id: 'p1',
      name: isAr ? 'برتقال أبو سرة' : 'Navel Oranges',
      category: 'citrus',
      image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=800&auto=format&fit=crop',
      badges: ['Premium', 'Export Grade'],
      specs: [
        { label: isAr ? 'الأحجام' : 'Sizes', value: '44, 48, 56, 64, 72, 80, 88' },
        { label: isAr ? 'التعبئة' : 'Packing', value: '15kg Telescopic Carton' },
        { label: isAr ? 'الحد الأدنى' : 'MOQ', value: '1 Container (24 MT)' },
      ],
      availability: isAr ? 'متاح الآن' : 'Available Now'
    },
    {
      id: 'p2',
      name: isAr ? 'بطاطس سبونتا' : 'Spunta Potatoes',
      category: 'vegetables',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop',
      badges: ['Organic Options', 'Washed'],
      specs: [
        { label: isAr ? 'الأحجام' : 'Sizes', value: '45mm+, 55mm+' },
        { label: isAr ? 'التعبئة' : 'Packing', value: '10kg / 25kg Mesh Bags' },
        { label: isAr ? 'الحد الأدنى' : 'MOQ', value: '1 Container (28 MT)' },
      ],
      availability: isAr ? 'متاح الآن' : 'Available Now'
    },
    {
      id: 'p3',
      name: isAr ? 'بصل أحمر' : 'Red Onions',
      category: 'vegetables',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=800&auto=format&fit=crop',
      badges: ['Export Grade', 'Long Shelf Life'],
      specs: [
        { label: isAr ? 'الأحجام' : 'Sizes', value: '50-70mm, 70-90mm' },
        { label: isAr ? 'التعبئة' : 'Packing', value: '25kg Mesh Bags' },
        { label: isAr ? 'الحد الأدنى' : 'MOQ', value: '1 Container (28 MT)' },
      ],
      availability: isAr ? 'متاح الآن' : 'Available Now'
    },
    {
      id: 'p4',
      name: isAr ? 'رمان وندرفل' : 'Wonderful Pomegranates',
      category: 'fruits',
      image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?q=80&w=800&auto=format&fit=crop',
      badges: ['Premium Quality', 'High Brix'],
      specs: [
        { label: isAr ? 'الأحجام' : 'Sizes', value: '6, 7, 8, 9, 10, 11, 12' },
        { label: isAr ? 'التعبئة' : 'Packing', value: '4.5kg Open Top Carton' },
        { label: isAr ? 'الحد الأدنى' : 'MOQ', value: '1 Container (18 MT)' },
      ],
      availability: isAr ? 'متاح الآن' : 'Available Now'
    },
    {
      id: 'p5',
      name: isAr ? 'ثوم طازج' : 'Fresh Garlic',
      category: 'vegetables',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      badges: ['Strong Flavor', 'Export Grade'],
      specs: [
        { label: isAr ? 'الأحجام' : 'Sizes', value: '50mm, 55mm, 60mm, 65mm+' },
        { label: isAr ? 'التعبئة' : 'Packing', value: '5kg Plastic Box / 10kg Mesh' },
        { label: isAr ? 'الحد الأدنى' : 'MOQ', value: '1 Container (12 MT)' },
      ],
      availability: isAr ? 'متاح للتعاقد' : 'Contracting'
    },
    {
      id: 'p6',
      name: isAr ? 'عنب كريمسون' : 'Crimson Seedless Grapes',
      category: 'fruits',
      image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=800&auto=format&fit=crop',
      badges: ['Sweet', 'Seedless'],
      specs: [
        { label: isAr ? 'الأحجام' : 'Sizes', value: '18mm+' },
        { label: isAr ? 'التعبئة' : 'Packing', value: '4.5kg Carton (500g punnets)' },
        { label: isAr ? 'الحد الأدنى' : 'MOQ', value: '1 Container (12 MT)' },
      ],
      availability: isAr ? 'موسم قريب' : 'Coming Soon'
    }
  ]

  const handleAdd = (p: any) => {
    addItem({
      id: p.id,
      slug: p.id,
      title: { en: p.name, ar: p.name },
      packaging: p.specs.find((s: any) => s.label === 'Packing' || s.label === 'التعبئة')?.value || '',
      quantity: 1,
      image: p.image,
      unit: 'MT',
    }, lang)
    toggleCart()
  }

  return (
    <section className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className={cn("text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'كتالوج المنتجات' : 'Product Catalog'}
            </h2>
            <p className="text-xl text-gray-500">
              {isAr 
                ? 'تشكيلة واسعة من المحاصيل الزراعية المختارة بعناية لتلبية احتياجات الأسواق العالمية.' 
                : 'A wide range of carefully selected agricultural crops to meet global market demands.'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button 
                key={cat.id}
                className={cn(
                  "px-6 py-2.5 rounded-full font-bold text-sm transition-all",
                  i === 0 
                    ? "bg-gray-900 text-white shadow-md" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={product.id} 
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all overflow-hidden flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-64 w-full bg-gray-50 overflow-hidden">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    {product.badges.map(badge => (
                      <span key={badge} className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm w-fit">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-sm",
                    product.availability.includes('Now') || product.availability.includes('الآن')
                      ? "bg-green-500/90 text-white"
                      : "bg-orange-500/90 text-white"
                  )}>
                    {product.availability}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Info className="w-4 h-4" />
                    <span>{isAr ? 'مواصفات التصدير' : 'Export Specifications'}</span>
                  </div>
                </div>

                {/* Specs List */}
                <div className="space-y-3 mb-8 flex-1">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500 font-medium">{spec.label}</span>
                      <span className="text-gray-900 font-bold text-sm text-right max-w-[60%]">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Action */}
                <button 
                  onClick={() => handleAdd(product)}
                  className="w-full bg-gray-50 hover:bg-primary text-gray-900 hover:text-white border border-gray-200 hover:border-primary py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <Plus className="w-5 h-5" />
                  {isAr ? 'إضافة لطلب التسعير' : 'Add to Quote Request'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:text-primary/80 transition-colors">
            {isAr ? 'عرض كل المنتجات' : 'View All Products'}
            <ChevronRight className={cn("w-5 h-5", isAr && "rotate-180")} />
          </button>
        </div>
      </div>
    </section>
  )
}
