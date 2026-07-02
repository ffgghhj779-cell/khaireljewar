'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Award, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function CertificationsBanner({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const certs = [
    { name: 'Global GAP', desc: isAr ? 'الممارسات الزراعية الجيدة' : 'Good Agricultural Practices' },
    { name: 'ISO 9001', desc: isAr ? 'نظام إدارة الجودة' : 'Quality Management System' },
    { name: 'HACCP', desc: isAr ? 'تحليل المخاطر ونقاط التحكم' : 'Hazard Analysis Critical Control' },
    { name: 'Halal', desc: isAr ? 'معتمد حلال' : 'Halal Certified' },
    { name: 'FDA', desc: isAr ? 'مسجل لدى هيئة الغذاء والدواء' : 'FDA Registered Facility' },
  ]

  return (
    <section className="bg-gray-50 py-20 border-y border-gray-200 relative">
      <div className="absolute inset-0 industrial-grid opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className="lg:w-1/3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 border border-primary/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className={cn('text-3xl md:text-4xl font-black mb-4 text-dark tracking-tight', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'مركز الجودة العالمي' : 'Global Quality Hub'}
            </h2>
            <p className={cn('text-gray-500 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr
                ? 'نلتزم بأعلى معايير الجودة والسلامة الغذائية العالمية لضمان ثقة عملائنا في كل شحنة.'
                : 'Committed to the highest global quality and food safety standards ensuring client trust in every shipment.'}
            </p>
            <Link href={`/${lang}/quality`} className="inline-block mt-6 text-primary font-bold text-sm hover:underline">
              {isAr ? 'عرض جميع الاعتمادات ←' : 'View All Certifications →'}
            </Link>
          </div>

          <div className="lg:w-2/3 w-full grid grid-cols-2 md:grid-cols-3 gap-4">
            {certs.map((cert, i) => (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 transition-all group"
              >
                <Award className="w-6 h-6 text-secondary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-dark text-sm mb-1">{cert.name}</h3>
                <p className={cn('text-xs text-gray-500', isAr ? 'font-ibm-arabic' : 'font-inter')}>{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
