/** Business + retail partners featured on Khair Aljaar */

export type PartnerLogo = {
  id: string
  name: { en: string; ar: string }
  tag: { en: string; ar: string }
  logo: string
  href?: string
  darkCard?: boolean
}

/** Display order: Ninja – noon – Tasami – Al Rehan – Thimar Ardina */
export const PARTNER_LOGOS: PartnerLogo[] = [
  {
    id: 'ninja',
    name: { en: 'Ninja', ar: 'نينجا' },
    tag: { en: 'Retail partner', ar: 'شريك تجزئة' },
    logo: '/images/partners/ninja-logo.svg',
  },
  {
    id: 'noon',
    name: { en: 'noon', ar: 'نون' },
    tag: { en: 'Retail partner', ar: 'شريك تجزئة' },
    logo: '/images/partners/noon-logo.svg',
  },
  {
    id: 'tasami',
    name: { en: 'Tasami Al-Wataniya', ar: 'تسامي الوطنية' },
    tag: { en: 'Wholesale food supply', ar: 'توريد أغذية بالجملة' },
    logo: '/images/partners/tasami-logo.png',
    href: 'https://tasami56taa.vercel.app/',
  },
  {
    id: 'alrehan',
    name: { en: 'Al Rehan Al Masi', ar: 'الرهان الماسي' },
    tag: { en: 'Poultry · Eggs', ar: 'دواجن · بيض' },
    logo: '/images/partners/alrehan-logo.png',
    href: 'https://alrehan-almasi.vercel.app/',
  },
  {
    id: 'thimar',
    name: { en: 'Thimar Ardina', ar: 'ثمار أرضنا' },
    tag: { en: 'Sister brand · KSA', ar: 'العلامة الشقيقة · السعودية' },
    logo: '/images/partners/thimar-ardina-logo.png',
    href: 'https://themarardena.vercel.app/',
    darkCard: true,
  },
]

export const PARTNERS = [
  {
    id: 'tasami',
    name: {
      en: 'Tasami Al-Wataniya',
      ar: 'تسامي الوطنية',
    },
    tag: {
      en: 'Wholesale food supply',
      ar: 'توريد أغذية بالجملة',
    },
    brief: {
      en: 'A national wholesale house for chilled and frozen poultry, fresh eggs, produce, frozen lines, and pantry staples — built for restaurants, central markets, and catering that need steady supply.',
      ar: 'مؤسسة توريد جملة وطنية للدواجن المبردة والمجمدة، والبيض الطازج، والخضار والفاكهة، والمجمدات، ومستلزمات المطبخ — لخدمة المطاعم والأسواق المركزية وقطاع التموين بتوريد منتظم.',
    },
    focus: {
      en: ['Chilled & frozen poultry', 'Fresh eggs & produce', 'Frozen & pantry lines', 'Halal · SFDA-aligned'],
      ar: ['دواجن مبردة ومجمدة', 'بيض طازج وخضار وفاكهة', 'مجمدات ومستلزمات مطبخ', 'حلال · مطابق لهيئة الغذاء والدواء'],
    },
    href: 'https://tasami56taa.vercel.app/',
    logo: '/images/partners/tasami-logo.png',
  },
  {
    id: 'alrehan',
    name: {
      en: 'Al Rehan Al Masi Poultry',
      ar: 'مؤسسة الرهان الماسي للدواجن',
    },
    tag: {
      en: 'Poultry · Eggs · Farm to table',
      ar: 'دواجن · بيض · من المزرعة إلى المائدة',
    },
    brief: {
      en: 'A trusted poultry partner supplying chilled and frozen chicken, table eggs, and processed lines — with certified Halal slaughter, cold-chain care, and farm-to-table discipline for hotels, restaurants, and catering.',
      ar: 'شريك دواجن موثوق يورّد الدجاج المبرد والمجمد، وبيض المائدة، والمصنعات — مع ذبح حلال معتمد، عناية بسلسلة التبريد، وانضباط من المزرعة إلى المائدة لخدمة الفنادق والمطاعم وشركات التموين.',
    },
    focus: {
      en: ['Chilled & frozen chicken', 'Fresh table eggs', 'Processed chicken lines', 'Halal · Continuous cold chain'],
      ar: ['دجاج مبرد ومجمد', 'بيض مائدة طازج', 'مصنعات الدجاج', 'حلال · سلسلة تبريد متواصلة'],
    },
    href: 'https://alrehan-almasi.vercel.app/',
    logo: '/images/partners/alrehan-logo.png',
  },
  {
    id: 'thimar',
    name: {
      en: 'Thimar Ardina',
      ar: 'ثمار أرضنا',
    },
    tag: {
      en: 'Sister brand · Kingdom of Saudi Arabia',
      ar: 'العلامة الشقيقة · المملكة العربية السعودية',
    },
    brief: {
      en: 'The group’s Saudi harvest house — bringing Khair Aljaar’s neighborly care into the Kingdom under the Thimar Ardina name, close to kitchens and partners across Saudi Arabia.',
      ar: 'بيت الحصاد السعودي للمجموعة — ينقل عناية خير الجوار إلى المملكة تحت اسم ثمار أرضنا، قريباً من المطابخ والشركاء في أنحاء السعودية.',
    },
    focus: {
      en: ['Jeddah hub', 'Fresh produce', 'Group sister brand', 'Saudi market'],
      ar: ['مركز جدة', 'محاصيل طازجة', 'علامة شقيقة للمجموعة', 'السوق السعودي'],
    },
    href: 'https://themarardena.vercel.app/',
    logo: '/images/partners/thimar-ardina-logo.png',
  },
] as const
