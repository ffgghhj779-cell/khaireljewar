import Link from 'next/link'
import type { ReactNode } from 'react'
import BrandLockup from '@/components/ui/BrandLockup'
import { BRAND } from '@/lib/constants/brand'
import { Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

function FooterIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-primary">
      {children}
    </span>
  )
}

export default function Footer({ lang }: { lang: string }) {
  const isAr = lang === 'ar'

  const companyLinks = [
    { label: isAr ? 'من نحن' : 'About', href: `/${lang}/about` },
    { label: isAr ? 'شركاؤنا' : 'Partners', href: `/${lang}/partners` },
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
    <footer className="relative z-10 bg-harvest text-cream pt-12 pb-[calc(6.25rem+env(safe-area-inset-bottom,0px))] md:pt-20 md:pb-10 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 55% 45% at 0% 100%, rgba(0,0,0,0.22), transparent 55%), radial-gradient(ellipse 40% 40% at 100% 0%, rgba(229,184,74,0.18), transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <BrandLockup lang={lang} variant="footer" />
            </div>
            <p className={cn('text-cream/75 leading-relaxed max-w-sm text-[15px]', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr
                ? `${BRAND.nameGroup.ar} — من جدة، بروح الضيافة والثقة إلى شركائنا حول العالم.`
                : `${BRAND.nameGroup.en} — from Jeddah, with hospitality and trust to partners worldwide.`}
            </p>
          </div>

          <div>
            <h4 className={cn('font-semibold text-sm mb-5 text-cream/55', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-cream/85 hover:text-secondary transition-colors text-sm font-medium',
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
            <h4 className={cn('font-semibold text-sm mb-5 text-cream/55', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'المنتجات' : 'Products'}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-cream/85 hover:text-secondary transition-colors text-sm font-medium',
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
            <h4 className={cn('font-semibold text-sm mb-5 text-cream/55', isAr ? 'font-arabic' : 'font-sans')}>
              {isAr ? 'تواصل معنا' : 'Contact'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FooterIcon>
                  <MapPin className="w-4 h-4" strokeWidth={1.75} />
                </FooterIcon>
                <span className={cn('text-cream/85 text-sm pt-1.5', isAr ? 'font-arabic' : 'font-sans')}>
                  {isAr ? BRAND.contact.address.ar : BRAND.contact.address.en}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FooterIcon>
                  <Phone className="w-4 h-4" strokeWidth={1.75} />
                </FooterIcon>
                <a
                  href={`tel:${BRAND.contact.phoneTel}`}
                  className="text-cream/85 text-sm hover:text-secondary transition-colors"
                  dir="ltr"
                >
                  {BRAND.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FooterIcon>
                  <Mail className="w-4 h-4" strokeWidth={1.75} />
                </FooterIcon>
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="text-cream/85 text-sm hover:text-secondary transition-colors break-all"
                >
                  {BRAND.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={cn('text-cream/60 text-sm', isAr ? 'font-arabic' : 'font-sans')}>
            &copy; {new Date().getFullYear()}{' '}
            {isAr
              ? `${BRAND.nameGroup.ar}. جميع الحقوق محفوظة.`
              : `${BRAND.nameGroup.en}. All rights reserved.`}
          </p>
          <div className={cn('flex items-center gap-6 text-sm text-cream/60', isAr ? 'font-arabic' : 'font-sans')}>
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
