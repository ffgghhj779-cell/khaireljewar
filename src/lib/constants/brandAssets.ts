/**
 * KHAIR ALJAAR FOODS — Brand Asset Manifest
 *
 * FOLDER STRUCTURE (drop real files here):
 *   /public/images/products/     — product photography (hi-res, 1600px+ wide)
 *   /public/images/legal/        — ISO, Halal, FDA, GLOBALGAP certificates (PDF or HQ scan)
 *   /public/images/logistics/    — port, cold-chain, truck, warehouse operations
 *   /public/images/team/         — field staff, management, farm visits
 *   /public/images/branding/     — official logos, brand marks, icon variants
 *
 * NAMING CONVENTION:
 *   products/  → {slug}-hero.jpg, {slug}-detail-1.jpg, {slug}-detail-2.jpg
 *   legal/     → cert-{body}-{year}.jpg   e.g. cert-iso22000-2024.jpg
 *   logistics/ → ops-{location}-{n}.jpg   e.g. ops-damietta-01.jpg
 *   team/      → team-{role}-{n}.jpg      e.g. team-fieldagro-01.jpg
 *   branding/  → logo-{variant}.svg       e.g. logo-white.svg, logo-dark.svg
 */

/** ─── LEGAL & COMPLIANCE ─────────────────────────────────────────────────── */
export interface ComplianceCertificate {
  id: string
  nameEn: string
  nameAr: string
  body: string
  year: number
  /** /public/images/legal/ or external scan URL */
  imageSrc: string
  /** PDF download link once available */
  downloadUrl?: string
  /** Verification authority URL */
  verifyUrl?: string
  color: string
  status: 'Active' | 'Pending Renewal' | 'Archived'
  scope: string
}

export const COMPLIANCE_CERTIFICATES: ComplianceCertificate[] = [
  {
    id: 'tax-registration',
    nameEn: 'Tax Registration Card',
    nameAr: 'بطاقة التسجيل الضريبي',
    body: 'Egyptian Tax Authority — Ministry of Finance',
    year: 2024,
    imageSrc: '/images/legal/tax-registration-card.jpeg',
    color: '#B45309',
    status: 'Active',
    scope: 'خير الجوار جروب للتصدير — مسؤولية محدودة | Activity Code 4610',
  },
  {
    id: 'export-registry',
    nameEn: 'Exporters Registry Card',
    nameAr: 'بطاقة قيد المصدرين',
    body: 'General Authority for Export & Import Control — Egypt',
    year: 2025,
    imageSrc: '/images/legal/export-registry-card.jpeg',
    color: '#007A3D',
    status: 'Active',
    scope: 'KHAIR EL JEWAR GROUP — رأس المال 50,000 | Valid until 2030',
  },
  {
    id: 'globalgap',
    nameEn: 'GLOBALG.A.P.',
    nameAr: 'جلوبال جاب',
    body: 'GLOBALG.A.P. Control Body',
    year: 2024,
    imageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=90&w=1200&auto=format&fit=crop',
    verifyUrl: 'https://www.globalgap.org',
    color: '#5A2D82',
    status: 'Active',
    scope: 'Good Agricultural Practice — Farm Level',
  },
  {
    id: 'halal',
    nameEn: 'Halal Certified',
    nameAr: 'شهادة الحلال',
    body: 'Egyptian Export Council',
    year: 2024,
    imageSrc: 'https://images.unsplash.com/photo-1609840113703-57a2b2107834?q=90&w=1200&auto=format&fit=crop',
    color: '#15803D',
    status: 'Active',
    scope: 'All vegetable, fruit, and frozen produce lines',
  },
  {
    id: 'phyto',
    nameEn: 'Phytosanitary Certificate',
    nameAr: 'شهادة صحة النبات',
    body: 'MAFI Egypt',
    year: 2024,
    imageSrc: 'https://images.unsplash.com/photo-1574484995002-28a0c77a4e0d?q=90&w=1200&auto=format&fit=crop',
    color: '#00875A',
    status: 'Active',
    scope: 'Per shipment — all destinations',
  },
  {
    id: 'origin',
    nameEn: 'Certificate of Origin',
    nameAr: 'شهادة المنشأ',
    body: 'Egyptian Chamber of Commerce',
    year: 2024,
    imageSrc: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=90&w=1200&auto=format&fit=crop',
    color: '#0052CC',
    status: 'Active',
    scope: 'All export shipments — per invoice',
  },
]

/** ─── LOGISTICS GALLERY ──────────────────────────────────────────────────── */
export interface LogisticsPhoto {
  id: string
  titleEn: string
  titleAr: string
  src: string
  location: string
  tag: 'Cold Chain' | 'Port Ops' | 'Warehouse' | 'Transport' | 'Farm Gate'
  /** Grid span hint for masonry: 1 or 2 */
  span?: 1 | 2
}

export const LOGISTICS_GALLERY: LogisticsPhoto[] = [
  {
    id: 'lg-01',
    titleEn: 'KA Fleet — Live Loading at Distribution Hub',
    titleAr: 'أسطول KA — التحميل المباشر في مركز التوزيع',
    src: '/images/logistics/warehouse-trucks-loading.jpeg',
    location: 'KA Foods Warehouse, Egypt',
    tag: 'Transport',
    span: 2,
  },
  {
    id: 'lg-02',
    titleEn: 'Refrigerated Export Truck — Port Operations',
    titleAr: 'شاحنة مبردة للتصدير — عمليات الميناء',
    src: '/images/logistics/refrigerated-truck-port.jpeg',
    location: 'Egyptian Export Port',
    tag: 'Port Ops',
    span: 1,
  },
  {
    id: 'lg-03',
    titleEn: 'KA Foods Facility — Regional Distribution Center',
    titleAr: 'مرفق KA للأغذية — مركز التوزيع الإقليمي',
    src: '/images/logistics/warehouse-exterior.jpeg',
    location: 'KA Foods HQ, Egypt',
    tag: 'Warehouse',
    span: 1,
  },
  {
    id: 'lg-04',
    titleEn: 'Export-Grade Carton Packaging',
    titleAr: 'تعبئة كرتونية للتصدير',
    src: '/images/logistics/shipping-boxes.jpeg',
    location: 'KA Foods Packhouse',
    tag: 'Warehouse',
    span: 1,
  },
  {
    id: 'lg-05',
    titleEn: 'Premium Cold Chain Delivery Van — GCC Routes',
    titleAr: 'شاحنة توصيل متبردة للمسارات الخليجية',
    src: '/images/logistics/cold-chain-van.jpeg',
    location: 'GCC Delivery Network',
    tag: 'Cold Chain',
    span: 1,
  },
  {
    id: 'lg-06',
    titleEn: 'KA Branded Truck — Desert Highway Transport',
    titleAr: 'شاحنة KA — نقل عبر الطريق الصحراوي',
    src: '/images/logistics/truck-desert.jpeg',
    location: 'Desert Highway, Egypt',
    tag: 'Transport',
    span: 2,
  },
]

/** ─── TEAM & CULTURE ─────────────────────────────────────────────────────── */
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
    captionEn: 'KA farm workers — fresh harvest, ready for export',
    captionAr: 'عمال مزارع KA — حصاد طازج جاهز للتصدير',
    roleEn: 'Farm Harvest Team',
    roleAr: 'فريق حصاد المزرعة',
    src: '/images/team/farm-workers.jpeg',
    location: 'Khair Aljaar Farms, Egypt',
  },
  {
    id: 'tm-02',
    captionEn: 'KA warehouse operations specialist',
    captionAr: 'متخصص عمليات مستودعات KA',
    roleEn: 'Warehouse Operations',
    roleAr: 'عمليات المستودع',
    src: '/images/team/warehouse-worker.jpeg',
    location: 'KA Foods Facility, Egypt',
  },
  {
    id: 'tm-03',
    captionEn: 'Khair Aljaar Farms — modern agricultural facility',
    captionAr: 'مزارع خير الجوار — مرفق زراعي حديث',
    roleEn: 'Farm Facility',
    roleAr: 'مرفق المزرعة',
    src: '/images/team/farm-facility.jpeg',
    location: 'Khair Aljaar Farms, Egypt',
  },
]

/** ─── PRODUCT SHOWCASE GALLERY (all brand photography) ───────────────────── */
export interface ProductGalleryItem {
  id: string
  titleEn: string
  titleAr: string
  categoryEn: string
  categoryAr: string
  src: string
  span?: 1 | 2
}

export const PRODUCT_GALLERY: ProductGalleryItem[] = [
  { id: 'pg-01', titleEn: 'Premium Strawberries', titleAr: 'فراولة فاخرة', categoryEn: 'Fruits', categoryAr: 'فواكه', src: '/images/products/strawberries-banner.jpeg', span: 2 },
  { id: 'pg-02', titleEn: 'Kent Mangoes — Export Display', titleAr: 'مانجو كينت — عرض تصدير', categoryEn: 'Fruits', categoryAr: 'فواكه', src: '/images/products/mangoes-display.jpeg', span: 2 },
  { id: 'pg-03', titleEn: 'Luxury Medjool Dates', titleAr: 'تمر مجدول فاخر', categoryEn: 'Dates', categoryAr: 'تمور', src: '/images/products/dates-luxury-display.jpeg' },
  { id: 'pg-04', titleEn: 'Fresh Chicken on Ice', titleAr: 'دجاج طازج على الثلج', categoryEn: 'Poultry', categoryAr: 'دواجن', src: '/images/products/chicken-fresh-ice.jpeg' },
  { id: 'pg-05', titleEn: 'Packed Chicken Trays', titleAr: 'صواني دجاج معبأة', categoryEn: 'Poultry', categoryAr: 'دواجن', src: '/images/products/chicken-packed-trays.jpeg' },
  { id: 'pg-06', titleEn: 'Chilled Chicken Box', titleAr: 'صندوق دجاج مبرد', categoryEn: 'Poultry', categoryAr: 'دواجن', src: '/images/products/chilled-chicken-box.jpeg' },
  { id: 'pg-07', titleEn: 'Frozen Proteins', titleAr: 'بروتينات مجمدة', categoryEn: 'Frozen', categoryAr: 'مجمدات', src: '/images/products/frozen-proteins-box.jpeg' },
  { id: 'pg-08', titleEn: 'Premium Meats Display', titleAr: 'عرض لحوم فاخرة', categoryEn: 'Meats', categoryAr: 'لحوم', src: '/images/products/meats-display.jpeg' },
  { id: 'pg-09', titleEn: 'Cold Shelf — Full Range', titleAr: 'رف مبرد — تشكيلة كاملة', categoryEn: 'Retail', categoryAr: 'تجزئة', src: '/images/products/cold-shelf-display.jpeg', span: 2 },
  { id: 'pg-10', titleEn: 'Olive Oil — Lifestyle', titleAr: 'زيت زيتون', categoryEn: 'Oils', categoryAr: 'زيوت', src: '/images/products/olive-oil-lifestyle.jpeg' },
  { id: 'pg-11', titleEn: 'Sunflower Oil Bottle', titleAr: 'زيت عباد الشمس', categoryEn: 'Oils', categoryAr: 'زيوت', src: '/images/products/sunflower-oil-bottle.jpeg' },
  { id: 'pg-12', titleEn: 'Sunflower Oil Gift Box', titleAr: 'علبة هدايا زيت', categoryEn: 'Oils', categoryAr: 'زيوت', src: '/images/products/sunflower-oil-giftbox.jpeg' },
  { id: 'pg-13', titleEn: 'Spunta Potatoes — Retail', titleAr: 'بطاطس سبونتا', categoryEn: 'Vegetables', categoryAr: 'خضروات', src: '/images/products/potatoes-retail.jpeg' },
  { id: 'pg-14', titleEn: 'Potatoes Display Stand', titleAr: 'ستاند عرض بطاطس', categoryEn: 'Vegetables', categoryAr: 'خضروات', src: '/images/products/potatoes-display-stand.jpeg' },
  { id: 'pg-15', titleEn: 'Seasoned Fries Pack', titleAr: 'بطاطس مقلية متبلة', categoryEn: 'Frozen', categoryAr: 'مجمدات', src: '/images/products/seasoned-fries-pack.jpeg' },
  { id: 'pg-16', titleEn: 'Fresh Okra Box', titleAr: 'بامية طازجة', categoryEn: 'Vegetables', categoryAr: 'خضروات', src: '/images/products/okra-box.jpeg' },
  { id: 'pg-17', titleEn: 'Herbs & Greens', titleAr: 'أعشاب وخضروات ورقية', categoryEn: 'Vegetables', categoryAr: 'خضروات', src: '/images/products/herbs-greens-packed.jpeg' },
  { id: 'pg-18', titleEn: 'Premium Rice Bags', titleAr: 'أرز فاخر', categoryEn: 'Grains', categoryAr: 'حبوب', src: '/images/products/rice-bags-display.jpeg' },
  { id: 'pg-19', titleEn: 'Grains Shelf Display', titleAr: 'عرض حبوب', categoryEn: 'Grains', categoryAr: 'حبوب', src: '/images/products/grains-shelf-display.jpeg' },
  { id: 'pg-20', titleEn: 'Mixed Fruits Cart', titleAr: 'سلة فواكه مشكلة', categoryEn: 'Fruits', categoryAr: 'فواكه', src: '/images/products/fruits-shopping-cart.jpeg' },
  { id: 'pg-21', titleEn: 'Supermarket Kiosk', titleAr: 'كشك سوبرماركت', categoryEn: 'Retail', categoryAr: 'تجزئة', src: '/images/products/supermarket-kiosk.jpeg', span: 2 },
]

/** ─── ASSET PLACEMENT MAP ────────────────────────────────────────────────── */
export const SITEMAP_PLACEMENT = {
  'TrustComplianceHub': '/quality (after metrics)',
  'LogisticsEditorialGallery': '/logistics (after cold chain stepper)',
  'PeoplePassionGallery': '/about (after stats grid)',
}
