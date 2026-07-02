'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'
import { useQuoteStore } from '@/store/useQuoteStore'

export default function PremiumBentoGrid({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  const toggleCart = useQuoteStore((s) => s.toggleCart)

  return (
    <section className="py-24 bg-white relative z-20 border-b border-gray-200">
      <Container size="large">
        <div className="mb-16 max-w-4xl">
          <h2 className={cn('text-4xl md:text-6xl font-black text-dark mb-4 tracking-tight leading-none', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'نضع معايير الجودة،' : 'Setting the standard,'}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {isAr ? 'ولا نتبعها أبدًا.' : 'Never following them.'}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
          <motion.div
            whileHover={{ scale: 0.995 }}
            className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden border border-gray-200 group cursor-pointer"
          >
            <Image
              alt="Farming Excellence"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
            <div className="absolute bottom-8 start-8 end-8">
              <span className="terminal-badge bg-white/20 border-white/30 text-white mb-4">
                {isAr ? 'مزارع خير الجار' : 'OUR OWN FARMS'}
              </span>
              <h3 className={cn('text-2xl md:text-4xl text-white font-black leading-tight', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                {isAr ? 'من قلب التربة المصرية إلى الموانئ العالمية.' : 'From rich Egyptian soil to global ports.'}
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden"
          >
            <span className="text-8xl font-black text-primary/10 absolute end-8 bottom-4 select-none">100%</span>
            <h3 className={cn('text-xl md:text-2xl text-dark font-bold mb-3 z-10', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'معايير تصدير معتمدة بالكامل' : '100% Certified Export Standards'}
            </h3>
            <p className={cn('text-gray-500 text-sm z-10 max-w-lg', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr
                ? 'تخضع شحناتنا لأكثر من 15 فحصاً معملياً لضمان المعايير الأوروبية والخليجية.'
                : 'Our exports undergo 15+ rigorous lab checks to satisfy European and GCC B2B import rules.'}
            </p>
            <Link href={`/${lang}/quality`} className="mt-4 text-primary font-bold text-sm z-10 hover:underline">
              {isAr ? 'مركز الجودة العالمي ←' : 'Global Quality Hub →'}
            </Link>
          </motion.div>

          <motion.button
            onClick={toggleCart}
            whileHover={{ y: -6 }}
            className="md:col-span-1 bg-primary border border-primary rounded-2xl p-8 flex flex-col justify-between text-start group"
          >
            <div className="w-12 h-12 bg-dark rounded-xl flex items-center justify-center text-primary group-hover:rotate-45 transition-transform duration-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <h3 className={cn('text-lg font-black text-dark uppercase leading-tight mt-6', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'طلب تسعير فوري' : 'Instant B2B Quote'}
            </h3>
          </motion.button>

          <motion.div className="md:col-span-1 relative rounded-2xl overflow-hidden border border-gray-200 group">
            <Image
              alt="Fresh Produce"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              fill
              sizes="25vw"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
            />
            <Link href={`/${lang}/logistics`} className="absolute inset-0 flex items-end p-4">
              <span className="bg-white/90 backdrop-blur-sm text-dark text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200">
                {isAr ? 'اللوجستيات ←' : 'Logistics →'}
              </span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
