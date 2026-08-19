/** KHAIR ALJAAR FOODS — Jeddah, Saudi Arabia */

function envOr(key: string, fallback: string): string {
  const value = process.env[key]?.trim()
  return value || fallback
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

const phoneDisplay = envOr('NEXT_PUBLIC_CONTACT_PHONE', '+966 56 443 9652')
const phoneWa = digitsOnly(envOr('NEXT_PUBLIC_WHATSAPP_NUMBER', '966564439652'))
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
  sisterBrand: {
    en: 'Thimar Ardina',
    ar: 'ثمار أرضنا',
  },
  /** Neighborliness / trust — core Arabic meaning of الجوار */
  tagline: {
    ar: 'خير الجوار… من جدة إلى العالم',
    en: 'Neighborly goodness — from Jeddah to the world',
  },
  positioning: {
    en: 'A Jeddah food house — hospitality, trust, and export-ready quality.',
    ar: 'بيت غذائي من جدة — ضيافة، ثقة، وجودة جاهزة للتصدير.',
  },
  sourcing: {
    en: 'We source from trusted partner farms and coordinate export with care from Jeddah.',
    ar: 'نورد من مزارع شريكة موثوقة وننسّق التصدير بعناية من جدة.',
  },
  bio: {
    en: [
      'From Khair Aljaar in Egypt to Thimar Ardina in the Kingdom of Saudi Arabia',
      'And from Khair Aljaar, the other group companies',
    ],
    ar: [
      'من خير الجوار في مصر إلى ثمار أرضنا في المملكة العربية السعودية',
      'ومن خير الجوار الشركات الأخرى',
    ],
  },
  city: {
    en: 'Jeddah',
    ar: 'جدة',
  },
  country: {
    en: 'Saudi Arabia',
    ar: 'المملكة العربية السعودية',
  },
  contact: {
    address: {
      en: "Abu Ma'ali Al-Hadari, Al-Safa, Jeddah 23454, Saudi Arabia",
      ar: 'أبو معالي الحضري، الصفا، جدة 23454، المملكة العربية السعودية',
    },
    phone: phoneDisplay,
    phoneTel,
    phoneWa,
    email: envOr('NEXT_PUBLIC_CONTACT_EMAIL', 'info@khairaljaarfoods.com'),
    hours: {
      en: 'Sun – Thu · 9:00 – 17:00 (AST)',
      ar: 'الأحد – الخميس · 9:00 – 17:00 (توقيت السعودية)',
    },
    egypt: {
      address: {
        en: 'Fifth Settlement — Gardina, Cairo, Egypt',
        ar: 'التجمع الخامس - جاردينا',
      },
      phone: '01122049900',
      phoneTel: '+201122049900',
    },
  },
  legal: {
    taxCard: '767-430-832',
    commercialRegister: '247538',
    line: {
      en: 'Tax ID: 767-430-832  ·  C.R.: 247538',
      ar: 'ب.ض: 767-430-832  |  س.ت: 247538',
    },
    crHint: {
      en: 'Tax card 767-430-832 · Commercial registration 247538',
      ar: 'ب.ض: 767-430-832 | س.ت: 247538',
    },
  },
} as const

export const INCOTERMS = ['FOB', 'CIF', 'CFR', 'EXW', 'DAP'] as const
export type Incoterm = (typeof INCOTERMS)[number]
