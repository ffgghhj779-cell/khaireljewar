'use client'

import { motion } from 'framer-motion'
import { ThermometerSnowflake, Truck, Ship, Warehouse, MapPin, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import ProgressBar from '@/components/ui/ProgressBar'

interface ColdChainStepperProps {
  lang: string
  activeStep?: number
}

export default function ColdChainStepper({ lang, activeStep = 3 }: ColdChainStepperProps) {
  const isAr = lang === 'ar'

  const steps = [
    {
      icon: Warehouse,
      title: isAr ? 'محطة التعبئة' : 'Packhouse',
      temp: '4°C',
      desc: isAr ? 'فرز وتعبئة مبردة' : 'Chilled sorting & packing',
      progress: 100,
    },
    {
      icon: Truck,
      title: isAr ? 'نقل بري' : 'Road Transport',
      temp: '2°C',
      desc: isAr ? 'شاحنات مبردة GPS' : 'GPS reefer trucks',
      progress: 100,
    },
    {
      icon: Ship,
      title: isAr ? 'الشحن البحري' : 'Sea Freight',
      temp: '-1°C',
      desc: isAr ? 'حاويات مبردة نشطة' : 'Active reefer containers',
      progress: activeStep >= 3 ? 72 : 0,
    },
    {
      icon: MapPin,
      title: isAr ? 'ميناء الوصول' : 'Destination Port',
      temp: '0°C',
      desc: isAr ? 'تفريغ ومراقبة' : 'Discharge & inspection',
      progress: activeStep >= 4 ? 100 : 15,
    },
    {
      icon: CheckCircle2,
      title: isAr ? 'التسليم' : 'Delivery',
      temp: 'N/A',
      desc: isAr ? 'مستودع العميل' : 'Client warehouse',
      progress: activeStep >= 5 ? 100 : 0,
    },
  ]

  return (
    <div className="relative">
      <div className="absolute top-8 start-8 end-8 h-0.5 bg-gray-200 hidden lg:block" />
      <motion.div
        className="absolute top-8 start-8 h-0.5 bg-primary hidden lg:block"
        initial={{ width: 0 }}
        whileInView={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {steps.map((step, i) => {
          const isActive = i < activeStep
          const isCurrent = i === activeStep - 1
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'relative glass-panel rounded-2xl p-5 border transition-all',
                isCurrent ? 'border-primary shadow-lg shadow-primary/10' : 'border-gray-200',
                isActive ? 'bg-white' : 'bg-gray-50/80'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative z-10',
                  isActive ? 'bg-primary text-dark' : 'bg-gray-200 text-gray-400'
                )}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className={cn('text-sm font-bold text-dark', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                  {step.title}
                </h4>
                {step.temp !== 'N/A' && (
                  <span className="flex items-center gap-0.5 text-[10px] font-mono font-bold text-primary">
                    <ThermometerSnowflake className="w-3 h-3" />
                    {step.temp}
                  </span>
                )}
              </div>
              <p className={cn('text-xs text-gray-500 mb-3', isAr ? 'font-ibm-arabic' : 'font-inter')}>{step.desc}</p>
              <ProgressBar value={step.progress} showValue color={isActive ? 'primary' : 'blue'} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
