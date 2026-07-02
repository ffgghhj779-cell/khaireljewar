'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils/cn'

export default function Features({ lang }: { lang: string }) {
  const isAr = lang === 'ar'
  
  const content = {
    en: { title: 'Why Choose Us?', subtitle: 'The pillars of our export excellence' },
    ar: { title: 'لماذا تختارنا؟', subtitle: 'ركائز تميزنا في التصدير' }
  }
  const t = content[isAr ? 'ar' : 'en']

  const features = [
    {
      icon: '🌱',
      title: isAr ? 'مزارع معتمدة' : 'Certified Farms',
      desc: isAr ? 'نحن نتعاون فقط مع المزارع التي تطبق أعلى المعايير الزراعية العالمية.' : 'We partner only with farms applying the highest global agricultural standards.'
    },
    {
      icon: '❄️',
      title: isAr ? 'سلسلة تبريد متطورة' : 'Advanced Cold Chain',
      desc: isAr ? 'نضمن بقاء المنتجات طازجة من المزرعة حتى وصولها لمينائك.' : 'Ensuring products stay fresh from the farm until they reach your port.'
    },
    {
      icon: '🌍',
      title: isAr ? 'تغطية عالمية' : 'Global Reach',
      desc: isAr ? 'خبرة واسعة في التصدير لدول الخليج، أوروبا، وإفريقيا.' : 'Extensive experience exporting to the GCC, Europe, and Africa.'
    }
  ]

  return (
    <section className="py-24 bg-dark text-white">
      <Container>
        <SectionHeading centered lang={lang} light subtitle={t.subtitle} title={t.title}/>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="glass-dark p-8 rounded-3xl text-center group hover:bg-white/10 transition-colors duration-500"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className={cn("text-2xl font-bold mb-4", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                {feat.title}
              </h3>
              <p className={cn("text-gray-400 leading-relaxed", isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
