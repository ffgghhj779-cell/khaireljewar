'use client'

import { Truck, ShieldCheck, Leaf, RefreshCcw } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function StoreFeatures({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const features = [
    {
      icon: Leaf,
      title: isAr ? 'طبيعي ١٠٠٪' : '100% Natural',
      desc: isAr ? 'منتجات خالية من المواد الحافظة' : 'Products free from preservatives'
    },
    {
      icon: Truck,
      title: isAr ? 'توصيل سريع' : 'Fast Delivery',
      desc: isAr ? 'توصيل مبرد لباب بيتك' : 'Refrigerated delivery to your door'
    },
    {
      icon: ShieldCheck,
      title: isAr ? 'جودة مضمونة' : 'Guaranteed Quality',
      desc: isAr ? 'نضمن لك أفضل المنتجات' : 'We guarantee the best products'
    },
    {
      icon: RefreshCcw,
      title: isAr ? 'استرجاع سهل' : 'Easy Returns',
      desc: isAr ? 'سياسة استرجاع مرنة ومريحة' : 'Flexible and convenient return policy'
    }
  ]

  return (
    <section className="bg-dark text-white py-16 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 divide-y sm:divide-y-0 sm:divide-x divide-white/10 rtl:divide-x-reverse">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center pt-8 sm:pt-0 sm:px-6 first:pt-0 first:pl-0 last:pr-0">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-secondary mb-6 border border-white/10 shadow-[0_0_20px_rgba(255,138,0,0.1)]">
                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h4 className={cn("font-bold text-white mb-2 text-xl tracking-wide", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                {feature.title}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
