'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'
import { Leaf } from 'lucide-react'

export default function AboutPreview({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  
  const content = {
    en: {
      tagline: 'The Artisan Approach',
      title: 'Rooted in Quality, Growing Globally',
      subtitle: 'Decades of agricultural expertise bringing the best of Egyptian soil to the world.',
      text1: 'Khair Aljewar Foods is a premier export company specializing in top-tier agricultural products. We bridge the gap between local farms and global markets with uncompromising standards.',
      text2: 'Our commitment to sustainable farming, rigorous quality control, and efficient logistics ensures that every product reaching your business is remarkably fresh and safe.',
      stats: [
        { value: '15+', label: 'Export Countries' },
        { value: '10K+', label: 'Tons Exported Yearly' },
        { value: '100%', label: 'Quality Guarantee' }
      ]
    },
    ar: {
      tagline: 'نهجنا الحرفي',
      title: 'جذور في الجودة، ونمو عالمي',
      subtitle: 'عقود من الخبرة الزراعية لنقل أفضل ما تجود به الأراضي المصرية إلى العالم.',
      text1: 'خير الجوار للأغذية هي شركة تصدير رائدة متخصصة في المنتجات الزراعية عالية الجودة. نحن نسد الفجوة بين المزارع المحلية والأسواق العالمية بمعايير لا تقبل المساومة.',
      text2: 'التزامنا بالزراعة المستدامة، ومراقبة الجودة الصارمة، واللوجستيات الفعالة يضمن أن كل منتج يصل إلى أعمالك طازج وآمن تماماً.',
      stats: [
        { value: '+15', label: 'دولة نصدر إليها' },
        { value: '+10K', label: 'طن نصدره سنوياً' },
        { value: '100%', label: 'ضمان الجودة' }
      ]
    }
  }

  const t = content[isAr ? 'ar' : 'en']

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gray-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 -translate-y-1/2"></div>
      <Container size="large">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-secondary font-bold tracking-widest uppercase text-sm mb-6">
              <Leaf className="w-5 h-5" />
              {t.tagline}
            </div>
            <h2 className={cn("text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {t.title}
            </h2>
            <p className={cn("text-2xl text-gray-800 mb-8 font-medium leading-snug", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {t.subtitle}
            </p>
            <div className={cn("text-gray-500 text-lg leading-relaxed space-y-6 mb-12", isAr ? 'font-ibm-arabic' : 'font-inter')}>
              <p>{t.text1}</p>
              <p>{t.text2}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-100">
              {t.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-4xl font-black text-primary mb-2">{stat.value}</div>
                  <div className={cn("text-sm text-gray-500 font-bold tracking-wide uppercase", isAr ? 'font-ibm-arabic' : 'font-inter')}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative h-[700px] rounded-[3rem] overflow-hidden shadow-2xl group"
          >
            <Image 
              alt="Farming" 
              className="object-cover transition-transform duration-[2s] group-hover:scale-105" 
              fill 
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60"></div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
