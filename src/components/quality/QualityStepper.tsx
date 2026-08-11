'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface QualityStepperProps {
  lang: string
}

export default function QualityStepper({ lang }: QualityStepperProps) {
  const isAr = lang === 'ar'

  const steps = [
    {
      num: '01',
      title: isAr ? 'الزراعة والحصاد' : 'Farming & harvest',
      desc: isAr ? 'متابعة من البذور حتى الحصاد بممارسات مسؤولة.' : 'Seed-to-harvest care with responsible practices.',
    },
    {
      num: '02',
      title: isAr ? 'الفرز والتعبئة' : 'Sorting & packing',
      desc: isAr ? 'فرز دقيق لضمان الحجم الموحد والجودة.' : 'Careful sorting for consistent size and quality.',
    },
    {
      num: '03',
      title: isAr ? 'الفحص المخبري' : 'Lab testing',
      desc: isAr ? 'تحليل الرطوبة والمتبقيات وفق متطلبات السوق.' : 'Moisture and residue analysis for market rules.',
    },
    {
      num: '04',
      title: isAr ? 'التبريد والشحن' : 'Cooling & shipping',
      desc: isAr ? 'سلسلة تبريد متكاملة حتى ميناء الوصول.' : 'Integrated cold chain through to destination port.',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {steps.map((step, i) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <p className={cn('text-primary/40 text-4xl font-bold mb-4', isAr ? 'font-arabic' : 'font-display')}>
            {step.num}
          </p>
          <h3 className={cn('text-lg font-bold text-dark mb-2', isAr ? 'font-arabic' : 'font-display')}>
            {step.title}
          </h3>
          <p className={cn('text-sm text-gray-600 leading-relaxed', isAr ? 'font-arabic' : 'font-sans')}>
            {step.desc}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
