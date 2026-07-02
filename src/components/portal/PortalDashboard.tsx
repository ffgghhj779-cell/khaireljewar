'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FileText, Package, Download, Clock, ShieldCheck, Truck, Inbox, Info } from 'lucide-react'
import Container from '@/components/ui/Container'
import { PortalSkeleton } from '@/components/ui/Skeleton'
import EmptyState from '@/components/ui/EmptyState'
import ProgressBar from '@/components/ui/ProgressBar'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'

interface PortalDashboardProps {
  lang: string
}

export default function PortalDashboard({ lang }: PortalDashboardProps) {
  const isAr = lang === 'ar'
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const quotes = [
        { id: 'Q-2026-089', date: 'Feb 18, 2026', status: 'Pending', items: isAr ? 'برتقال نافيل (40 طن)' : 'Navel Oranges (40 MT)' },
        { id: 'Q-2026-081', date: 'Jan 12, 2026', status: 'Approved', items: isAr ? 'بطاطس (100 طن)' : 'Potatoes (100 MT)' },
        { id: 'Q-2025-972', date: 'Dec 05, 2025', status: 'Approved', items: isAr ? 'ثوم (12 طن)' : 'Garlic (12 MT)' },
      ]

  const shipments = [
        { id: 'SHP-9921', destination: 'Rotterdam, NL', status: 'In Transit', eta: 'Mar 05, 2026', temp: '-2°C', progress: 72 },
        { id: 'SHP-9840', destination: 'Jebel Ali, UAE', status: 'Delivered', eta: 'Feb 10, 2026', temp: 'N/A', progress: 100 },
        { id: 'SHP-9812', destination: 'Jeddah, SA', status: 'In Transit', eta: 'Mar 12, 2026', temp: '-1°C', progress: 45 },
      ]

  const documents = [
    { name: isAr ? 'شهادة صحية نباتية' : 'Phytosanitary Certificate', ref: 'PHY-2026-089' },
    { name: isAr ? 'شهادة منشأ' : 'Certificate of Origin', ref: 'COO-2026-089' },
    { name: isAr ? 'تقرير فحص معملي' : 'Lab Inspection Report', ref: 'LAB-2026-081' },
    { name: isAr ? 'بوليصة شحن' : 'Bill of Lading', ref: 'BL-SHP-9921' },
  ]

  return (
    <div className="min-h-screen py-12 pb-24">
      <Container size="large">
        <div className="mb-8 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4 flex gap-3 items-start">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className={cn('text-sm font-bold text-dark mb-1', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'معاينة البوابة — قريباً' : 'Portal Preview — Coming Soon'}
            </p>
            <p className={cn('text-sm text-gray-600', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr
                ? 'هذه شاشة عرض توضيحية. لطلب وصول كامل أو تسعير، '
                : 'This is a demo workspace. For full access or quotes, '}
              <Link href={`/${lang}/contact`} className="text-primary font-bold hover:underline">
                {isAr ? 'تواصل معنا' : 'contact our team'}
              </Link>
              {isAr ? ' أو أرسل طلب تسعير من الكتالوج.' : ' or submit a quote from the catalog.'}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="terminal-badge terminal-badge-live mb-4">
              <ShieldCheck className="w-3 h-3" />
              {isAr ? 'مساحة عمل آمنة' : 'Secure Workspace'}
            </span>
            <h1 className={cn('text-4xl md:text-5xl font-black text-dark mb-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'بوابة العملاء B2B' : 'B2B Client Portal'}
            </h1>
            <p className={cn('text-gray-500', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr ? 'راقب الشحنات، راجع عروض الأسعار، وحمّل الوثائق الجمركية.' : 'Monitor shipments, review quotes, and download customs documentation.'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.push(`/${lang}`)}
              className="bg-white border border-gray-200 text-dark px-6 py-2.5 min-h-[48px] rounded-xl font-bold hover:bg-gray-50 transition text-sm touch-manipulation"
            >
              {isAr ? 'العودة للرئيسية' : 'Back to Home'}
            </button>
          </div>
        </div>

        {loading ? (
          <PortalSkeleton />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { icon: FileText, value: quotes.length || '0', label: isAr ? 'إجمالي العروض' : 'Total Quotes', color: 'text-blue-600 bg-blue-50' },
                { icon: Truck, value: shipments.filter((s) => s.status === 'In Transit').length, label: isAr ? 'شحنات نشطة' : 'Active Shipments', color: 'text-green-600 bg-green-50' },
                { icon: Package, value: '8', label: isAr ? 'طلبات مكتملة' : 'Completed Orders', color: 'text-primary bg-primary/10' },
                { icon: Download, value: documents.length, label: isAr ? 'وثائق متاحة' : 'Documents', color: 'text-secondary bg-orange-50' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-panel p-5 rounded-2xl border border-gray-200 flex items-center gap-4"
                >
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-dark">{stat.value}</div>
                    <div className={cn('text-[10px] text-gray-500 font-bold uppercase', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="glass-panel rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200 bg-white/60">
                  <h2 className={cn('font-bold text-dark flex items-center gap-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                    <FileText className="w-5 h-5 text-gray-400" />
                    {isAr ? 'عروض الأسعار' : 'Quote Sheets'}
                  </h2>
                </div>
                <div className="p-5">
                  {quotes.length === 0 ? (
                    <EmptyState
                      icon={Inbox}
                      title={isAr ? 'لا توجد عروض أسعار' : 'No Quote Sheets'}
                      description={isAr ? 'عند تقديم طلب تسعير، ستظهر عروضك هنا للمراجعة والموافقة.' : 'When you submit a quote request, your sheets will appear here for review and approval.'}
                    />
                  ) : (
                    <div className="space-y-3">
                      {quotes.map((q) => (
                        <div key={q.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-xl hover:bg-white/80 transition bg-white/40">
                          <div>
                            <div className="font-bold text-dark text-sm font-mono">{q.id}</div>
                            <div className="text-xs text-gray-500 mt-1">{q.items}</div>
                          </div>
                          <div className="text-end">
                            <span
                              className={cn(
                                'text-[10px] font-bold px-2.5 py-1 rounded-md inline-block mb-1',
                                q.status === 'Approved' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'
                              )}
                            >
                              {q.status}
                            </span>
                            <div className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                              <Clock className="w-3 h-3" /> {q.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-panel rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200 bg-white/60">
                  <h2 className={cn('font-bold text-dark flex items-center gap-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                    <Package className="w-5 h-5 text-gray-400" />
                    {isAr ? 'حالة الشحنات المباشرة' : 'Live Shipment Status'}
                  </h2>
                </div>
                <div className="p-5">
                  {shipments.length === 0 ? (
                    <EmptyState
                      icon={Truck}
                      title={isAr ? 'لا توجد شحنات نشطة' : 'No Active Shipments'}
                      description={isAr ? 'ستتمكن من تتبع شحناتك ومراقبة درجة الحرارة وETA هنا.' : 'Track your shipments, monitor temperature, and view ETAs here.'}
                    />
                  ) : (
                    <div className="space-y-4">
                      {shipments.map((s) => (
                        <div key={s.id} className="p-4 border border-gray-200 rounded-xl bg-white/40 hover:bg-white/80 transition">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-bold text-dark text-sm font-mono">{s.id}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                {isAr ? 'إلى' : 'To'}: {s.destination}
                              </div>
                            </div>
                            <div className="text-end">
                              <span
                                className={cn(
                                  'text-[10px] font-bold px-2.5 py-1 rounded-md inline-block',
                                  s.status === 'Delivered' ? 'bg-gray-100 text-gray-600 border border-gray-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                                )}
                              >
                                {s.status}
                              </span>
                              <div className="text-xs text-gray-400 mt-1">ETA: {s.eta}</div>
                              {s.temp !== 'N/A' && <div className="text-[10px] text-primary font-mono">{s.temp}</div>}
                            </div>
                          </div>
                          <ProgressBar
                            value={s.progress}
                            label={isAr ? 'تقدم الشحنة' : 'Shipment Progress'}
                            color={s.status === 'Delivered' ? 'green' : 'blue'}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200 bg-white/60">
                <h2 className={cn('font-bold text-dark flex items-center gap-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                  <Download className="w-5 h-5 text-gray-400" />
                  {isAr ? 'الوثائق الجمركية والصحية' : 'Phytosanitary & Customs Documentation'}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {documents.map((doc) => (
                  <div key={doc.ref} className="flex items-center justify-between p-5 hover:bg-white/60 transition">
                    <div>
                      <p className={cn('font-bold text-dark text-sm', isAr ? 'font-ibm-arabic' : 'font-inter')}>{doc.name}</p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">{doc.ref}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => window.open(`mailto:${BRAND.contact.email}?subject=${encodeURIComponent(doc.ref)}`, '_blank')}
                      className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-dark text-white text-xs font-bold rounded-lg hover:bg-primary transition touch-manipulation"
                    >
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  )
}
