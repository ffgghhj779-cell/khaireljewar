/**
 * KHAIR ALJAAR FOODS — Brand Asset Manifest (Jeddah hub)
 */

export interface ComplianceCertificate {
  id: string
  nameEn: string
  nameAr: string
  body: string
  bodyAr: string
  year: number
  imageSrc: string
  downloadUrl?: string
  verifyUrl?: string
  color: string
  status: 'Active' | 'Pending Renewal' | 'Archived'
  scope: string
  scopeAr: string
}

export const COMPLIANCE_CERTIFICATES: ComplianceCertificate[] = [
  {
    id: 'cr',
    nameEn: 'Commercial Registration',
    nameAr: 'السجل التجاري',
    body: 'Ministry of Commerce — Kingdom of Saudi Arabia',
    bodyAr: 'وزارة التجارة — المملكة العربية السعودية',
    year: 2024,
    imageSrc: '/images/brand/sections/hospitality.webp',
    color: '#2A6B5C',
    status: 'Active',
    scope: 'Khair Aljaar Foods — Jeddah',
    scopeAr: 'خير الجوار للأغذية — جدة',
  },
  {
    id: 'sfda',
    nameEn: 'Food Safety Alignment',
    nameAr: 'امتثال سلامة الغذاء',
    body: 'Saudi Food & Drug Authority (SFDA) — aligned practices',
    bodyAr: 'هيئة الغذاء والدواء (SFDA) — ممارسات متوافقة',
    year: 2025,
    imageSrc: '/images/brand/sections/logistics.webp',
    color: '#007A3D',
    status: 'Active',
    scope: 'Export food handling · Jeddah operations',
    scopeAr: 'تداول أغذية التصدير · عمليات جدة',
  },
  {
    id: 'globalgap',
    nameEn: 'GLOBALG.A.P.',
    nameAr: 'جلوبال جاب',
    body: 'GLOBALG.A.P. Control Body',
    bodyAr: 'جهة رقابة GLOBALG.A.P.',
    year: 2024,
    imageSrc: '/images/brand/sections/farm.webp',
    verifyUrl: 'https://www.globalgap.org',
    color: '#5A2D82',
    status: 'Active',
    scope: 'Good Agricultural Practice — partner farm level',
    scopeAr: 'الممارسات الزراعية الجيدة — على مستوى المزارع الشريكة',
  },
  {
    id: 'halal',
    nameEn: 'Halal Certified',
    nameAr: 'شهادة الحلال',
    body: 'Recognized Halal certification bodies',
    bodyAr: 'جهات اعتماد حلال معترف بها',
    year: 2024,
    imageSrc: '/images/brand/sections/hospitality.webp',
    color: '#15803D',
    status: 'Active',
    scope: 'Fruit, vegetable, and frozen produce lines',
    scopeAr: 'خطوط الفاكهة والخضروات والمجمدات',
  },
  {
    id: 'iso',
    nameEn: 'ISO 22000 / HACCP',
    nameAr: 'آيزو 22000 / هاسب',
    body: 'Food safety management — supply chain',
    bodyAr: 'إدارة سلامة الغذاء — سلسلة التوريد',
    year: 2024,
    imageSrc: '/images/brand/sections/logistics.webp',
    color: '#00875A',
    status: 'Active',
    scope: 'Handling, packing, and cold-chain control',
    scopeAr: 'التداول والتعبئة وضبط سلسلة التبريد',
  },
  {
    id: 'origin',
    nameEn: 'Certificate of Origin',
    nameAr: 'شهادة المنشأ',
    body: 'Jeddah Chamber of Commerce',
    bodyAr: 'الغرفة التجارية بجدة',
    year: 2024,
    imageSrc: '/images/brand/sections/people.webp',
    color: '#D4AE4A',
    status: 'Active',
    scope: 'Issued per shipment as required',
    scopeAr: 'تصدر لكل شحنة حسب الحاجة',
  },
]

export interface LogisticsPhoto {
  id: string
  titleEn: string
  titleAr: string
  src: string
  location: string
  locationAr: string
  tag: 'Cold Chain' | 'Port Ops' | 'Warehouse' | 'Transport' | 'Farm Gate'
  span?: 1 | 2
}

export const LOGISTICS_TAG_LABELS: Record<LogisticsPhoto['tag'] | 'All', { en: string; ar: string }> = {
  All: { en: 'All', ar: 'الكل' },
  'Port Ops': { en: 'Port Ops', ar: 'الميناء' },
  'Cold Chain': { en: 'Cold Chain', ar: 'سلسلة التبريد' },
  Warehouse: { en: 'Warehouse', ar: 'المستودع' },
  Transport: { en: 'Transport', ar: 'النقل' },
  'Farm Gate': { en: 'Farm Gate', ar: 'المزرعة' },
}

export const LOGISTICS_GALLERY: LogisticsPhoto[] = [
  {
    id: 'lg-01',
    titleEn: 'Loading at the distribution hub',
    titleAr: 'التحميل في مركز التوزيع',
    src: '/images/brand/sections/logistics.webp',
    location: 'Khair Aljaar Hub, Jeddah',
    locationAr: 'مركز خير الجوار، جدة',
    tag: 'Transport',
    span: 2,
  },
  {
    id: 'lg-02',
    titleEn: 'Refrigerated export truck',
    titleAr: 'شاحنة مبردة للتصدير',
    src: '/images/brand/hero-reel/port.png',
    location: 'Jeddah Islamic Port corridor',
    locationAr: 'ممر ميناء جدة الإسلامي',
    tag: 'Port Ops',
    span: 1,
  },
  {
    id: 'lg-03',
    titleEn: 'Regional distribution facility',
    titleAr: 'مرفق التوزيع الإقليمي',
    src: '/images/brand/hero-reel/warehouse.webp',
    location: 'Jeddah, Saudi Arabia',
    locationAr: 'جدة، المملكة العربية السعودية',
    tag: 'Warehouse',
    span: 1,
  },
  {
    id: 'lg-04',
    titleEn: 'Export-grade carton packing',
    titleAr: 'تعبئة كرتونية للتصدير',
    src: '/images/brand/studio/hero-stage.webp',
    location: 'Khair Aljaar packhouse',
    locationAr: 'محطة تعبئة خير الجوار',
    tag: 'Warehouse',
    span: 1,
  },
  {
    id: 'lg-05',
    titleEn: 'Fresh produce ready for the cold chain',
    titleAr: 'محاصيل طازجة جاهزة لسلسلة التبريد',
    src: '/images/brand/hero-reel/produce.png',
    location: 'Khair Aljaar Hub, Jeddah',
    locationAr: 'مركز خير الجوار، جدة',
    tag: 'Cold Chain',
    span: 1,
  },
  {
    id: 'lg-06',
    titleEn: 'At the partner farm gate',
    titleAr: 'عند بوابة المزرعة الشريكة',
    src: '/images/brand/sections/farm.webp',
    location: 'Partner farms · via Jeddah',
    locationAr: 'مزارع شريكة · عبر جدة',
    tag: 'Farm Gate',
    span: 2,
  },
]

export interface TeamPhoto {
  id: string
  captionEn: string
  captionAr: string
  roleEn: string
  roleAr: string
  src: string
  location: string
}

export const TEAM_GALLERY: TeamPhoto[] = [
  {
    id: 'tm-01',
    captionEn: 'Partner farm harvest — ready for export coordination',
    captionAr: 'حصاد المزارع الشريكة — جاهز لتنسيق التصدير',
    roleEn: 'Harvest partners',
    roleAr: 'شركاء الحصاد',
    src: '/images/brand/sections/people.webp',
    location: 'Partner farms · via Jeddah',
  },
  {
    id: 'tm-02',
    captionEn: 'Warehouse operations specialist',
    captionAr: 'متخصص عمليات المستودع',
    roleEn: 'Warehouse operations',
    roleAr: 'عمليات المستودع',
    src: '/images/brand/sections/logistics.webp',
    location: 'Khair Aljaar Hub, Jeddah',
  },
  {
    id: 'tm-03',
    captionEn: 'Modern agricultural partnership facility',
    captionAr: 'مرفق شراكة زراعية حديث',
    roleEn: 'Farm partnership',
    roleAr: 'شراكة المزرعة',
    src: '/images/brand/sections/farm.webp',
    location: 'Partner network · Jeddah coordinated',
  },
]

export interface ProductGalleryItem {
  id: string
  titleEn: string
  titleAr: string
  descEn: string
  descAr: string
  detailEn: string
  detailAr: string
  categoryEn: string
  categoryAr: string
  src: string
  span?: 1 | 2
}

/** Legacy showcase — keep catalog on /images/products via PRODUCT_SLUG_IMAGES */
export const PRODUCT_GALLERY: ProductGalleryItem[] = []
