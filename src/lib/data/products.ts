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

export const PRODUCT_CATEGORIES = [
  { id: 'All', en: 'All', ar: 'الكل' },
  { id: 'Citrus', en: 'Citrus', ar: 'الموالح' },
  { id: 'Dates', en: 'Dates', ar: 'التمور' },
  { id: 'Fruits', en: 'Fruits', ar: 'الفواكه' },
  { id: 'Vegetables', en: 'Vegetables', ar: 'الخضروات' },
  { id: 'Frozen', en: 'Frozen', ar: 'المجمدات' },
] as const

import { PRODUCT_SLUG_IMAGES } from '@/lib/constants/images'

/** High-res brand product photography */
const IMG = PRODUCT_SLUG_IMAGES

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    slug: 'valencia-oranges',
    category: { en: 'Citrus', ar: 'الموالح' },
    title: { en: 'Egyptian Valencia Oranges', ar: 'برتقال فالنسيا المصري' },
    desc: {
      en: 'World-class juicing oranges from the Nile Delta. High Brix (11–12°), thin peel, exceptional juice yield for GCC bottlers and EU processors.',
      ar: 'برتقال عصير من الدرجة الأولى من دلتا النيل. نسبة سكر عالية، قشرة رقيقة، إنتاجية عصير استثنائية لمصانع الخليج وأوروبا.',
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
    origin: { en: 'Ismailia, Egypt', ar: 'الإسماعيلية، مصر' },
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
    origin: { en: 'Beheira, Egypt', ar: 'البحيرة، مصر' },
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
      en: 'Large, caramel-rich Medjool dates from Sinai & New Valley farms. Jumbo grade with 20%+ moisture, ideal for luxury retail and gourmet HORECA.',
      ar: 'تمر مجدول كبير غني بالكراميل من مزارع سيناء والوادي الجديد. درجة جامبو برطوبة 20%+، مثالي للتجزئة الفاخرة والفنادق.',
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
    sizes: { en: 'Jumbo 25g+', ar: 'جامبو 25 جم+' },
    packaging: { en: '5kg Cartons', ar: 'كراتين 5 كجم' },
    commodityClass: { en: 'Dates', ar: 'تمور' },
    origin: { en: 'Sinai, Egypt', ar: 'سيناء، مصر' },
    indexPrice: '$3200/MT',
    trend: '+2.8%',
  },
  {
    id: 'p-4',
    slug: 'barhi-dates',
    category: { en: 'Dates', ar: 'التمور' },
    title: { en: 'Fresh Barhi Dates', ar: 'تمر برحي طازج' },
    desc: {
      en: 'Golden Barhi dates — buttery texture, honey sweetness. Exported fresh and semi-dry for Middle Eastern and Asian premium markets.',
      ar: 'تمر برحي ذهبي — قوام زبدي وحلاوة عسلية. يُصدَّر طازجاً وشبه جاف للأسواق الفاخرة في الشرق الأوسط وآسيا.',
    },
    specs: {
      en: ['Stage: Khalal / Rutab', 'Moisture: 18–22%', 'Packaging: 5kg Punnets / 10kg Cartons'],
      ar: ['المرحلة: خلال / رطب', 'الرطوبة: 18–22%', 'التعبئة: سلال 5 كجم / كراتين 10 كجم'],
    },
    image: IMG['barhi-dates'],
    minOrder: 8,
    unit: 'MT',
    availability: { en: 'Seasonal', ar: 'موسمي' },
    harvestSeason: { en: 'Aug – Oct', ar: 'أغسطس – أكتوبر' },
    sizes: { en: 'Medium–Large', ar: 'متوسط – كبير' },
    packaging: { en: '5kg Punnets', ar: 'سلال 5 كجم' },
    commodityClass: { en: 'Dates', ar: 'تمور' },
    origin: { en: 'New Valley, Egypt', ar: 'الوادي الجديد، مصر' },
    indexPrice: '$2800/MT',
    trend: '+1.5%',
  },
  {
    id: 'p-5',
    slug: 'hass-avocados',
    category: { en: 'Fruits', ar: 'الفواكه' },
    title: { en: 'Hass Avocados', ar: 'أفوكادو هاس' },
    desc: {
      en: 'Premium Hass avocados from coastal Egyptian orchards. 18–22% dry matter, creamy texture, export-ready for EU and Gulf premium retail.',
      ar: 'أفوكادو هاس فاخر من بساتين الساحل المصري. مادة جافة 18–22%، قوام كريمي، جاهز للتصدير للتجزئة الفاخرة في أوروبا والخليج.',
    },
    specs: {
      en: ['Caliber: 16/18/20/22/24', 'Dry Matter: 18–22%', 'Packaging: 4kg Cartons'],
      ar: ['المعايرة: 16/18/20/22/24', 'المادة الجافة: 18–22%', 'التعبئة: كراتين 4 كجم'],
    },
    image: IMG['hass-avocados'],
    minOrder: 12,
    unit: 'MT',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Oct – Feb', ar: 'أكتوبر – فبراير' },
    sizes: { en: '16–24', ar: '16–24' },
    packaging: { en: '4kg Cartons', ar: 'كراتين 4 كجم' },
    commodityClass: { en: 'Tropical', ar: 'استوائي' },
    origin: { en: 'North Coast, Egypt', ar: 'الساحل الشمالي، مصر' },
    indexPrice: '$1850/MT',
    trend: '+3.2%',
  },
  {
    id: 'p-6',
    slug: 'spunta-potatoes',
    category: { en: 'Vegetables', ar: 'الخضروات' },
    title: { en: 'Spunta Table Potatoes', ar: 'بطاطس سبونتا مائدة' },
    desc: {
      en: 'Disease-free sandy-soil Spunta potatoes. Uniform sizing, low sugar content, extended storage — the benchmark for MENA table potato exports.',
      ar: 'بطاطس سبونتا من تربة رملية خالية من الأمراض. أحجام موحدة، نسبة سكر منخفضة، تخزين ممتد — المعيار الذهبي لتصدير البطاطس في الشرق الأوسط.',
    },
    specs: {
      en: ['Caliber: 40–70mm+', 'Dry Matter: 18–20%', 'Packaging: 10kg/25kg Mesh Bags'],
      ar: ['المعايرة: 40–70 مم+', 'المادة الجافة: 18–20%', 'التعبئة: أكياس شبكية 10/25 كجم'],
    },
    image: IMG['spunta-potatoes'],
    minOrder: 28,
    unit: 'MT',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Jan – Jun', ar: 'يناير – يونيو' },
    sizes: { en: '40–70mm+', ar: '40–70 مم+' },
    packaging: { en: 'Jumbo Bags 1000kg', ar: 'أكياس جامبو 1000 كجم' },
    commodityClass: { en: 'Tubers', ar: 'درنات' },
    origin: { en: 'Minya, Egypt', ar: 'المنيا، مصر' },
    indexPrice: '$380/MT',
    trend: '+2.1%',
  },
  {
    id: 'p-7',
    slug: 'red-onions',
    category: { en: 'Vegetables', ar: 'الخضروات' },
    title: { en: 'Egyptian Red Onions', ar: 'بصل أحمر مصري' },
    desc: {
      en: 'Firm, pungent red onions with 13%+ dry matter. Excellent shelf life for wholesale distribution to Africa, Europe, and Asia.',
      ar: 'بصل أحمر متماسك بنكهة قوية ومادة جافة 13%+. عمر تخزين ممتاز للتوزيع بالجملة إلى أفريقيا وأوروبا وآسيا.',
    },
    specs: {
      en: ['Caliber: 50–80mm', 'Dry Matter: 13%+', 'Packaging: 25kg Mesh Bags'],
      ar: ['المعايرة: 50–80 مم', 'المادة الجافة: 13%+', 'التعبئة: أكياس شبكية 25 كجم'],
    },
    image: IMG['red-onions'],
    minOrder: 28,
    unit: 'MT',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Mar – Jul', ar: 'مارس – يوليو' },
    sizes: { en: '50–80mm', ar: '50–80 مم' },
    packaging: { en: 'Mesh Bags 25kg', ar: 'أكياس شبكية 25 كجم' },
    commodityClass: { en: 'Bulbs', ar: 'بصليات' },
    origin: { en: 'Giza, Egypt', ar: 'الجيزة، مصر' },
    indexPrice: '$520/MT',
    trend: '+0.8%',
  },
  {
    id: 'p-8',
    slug: 'fresh-garlic',
    category: { en: 'Vegetables', ar: 'الخضروات' },
    title: { en: 'White Egyptian Garlic', ar: 'ثوم مصري أبيض' },
    desc: {
      en: 'Aromatic white garlic, 10–12 cloves per bulb. Strong allicin profile for Middle Eastern, Asian, and European spice markets.',
      ar: 'ثوم أبيض عطري، 10–12 فصاً لكل رأس. نسبة أليسين عالية للأسواق الشرق أوسطية والآسيوية والأوروبية.',
    },
    specs: {
      en: ['Caliber: 50mm+', 'Cloves: 10–12/bulb', 'Packaging: 5kg Plastic Boxes'],
      ar: ['المعايرة: 50 مم+', 'الفصوص: 10–12/رأس', 'التعبئة: صناديق بلاستيك 5 كجم'],
    },
    image: IMG['fresh-garlic'],
    minOrder: 12,
    unit: 'MT',
    availability: { en: 'Limited', ar: 'كمية محدودة' },
    harvestSeason: { en: 'Apr – Jun', ar: 'أبريل – يونيو' },
    sizes: { en: '50mm+', ar: '50 مم+' },
    packaging: { en: 'Plastic Box 5kg', ar: 'صندوق بلاستيك 5 كجم' },
    commodityClass: { en: 'Bulbs', ar: 'بصليات' },
    origin: { en: 'Beni Suef, Egypt', ar: 'بني سويف، مصر' },
    indexPrice: '$1200/MT',
    trend: '+5.4%',
  },
  {
    id: 'p-9',
    slug: 'pomegranates',
    category: { en: 'Fruits', ar: 'الفواكه' },
    title: { en: 'Wonderful Pomegranates', ar: 'رمان وندرفول' },
    desc: {
      en: 'Deep-ruby Wonderful pomegranates with 16°+ Brix. High aril juice content for European juice processors and premium retail.',
      ar: 'رمان وندرفول بلون ياقوتي عميق ونسبة سكر 16°+. محتوى عصير عالٍ لمصانع العصير الأوروبية والتجزئة الفاخرة.',
    },
    specs: {
      en: ['Caliber: 6/7/8/9/10', 'Brix: 16°+', 'Packaging: 4.5kg Cartons'],
      ar: ['المعايرة: 6/7/8/9/10', 'نسبة السكر: 16°+', 'التعبئة: كراتين 4.5 كجم'],
    },
    image: IMG['pomegranates'],
    minOrder: 18,
    unit: 'MT',
    availability: { en: 'Seasonal', ar: 'موسمي' },
    harvestSeason: { en: 'Sep – Nov', ar: 'سبتمبر – نوفمبر' },
    sizes: { en: '6–10', ar: '6–10' },
    packaging: { en: 'Carton 4.5kg', ar: 'كرتون 4.5 كجم' },
    commodityClass: { en: 'Fruits', ar: 'فواكه' },
    origin: { en: 'Sharqia, Egypt', ar: 'الشرقية، مصر' },
    brix: '16°+',
    indexPrice: '$850/MT',
    trend: '-1.1%',
  },
  {
    id: 'p-10',
    slug: 'frozen-strawberries',
    category: { en: 'Frozen', ar: 'المجمدات' },
    title: { en: 'IQF Frozen Strawberries', ar: 'فراولة مجمدة IQF' },
    desc: {
      en: 'Premium IQF whole & sliced strawberries at -18°C. Grade A/B, zero clumping — engineered for bakery, dairy, and beverage manufacturing.',
      ar: 'فراولة IQF كاملة ومقطعة عند -18°م. درجة A/B، بدون تكتل — مصممة لصناعات المخابز والألبان والمشروبات.',
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
    origin: { en: 'Ismailia, Egypt', ar: 'الإسماعيلية، مصر' },
    indexPrice: '$2800/MT',
    trend: '+0.3%',
  },
  {
    id: 'p-11',
    slug: 'frozen-mixed-vegetables',
    category: { en: 'Frozen', ar: 'المجمدات' },
    title: { en: 'IQF Mixed Vegetables', ar: 'خضروات مجمدة مشكلة IQF' },
    desc: {
      en: 'Custom-ratio IQF blend of peas, carrots, sweet corn, and green beans. HORECA-grade for hotels, catering, and private-label retail.',
      ar: 'خليط IQF بنسب مخصصة من البازلاء والجزر والذرة والفاصوليا. درجة فنادق للضيافة والتموين والعلامات الخاصة.',
    },
    specs: {
      en: ['Blend: Custom ratios', 'Temp: -18°C', 'Packaging: 20kg Bags'],
      ar: ['الخليط: نسب مخصصة', 'الحرارة: -18°م', 'التعبئة: أكياس 20 كجم'],
    },
    image: IMG['frozen-mixed-vegetables'],
    minOrder: 1,
    unit: 'Containers',
    availability: { en: 'In Stock', ar: 'متوفر' },
    harvestSeason: { en: 'Year-round', ar: 'على مدار العام' },
    sizes: { en: 'Standard Cut', ar: 'تقطيع قياسي' },
    packaging: { en: '20kg Bags', ar: 'أكياس 20 كجم' },
    commodityClass: { en: 'Frozen', ar: 'مجمدات' },
    origin: { en: '10th of Ramadan, Egypt', ar: 'العاشر من رمضان، مصر' },
    indexPrice: '$1950/MT',
    trend: '+0.6%',
  },
  {
    id: 'p-12',
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
    origin: { en: 'Ismailia, Egypt', ar: 'الإسماعيلية، مصر' },
    brix: '14°+',
    indexPrice: '$1100/MT',
    trend: '+1.8%',
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
