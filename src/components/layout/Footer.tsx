import Link from 'next/link'
import BrandLockup from '@/components/ui/BrandLockup'
import { BRAND } from '@/lib/constants/brand'
import { Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function Footer({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const companyLinks = [
    { label: isAr ? 'من نحن' : 'About Us', href: `/${lang}/about` },
    { label: isAr ? 'الجودة' : 'Quality Hub', href: `/${lang}/quality` },
    { label: isAr ? 'اللوجستيات' : 'Logistics', href: `/${lang}/logistics` },
    { label: isAr ? 'أسواق التصدير' : 'Export Markets', href: `/${lang}/export-markets` },
    { label: isAr ? 'اتصل بنا' : 'Contact', href: `/${lang}/contact` },
  ]

  const productLinks = [
    { label: isAr ? 'الكتالوج' : 'Full Catalog', href: `/${lang}/products` },
    { label: isAr ? 'الفواكه' : 'Fresh Fruits', href: `/${lang}/products` },
    { label: isAr ? 'التمور' : 'Premium Dates', href: `/${lang}/products` },
    { label: isAr ? 'بوابة العملاء' : 'Client Portal', href: `/${lang}/portal` },
  ]

  return (
    <footer className="bg-gray-50 text-dark pt-20 pb-8 border-t-4 border-primary relative">
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <BrandLockup lang={lang} variant="footer" />
            </div>
            <p className={cn('text-primary font-bold text-sm mb-2', isAr ? 'font-ibm-arabic' : 'font-manrope')}>
              {isAr ? BRAND.tagline.ar : BRAND.tagline.en}
            </p>
            <p className={cn('text-gray-600 leading-relaxed max-w-sm mb-6', isAr ? 'font-ibm-arabic' : 'font-inter')}>
              {isAr
                ? `${BRAND.name.ar} — شريكك الموثوق في توريد وتصدير المنتجات الغذائية بمعايير جودة لا تقبل المساومة.`
                : `${BRAND.name.en} — your trusted partner for food supply and export with uncompromising quality standards.`}
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
                  {isAr ? BRAND.contact.address.ar : BRAND.contact.address.en}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href={`tel:${BRAND.contact.phoneTel}`} className="text-gray-600 text-sm hover:text-primary transition-colors" dir="ltr">
                  {BRAND.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href={`mailto:${BRAND.contact.email}`} className="text-gray-600 text-sm hover:text-primary transition-colors">
                  {BRAND.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={cn('text-gray-500 text-sm', isAr ? 'font-ibm-arabic' : 'font-inter')}>
            &copy; {new Date().getFullYear()}{' '}
            {isAr ? `${BRAND.name.ar}. جميع الحقوق محفوظة.` : `${BRAND.name.en}. All rights reserved.`}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href={`/${lang}/privacy`} className="hover:text-primary transition-colors">
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-primary transition-colors">
              {isAr ? 'الشروط والأحكام' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
