'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandLogo from '@/components/ui/BrandLogo'
import PremiumImage from '@/components/ui/PremiumImage'
import { useRouter } from 'next/navigation'
import { ArrowRight, Globe2, Package, ShieldCheck, TrendingUp } from 'lucide-react'
import { BRAND } from '@/lib/constants/brand'
import { SECTION_IMAGES } from '@/lib/constants/images'
import { TAP_SCALE } from '@/lib/constants/motion'
import { cn } from '@/lib/utils/cn'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import MagneticButton from '@/components/ui/MagneticButton'

const HERO_SLIDES = [
  {
    src: SECTION_IMAGES.heroFeature,
    labelEn: 'Kent Mangoes',
    labelAr: 'مانجو كينت',
  },
  {
    src: '/images/products/dates-luxury-display.jpeg',
    labelEn: 'Premium Dates',
    labelAr: 'تمور فاخرة',
  },
  {
    src: '/images/products/chicken-fresh-ice.jpeg',
    labelEn: 'Fresh Poultry',
    labelAr: 'دواجن طازجة',
  },
  {
    src: '/images/products/olive-oil-lifestyle.jpeg',
    labelEn: 'Olive Oil',
    labelAr: 'زيت زيتون',
  },
  {
    src: '/images/products/cold-shelf-display.jpeg',
    labelEn: 'Cold Chain Range',
    labelAr: 'تشكيلة مبردة',
  },
  {
    src: '/images/products/strawberries-banner.jpeg',
    labelEn: 'Fresh Berries',
    labelAr: 'توت طازج',
  },
] as const

const SLIDE_INTERVAL_MS = 4500

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroPremium({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const router = useRouter()
  const [activeSlide, setActiveSlide] = useState(0)

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index % HERO_SLIDES.length)
  }, [])

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(nextSlide, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [nextSlide])

  const current = HERO_SLIDES[activeSlide]

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
    <section className="relative w-full pt-6 pb-10 md:pt-8 md:pb-16 md:min-h-[calc(100vh-76px)] md:flex md:items-center overflow-x-clip">
      <div className="absolute inset-0 industrial-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <PremiumImage
          src={SECTION_IMAGES.heroBg}
          alt="KHAIR ALJAAR FOODS — Premium Egyptian Agricultural Export"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/75 to-gray-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 max-w-full">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
              <span className="terminal-badge terminal-badge-live mb-4 md:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {isAr ? 'منصة B2B للتصدير' : 'B2B Export Platform'}
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={cn(
                'text-hero-fluid font-black text-dark editorial-heading mb-4 md:mb-6 max-w-full',
                isAr ? 'font-ibm-arabic' : 'font-manrope'
              )}
            >
              <span className="block">
                {isAr ? 'مركز القيادة التجاري' : 'The B2B Command Center'}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-1">
                {isAr ? 'لتصدير الغذاء المصري.' : 'for Egyptian Food Export.'}
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={cn(
                'text-hero-sub-fluid text-gray-600 mb-6 md:mb-10 max-w-2xl',
                isAr ? 'font-ibm-arabic' : 'font-inter'
              )}
            >
              <span className="md:hidden">
                {isAr
                  ? 'منصة B2B مصرية للتصدير الزراعي — تسعير بالجملة، لوجستيات، وضمان جودة.'
                  : 'Premium Egyptian B2B export platform — wholesale quotes, logistics, and quality assurance.'}
              </span>
              <span className="hidden md:inline">
                {isAr
                  ? `${BRAND.name.ar} — شركة تصدير غذائي متميزة تخدم أسواق الخليج وأوروبا وأفريقيا. منصة B2B متكاملة لطلبات التسعير بالجملة، اللوجستيات، وضمان الجودة.`
                  : `${BRAND.name.en} — a premium food export corporation serving GCC, Europe, and Africa. An integrated B2B platform for wholesale quotes, logistics, and quality assurance.`}
              </span>
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <MagneticButton
                onClick={() => router.push(`/${lang}/products`)}
                strength={0.22}
                className="bg-dark text-white px-6 md:px-8 py-3.5 md:py-4 min-h-[48px] rounded-xl font-bold text-sm md:text-base hover:bg-primary transition-all flex items-center justify-center gap-2 border border-dark will-change-transform w-full sm:w-auto"
              >
                {isAr ? 'تصفح الكتالوج' : 'Browse Catalog'}
                <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
              </MagneticButton>
              <MagneticButton
                onClick={() => router.push(`/${lang}/portal`)}
                strength={0.18}
                className="bg-white/80 backdrop-blur-xl text-dark px-6 md:px-8 py-3.5 md:py-4 min-h-[48px] rounded-xl font-bold text-sm md:text-base border border-gray-200 hover:border-primary hover:text-primary transition-all flex items-center justify-center will-change-transform w-full sm:w-auto"
              >
                {isAr ? 'بوابة العملاء' : 'Client Portal'}
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-5 hidden sm:block"
          >
            {/* Brand photography showcase — auto-rotating */}
            <div className="relative mb-3 rounded-2xl overflow-hidden border border-gray-200 shadow-sm aspect-[16/9]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.src}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <PremiumImage
                    src={current.src}
                    alt={isAr ? current.labelAr : current.labelEn}
                    fill
                    className="object-cover"
                    priority={activeSlide === 0}
                    sizes="(max-width: 1024px) 0vw, 45vw"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 start-3 z-10">
                <BrandLogo variant="hero" />
              </div>

              <div className="absolute bottom-3 end-3 z-10">
                <span className={cn(
                  'inline-block px-2.5 py-1 rounded-lg bg-primary/90 text-dark text-[10px] font-bold',
                  isAr ? 'font-ibm-arabic' : 'font-manrope'
                )}>
                  {isAr ? current.labelAr : current.labelEn}
                </span>
              </div>

              <div className="absolute top-3 end-3 flex gap-1.5 z-10 max-w-[58%] overflow-x-auto scrollbar-none">
                {HERO_SLIDES.map((slide, i) => (
                  <motion.button
                    key={slide.src}
                    type="button"
                    whileTap={TAP_SCALE}
                    onClick={() => goToSlide(i)}
                    aria-label={isAr ? slide.labelAr : slide.labelEn}
                    aria-current={activeSlide === i}
                    className={cn(
                      'relative w-10 h-10 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300',
                      activeSlide === i
                        ? 'border-primary ring-2 ring-primary/40 scale-105'
                        : 'border-white/50 opacity-80 hover:opacity-100'
                    )}
                  >
                    <PremiumImage src={slide.src} alt={slide.labelEn} fill className="object-cover" sizes="40px" />
                  </motion.button>
                ))}
              </div>

              <div className="absolute bottom-11 inset-x-0 flex justify-center gap-1.5 z-10 pointer-events-none">
                {HERO_SLIDES.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1 rounded-full transition-all duration-300',
                      activeSlide === i ? 'w-5 bg-primary' : 'w-1.5 bg-white/60'
                    )}
                  />
                ))}
              </div>
            </div>
            {/* Stats grid */}
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
                  <div
                    className={cn(
                      'text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-tight',
                      isAr ? 'font-ibm-arabic' : 'font-inter'
                    )}
                  >
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
