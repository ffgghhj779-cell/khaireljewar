export type ProductUnit = 'MT' | 'Containers'

export interface Product {
  id: string
  slug: string
  category: { en: string; ar: string }
  title: { en: string; ar: string }
  desc: { en: string; ar: string }
  specs: { en: string[]; ar: string[] }
  image: string
  minOrder: number
  unit: ProductUnit
  availability: { en: string; ar: string }
  harvestSeason: { en: string; ar: string }
  sizes: { en: string; ar: string }
  packaging: { en: string; ar: string }
  commodityClass: { en: string; ar: string }
  origin: { en: string; ar: string }
  brix?: string
  indexPrice?: string
  trend?: string
}

/** Matches live catalog categories: https://khairaljewargroup.com/en/products */
export const PRODUCT_CATEGORIES = [
  { id: 'All', en: 'All', ar: 'الكل' },
  { id: 'Citrus', en: 'Citrus', ar: 'الموالح' },
  { id: 'Dates', en: 'Dates', ar: 'التمور' },
  { id: 'Fruits', en: 'Fruits', ar: 'الفواكه' },
  { id: 'Vegetables', en: 'Vegetables', ar: 'الخضروات' },
  { id: 'Frozen', en: 'Frozen', ar: 'المجمدات' },
] as const

import { PRODUCT_SLUG_IMAGES } from '@/lib/constants/images'

const IMG = PRODUCT_SLUG_IMAGES

const ORIGIN_JEDDAH = {
  en: 'Jeddah, Saudi Arabia',
  ar: 'جدة، المملكة العربية السعودية',
} as const

/**
 * Core B2B commodities — aligned with live site catalog
 * (khairaljewargroup.com) — Jeddah hub, no Egypt locations.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    slug: 'valencia-oranges',
    category: { en: 'Citrus', ar: 'الموالح' },
    title: { en: 'Valencia Oranges', ar: 'برتقال فالنسيا' },
    desc: {
      en: 'World-class juicing oranges from trusted partner farms. High Brix (11–12°), thin peel, exceptional juice yield for GCC bottlers and EU processors — coordinated from Jeddah.',
      ar: 'برتقال عصير من الدرجة الأولى من مزارع شريكة موثوقة. نسبة سكر 11–12°، قشرة رقيقة، إنتاجية عصير استثنائية لمصانع الخليج وأوروبا — بتنسيق من جدة.',
    },
    specs: {
      en: ['Caliber: 48/56/64/72/80/88/100', 'Brix: 11–12°', 'Packaging: 15kg Telescopic Cartons'],
      ar: ['المعايرة: 48/56/64/72/80/88/100', 'نسبة السكر: 11–12°', 'التعبئة: كراتين تلسكوبية 15 كجم'],
    },
    image: IMG['valencia-oranges'],
    minOrder: 24,
    unit: 'MT',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Feb – May', ar: 'فبراير – مايو' },
    sizes: { en: '48–100', ar: '48–100' },
    packaging: { en: 'Telescopic Carton 15kg', ar: 'كرتون تلسكوبي 15 كجم' },
    commodityClass: { en: 'Citrus', ar: 'موالح' },
    origin: ORIGIN_JEDDAH,
    brix: '11–12°',
    indexPrice: '$420/MT',
    trend: '-0.5%',
  },
  {
    id: 'p-2',
    slug: 'navel-oranges',
    category: { en: 'Citrus', ar: 'الموالح' },
    title: { en: 'Premium Navel Oranges', ar: 'برتقال نافيل فاخر' },
    desc: {
      en: 'Seedless Navel oranges with vibrant peel color and balanced sweetness. Export-grade for premium retail chains across Europe and the Gulf.',
      ar: 'برتقال نافيل بدون بذور بلون قشرة نابض وحلاوة متوازنة. درجة تصدير لسلاسل التجزئة الفاخرة في أوروبا والخليج.',
    },
    specs: {
      en: ['Caliber: 44/48/56/64/72/80', 'Brix: 11–13°', 'Packaging: 15kg Telescopic Cartons'],
      ar: ['المعايرة: 44/48/56/64/72/80', 'نسبة السكر: 11–13°', 'التعبئة: كراتين تلسكوبية 15 كجم'],
    },
    image: IMG['navel-oranges'],
    minOrder: 24,
    unit: 'MT',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Dec – Mar', ar: 'ديسمبر – مارس' },
    sizes: { en: '44–80', ar: '44–80' },
    packaging: { en: 'Telescopic Carton 15kg', ar: 'كرتون تلسكوبي 15 كجم' },
    commodityClass: { en: 'Citrus', ar: 'موالح' },
    origin: ORIGIN_JEDDAH,
    brix: '11–13°',
    indexPrice: '$450/MT',
    trend: '+1.2%',
  },
  {
    id: 'p-3',
    slug: 'medjool-dates',
    category: { en: 'Dates', ar: 'التمور' },
    title: { en: 'Premium Medjool Dates', ar: 'تمر مجدول فاخر' },
    desc: {
      en: 'Large, caramel-rich Medjool dates from partner farms. Jumbo grade with 20%+ moisture, ideal for luxury retail and gourmet HORECA.',
      ar: 'تمر مجدول كبير غني بالكراميل من مزارع شريكة. درجة جامبو برطوبة 20%+، مثالي للتجزئة الفاخرة والفنادق.',
    },
    specs: {
      en: ['Grade: Jumbo / Super Jumbo', 'Moisture: 20–24%', 'Packaging: 5kg Cartons / 10kg Bulk'],
      ar: ['الدرجة: جامبو / سوبر جامبو', 'الرطوبة: 20–24%', 'التعبئة: كراتين 5 كجم / بالجملة 10 كجم'],
    },
    image: IMG['medjool-dates'],
    minOrder: 10,
    unit: 'MT',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Sep – Nov', ar: 'سبتمبر – نوفمبر' },
    sizes: { en: 'Jumbo+', ar: 'جامبو+' },
    packaging: { en: '5kg Cartons', ar: 'كراتين 5 كجم' },
    commodityClass: { en: 'Dates', ar: 'تمور' },
    origin: ORIGIN_JEDDAH,
    indexPrice: '$3200/MT',
    trend: '+0.8%',
  },
  {
    id: 'p-3b',
    slug: 'barhi-dates',
    category: { en: 'Dates', ar: 'التمور' },
    title: { en: 'Barhi Fresh Dates', ar: 'تمر برحي طازج' },
    desc: {
      en: 'Crisp yellow Barhi dates for seasonal luxury programs. Soft caramel finish as they ripen — Jeddah hub cold-chain ready.',
      ar: 'تمر برحي أصفر مقرمش لبرامج فاخرة موسمية. لمسة كراميل ناعمة مع النضج — جاهز لسلسلة تبريد مركز جدة.',
    },
    specs: {
      en: ['Form: Fresh / Soft', 'Color: Golden yellow', 'Packaging: 5kg Cartons'],
      ar: ['الشكل: طازج / ناعم', 'اللون: أصفر ذهبي', 'التعبئة: كراتين 5 كجم'],
    },
    image: IMG['barhi-dates'],
    minOrder: 8,
    unit: 'MT',
    availability: { en: 'Seasonal', ar: 'موسمي' },
    harvestSeason: { en: 'Aug – Oct', ar: 'أغسطس – أكتوبر' },
    sizes: { en: 'Premium', ar: 'فاخر' },
    packaging: { en: '5kg Cartons', ar: 'كراتين 5 كجم' },
    commodityClass: { en: 'Dates', ar: 'تمور' },
    origin: ORIGIN_JEDDAH,
    indexPrice: '$2400/MT',
    trend: '+0.6%',
  },
  {
    id: 'p-4',
    slug: 'hass-avocados',
    category: { en: 'Fruits', ar: 'الفواكه' },
    title: { en: 'Hass Avocados', ar: 'أفوكادو هاس' },
    desc: {
      en: 'Creamy Hass avocados with 22%+ oil content. Cold-chain export to GCC premium retail and HORECA programs — coordinated from Jeddah.',
      ar: 'أفوكادو هاس كريمي بنسبة زيت 22%+. تصدير بسلسلة تبريد لتجزئة الخليج والفنادق — بتنسيق من جدة.',
    },
    specs: {
      en: ['Caliber: 16/18/20/22', 'Oil content: 22%+', 'Packaging: 4kg Cartons'],
      ar: ['المعايرة: 16/18/20/22', 'نسبة الزيت: 22%+', 'التعبئة: كراتين 4 كجم'],
    },
    image: IMG['hass-avocados'],
    minOrder: 12,
    unit: 'MT',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Oct – Feb', ar: 'أكتوبر – فبراير' },
    sizes: { en: '16–22', ar: '16–22' },
    packaging: { en: '4kg Cartons', ar: 'كراتين 4 كجم' },
    commodityClass: { en: 'Tropical', ar: 'استوائي' },
    origin: ORIGIN_JEDDAH,
    indexPrice: '$1850/MT',
    trend: '+2.1%',
  },
  {
    id: 'p-4b',
    slug: 'pomegranates',
    category: { en: 'Fruits', ar: 'الفواكه' },
    title: { en: 'Premium Pomegranates', ar: 'رمان فاخر' },
    desc: {
      en: 'Ruby arils with high juice yield and firm rind for retail and juice programs. Graded and packed for export through Jeddah.',
      ar: 'حبوب ياقوتية بإنتاجية عصير عالية وقشرة متماسكة للتجزئة والعصائر. مفرزة ومعبأة للتصدير عبر جدة.',
    },
    specs: {
      en: ['Caliber: 8/9/10/12', 'Aril color: Deep ruby', 'Packaging: 5kg Cartons'],
      ar: ['المعايرة: 8/9/10/12', 'لون الحبوب: ياقوتي غامق', 'التعبئة: كراتين 5 كجم'],
    },
    image: IMG['pomegranates'],
    minOrder: 12,
    unit: 'MT',
    availability: { en: 'Seasonal', ar: 'موسمي' },
    harvestSeason: { en: 'Sep – Dec', ar: 'سبتمبر – ديسمبر' },
    sizes: { en: '8–12', ar: '8–12' },
    packaging: { en: '5kg Cartons', ar: 'كراتين 5 كجم' },
    commodityClass: { en: 'Fruits', ar: 'فواكه' },
    origin: ORIGIN_JEDDAH,
    indexPrice: '$980/MT',
    trend: '+1.1%',
  },
  {
    id: 'p-5',
    slug: 'spunta-potatoes',
    category: { en: 'Vegetables', ar: 'الخضروات' },
    title: { en: 'Spunta Table Potatoes', ar: 'بطاطس سبونتا مائدة' },
    desc: {
      en: 'Washed Spunta potatoes with uniform sizing for GCC and EU retail. Long shelf life, low sprouting under cold storage.',
      ar: 'بطاطس سبونتا مغسولة بأحجام موحدة لتجزئة الخليج وأوروبا. عمر تخزين طويل وإنبات منخفض تحت التبريد.',
    },
    specs: {
      en: ['Caliber: 45mm+, 55mm+', 'Washed & Graded', 'Packaging: 25kg Mesh Bags'],
      ar: ['المعايرة: 45 مم+، 55 مم+', 'مغسولة ومفرزة', 'التعبئة: أكياس شبكية 25 كجم'],
    },
    image: IMG['spunta-potatoes'],
    minOrder: 28,
    unit: 'MT',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Year-round', ar: 'على مدار العام' },
    sizes: { en: '45–55mm+', ar: '45–55 مم+' },
    packaging: { en: '25kg Mesh Bags', ar: 'أكياس شبكية 25 كجم' },
    commodityClass: { en: 'Root Crop', ar: 'محاصيل جذرية' },
    origin: ORIGIN_JEDDAH,
    indexPrice: '$380/MT',
    trend: '+0.4%',
  },
  {
    id: 'p-5b',
    slug: 'red-onions',
    category: { en: 'Vegetables', ar: 'الخضروات' },
    title: { en: 'Red Onions', ar: 'بصل أحمر' },
    desc: {
      en: 'Firm red onions with strong color and long storage life. Graded for wholesale and retail packing programs.',
      ar: 'بصل أحمر متماسك بلون قوي وعمر تخزين طويل. مفرز لبرامج الجملة والتجزئة.',
    },
    specs: {
      en: ['Caliber: 50–70mm', 'Dry cured', 'Packaging: 20kg Mesh Bags'],
      ar: ['المعايرة: 50–70 مم', 'مجفف معالج', 'التعبئة: أكياس شبكية 20 كجم'],
    },
    image: IMG['red-onions'],
    minOrder: 24,
    unit: 'MT',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Year-round', ar: 'على مدار العام' },
    sizes: { en: '50–70mm', ar: '50–70 مم' },
    packaging: { en: '20kg Mesh Bags', ar: 'أكياس شبكية 20 كجم' },
    commodityClass: { en: 'Alliums', ar: 'بصليات' },
    origin: ORIGIN_JEDDAH,
    indexPrice: '$420/MT',
    trend: '+0.2%',
  },
  {
    id: 'p-5c',
    slug: 'fresh-garlic',
    category: { en: 'Vegetables', ar: 'الخضروات' },
    title: { en: 'Fresh Garlic', ar: 'ثوم طازج' },
    desc: {
      en: 'White fresh garlic with tight cloves and clean skins — ideal for HORECA and retail mesh packs.',
      ar: 'ثوم أبيض طازج بفصوص متماسكة وقشور نظيفة — مثالي للفنادق وأكياس التجزئة.',
    },
    specs: {
      en: ['Caliber: 4.5–6.5cm', 'White skin', 'Packaging: 10kg Cartons'],
      ar: ['المعايرة: 4.5–6.5 سم', 'قشرة بيضاء', 'التعبئة: كراتين 10 كجم'],
    },
    image: IMG['fresh-garlic'],
    minOrder: 10,
    unit: 'MT',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Year-round', ar: 'على مدار العام' },
    sizes: { en: '4.5–6.5cm', ar: '4.5–6.5 سم' },
    packaging: { en: '10kg Cartons', ar: 'كراتين 10 كجم' },
    commodityClass: { en: 'Alliums', ar: 'بصليات' },
    origin: ORIGIN_JEDDAH,
    indexPrice: '$1100/MT',
    trend: '+0.9%',
  },
  {
    id: 'p-6',
    slug: 'kent-mangoes',
    category: { en: 'Fruits', ar: 'الفواكه' },
    title: { en: 'Kent Mangoes', ar: 'مانجو كينت' },
    desc: {
      en: 'Fiber-free Kent mangoes with tropical sweetness and firm flesh. Air-freight capable for Gulf luxury fruit programs.',
      ar: 'مانجو كينت خالية من الألياف بحلاوة استوائية ولحم متماسك. قابلة للشحن الجوي لبرامج الفواكه الفاخرة في الخليج.',
    },
    specs: {
      en: ['Caliber: 6/7/8/9', 'Brix: 14°+', 'Packaging: 4kg Cartons'],
      ar: ['المعايرة: 6/7/8/9', 'نسبة السكر: 14°+', 'التعبئة: كراتين 4 كجم'],
    },
    image: IMG['kent-mangoes'],
    minOrder: 15,
    unit: 'MT',
    availability: { en: 'Seasonal', ar: 'موسمي' },
    harvestSeason: { en: 'Jul – Sep', ar: 'يوليو – سبتمبر' },
    sizes: { en: '6–9', ar: '6–9' },
    packaging: { en: '4kg Cartons', ar: 'كراتين 4 كجم' },
    commodityClass: { en: 'Tropical', ar: 'استوائي' },
    origin: ORIGIN_JEDDAH,
    brix: '14°+',
    indexPrice: '$1100/MT',
    trend: '+1.8%',
  },
  {
    id: 'p-7',
    slug: 'frozen-strawberries',
    category: { en: 'Frozen', ar: 'المجمدات' },
    title: { en: 'IQF Frozen Strawberries', ar: 'فراولة مجمدة IQF' },
    desc: {
      en: 'IQF-grade strawberries — whole & sliced at -18°C. Grade A/B, zero clumping — bakery, dairy, and beverage ready.',
      ar: 'فراولة IQF كاملة ومقطعة عند -18°م. درجة A/B بدون تكتل — للمخابز والألبان والمشروبات.',
    },
    specs: {
      en: ['Grade: A/B', 'Temp: -18°C constant', 'Packaging: 10kg Cartons'],
      ar: ['الدرجة: A/B', 'الحرارة: -18°م ثابتة', 'التعبئة: كراتين 10 كجم'],
    },
    image: IMG['frozen-strawberries'],
    minOrder: 1,
    unit: 'Containers',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Year-round', ar: 'على مدار العام' },
    sizes: { en: 'Whole / Sliced', ar: 'كاملة / مقطعة' },
    packaging: { en: '10kg Cartons', ar: 'كراتين 10 كجم' },
    commodityClass: { en: 'Frozen', ar: 'مجمدات' },
    origin: ORIGIN_JEDDAH,
    indexPrice: '$2800/MT',
    trend: '+0.3%',
  },
  {
    id: 'p-8',
    slug: 'frozen-mixed-vegetables',
    category: { en: 'Frozen', ar: 'المجمدات' },
    title: { en: 'IQF Mixed Vegetables', ar: 'خضروات مشكلة مجمدة IQF' },
    desc: {
      en: 'IQF mixed vegetable blends for foodservice and retail — consistent cut size, -18°C integrity from Jeddah hub.',
      ar: 'خلطات خضروات IQF للخدمات الغذائية والتجزئة — أحجام تقطيع ثابتة وسلامة -18°م من مركز جدة.',
    },
    specs: {
      en: ['Blend: peas / carrots / corn / beans', 'Temp: -18°C', 'Packaging: 10kg Cartons'],
      ar: ['الخلطة: بازلاء / جزر / ذرة / فاصوليا', 'الحرارة: -18°م', 'التعبئة: كراتين 10 كجم'],
    },
    image: IMG['frozen-mixed-vegetables'],
    minOrder: 1,
    unit: 'Containers',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Year-round', ar: 'على مدار العام' },
    sizes: { en: 'Standard cut', ar: 'تقطيع قياسي' },
    packaging: { en: '10kg Cartons', ar: 'كراتين 10 كجم' },
    commodityClass: { en: 'Frozen', ar: 'مجمدات' },
    origin: ORIGIN_JEDDAH,
    indexPrice: '$1450/MT',
    trend: '+0.5%',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug)
}

export function buildTickerItems(products: Product[]) {
  return products.map((p) => ({
    name: p.title.en,
    price: p.indexPrice ?? 'N/A',
    trend: p.trend ?? '0%',
    moq: `${p.minOrder} ${p.unit}`,
    availability: p.availability.en,
    season: p.harvestSeason.en,
  }))
}

export function getTickerItems() {
  return buildTickerItems(MOCK_PRODUCTS)
}
