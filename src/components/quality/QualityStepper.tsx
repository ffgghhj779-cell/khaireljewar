'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import ProgressBar from '@/components/ui/ProgressBar'

interface QualityStepperProps {
  lang: string
}

export default function QualityStepper({ lang }: QualityStepperProps) {
  const isAr = lang === 'ar'

  const steps = [
    {
      num: '01',
      title: isAr ? 'الزراعة والحصاد' : 'Farming & Harvest',
      desc: isAr ? 'مراقبة من البذور حتى الحصاد بتقنيات مستدامة.' : 'Seed-to-harvest monitoring with sustainable techniques.',
      metric: isAr ? 'تتبع الحقول' : 'Field Traceability',
      score: 100,
    },
    {
      num: '02',
      title: isAr ? 'الفرز والتعبئة' : 'Sorting & Packing',
      desc: isAr ? 'فرز آلي لضمان الحجم الموحد والجودة.' : 'Automated sorting for uniform size and defect-free quality.',
      metric: isAr ? 'دقة الفرز' : 'Sort Accuracy',
      score: 99.2,
    },
    {
      num: '03',
      title: isAr ? 'الفحص المخبري' : 'Lab Testing',
      desc: isAr ? 'تحليل الرطوبة والمتبقيات الكيميائية.' : 'Moisture and chemical residue analysis.',
      metric: isAr ? 'اختبارات/شحنة' : 'Tests/Shipment',
      score: 15,
      isCount: true,
    },
    {
      num: '04',
      title: isAr ? 'التبريد والشحن' : 'Cooling & Shipping',
      desc: isAr ? 'سلسلة تبريد متكاملة حتى ميناء الوصول.' : 'Integrated cold chain to destination port.',
      metric: isAr ? 'امتثال التبريد' : 'Cold Compliance',
      score: 99.8,
    },
  ]

  return (
    <div className="relative">
      <div className="hidden lg:block absolute top-12 start-0 end-0 h-px bg-gray-200" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -4 }}
            className="glass-panel rounded-2xl p-6 border border-gray-200 relative"
          >
            <div className="text-5xl font-black text-primary/15 absolute top-4 end-4 select-none">{step.num}</div>
            <div className="relative z-10">
              <h4 className={cn('text-lg font-bold text-dark mb-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                {step.title}
              </h4>
              <p className={cn('text-xs text-gray-500 leading-relaxed mb-4', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {step.desc}
              </p>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{step.metric}</span>
                <span className="text-xl font-black text-dark font-mono">
                  {step.isCount ? `${step.score}+` : `${step.score}%`}
                </span>
              </div>
              {!step.isCount && <ProgressBar value={step.score} showValue={false} color="primary" />}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
