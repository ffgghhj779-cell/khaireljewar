import type { Product } from '@/lib/data/products'

const RICE = { en: 'Rice', ar: 'الأرز' } as const
const YEAR = { en: 'Year-round', ar: 'على مدار العام' } as const
const STOCK = { en: 'In Stock', ar: 'متوفر' } as const
const GRAIN = { en: 'Grains', ar: 'حبوب' } as const
const JEDDAH = { en: 'Supplied from Jeddah', ar: 'التوريد من جدة' } as const
const EGYPT = { en: 'Egypt, supplied from Jeddah', ar: 'مصر، والتوريد من جدة' } as const
const INDIA = { en: 'India, supplied from Jeddah', ar: 'الهند، والتوريد من جدة' } as const
const PAKISTAN = { en: 'Pakistan, supplied from Jeddah', ar: 'باكستان، والتوريد من جدة' } as const

const SALLAM = '/images/brand/products/sallam'
const RICE_IMG = '/images/brand/products/rice'

function line(
  product: Pick<Product, 'id' | 'slug' | 'title' | 'desc' | 'specs' | 'image' | 'sizes' | 'packaging' | 'origin' | 'badge'> &
    Partial<Pick<Product, 'gallery' | 'commodityClass'>>
): Product {
  return {
    category: RICE,
    minOrder: 1,
    unit: 'MT',
    availability: STOCK,
    harvestSeason: YEAR,
    commodityClass: product.commodityClass ?? GRAIN,
    quoteOnly: true,
    ...product,
  }
}

function shot(src: string, en: string, ar: string) {
  return { src, alt: { en, ar }, fit: 'contain' as const }
}

/** Rice department, one card per pack, matching Tasami’s rice catalog. */
export const RICE_PRODUCTS: Product[] = [
  line({
    id: 'rice-sallam-5',
    slug: 'sallam-egyptian-rice-5kg',
    title: { en: 'Sallam Egyptian White Rice 5 kg', ar: 'أرز سلام المصري الأبيض 5 كجم' },
    desc: {
      en: 'Premium Egyptian white rice in a 5 kg bag. Tasami Al-Wataniya is the exclusive agent in Saudi Arabia.',
      ar: 'أرز أبيض مصري فاخر، كيس 5 كجم. تسامي الوطنية الوكيل الحصري في السعودية.',
    },
    specs: {
      en: ['Brand: Sallam', 'Pack: 5 kg', 'Exclusive Saudi agent: Tasami Al-Wataniya'],
      ar: ['العلامة: سلام', 'العبوة: 5 كجم', 'الوكيل الحصري في السعودية: تسامي الوطنية'],
    },
    image: `${SALLAM}/white-5kg.webp`,
    gallery: [
      shot(`${SALLAM}/white-5kg.webp`, 'Sallam Egyptian white rice, 5 kg', 'أرز سلام المصري الأبيض، 5 كجم'),
      shot(`${SALLAM}/sizes.webp`, 'Sallam pack sizes', 'مقاسات أرز سلام'),
      shot(`${SALLAM}/grain.webp`, 'Sallam rice grain', 'حبة أرز سلام'),
      shot(`${SALLAM}/field.webp`, 'Sallam rice, cooked', 'أرز سلام مطهو'),
    ],
    sizes: { en: '5 kg', ar: '5 كجم' },
    packaging: { en: '5 kg bag', ar: 'كيس 5 كجم' },
    origin: EGYPT,
    badge: { en: 'Exclusive agent', ar: 'وكيل حصري' },
  }),
  line({
    id: 'rice-sallam-25',
    slug: 'sallam-egyptian-rice-25kg',
    title: { en: 'Sallam Egyptian White Rice 25 kg', ar: 'أرز سلام المصري الأبيض 25 كجم' },
    desc: {
      en: 'Premium Egyptian white rice in a 25 kg wholesale bag for restaurants and markets. Exclusive to Tasami Al-Wataniya.',
      ar: 'أرز أبيض مصري فاخر، كيس جملة 25 كجم للمطاعم والأسواق. وكالة حصرية لتسامي الوطنية.',
    },
    specs: {
      en: ['Brand: Sallam', 'Pack: 25 kg', 'Exclusive Saudi agent: Tasami Al-Wataniya'],
      ar: ['العلامة: سلام', 'العبوة: 25 كجم', 'الوكيل الحصري في السعودية: تسامي الوطنية'],
    },
    image: `${SALLAM}/white-25kg.webp`,
    gallery: [
      shot(`${SALLAM}/white-25kg.webp`, 'Sallam Egyptian white rice, 25 kg', 'أرز سلام المصري الأبيض، 25 كجم'),
      shot(`${SALLAM}/sizes.webp`, 'Sallam pack sizes', 'مقاسات أرز سلام'),
      shot(`${SALLAM}/table.webp`, 'Sallam rice on a banquet tray', 'أرز سلام على سفرة'),
    ],
    sizes: { en: '25 kg', ar: '25 كجم' },
    packaging: { en: '25 kg bag', ar: 'كيس 25 كجم' },
    origin: EGYPT,
    badge: { en: 'Exclusive agent', ar: 'وكيل حصري' },
  }),
  line({
    id: 'rice-sallam-calrose',
    slug: 'sallam-calrose-rice',
    title: { en: 'Sallam Calrose Rice', ar: 'أرز سلام كالروز' },
    desc: {
      en: 'Egyptian Calrose rice in household and wholesale packs for restaurants and homes. Exclusive to Tasami Al-Wataniya.',
      ar: 'أرز كالروز مصري، عبوات منزلية وجملة. مناسب للمطاعم والمنازل. وكالة حصرية لتسامي الوطنية.',
    },
    specs: {
      en: [
        'Brand: Sallam',
        'Packs: 1 kg, 5 kg, 10 kg, and 25 kg',
        'Broken grains: 1% to 5%',
        'Indicative list, confirmed on the written quote: 3.6 SAR per 1 kg, 18 SAR per 5 kg, 36 SAR per 10 kg, 90 SAR per 25 kg',
        'Exclusive Saudi agent: Tasami Al-Wataniya',
      ],
      ar: [
        'العلامة: سلام',
        'العبوات: 1 كجم و5 كجم و10 كجم و25 كجم',
        'نسبة الكسر: من 1٪ إلى 5٪',
        'أسعار استرشادية وتثبت بعرض مكتوب: 3.6 ريال للكيلو، 18 ريال لـ5 كجم، 36 ريال لـ10 كجم، 90 ريال لـ25 كجم',
        'الوكيل الحصري في السعودية: تسامي الوطنية',
      ],
    },
    image: `${SALLAM}/calrose.webp`,
    gallery: [
      shot(`${SALLAM}/calrose.webp`, 'Sallam Calrose rice', 'أرز سلام كالروز'),
      shot(`${SALLAM}/sizes.webp`, 'Sallam pack sizes', 'مقاسات أرز سلام'),
    ],
    sizes: { en: '1–25 kg', ar: '1–25 كجم' },
    packaging: { en: '1, 5, 10, and 25 kg bags', ar: 'أكياس 1 و5 و10 و25 كجم' },
    origin: EGYPT,
    badge: { en: 'Exclusive agent', ar: 'وكيل حصري' },
  }),
  line({
    id: 'rice-mazza-40',
    slug: 'royal-mazza-sella-40kg',
    title: { en: 'Royal Alfakhama Mazza Sella Basmati 40 kg', ar: 'أرز بسمتي مزّة سيلا ملك الفخامة' },
    desc: {
      en: 'Indian Mazza sella basmati rice, 40 kg sack.',
      ar: 'أرز بسمتي سيلا هندي مزّة، كيس 40 كجم.',
    },
    specs: {
      en: ['Brand: Royal Alfakhama', 'Type: Mazza sella basmati', 'Pack: 40 kg', 'Origin: India'],
      ar: ['العلامة: ملك الفخامة', 'النوع: بسمتي سيلا مزّة', 'العبوة: 40 كجم', 'المنشأ: الهند'],
    },
    image: `${RICE_IMG}/mazza-40.webp`,
    gallery: [shot(`${RICE_IMG}/mazza-40.webp`, 'Mazza sella basmati 40 kg', 'أرز مزّة سيلا 40 كجم')],
    sizes: { en: '40 kg', ar: '40 كجم' },
    packaging: { en: '40 kg sack', ar: 'شوال 40 كجم' },
    origin: INDIA,
    badge: { en: 'Royal Alfakhama', ar: 'ملك الفخامة' },
  }),
  line({
    id: 'rice-1121-40',
    slug: 'royal-basmati-1121-40kg',
    title: { en: 'Royal Alfakhama 1121 Golden Basmati 40 kg', ar: 'أرز بسمتي 1121 ملك الفخامة' },
    desc: {
      en: 'Indian 1121 golden long-grain basmati, 40 kg sack.',
      ar: 'أرز بسمتي هندي 1121 ذهبي طويل الحبة، 40 كجم.',
    },
    specs: {
      en: ['Brand: Royal Alfakhama', 'Type: 1121 golden long grain', 'Pack: 40 kg', 'Origin: India'],
      ar: ['العلامة: ملك الفخامة', 'النوع: 1121 ذهبي طويل الحبة', 'العبوة: 40 كجم', 'المنشأ: الهند'],
    },
    image: `${RICE_IMG}/basmati-1121.webp`,
    gallery: [shot(`${RICE_IMG}/basmati-1121.webp`, '1121 golden basmati 40 kg', 'أرز بسمتي 1121، 40 كجم')],
    sizes: { en: '40 kg', ar: '40 كجم' },
    packaging: { en: '40 kg sack', ar: 'شوال 40 كجم' },
    origin: INDIA,
    badge: { en: 'Royal Alfakhama', ar: 'ملك الفخامة' },
  }),
  line({
    id: 'rice-sol-5',
    slug: 'sol-golden-egyptian-rice',
    title: { en: 'Sol Golden Egyptian Rice 5 kg', ar: 'أرز صول الذهبية المصري الفاخر' },
    desc: {
      en: 'Luxury Egyptian white rice, 100% natural, 5 kg bag.',
      ar: 'أرز مصري فاخر طبيعي 100٪، كيس 5 كجم.',
    },
    specs: {
      en: ['Brand: Sol Golden', 'Pack: 5 kg', 'Described on the pack as 100% natural'],
      ar: ['العلامة: صول الذهبية', 'العبوة: 5 كجم', 'مكتوب على الكيس: طبيعي 100٪'],
    },
    image: `${RICE_IMG}/sol-egyptian.webp`,
    gallery: [shot(`${RICE_IMG}/sol-egyptian.webp`, 'Sol Golden Egyptian rice 5 kg', 'أرز صول الذهبية 5 كجم')],
    sizes: { en: '5 kg', ar: '5 كجم' },
    packaging: { en: '5 kg bag', ar: 'كيس 5 كجم' },
    origin: EGYPT,
    badge: { en: 'Sol Golden', ar: 'صول الذهبية' },
  }),
  line({
    id: 'rice-sol-pasta',
    slug: 'sol-golden-pasta',
    title: { en: 'Sol Golden Pasta 400 g', ar: 'مكرونة صول الذهبية' },
    desc: {
      en: 'Pasta from selected wheat, 400 g — rings, spaghetti, and spirals.',
      ar: 'مكرونة من أجود القمح، 400 جم — خواتم وسباجيتي وحلزوني.',
    },
    specs: {
      en: ['Brand: Sol Golden', 'Pack: 400 g', 'Shapes: rings, spaghetti, spirals'],
      ar: ['العلامة: صول الذهبية', 'العبوة: 400 جم', 'الأشكال: خواتم، سباجيتي، حلزوني'],
    },
    image: `${RICE_IMG}/sol-pasta.webp`,
    gallery: [shot(`${RICE_IMG}/sol-pasta.webp`, 'Sol Golden pasta', 'مكرونة صول الذهبية')],
    sizes: { en: '400 g', ar: '400 جم' },
    packaging: { en: '400 g pack', ar: 'عبوة 400 جم' },
    origin: JEDDAH,
    badge: { en: 'Sol Golden', ar: 'صول الذهبية' },
    commodityClass: { en: 'Pasta', ar: 'مكرونة' },
  }),
  line({
    id: 'rice-sol-legumes',
    slug: 'sol-canned-legumes',
    title: { en: 'Sol Canned Legumes 400 g', ar: 'بقوليات صول المعلبة' },
    desc: {
      en: '400 g cans: green peas, fava beans, red beans, and white beans.',
      ar: 'عبوات 400 جم: بازلاء، فول مدمس، فاصوليا حمراء وبيضاء.',
    },
    specs: {
      en: ['Brand: Sol', 'Pack: 400 g can', 'Varieties: peas, fava, red beans, white beans'],
      ar: ['العلامة: صول', 'العبوة: علبة 400 جم', 'الأصناف: بازلاء، فول مدمس، فاصوليا حمراء، فاصوليا بيضاء'],
    },
    image: `${RICE_IMG}/sol-legumes.webp`,
    gallery: [shot(`${RICE_IMG}/sol-legumes.webp`, 'Sol canned legumes', 'بقوليات صول المعلبة')],
    sizes: { en: '400 g', ar: '400 جم' },
    packaging: { en: '400 g can', ar: 'علبة 400 جم' },
    origin: JEDDAH,
    badge: { en: 'Sol', ar: 'صول' },
    commodityClass: { en: 'Pulses', ar: 'بقوليات' },
  }),
  line({
    id: 'rice-zamzam',
    slug: 'zamzam-sella-1121',
    title: { en: 'Zamzam Sella Basmati 1121 — 40 kg', ar: 'أرز زمزم سيلا بسمتي 1121' },
    desc: {
      en: 'Golden long-grain sella basmati, 1% broken grains, 40 kg sack.',
      ar: 'ذهبي طويل الحبة، نسبة كسر 1٪، كيس 40 كجم.',
    },
    specs: {
      en: ['Brand: Zamzam', 'Type: 1121 sella basmati', 'Broken grains: 1%', 'Pack: 40 kg', 'Origin: India'],
      ar: ['العلامة: زمزم', 'النوع: سيلا بسمتي 1121', 'نسبة الكسر: 1٪', 'العبوة: 40 كجم', 'المنشأ: الهند'],
    },
    image: `${RICE_IMG}/zamzam.webp`,
    gallery: [shot(`${RICE_IMG}/zamzam.webp`, 'Zamzam sella basmati 40 kg', 'أرز زمزم سيلا 40 كجم')],
    sizes: { en: '40 kg', ar: '40 كجم' },
    packaging: { en: '40 kg sack', ar: 'شوال 40 كجم' },
    origin: INDIA,
    badge: { en: 'Zamzam', ar: 'زمزم' },
  }),
  line({
    id: 'rice-horse',
    slug: 'alhisan-sella-1121',
    title: { en: 'Al Hisan Sella Basmati 1121 — 40 kg', ar: 'أرز الحصان سيلا بسمتي 1121' },
    desc: {
      en: 'Long-grain sella basmati, 1% broken grains, 40 kg sack.',
      ar: 'طويل الحبة، نسبة كسر 1٪، كيس 40 كجم.',
    },
    specs: {
      en: ['Brand: Al Hisan', 'Type: 1121 sella basmati', 'Broken grains: 1%', 'Pack: 40 kg'],
      ar: ['العلامة: الحصان', 'النوع: سيلا بسمتي 1121', 'نسبة الكسر: 1٪', 'العبوة: 40 كجم'],
    },
    image: `${RICE_IMG}/horse.webp`,
    gallery: [shot(`${RICE_IMG}/horse.webp`, 'Al Hisan sella basmati 40 kg', 'أرز الحصان سيلا 40 كجم')],
    sizes: { en: '40 kg', ar: '40 كجم' },
    packaging: { en: '40 kg sack', ar: 'شوال 40 كجم' },
    origin: JEDDAH,
    badge: { en: 'Al Hisan', ar: 'الحصان' },
  }),
  line({
    id: 'rice-albayt-xxl',
    slug: 'albayt-golden-sella',
    title: { en: 'Albayt XXL Golden Sella Basmati 5 kg', ar: 'أرز البيت سيلا ذهبي XXL' },
    desc: {
      en: 'XXL golden sella long-grain basmati. The sack is marked 5 kg.',
      ar: 'أرز بسمتي سيلا ذهبي طويل الحبة XXL. الوزن المكتوب على الشوال 5 كجم.',
    },
    specs: {
      en: ['Brand: Albayt', 'Type: XXL golden sella basmati', 'Pack marked on the sack: 5 kg'],
      ar: ['العلامة: البيت', 'النوع: سيلا ذهبي طويل الحبة XXL', 'الوزن المكتوب على الشوال: 5 كجم'],
    },
    image: `${RICE_IMG}/albayt-sella.webp`,
    gallery: [shot(`${RICE_IMG}/albayt-sella.webp`, 'Albayt golden sella basmati', 'أرز البيت سيلا ذهبي')],
    sizes: { en: '5 kg', ar: '5 كجم' },
    packaging: { en: '5 kg sack', ar: 'شوال 5 كجم' },
    origin: JEDDAH,
    badge: { en: 'Albayt', ar: 'البيت' },
  }),
  line({
    id: 'rice-albayt-creamy',
    slug: 'albayt-creamy-sella',
    title: { en: 'Albayt Creamy Sella Basmati 5 kg', ar: 'أرز البيت سيلا كريمي 1121' },
    desc: {
      en: 'Creamy sella long-grain basmati 1121. The sack is marked 5 kg.',
      ar: 'أرز بسمتي سيلا كريمي طويل الحبة 1121. الوزن المكتوب على الشوال 5 كجم.',
    },
    specs: {
      en: ['Brand: Albayt', 'Type: 1121 creamy sella basmati', 'Pack marked on the sack: 5 kg'],
      ar: ['العلامة: البيت', 'النوع: سيلا كريمي 1121', 'الوزن المكتوب على الشوال: 5 كجم'],
    },
    image: `${RICE_IMG}/albayt-egyptian.webp`,
    gallery: [shot(`${RICE_IMG}/albayt-egyptian.webp`, 'Albayt creamy sella basmati', 'أرز البيت سيلا كريمي')],
    sizes: { en: '5 kg', ar: '5 كجم' },
    packaging: { en: '5 kg sack', ar: 'شوال 5 كجم' },
    origin: JEDDAH,
    badge: { en: 'Albayt', ar: 'البيت' },
  }),
  line({
    id: 'rice-sonar',
    slug: 'sonar-sella-maaza',
    title: { en: 'Sonar Sella Maaza Rice 3 kg', ar: 'أرز سونار سيلا مزّة' },
    desc: {
      en: 'Medium-grain sella maaza rice from Pakistan, 3 kg sack. Broken grains marked 5% on the pack.',
      ar: 'أرز سيلا مزّة متوسط الحبة من باكستان، كيس 3 كجم. نسبة الكسر المكتوبة على الشوال 5٪.',
    },
    specs: {
      en: ['Brand: Sonar', 'Type: sella maaza, medium grain', 'Broken grains: 5%', 'Pack: 3 kg', 'Origin: Pakistan'],
      ar: ['العلامة: سونار', 'النوع: سيلا مزّة، حبة متوسطة', 'نسبة الكسر: 5٪', 'العبوة: 3 كجم', 'المنشأ: باكستان'],
    },
    image: `${RICE_IMG}/sonar.webp`,
    gallery: [shot(`${RICE_IMG}/sonar.webp`, 'Sonar sella maaza rice 3 kg', 'أرز سونار سيلا مزّة 3 كجم')],
    sizes: { en: '3 kg', ar: '3 كجم' },
    packaging: { en: '3 kg sack', ar: 'شوال 3 كجم' },
    origin: PAKISTAN,
    badge: { en: 'Sonar', ar: 'سونار' },
  }),
]

export const RICE_SLUGS = new Set(RICE_PRODUCTS.map((product) => product.slug))
