import { SECTION_IMAGES } from '@/lib/constants/images'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import ColdChainStepper from '@/components/logistics/ColdChainStepper'
import RouteMap from '@/components/logistics/RouteMap'
import LogisticsEditorialGallery from '@/components/sections/LogisticsEditorialGallery'
import { Truck } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function LogisticsPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  return (
    <div className="min-h-screen py-12 pb-24">
      <Container size="large">
        <div className="mb-16">
          <span className="terminal-badge terminal-badge-live mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {isAr ? 'محطة اللوجستيات' : 'Logistics Terminal'}
          </span>
          <h1 className={cn('text-4xl md:text-6xl font-black text-dark tracking-tight mb-4', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'من المزرعة إلى الميناء' : 'Farm to Port Infrastructure'}
          </h1>
          <p className={cn('text-lg text-gray-500 max-w-2xl', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr
              ? 'سلسلة تبريد متكاملة، تتبع GPS مباشر، وشبكة موانئ تغطي 40+ وجهة عالمية.'
              : 'Integrated cold chain, live GPS tracking, and a port network covering 40+ global destinations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <RouteMap lang={lang} />
          <div className="relative h-[400px] lg:h-auto rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src={SECTION_IMAGES.logisticsHub}
              alt="Logistics"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            <div className="absolute bottom-6 start-6 end-6 glass-panel rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-white text-sm font-bold">{isAr ? 'شحنة نشطة' : 'Active Shipment'}</span>
              </div>
              <div className="text-white/80 text-xs font-mono">SHP-9921 → Rotterdam · ETA 14d · -2°C</div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className={cn('text-2xl font-black text-dark mb-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'مسار سلسلة التبريد' : 'Cold Chain Journey'}
          </h2>
          <p className={cn('text-sm text-gray-500 mb-8', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr ? 'مراقبة حرارة مستمرة في كل مرحلة من التعبئة إلى التسليم.' : 'Continuous temperature monitoring at every stage from packing to delivery.'}
          </p>
          <ColdChainStepper lang={lang} activeStep={3} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '40+', label: isAr ? 'دولة وجهة' : 'Destinations' },
            { value: '98.4%', label: isAr ? 'التسليم في الوقت' : 'On-Time Delivery' },
            { value: '-18°C', label: isAr ? 'مجمدات IQF' : 'IQF Frozen' },
            { value: '24/7', label: isAr ? 'مراقبة GPS' : 'GPS Monitoring' },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel rounded-xl p-6 border border-gray-200 text-center">
              <div className="text-3xl font-black text-primary font-mono mb-1">{stat.value}</div>
              <div className={cn('text-[10px] font-bold text-gray-500 uppercase', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <LogisticsEditorialGallery lang={lang} />
    </div>
  )
}
