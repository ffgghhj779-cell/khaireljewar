import Container from '@/components/ui/Container'
import CertificationMetrics from '@/components/quality/CertificationMetrics'
import QualityStepper from '@/components/quality/QualityStepper'
import { cn } from '@/lib/utils/cn'

export default function CertificationsPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  return (
    <div className="min-h-screen py-12 pb-24">
      <Container size="large">
        <div className="max-w-4xl mb-16">
          <span className="terminal-badge mb-4">{isAr ? 'مركز الجودة العالمي' : 'Global Quality Hub'}</span>
          <h1 className={cn('text-4xl md:text-6xl font-black text-dark tracking-tight mb-4', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'الجودة والاعتمادات' : 'Quality & Certifications'}
          </h1>
          <p className={cn('text-lg text-gray-500 leading-relaxed', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr
              ? 'نظام جودة متكامل وموثق — من الحقل إلى الميناء. كل شحنة تخضع لأكثر من 15 فحصاً معملياً.'
              : 'An integrated, documented quality system — from field to port. Every shipment undergoes 15+ laboratory inspections.'}
          </p>
        </div>

        <div className="mb-20">
          <h2 className={cn('text-xl font-bold text-dark mb-6', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'لوحة الامتثال المباشرة' : 'Live Compliance Dashboard'}
          </h2>
          <CertificationMetrics lang={lang} />
        </div>

        <div className="mb-12">
          <h2 className={cn('text-xl font-bold text-dark mb-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'عملية ضمان الجودة' : 'Quality Assurance Pipeline'}
          </h2>
          <p className={cn('text-sm text-gray-500 mb-8', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr ? 'أربع مراحل صارمة تضمن أعلى معايير التصدير.' : 'Four rigorous stages ensuring the highest export standards.'}
          </p>
          <QualityStepper lang={lang} />
        </div>

        <div className="glass-panel rounded-2xl border border-gray-200 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '15+', label: isAr ? 'فحص/شحنة' : 'Tests/Shipment' },
              { value: '0', label: isAr ? 'مخالفات متبقية' : 'Residue Violations' },
              { value: '100%', label: isAr ? 'تتبع المنتج' : 'Product Traceability' },
              { value: 'ISO', label: isAr ? 'معتمد دولياً' : 'Internationally Certified' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black text-dark font-mono mb-1">{stat.value}</div>
                <div className={cn('text-[10px] font-bold text-gray-500 uppercase', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
