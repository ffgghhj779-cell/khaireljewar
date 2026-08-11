/**
 * KHAIR ALJAAR FOODS — Brand Asset Manifest (Jeddah hub)
 */

export interface ComplianceCertificate {
  id: string
  nameEn: string
  nameAr: string
  body: string
  year: number
  imageSrc: string
  downloadUrl?: string
  verifyUrl?: string
  color: string
  status: 'Active' | 'Pending Renewal' | 'Archived'
  scope: string
}

export const COMPLIANCE_CERTIFICATES: ComplianceCertificate[] = [
  {
    id: 'cr',
    nameEn: 'Commercial Registration',
    nameAr: 'السجل التجاري',
    body: 'Ministry of Commerce — Kingdom of Saudi Arabia',
    year: 2024,
    imageSrc: '/images/legal/tax-registration-card.jpeg',
    downloadUrl: '/docs/certs/cr.pdf',
    color: '#2A6B5C',
    status: 'Active',
    scope: 'Khair Aljaar Foods — Jeddah',
  },
  {
    id: 'sfda',
    nameEn: 'Food Safety Alignment',
    nameAr: 'امتثال سلامة الغذاء',
    body: 'Saudi Food & Drug Authority (SFDA) — aligned practices',
    year: 2025,
    imageSrc: '/images/legal/export-registry-card.jpeg',
    downloadUrl: '/docs/certs/sfda.pdf',
    color: '#007A3D',
    status: 'Active',
    scope: 'Export food handling · Jeddah operations',
  },
  {
    id: 'globalgap',
    nameEn: 'GLOBALG.A.P.',
    nameAr: 'جلوبال جاب',
    body: 'GLOBALG.A.P. Control Body',
    year: 2024,
    imageSrc: '/images/brand/sections/farm.webp',
    downloadUrl: '/docs/certs/globalgap.pdf',
    verifyUrl: 'https://www.globalgap.org',
    color: '#5A2D82',
    status: 'Active',
    scope: 'Good Agricultural Practice — partner farm level',
  },
  {
    id: 'halal',
    nameEn: 'Halal Certified',
    nameAr: 'شهادة الحلال',
    body: 'Recognized Halal certification bodies',
    year: 2024,
    imageSrc: '/images/brand/sections/hospitality.webp',
    downloadUrl: '/docs/certs/halal.pdf',
    color: '#15803D',
    status: 'Active',
    scope: 'Fruit, vegetable, and frozen produce lines',
  },
  {
    id: 'iso',
    nameEn: 'ISO 22000 / HACCP',
    nameAr: 'آيزو 22000 / هاسب',
    body: 'Food safety management — supply chain',
    year: 2024,
    imageSrc: '/images/brand/sections/logistics.webp',
    downloadUrl: '/docs/certs/iso.pdf',
    color: '#00875A',
    status: 'Active',
    scope: 'Handling, packing, and cold-chain control',
  },
  {
    id: 'origin',
    nameEn: 'Certificate of Origin',
    nameAr: 'شهادة المنشأ',
    body: 'Jeddah Chamber of Commerce',
    year: 2024,
    imageSrc: '/images/brand/sections/people.webp',
    downloadUrl: '/docs/certs/origin.pdf',
    color: '#D4AE4A',
    status: 'Active',
    scope: 'Issued per shipment as required',
  },
]

export interface LogisticsPhoto {
  id: string
  titleEn: string
  titleAr: string
  src: string
  location: string
  tag: 'Cold Chain' | 'Port Ops' | 'Warehouse' | 'Transport' | 'Farm Gate'
  span?: 1 | 2
}

export const LOGISTICS_GALLERY: LogisticsPhoto[] = [
  {
    id: 'lg-01',
    titleEn: 'Loading at the distribution hub',
    titleAr: 'التحميل في مركز التوزيع',
    src: '/images/logistics/warehouse-trucks-loading.jpeg',
    location: 'Khair Aljaar Hub, Jeddah',
    tag: 'Transport',
    span: 2,
  },
  {
    id: 'lg-02',
    titleEn: 'Refrigerated export truck',
    titleAr: 'شاحنة مبردة للتصدير',
    src: '/images/logistics/refrigerated-truck-port.jpeg',
    location: 'Jeddah Islamic Port corridor',
    tag: 'Port Ops',
    span: 1,
  },
  {
    id: 'lg-03',
    titleEn: 'Regional distribution facility',
    titleAr: 'مرفق التوزيع الإقليمي',
    src: '/images/logistics/warehouse-exterior.jpeg',
    location: 'Jeddah, Saudi Arabia',
    tag: 'Warehouse',
    span: 1,
  },
  {
    id: 'lg-04',
    titleEn: 'Export-grade carton packing',
    titleAr: 'تعبئة كرتونية للتصدير',
    src: '/images/logistics/shipping-boxes.jpeg',
    location: 'Khair Aljaar packhouse',
    tag: 'Warehouse',
    span: 1,
  },
  {
    id: 'lg-05',
    titleEn: 'Cold-chain delivery — GCC routes',
    titleAr: 'توصيل سلسلة تبريد — مسارات الخليج',
    src: '/images/logistics/cold-chain-van.jpeg',
    location: 'GCC delivery network',
    tag: 'Cold Chain',
    span: 1,
  },
  {
    id: 'lg-06',
    titleEn: 'Long-haul transport',
    titleAr: 'نقل لمسافات طويلة',
    src: '/images/logistics/truck-desert.jpeg',
    location: 'Western Region highways',
    tag: 'Transport',
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
    src: '/images/team/farm-workers.jpeg',
    location: 'Partner farms · via Jeddah',
  },
  {
    id: 'tm-02',
    captionEn: 'Warehouse operations specialist',
    captionAr: 'متخصص عمليات المستودع',
    roleEn: 'Warehouse operations',
    roleAr: 'عمليات المستودع',
    src: '/images/team/warehouse-worker.jpeg',
    location: 'Khair Aljaar Hub, Jeddah',
  },
  {
    id: 'tm-03',
    captionEn: 'Modern agricultural partnership facility',
    captionAr: 'مرفق شراكة زراعية حديث',
    roleEn: 'Farm partnership',
    roleAr: 'شراكة المزرعة',
    src: '/images/team/farm-facility.jpeg',
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
