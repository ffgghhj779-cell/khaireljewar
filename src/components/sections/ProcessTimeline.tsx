'use client'

import { motion } from 'framer-motion'
import { Sprout, PackageSearch, Ship, FileCheck2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function ProcessTimeline({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const steps = [
    {
      icon: Sprout,
      title: isAr ? 'الزراعة والحصاد' : 'Farming & Harvesting',
      desc: isAr ? 'إشراف زراعي كامل وتحديد الوقت الأمثل للحصاد لضمان أعلى جودة.' : 'Full agricultural supervision and determining the optimal harvest time for highest quality.'
    },
    {
      icon: PackageSearch,
      title: isAr ? 'الفرز والتعبئة' : 'Sorting & Packing',
      desc: isAr ? 'محطات تعبئة حديثة مع فرز إلكتروني دقيق وتعبئة تناسب كل سوق.' : 'Modern packing stations with precise electronic sorting and market-specific packaging.'
    },
    {
      icon: FileCheck2,
      title: isAr ? 'الفحص والجودة' : 'Inspection & Quality',
      desc: isAr ? 'فحص دقيق قبل الشحن لضمان خلو المنتجات من العيوب ومطابقتها للمواصفات.' : 'Rigorous pre-shipment inspection to ensure defect-free products meeting specifications.'
    },
    {
      icon: Ship,
      title: isAr ? 'الشحن واللوجستيات' : 'Shipping & Logistics',
      desc: isAr ? 'شحن مبرد وتحكم بدرجات الحرارة لضمان وصول المنتج طازجاً لوجهته.' : 'Refrigerated shipping with temperature control ensuring products arrive fresh.'
    }
  ]

  return (
    <section className="py-24 bg-[#F8F9FA] border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className={cn("text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'دورة الجودة الشاملة' : 'Comprehensive Quality Cycle'}
          </h2>
          <p className="text-xl text-gray-500">
            {isAr 
              ? 'رحلة المنتج من البذرة إلى ميناء الوصول، تخضع لأعلى معايير الرقابة والمتابعة.' 
              : 'The product journey from seed to destination port, subject to the highest standards of control and monitoring.'}
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-black text-gray-100 absolute top-8 right-8 pointer-events-none">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed relative z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
