import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function Footer({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const companyLinks = [
    { label: isAr ? 'من نحن' : 'About Us', href: `/${lang}/about` },
    { label: isAr ? 'الجودة' : 'Quality Hub', href: `/${lang}/quality` },
    { label: isAr ? 'اللوجستيات' : 'Logistics', href: `/${lang}/logistics` },
    { label: isAr ? 'أسواق التصدير' : 'Export Markets', href: `/${lang}/export-markets` },
  ]

  const productLinks = [
    { label: isAr ? 'الموالح' : 'Fresh Citrus', href: `/${lang}/products` },
    { label: isAr ? 'الخضروات' : 'Vegetables', href: `/${lang}/products` },
    { label: isAr ? 'المجمدات' : 'Frozen Produce', href: `/${lang}/products` },
    { label: isAr ? 'بوابة العملاء' : 'Client Portal', href: `/${lang}/portal` },
  ]

  return (
    <footer className="bg-gray-50 text-dark pt-20 pb-8 border-t-4 border-primary relative">
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative h-12 w-auto min-w-[140px]">
                <Image
                  src="/images/branding/logo-full.jpeg"
                  alt="KHAIR ALJAAR FOODS"
                  width={180}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            <p className={cn('text-gray-600 leading-relaxed max-w-sm mb-6', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr
                ? 'شريكك الموثوق في تصدير أجود المحاصيل الزراعية المصرية إلى أسواق الخليج وأوروبا وأفريقيا بمعايير جودة لا تقبل المساومة.'
                : 'Your trusted B2B partner exporting premium Egyptian agricultural produce to GCC, European, and African markets with uncompromising quality standards.'}
            </p>
          </div>

          <div>
            <h4 className={cn('font-bold text-sm uppercase tracking-widest mb-6 text-gray-400', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={cn('font-bold text-sm uppercase tracking-widest mb-6 text-gray-400', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'المنتجات' : 'Products'}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={cn('font-bold text-sm uppercase tracking-widest mb-6 text-gray-400', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? 'تواصل معنا' : 'Contact'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className={cn('text-gray-600 text-sm', isAr ? 'font-ibm-arabic' : 'font-inter')}>
                  {isAr ? 'المنطقة الصناعية، الإسكندرية، مصر' : 'Industrial Zone, Alexandria, Egypt'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="text-gray-600 text-sm" dir="ltr">+20 100 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="text-gray-600 text-sm">export@khairaljaar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()}{' '}
            {isAr ? 'خير الجار فودز. جميع الحقوق محفوظة.' : 'KHAIR ALJAAR FOODS. All rights reserved.'}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-primary transition-colors">
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              {isAr ? 'الشروط والأحكام' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
