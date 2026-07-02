import { ABOUT_HERO_IMAGE } from '@/lib/constants/images'
import { BRAND } from '@/lib/constants/brand'
import PremiumImage from '@/components/ui/PremiumImage'
import Container from '@/components/ui/Container'
import PeoplePassionGallery from '@/components/sections/PeoplePassionGallery'
import { cn } from '@/lib/utils/cn'
import { Award, Leaf, Users, Globe2 } from 'lucide-react'

export default function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'

  const stats = [
    { value: '25+', label: isAr ? 'سنوات خبرة' : 'Years Experience', icon: Award },
    { value: '5000+', label: isAr ? 'عميل سعيد' : 'Happy Customers', icon: Leaf },
    { value: '40+', label: isAr ? 'مزرعة متعاونة' : 'Partner Farms', icon: Globe2 },
    { value: '100%', label: isAr ? 'جودة مضمونة' : 'Guaranteed Quality', icon: Users },
  ]

  return (
    <div className="min-h-screen py-12 pb-24">
      <Container size="large">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <PremiumImage
                src={ABOUT_HERO_IMAGE}
                alt={isAr ? 'مزارع وشبكة تصدير عالمية' : 'Premium agricultural export network'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className={cn('text-5xl md:text-7xl font-black text-dark editorial-heading mb-6', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? `عن ${BRAND.name.ar}` : `About ${BRAND.name.en}`}
            </h1>
            <p className={cn("text-xl text-gray-500 leading-relaxed mb-8", isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr 
                ? 'تأسس متجر خير الجوار برؤية واضحة: تقديم أفضل وأجود المنتجات الغذائية الطبيعية مباشرة من المزرعة إليك. نحن نؤمن بأن الجودة تبدأ من البذرة.' 
                : 'Khair Aljewar was founded with a clear vision: delivering the finest and highest quality natural food products straight from the farm to you.'}
            </p>
            <p className={cn("text-lg text-gray-500 leading-relaxed mb-12", isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr
                ? 'نمتلك شبكة واسعة من المزارع الموثوقة، ونطبق أعلى معايير الجودة لضمان وصول المنتجات طازجة وصحية لعائلتك يومياً.'
                : 'We have a wide network of trusted farms, applying the highest quality standards to ensure products arrive fresh and healthy to your family daily.'}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-dark">{stat.value}</div>
                    <div className={cn("text-sm text-gray-500 font-bold", isAr ? 'font-ibm-arabic' : 'font-inter')}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <PeoplePassionGallery lang={lang} />
    </div>
  )
}
