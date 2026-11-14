import type { Product } from '@/lib/data/products'

const NEW = '/images/brand/products/new'
const CLEAN = '/images/brand/products/clean'

const STOCK = { en: 'In Stock', ar: 'متوفر' } as const
const SEASONAL = { en: 'Seasonal', ar: 'موسمي' } as const
const YEAR = { en: 'Year-round', ar: 'على مدار العام' } as const
const JEDDAH = { en: 'Supplied from Jeddah', ar: 'التوريد من جدة' } as const
const NEW_BADGE = { en: 'New', ar: 'جديد' } as const

type SeasonProduct = Product & { after: string }

function shot(src: string, en: string, ar: string, fit: 'contain' | 'cover' = 'cover') {
  return { src, alt: { en, ar }, fit }
}

function item(product: Omit<SeasonProduct, 'minOrder' | 'unit' | 'quoteOnly' | 'isNew'>): SeasonProduct {
  return {
    minOrder: 1,
    unit: 'MT',
    quoteOnly: true,
    isNew: true,
    ...product,
  }
}

/** New arrivals, each placed right after the closest existing product in its section. */
const SEASON_ITEMS: SeasonProduct[] = [
  item({
    after: 'barhi-dates',
    id: 'new-ajwa',
    slug: 'ajwa-al-madinah-dates',
    category: { en: 'Dates', ar: 'التمور' },
    title: { en: 'Ajwa Al Madinah Dates — Gift Box', ar: 'تمر عجوة المدينة — علبة فاخرة' },
    desc: {
      en: 'Ajwa dates from Al Madinah in a premium gift box under the Premium Ajwas label. Made for hospitality, gifting, and premium retail shelves.',
      ar: 'تمر عجوة المدينة في علبة هدايا فاخرة بعلامة Premium Ajwas (نكهة العجوة). مناسب للضيافة والهدايا وأرفف التجزئة الفاخرة.',
    },
    specs: {
      en: ['Variety: Ajwa Al Madinah', 'Label: Premium Ajwas', 'Pack: premium gift box'],
      ar: ['الصنف: عجوة المدينة', 'العلامة: Premium Ajwas — نكهة العجوة', 'العبوة: علبة هدايا فاخرة'],
    },
    image: `${NEW}/ajwa-al-madinah.webp`,
    imageFit: 'cover',
    gallery: [
      shot(`${NEW}/ajwa-al-madinah.webp`, 'Ajwa dates on the palm', 'تمر العجوة على النخلة'),
      shot(`${CLEAN}/ajwa-al-madinah-dates.webp`, 'Ajwa Al Madinah dates, close-up', 'تمر عجوة المدينة عن قرب'),
    ],
    availability: STOCK,
    harvestSeason: YEAR,
    sizes: { en: 'Premium', ar: 'فاخر' },
    packaging: { en: 'Gift box', ar: 'علبة هدايا' },
    commodityClass: { en: 'Dates', ar: 'تمور' },
    origin: { en: 'Al Madinah, Saudi Arabia', ar: 'المدينة المنورة، السعودية' },
    badge: { en: 'Premium', ar: 'فاخر' },
  }),
  item({
    after: 'kent-mangoes',
    id: 'new-strawberries',
    slug: 'fresh-strawberries',
    category: { en: 'Fruits', ar: 'الفواكه' },
    title: { en: 'Fresh Strawberries', ar: 'فراولة طازجة' },
    desc: {
      en: 'Large red strawberries packed in retail punnets for supermarkets, juice bars, and hotels.',
      ar: 'فراولة حمراء كبيرة معبأة في علب تجزئة للسوبرماركت ومحلات العصير والفنادق.',
    },
    specs: {
      en: ['Grade: large berries', 'Pack: retail punnets', 'Shipped chilled'],
      ar: ['الدرجة: حبة كبيرة', 'التعبئة: علب تجزئة', 'الشحن: مبرد'],
    },
    image: `${NEW}/fresh-strawberries.webp`,
    imageFit: 'cover',
    gallery: [
      shot(`${NEW}/fresh-strawberries.webp`, 'Strawberries growing in the field', 'فراولة في الحقل'),
      shot(`${CLEAN}/fresh-strawberries.webp`, 'Fresh strawberries, close-up', 'فراولة طازجة عن قرب'),
    ],
    availability: SEASONAL,
    harvestSeason: SEASONAL,
    sizes: { en: 'Large', ar: 'كبير' },
    packaging: { en: 'Retail punnets', ar: 'علب تجزئة' },
    commodityClass: { en: 'Berries', ar: 'توت' },
    origin: JEDDAH,
    badge: NEW_BADGE,
  }),
  item({
    after: 'fresh-strawberries',
    id: 'new-kiwi',
    slug: 'fresh-kiwi',
    category: { en: 'Fruits', ar: 'الفواكه' },
    title: { en: 'Fresh Kiwi', ar: 'كيوي طازج' },
    desc: {
      en: 'Green-flesh kiwifruit for retail shelves, juice bars, and hospitality menus.',
      ar: 'كيوي بلب أخضر لأرفف التجزئة ومحلات العصير وقوائم الضيافة.',
    },
    specs: {
      en: ['Flesh: green', 'Use: retail, juices, desserts'],
      ar: ['اللب: أخضر', 'الاستخدام: تجزئة، عصائر، حلويات'],
    },
    image: `${NEW}/fresh-kiwi.webp`,
    imageFit: 'cover',
    gallery: [
      shot(`${NEW}/fresh-kiwi.webp`, 'Kiwi on the vine', 'كيوي على الكرمة'),
      shot(`${CLEAN}/fresh-kiwi.webp`, 'Fresh kiwi, close-up', 'كيوي طازج عن قرب'),
    ],
    availability: SEASONAL,
    harvestSeason: SEASONAL,
    sizes: { en: 'Graded', ar: 'مفروز' },
    packaging: { en: 'On request', ar: 'حسب الطلب' },
    commodityClass: { en: 'Fruits', ar: 'فواكه' },
    origin: JEDDAH,
    badge: NEW_BADGE,
  }),
  item({
    after: 'bell-peppers',
    id: 'new-red-peppers',
    slug: 'red-bell-peppers',
    category: { en: 'Vegetables', ar: 'الخضروات' },
    title: { en: 'Red Bell Peppers — Export Cartons', ar: 'فلفل رومي أحمر — كراتين تصدير' },
    desc: {
      en: 'Glossy red bell peppers, labeled one by one and packed in export cartons for wholesale markets and retail chains.',
      ar: 'فلفل رومي أحمر لامع، عليه ملصق حبة بحبة ومعبأ في كراتين تصدير لأسواق الجملة وسلاسل التجزئة.',
    },
    specs: {
      en: ['Color: red', 'Each pepper labeled', 'Pack: export cartons'],
      ar: ['اللون: أحمر', 'ملصق على كل حبة', 'التعبئة: كراتين تصدير'],
    },
    image: `${NEW}/red-bell-peppers.webp`,
    imageFit: 'cover',
    gallery: [
      shot(`${NEW}/red-bell-peppers.webp`, 'Red bell peppers on the plant', 'فلفل رومي أحمر على النبات'),
      shot(`${CLEAN}/red-bell-peppers.webp`, 'Red bell peppers, close-up', 'فلفل رومي أحمر عن قرب'),
    ],
    availability: STOCK,
    harvestSeason: SEASONAL,
    sizes: { en: 'Graded', ar: 'مفروز' },
    packaging: { en: 'Export cartons', ar: 'كراتين تصدير' },
    commodityClass: { en: 'Vegetables', ar: 'خضروات' },
    origin: JEDDAH,
    badge: NEW_BADGE,
  }),
  item({
    after: 'red-bell-peppers',
    id: 'new-red-chili',
    slug: 'fresh-red-chili-peppers',
    category: { en: 'Vegetables', ar: 'الخضروات' },
    title: { en: 'Fresh Red Chili Peppers', ar: 'فلفل أحمر حار طازج' },
    desc: {
      en: 'Long red chili peppers, field fresh and packed in crates for wholesale, restaurants, and processors.',
      ar: 'فلفل أحمر حار طويل، طازج من الحقل ومعبأ في صناديق للجملة والمطاعم والمصانع.',
    },
    specs: {
      en: ['Type: long red chili', 'Pack: field crates'],
      ar: ['النوع: فلفل أحمر حار طويل', 'التعبئة: صناديق'],
    },
    image: `${NEW}/red-chili-peppers.webp`,
    imageFit: 'cover',
    gallery: [
      shot(`${NEW}/red-chili-peppers.webp`, 'Red chili peppers on the plant', 'فلفل أحمر حار على النبات'),
      shot(`${CLEAN}/fresh-red-chili-peppers.webp`, 'Red chili peppers, close-up', 'فلفل أحمر حار عن قرب'),
    ],
    availability: STOCK,
    harvestSeason: SEASONAL,
    sizes: { en: 'Long', ar: 'طويل' },
    packaging: { en: 'Crates', ar: 'صناديق' },
    commodityClass: { en: 'Vegetables', ar: 'خضروات' },
    origin: JEDDAH,
    badge: NEW_BADGE,
  }),
  item({
    after: 'frozen-strawberries',
    id: 'new-elmarwa-strawberry',
    slug: 'elmarwa-frozen-strawberry-400g',
    category: { en: 'Frozen', ar: 'المجمدات' },
    title: { en: 'ElMarwa Frozen Strawberry 400 g', ar: 'فراولة مجمدة المروة 400 جم' },
    desc: {
      en: 'Whole frozen strawberries in ElMarwa 400 g retail bags, ready for supermarket freezers, juice bars, and desserts.',
      ar: 'فراولة كاملة مجمدة في أكياس المروة 400 جم، جاهزة لثلاجات السوبرماركت ومحلات العصير والحلويات.',
    },
    specs: {
      en: ['Brand: ElMarwa', 'Net weight: 400 g', 'Whole frozen strawberries', 'Storage: frozen'],
      ar: ['العلامة: المروة', 'الوزن الصافي: 400 جم', 'فراولة كاملة مجمدة', 'الحفظ: مجمد'],
    },
    image: `${NEW}/elmarwa-strawberry-400g.webp`,
    gallery: [
      shot(`${NEW}/elmarwa-strawberry-400g.webp`, 'ElMarwa frozen strawberry 400 g bag', 'كيس فراولة مجمدة المروة 400 جم', 'contain'),
      shot(`${NEW}/frozen-strawberries-tray.webp`, 'Whole frozen strawberries', 'فراولة كاملة مجمدة'),
    ],
    availability: STOCK,
    harvestSeason: YEAR,
    sizes: { en: '400 g', ar: '400 جم' },
    packaging: { en: '400 g bag', ar: 'كيس 400 جم' },
    commodityClass: { en: 'Frozen fruit', ar: 'فاكهة مجمدة' },
    origin: JEDDAH,
    badge: { en: 'ElMarwa', ar: 'المروة' },
  }),
  item({
    after: 'elmarwa-frozen-strawberry-400g',
    id: 'new-frozen-fava',
    slug: 'frozen-green-fava-beans',
    category: { en: 'Frozen', ar: 'المجمدات' },
    title: { en: 'Frozen Green Fava Beans', ar: 'فول أخضر مقشر مجمد' },
    desc: {
      en: 'Shelled green fava beans, frozen loose so they pour freely. For restaurants, caterers, and retail freezer packs.',
      ar: 'فول أخضر مقشر ومجمد فرط، الحبة منفصلة عن الحبة. للمطاعم وشركات التموين وعبوات ثلاجات التجزئة.',
    },
    specs: {
      en: ['Shelled green fava beans', 'Frozen loose, free-flowing', 'Storage: frozen'],
      ar: ['فول أخضر مقشر', 'مجمد فرط، الحبوب منفصلة', 'الحفظ: مجمد'],
    },
    image: `${NEW}/frozen-green-fava.webp`,
    imageFit: 'cover',
    gallery: [shot(`${NEW}/frozen-green-fava.webp`, 'Frozen shelled green fava beans', 'فول أخضر مقشر مجمد')],
    availability: STOCK,
    harvestSeason: YEAR,
    sizes: { en: 'Shelled', ar: 'مقشر' },
    packaging: { en: 'On request', ar: 'حسب الطلب' },
    commodityClass: { en: 'Frozen vegetables', ar: 'خضروات مجمدة' },
    origin: JEDDAH,
    badge: NEW_BADGE,
  }),
]

export const SEASON_PRODUCTS: Product[] = SEASON_ITEMS.map(({ after: _after, ...product }) => product)

export const SEASON_ANCHORS: Record<string, string> = Object.fromEntries(
  SEASON_ITEMS.map((product) => [product.slug, product.after])
)

/** Extra photos for products that already exist in the live catalog. */
export const GALLERY_EXTRAS: Record<string, NonNullable<Product['gallery']>> = {
  'frozen-strawberries': [
    shot(`${NEW}/frozen-strawberries-tray.webp`, 'Whole frozen strawberries in a bulk tray', 'فراولة كاملة مجمدة في صينية جملة'),
    shot(`${NEW}/elmarwa-strawberry-400g.webp`, 'ElMarwa frozen strawberry 400 g bag', 'كيس فراولة المروة المجمدة 400 جم', 'contain'),
  ],
}
