'use client'

import { useState } from 'react'
import PremiumImage from '@/components/ui/PremiumImage'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck, Download, ExternalLink, CheckCircle2, Clock, X
} from 'lucide-react'
import { COMPLIANCE_CERTIFICATES, type ComplianceCertificate } from '@/lib/constants/brandAssets'
import { IMAGE_BLUR_DATA_URL } from '@/lib/constants/images'
import { SCROLL_VIEWPORT, TAP_SCALE } from '@/lib/constants/motion'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

interface TrustComplianceHubProps {
  lang: string
}

function StatusBadge({ status, isAr }: { status: ComplianceCertificate['status']; isAr: boolean }) {
  const label =
    status === 'Active'
      ? isAr
        ? 'ساري'
        : 'Active'
      : status === 'Pending Renewal'
        ? isAr
          ? 'تجديد قريب'
          : 'Renewal soon'
        : isAr
          ? 'أرشيف'
          : 'Archived'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold',
        status === 'Active' && 'bg-primary/10 text-primary',
        status === 'Pending Renewal' && 'bg-secondary/15 text-[#A67E28]',
        status === 'Archived' && 'bg-gray-100 text-gray-500'
      )}
    >
      {status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
      {label}
    </span>
  )
}

function VerificationStamp({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-10" aria-hidden>
      <circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M22 48C28 36 34 36 40 48C46 36 52 36 58 48" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function TrustComplianceHub({ lang }: TrustComplianceHubProps) {
  const isAr = lang === 'ar'
  const [active, setActive] = useState<ComplianceCertificate | null>(null)

  return (
    <section className="py-20 md:py-28 bg-white border-t border-gray-100 relative">
      <Container size="large">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className={cn('text-primary font-semibold text-sm mb-3', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr ? 'الاعتمادات' : 'Certifications'}
          </p>
          <h2
            className={cn(
              'text-3xl md:text-5xl font-bold text-dark tracking-tight mb-4 editorial-heading',
              isAr ? 'font-arabic' : 'font-display'
            )}
          >
            {isAr ? 'وثائق رسمية' : 'Official documents'}
          </h2>
          <p className={cn('text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed', isAr ? 'font-arabic' : 'font-sans')}>
            {isAr
              ? 'كل شحنة مدعومة بسلسلة توثيق واضحة — من الحقل إلى الميناء.'
              : 'Every shipment is backed by a clear documentation chain — from field to port.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMPLIANCE_CERTIFICATES.map((cert, i) => (
            <motion.button
              key={cert.id}
              type="button"
              onClick={() => setActive(cert)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={TAP_SCALE}
              className="group text-start relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-soft hover:shadow-luxury-hover hover:border-primary/20 transition-all duration-300 will-change-transform touch-manipulation"
              style={{ '--cert-color': cert.color } as React.CSSProperties}
            >
              {/* Document thumbnail */}
              <div className="relative h-44 overflow-hidden bg-gray-50">
                <PremiumImage
                  src={cert.imageSrc}
                  alt={cert.nameEn}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
                  className="object-cover object-top group-hover:scale-[1.04] transition-all duration-500 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />

                {/* Verification stamp overlay */}
                <div className="absolute top-3 end-3">
                  <VerificationStamp color={cert.color} />
                </div>

                {/* Coloured accent bar */}
                <div
                  className="absolute bottom-0 inset-x-0 h-0.5 opacity-80"
                  style={{ background: cert.color }}
                />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className={cn('font-black text-dark text-base leading-tight', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
                    {isAr ? cert.nameAr : cert.nameEn}
                  </h3>
                  <StatusBadge status={cert.status} isAr={isAr} />
                </div>
                <p className={cn('text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {cert.body} · {cert.year}
                </p>
                <p className={cn('text-xs text-gray-500 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {cert.scope}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  {cert.downloadUrl && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider">
                      <Download className="w-3 h-3" />
                      {isAr ? 'تحميل' : 'Download PDF'}
                    </span>
                  )}
                  {cert.verifyUrl && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-dark/50 uppercase tracking-wider">
                      <ExternalLink className="w-3 h-3" />
                      {isAr ? 'تحقق' : 'Verify'}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Trust summary banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel rounded-2xl border border-gray-200 px-6 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <p className={cn('text-sm font-bold text-dark', isAr ? 'font-arabic' : 'font-display')}>
              {isAr
                ? 'شهادات جاهزة للتحميل — استُبدل الملفات النهائية عند الإطلاق'
                : 'Downloadable certificates — replace with final scans at go-live'}
            </p>
          </div>
          <span className={cn('text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr ? '6 شهادات نشطة' : '6 Active Certificates'}
          </span>
        </motion.div>
      </Container>

      {/* Lightbox modal */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 bg-dark/60 backdrop-blur-md z-[150]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[151] max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden will-change-transform"
            >
              <div className="relative h-56 bg-gray-50">
                <PremiumImage
                  src={active.imageSrc}
                  alt={active.nameEn}
                  fill
                  sizes="600px"
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="absolute top-3 end-3 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 start-4 end-4">
                  <h3 className="text-white font-black text-xl">{isAr ? active.nameAr : active.nameEn}</h3>
                  <p className="text-white/70 text-xs mt-1">{active.body} · {active.year}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <StatusBadge status={active.status} isAr={isAr} />
                  <span className="text-[10px] font-semibold text-gray-400 tracking-wider">{active.year}</span>
                </div>
                <p className={cn('text-sm text-gray-600 leading-relaxed mb-6', isAr ? 'font-arabic' : 'font-sans')}>
                  {active.scope}
                </p>
                <div className="flex gap-3">
                  {active.downloadUrl && (
                    <a
                      href={active.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-dark text-white text-sm font-bold hover:bg-primary transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {isAr ? 'تحميل PDF' : 'Download PDF'}
                    </a>
                  )}
                  {active.verifyUrl && (
                    <a
                      href={active.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-dark text-sm font-bold hover:border-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {isAr ? 'تحقق رسمي' : 'Official Verify'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
