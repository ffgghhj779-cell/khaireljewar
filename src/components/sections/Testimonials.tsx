'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function Testimonials({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const reviews = [
    {
      id: 1,
      name: isAr ? 'أحمد محمد' : 'Ahmed Mohamed',
      role: isAr ? 'عميل دائم' : 'Regular Customer',
      content: isAr 
        ? 'جودة المنتجات ممتازة جداً والتوصيل سريع. أفضل متجر غذائي تعاملت معه.' 
        : 'The quality of the products is excellent and delivery is fast. Best grocery store I have dealt with.',
      rating: 5
    },
    {
      id: 2,
      name: isAr ? 'سارة عبد الله' : 'Sarah Abdullah',
      role: isAr ? 'عميلة جديدة' : 'New Customer',
      content: isAr 
        ? 'الخضروات والفواكه طازجة كأنها مقطوفة اليوم. التغليف رائع ومحكم.' 
        : 'Vegetables and fruits are fresh as if picked today. The packaging is wonderful and tight.',
      rating: 5
    },
    {
      id: 3,
      name: isAr ? 'خالد العتيبي' : 'Khalid Alotaibi',
      role: isAr ? 'عميل دائم' : 'Regular Customer',
      content: isAr 
        ? 'خدمة عملاء راقية ومنتجات عضوية حقيقية. أنصح الجميع بتجربة منتجاتهم.' 
        : 'Classy customer service and real organic products. I advise everyone to try their products.',
      rating: 4.5
    }
  ]

  return (
    <section className="py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Quote className="w-12 h-12 text-primary/20 mx-auto mb-4" />
          <h2 className={cn("text-3xl md:text-5xl font-black text-gray-900 mb-4", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'ماذا يقول عملاؤنا' : 'What Our Customers Say'}
          </h2>
          <p className="text-gray-500 text-lg">
            {isAr ? 'ثقتكم هي سر نجاحنا، ونسعى دائماً لتقديم الأفضل' : 'Your trust is the secret to our success, and we always strive to provide the best'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={review.id}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn("w-5 h-5", i < Math.floor(review.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200")} 
                  />
                ))}
              </div>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
