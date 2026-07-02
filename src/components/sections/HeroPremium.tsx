'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Globe2, Package, ShieldCheck, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroPremium({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const stats = [
    {
      icon: Package,
      value: '50,000+',
      label: isAr ? 'طن سعة تصدير سنوية' : 'MT Annual Export Capacity',
      accent: 'text-primary',
    },
    {
      icon: Globe2,
      value: '40+',
      label: isAr ? 'دولة وجهة عالمية' : 'Global Destination Markets',
      accent: 'text-secondary',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: isAr ? 'معايير تصدير معتمدة' : 'Certified Export Standards',
      accent: 'text-primary',
    },
    {
      icon: TrendingUp,
      value: '15+',
      label: isAr ? 'فحص جودة معملي' : 'Lab Quality Inspections',
      accent: 'text-secondary',
    },
  ]

  return (
    <section className="relative min-h-[calc(100vh-76px)] flex items-center pt-8 pb-16 overflow-hidden">
      <div className="absolute inset-0 industrial-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"
          alt="Agricultural Export"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-gray-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
              <span className="terminal-badge terminal-badge-live mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {isAr ? 'منصة B2B للتصدير الزراعي' : 'B2B Agricultural Export Platform'}
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={cn(
                'text-5xl md:text-6xl lg:text-7xl font-black text-dark leading-[1.05] mb-6 tracking-tight',
                isAr ? 'font-ibm-arabic' : 'font-manrope'
              )}
            >
              {isAr ? 'مركز القيادة التجاري' : 'The B2B Command Center'}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {isAr ? 'لتصدير الغذاء المصري.' : 'for Egyptian Food Export.'}
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={cn('text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}
            >
              {isAr
                ? 'خير الجار فودز — شركة تصدير زراعي متميزة تخدم أسواق الخليج وأوروبا وأفريقيا. منصة B2B متكاملة لطلبات التسعير بالجملة، اللوجستيات، وضمان الجودة.'
                : 'KHAIR ALJAAR FOODS — a premium Egyptian agricultural export corporation serving GCC, Europe, and Africa. An integrated B2B platform for wholesale quotes, logistics, and quality assurance.'}
            </motion.p>

            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/products`}
                className="bg-dark text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-primary transition-all flex items-center justify-center gap-2 group border border-dark"
              >
                {isAr ? 'تصفح الكتالوج' : 'Browse Catalog'}
                <ArrowRight className={cn('w-5 h-5 transition-transform', isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1')} />
              </Link>
              <Link
                href={`/${lang}/portal`}
                className="bg-white text-dark px-8 py-4 rounded-xl font-bold text-base border border-gray-200 hover:border-primary hover:text-primary transition-all flex items-center justify-center"
              >
                {isAr ? 'بوابة العملاء' : 'Client Portal'}
              </Link>
            </motion.div>
          </div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-2 gap-3 border border-gray-200 bg-white p-3 rounded-2xl shadow-sm">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="data-cell rounded-xl hover:border-primary/30 transition-colors group glass-panel"
                >
                  <stat.icon className={cn('w-5 h-5 mb-3', stat.accent)} />
                  <AnimatedCounter
                    value={stat.value}
                    className={cn('stat-counter mb-1 block', isAr ? 'font-ibm-arabic' : 'font-manrope')}
                  />
                  <div className={cn('text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-tight', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
