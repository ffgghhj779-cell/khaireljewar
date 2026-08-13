/** KHAIR ALJAAR FOODS — Jeddah, Saudi Arabia */

function envOr(key: string, fallback: string): string {
  const value = process.env[key]?.trim()
  return value || fallback
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

const phoneDisplay = envOr('NEXT_PUBLIC_CONTACT_PHONE', '+966 12 000 0000')
const phoneWa = digitsOnly(envOr('NEXT_PUBLIC_WHATSAPP_NUMBER', '966120000000'))
const phoneTel = phoneDisplay.startsWith('+') ? phoneDisplay.replace(/\s/g, '') : `+${phoneWa}`

export const BRAND = {
  name: {
    en: 'Khair Aljaar',
    ar: 'خير الجوار',
  },
  nameFull: {
    en: 'Khair Aljaar Foods',
    ar: 'خير الجوار للأغذية',
  },
  nameGroup: {
    en: 'Khair Aljaar Group',
    ar: 'مجموعة خير الجوار',
  },
  /** Neighborliness / trust — core Arabic meaning of الجوار */
  tagline: {
    ar: 'خير الجوار… من جدة إلى العالم',
    en: 'Neighborly goodness — from Jeddah to the world',
  },
  /** One-line positioning for meta, PDF, chrome */
  positioning: {
    en: 'A Jeddah food house — hospitality, trust, and export-ready quality.',
    ar: 'بيت غذائي من جدة — ضيافة، ثقة، وجودة جاهزة للتصدير.',
  },
  /** Honest sourcing narrative: partner farms → Jeddah hub → world */
  sourcing: {
    en: 'We source from trusted partner farms and coordinate export with care from Jeddah.',
    ar: 'نورد من مزارع شريكة موثوقة وننسّق التصدير بعناية من جدة.',
  },
  city: {
    en: 'Jeddah',
    ar: 'جدة',
  },
  country: {
    en: 'Saudi Arabia',
    ar: 'المملكة العربية السعودية',
  },
  /**
   * Contact — override at go-live:
   * NEXT_PUBLIC_CONTACT_PHONE / NEXT_PUBLIC_WHATSAPP_NUMBER / NEXT_PUBLIC_CONTACT_EMAIL
   */
  contact: {
    address: {
      en: 'Jeddah Islamic Port area · Jeddah 21483, Saudi Arabia',
      ar: 'منطقة ميناء جدة الإسلامي · جدة 21483، المملكة العربية السعودية',
    },
    phone: phoneDisplay,
    phoneTel,
    phoneWa,
    email: envOr('NEXT_PUBLIC_CONTACT_EMAIL', 'info@khairaljaarfoods.com'),
    hours: {
      en: 'Sun – Thu · 9:00 – 17:00 (AST)',
      ar: 'الأحد – الخميس · 9:00 – 17:00 (توقيت السعودية)',
    },
  },
  legal: {
    crHint: {
      en: 'Commercial Registration — Kingdom of Saudi Arabia (final CR on go-live)',
      ar: 'السجل التجاري — المملكة العربية السعودية (الرقم النهائي عند الإطلاق)',
    },
  },
} as const

export const INCOTERMS = ['FOB', 'CIF', 'CFR', 'EXW', 'DAP'] as const
export type Incoterm = (typeof INCOTERMS)[number]
