'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export default function HeroIndustrial({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  return (
    <section className="relative w-full pt-16 pb-20 px-4 md:px-8 bg-[#050B14] overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-mono mb-6 tracking-widest uppercase">
            {isAr ? 'مركز القيادة B2B' : 'B2B Command Center'}
          </div>
          <h1 className={cn("text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8 uppercase", isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr ? 'الإمداد' : 'Global'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
              {isAr ? 'الزراعي' : 'Agri-Supply'}
            </span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-lg mb-10 font-mono text-sm leading-relaxed">
            {isAr 
              ? 'بنية تحتية لتصدير المحاصيل الاستراتيجية. التزام بالكميات التجارية ومعايير الجودة العالمية.' 
              : 'Strategic crop export infrastructure. Committed to commercial volumes and global quality parameters.'}
          </p>
          
          <div className="flex gap-4">
            <button className="bg-primary text-black px-8 py-4 font-mono font-bold text-sm hover:bg-white transition-colors uppercase tracking-widest">
              {isAr ? 'بدء طلب التسعير' : 'Initialize Quote'}
            </button>
            <button className="border border-white/20 text-white px-8 py-4 font-mono font-bold text-sm hover:bg-white/5 transition-colors uppercase tracking-widest">
              {isAr ? 'مواصفات المنتجات' : 'View Specs'}
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 font-mono"
        >
          {[
            { label: 'Export Vol/Yr', value: '50,000 MT' },
            { label: 'Active Markets', value: '42 Nations' },
            { label: 'Quality Standard', value: 'Global GAP' },
            { label: 'Cold Chain', value: '100% Tracked' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0A1220] border border-white/10 p-6 flex flex-col justify-between h-32">
              <span className="text-white/40 text-xs uppercase tracking-widest">{stat.label}</span>
              <span className="text-white text-2xl font-bold text-primary">{stat.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
