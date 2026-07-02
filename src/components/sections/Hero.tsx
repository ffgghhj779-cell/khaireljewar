'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

export default function Hero({ lang }: { lang: string }) {
  const content = {
    en: {
      badge: 'Premium B2B Food Export',
      title: 'Reliable Food Supply',
      titleHighlight: 'Without Compromise',
      desc: 'Connecting global markets with the finest Egyptian fresh produce, frozen foods, and dry goods. Exceptional quality from our farms directly to your business.',
      primaryBtn: 'Explore Products',
      secondaryBtn: 'Contact Sales',
    },
    ar: {
      badge: 'تصدير غذائي متميز (B2B)',
      title: 'إمدادات غذائية موثوقة',
      titleHighlight: 'بدون مساومات',
      desc: 'نربط الأسواق العالمية بأجود المحاصيل الزراعية المصرية الطازجة والمجمدة. جودة استثنائية من مزارعنا مباشرة إلى أعمالك.',
      primaryBtn: 'استكشف منتجاتنا',
      secondaryBtn: 'تواصل مع المبيعات',
    }
  }

  const t = content[lang as keyof typeof content] || content.ar
  const isAr = lang === 'ar'

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-transparent z-10 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-dark/40 z-10" /> {/* Extra darkening for text readability */}
        <div 
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center"
        />
      </div>

      <Container className="relative z-20 w-full">
        <motion.div 
          className="max-w-3xl"
          variants={containerVars}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVars} className="mb-6">
            <span className={cn(
              "inline-block py-1.5 px-4 rounded-full text-sm font-semibold tracking-wider",
              "bg-primary/20 text-primary border border-primary/30 backdrop-blur-md",
              isAr ? "font-ibm-arabic" : "font-inter uppercase"
            )}>
              {t.badge}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={itemVars} className={cn(
            "text-5xl md:text-7xl font-bold text-white mb-6 leading-tight",
            isAr ? "font-ibm-arabic" : "font-manrope"
          )}>
            {t.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {t.titleHighlight}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVars} className={cn(
            "text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl",
            isAr ? "font-ibm-arabic" : "font-inter"
          )}>
            {t.desc}
          </motion.p>

          {/* Call to Actions */}
          <motion.div variants={itemVars} className="flex flex-wrap items-center gap-4">
            <Link 
              href={`/${lang}/products`}
              className={cn(
                "px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,201,215,0.4)] bg-primary text-dark hover:bg-white",
                isAr ? "font-ibm-arabic" : "font-inter"
              )}
            >
              {t.primaryBtn}
            </Link>
            
            <Link 
              href={`/${lang}/contact`}
              className={cn(
                "glass px-8 py-4 rounded-full text-lg font-medium text-white transition-all duration-300 hover:bg-white/20 hover:scale-105",
                isAr ? "font-ibm-arabic" : "font-inter"
              )}
            >
              {t.secondaryBtn}
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-sm tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            className="w-full h-1/2 bg-primary absolute top-0"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
