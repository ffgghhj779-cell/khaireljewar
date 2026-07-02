'use client'

import { motion } from 'framer-motion'
import PremiumImage from '@/components/ui/PremiumImage'
import Link from 'next/link'
import { Award, ShieldCheck } from 'lucide-react'
import { COMPLIANCE_CERTIFICATES } from '@/lib/constants/brandAssets'
import { IMAGE_BLUR_DATA_URL } from '@/lib/constants/images'
import { cn } from '@/lib/utils/cn'

export default function CertificationsBanner({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const verifiedDocs = COMPLIANCE_CERTIFICATES.filter((c) => c.imageSrc.startsWith('/images/'))

  const certs = [
    { name: 'Global GAP', desc: isAr ? 'الممارسات الزراعية الجيدة' : 'Good Agricultural Practices' },
    { name: 'ISO 9001', desc: isAr ? 'نظام إدارة الجودة' : 'Quality Management System' },
    { name: 'HACCP', desc: isAr ? 'تحليل المخاطر ونقاط التحكم' : 'Hazard Analysis Critical Control' },
    { name: 'Halal', desc: isAr ? 'معتمد حلال' : 'Halal Certified' },
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

          <div className="lg:w-2/3 w-full space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {verifiedDocs.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-green-200 bg-white shadow-soft hover:border-primary/40 transition-all"
                >
                  <div className="relative h-36 overflow-hidden bg-gray-50">
                    <PremiumImage
                      src={doc.imageSrc}
                      alt={doc.nameEn}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL={IMAGE_BLUR_DATA_URL}
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute top-2 end-2 px-2 py-0.5 rounded-full bg-green-600 text-white text-[9px] font-bold uppercase">
                      {isAr ? 'موثّق' : 'Verified'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className={cn('font-bold text-dark text-sm mb-0.5', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                      {isAr ? doc.nameAr : doc.nameEn}
                    </h3>
                    <p className={cn('text-[10px] text-gray-500', isAr ? 'font-ibm-arabic' : 'font-inter')}>{doc.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {certs.map((cert, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  key={cert.name}
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
      </div>
    </section>
  )
}
