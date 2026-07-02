import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'
import { Globe2 } from 'lucide-react'

export default function ExportMarketsPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  const regions = [
    {
      name: isAr ? 'أوروبا' : 'Europe',
      countries: ['Netherlands', 'Germany', 'UK', 'Italy', 'Spain'],
      stats: '45%'
    },
    {
      name: isAr ? 'الشرق الأوسط والخليج' : 'Middle East & GCC',
      countries: ['UAE', 'Saudi Arabia', 'Kuwait', 'Oman'],
      stats: '30%'
    },
    {
      name: isAr ? 'آسيا' : 'Asia',
      countries: ['India', 'Malaysia', 'Singapore', 'China'],
      stats: '15%'
    },
    {
      name: isAr ? 'أفريقيا' : 'Africa',
      countries: ['Kenya', 'South Africa', 'Senegal'],
      stats: '10%'
    }
  ]

  return (
    <div className="min-h-screen py-12 pb-24">
      <Container size="large">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-dark font-bold text-sm mb-6 uppercase tracking-widest">
            <Globe2 className="w-4 h-4" />
            {isAr ? 'شبكة عالمية' : 'Global Network'}
          </div>
          <h1 className={cn("text-5xl md:text-7xl font-black text-dark tracking-tight mb-6", isAr ? 'font-ibm-arabic' : 'font-manrope')}>
            {isAr ? 'أسواق التصدير' : 'Export Markets'}
          </h1>
          <p className={cn("text-xl text-gray-500 leading-relaxed", isAr ? 'font-ibm-arabic' : 'font-inter')}>
            {isAr 
              ? 'نصل بمنتجاتنا الزراعية الفاخرة إلى أكثر من 40 دولة حول العالم، مع الالتزام التام بمتطلبات الجودة والفحص لكل دولة.' 
              : 'We reach more than 40 countries worldwide with our premium agricultural products, fully complying with the quality and inspection requirements of each country.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regions.map((region, i) => (
            <div key={i} className="bg-white p-10 rounded-[2rem] shadow-soft border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-between items-start mb-8">
                <h2 className={cn("text-3xl font-black text-dark", isAr ? 'font-ibm-arabic' : 'font-manrope')}>{region.name}</h2>
                <span className="bg-gray-100 text-dark font-bold px-4 py-2 rounded-xl text-sm">
                  {isAr ? 'حجم التصدير' : 'Export Volume'}: {region.stats}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {region.countries.map(country => (
                  <span key={country} className="bg-gray-50 text-gray-600 border border-gray-100 px-4 py-2 rounded-lg text-sm font-bold">
                    {country}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
