'use client'

import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, CheckCircle2, FileCheck, Award } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface CertificationMetricsProps {
  lang: string
}

const CERTS = [
  { title: 'Global GAP', icon: Leaf, score: 98, audits: 24, color: 'text-green-600', bg: 'bg-green-50' },
  { title: 'ISO 9001:2015', icon: ShieldCheck, score: 100, audits: 12, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'HACCP', icon: Award, score: 99, audits: 36, color: 'text-primary', bg: 'bg-primary/10' },
  { title: 'Halal', icon: CheckCircle2, score: 100, audits: 8, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'FDA', icon: FileCheck, score: 97, audits: 6, color: 'text-indigo-600', bg: 'bg-indigo-50' },
]

export default function CertificationMetrics({ lang }: CertificationMetricsProps) {
  const isAr = lang === 'ar'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {CERTS.map((cert, i) => (
        <motion.div
          key={cert.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,201,215,0.15)' }}
          className="glass-panel rounded-2xl p-5 border border-gray-200 group cursor-default"
        >
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', cert.bg, cert.color)}>
            <cert.icon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-dark text-sm mb-3">{cert.title}</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-400 font-bold uppercase">{isAr ? 'الامتثال' : 'Compliance'}</span>
              <span className="font-mono font-bold text-dark">{cert.score}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${cert.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            </div>
            <div className="text-[10px] text-gray-500 font-medium">
              {cert.audits} {isAr ? 'تدقيق/سنة' : 'audits/yr'}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
