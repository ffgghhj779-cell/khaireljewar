'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'
import { ThermometerSnowflake, ShieldCheck, Activity, Globe2 } from 'lucide-react'

export default function LogisticsTerminal({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const nodes = [
    {
      icon: ThermometerSnowflake,
      title: isAr ? 'سلسلة التبريد' : 'Cold Chain',
      desc: isAr
        ? 'مراقبة حرارة مستمرة من محطة التعبئة إلى الميناء. انحرافات أقل من 0.5°م.'
        : 'Continuous temp monitoring from packhouse to port. Deviations < 0.5°C.',
    },
    {
      icon: ShieldCheck,
      title: isAr ? 'الامتثال' : 'Compliance',
      desc: isAr
        ? 'مسجل FDA، معتمد Global GAP. بروتوكول صفر متبقيات نشط.'
        : 'FDA Registered, Global GAP certified. Zero-residue protocol active.',
    },
    {
      icon: Activity,
      title: isAr ? 'تتبع مباشر' : 'Live Tracking',
      desc: isAr
        ? 'حاويات مبردة بـ GPS. تحديثات ETA فورية عبر بوابة B2B.'
        : 'GPS-enabled reefer containers. Real-time ETA via B2B portal.',
    },
    {
      icon: Globe2,
      title: isAr ? 'شبكة الموانئ' : 'Port Network',
      desc: isAr
        ? 'شحن مباشر من الإسكندرية ودمياط إلى 40+ ميناء عالمي.'
        : 'Direct lanes from Alexandria & Damietta to 40+ global terminals.',
    },
  ]

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-white border-y border-gray-200">
      <Container size="large">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="terminal-badge terminal-badge-live mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {isAr ? 'محطة اللوجستيات' : 'Logistics Terminal'}
            </span>
            <h2 className={cn('text-3xl md:text-4xl font-black text-dark', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'البنية التحتية للثقة والشحن' : 'Trust & Shipping Infrastructure'}
            </h2>
          </div>
          <Link
            href={`/${lang}/logistics`}
            className="text-sm font-bold text-primary hover:text-dark transition-colors border border-primary/30 px-4 py-2 rounded-lg"
          >
            {isAr ? 'عرض التفاصيل الكاملة ←' : 'View Full Details →'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="border border-gray-200 bg-gray-50 p-6 rounded-2xl hover:border-primary/40 transition-all group"
            >
              <node.icon className="w-7 h-7 text-primary mb-4" />
              <h3 className={cn('font-bold text-dark mb-2 text-sm uppercase tracking-wider', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                {node.title}
              </h3>
              <p className={cn('text-gray-500 text-xs leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>{node.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
