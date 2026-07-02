'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export default function ParallaxBanner({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"])
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.2, 1, 1, 0.2])

  return (
    <section ref={containerRef} className="relative h-[75vh] overflow-hidden bg-dark flex items-center justify-center">
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/50 to-dark/90 z-10" />
        <div 
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1601314167099-232775fe2bb1?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center"
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-20 text-center px-6 max-w-4xl">
        <h2 className={cn(
          "text-6xl md:text-[8rem] font-black uppercase tracking-tighter text-transparent select-none leading-none",
          isAr ? 'font-ibm-arabic' : 'font-manrope'
        )} style={{ WebkitTextStroke: '2px rgba(255,255,255,0.75)' }}>
          {isAr ? 'جودة لا تساوم' : 'NO COMPROMISE'}
        </h2>
        <p className={cn("text-primary text-xl md:text-2xl mt-6 font-bold tracking-widest uppercase", isAr ? "font-ibm-arabic" : "font-inter")}>
          {isAr ? 'شريكك الاستراتيجي في الأمن الغذائي العالمي' : 'Your Strategic Global Food Supply Partner'}
        </p>
      </motion.div>
    </section>
  )
}
