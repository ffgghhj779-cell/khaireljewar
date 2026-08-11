import Link from 'next/link'
import BrandLockup from '@/components/ui/BrandLockup'
import { BRAND } from '@/lib/constants/brand'
import { Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function Footer({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const companyLinks = [
    { label: isAr ? 'من نحن' : 'About', href: `/${lang}/about` },
    { label: isAr ? 'الجودة' : 'Quality', href: `/${lang}/quality` },
    { label: isAr ? 'اللوجستيات' : 'Logistics', href: `/${lang}/logistics` },
    { label: isAr ? 'أسواق التصدير' : 'Markets', href: `/${lang}/export-markets` },
    { label: isAr ? 'اتصل بنا' : 'Contact', href: `/${lang}/contact` },
  ]

  const productLinks = [
    { label: isAr ? 'الكتالوج' : 'Full catalog', href: `/${lang}/products` },
    { label: isAr ? 'الموالح' : 'Citrus', href: `/${lang}/products?category=Citrus` },
    { label: isAr ? 'التمور' : 'Dates', href: `/${lang}/products?category=Dates` },
    { label: isAr ? 'الفواكه' : 'Fruits', href: `/${lang}/products?category=Fruits` },
    { label: isAr ? 'الخضروات' : 'Vegetables', href: `/${lang}/products?category=Vegetables` },
    { label: isAr ? 'المجمدات' : 'Frozen', href: `/${lang}/products?category=Frozen` },
  ]

  return (
    <footer className="relative bg-dark text-white pt-20 pb-10 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(42,107,92,0.45), transparent 55%), radial-gradient(ellipse 40% 40% at 100% 0%, rgba(212,174,74,0.12), transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <BrandLockup lang={lang} variant="footer" />
            </div>
            <p className={cn('text-white/55 leading-relaxed max-w-sm text-[15px]', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr
                ? `${BRAND.nameFull.ar} — من جدة، بروح الضيافة والثقة إلى شركائنا حول العالم.`
                : `${BRAND.nameFull.en} — from Jeddah, with hospitality and trust to partners worldwide.`}
            </p>
          </div>

          <div>
            <h4 className={cn('font-semibold text-sm mb-5 text-white/40', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-white/70 hover:text-secondary transition-colors text-sm font-medium',
                      isAr ? 'font-arabic' : 'font-sans'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={cn('font-semibold text-sm mb-5 text-white/40', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'المنتجات' : 'Products'}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-white/70 hover:text-secondary transition-colors text-sm font-medium',
                      isAr ? 'font-arabic' : 'font-sans'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={cn('font-semibold text-sm mb-5 text-white/40', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'تواصل معنا' : 'Contact'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" strokeWidth={1.75} />
                <span className={cn('text-white/65 text-sm', isAr ? 'font-arabic' : 'font-sans')}>
                  {isAr ? BRAND.contact.address.ar : BRAND.contact.address.en}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary shrink-0" strokeWidth={1.75} />
                <a
                  href={`tel:${BRAND.contact.phoneTel}`}
                  className="text-white/65 text-sm hover:text-secondary transition-colors"
                  dir="ltr"
                >
                  {BRAND.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0" strokeWidth={1.75} />
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="text-white/65 text-sm hover:text-secondary transition-colors break-all"
                >
                  {BRAND.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={cn('text-white/40 text-sm', isAr ? 'font-arabic' : 'font-sans')}>
            &copy; {new Date().getFullYear()}{' '}
            {isAr ? `${BRAND.nameFull.ar}. جميع الحقوق محفوظة.` : `${BRAND.nameFull.en}. All rights reserved.`}
          </p>
          <div className={cn('flex items-center gap-6 text-sm text-white/40', isAr ? 'font-arabic' : 'font-sans')}>
            <Link href={`/${lang}/privacy`} className="hover:text-secondary transition-colors">
              {isAr ? 'سياسة الخصوصية' : 'Privacy'}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-secondary transition-colors">
              {isAr ? 'الشروط' : 'Terms'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
