export const revalidate = 60

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Clock,
  FileCheck2,
  FlaskConical,
  Handshake,
  HeartHandshake,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Ruler,
  Ship,
  ShieldCheck,
  Snowflake,
  Sprout,
  Truck,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import BrandStamp from '@/components/ui/BrandStamp'
import JsonLd from '@/components/seo/JsonLd'
import { BRAND } from '@/lib/constants/brand'
import { isOrchardImage, resolveProductImage } from '@/lib/constants/images'
import { PRODUCT_CATEGORIES } from '@/lib/data/products'
import { getProducts } from '@/lib/actions/products'
import { breadcrumbJsonLd, buildPageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils/cn'

type Copy = { en: string; ar: string }

const LEGAL = {
  name: { en: 'Khair El Jewar Group for Export', ar: 'خير الجوار جروب للتصدير' },
  latin: 'KHAIR EL JEWAR GROUP',
  form: { en: 'Limited liability company', ar: 'شركة ذات مسؤولية محدودة' },
  activity: { en: 'Wholesale for export', ar: 'البيع بالجملة للتصدير' },
  founded: '2011',
  exportRegister: '600027197',
  exportRegisterValid: { en: 'Valid to January 2030', ar: 'سارية حتى يناير 2030' },
  taxId: BRAND.legal.taxCard,
  cr: BRAND.legal.commercialRegister,
  cairo: {
    en: '78 Gardenia Heights 1, Fifth Settlement, New Cairo, Egypt',
    ar: '78 ش عمارات جاردينيا هايتس 1، التجمع الخامس، القاهرة الجديدة، مصر',
  },
}

const SITES = {
  tasami: 'https://www.tasamialwatania.com/',
  alrehan: 'https://alrehan-almasi.vercel.app/',
  thimar: 'https://themarardena.vercel.app/',
}

const CATEGORY_HERO: Record<string, string> = {
  Citrus: 'valencia-oranges',
  Dates: 'ajwa-al-madinah-dates',
  Fruits: 'pomegranates',
  Vegetables: 'fresh-tomatoes',
  Frozen: 'frozen-strawberries',
  Rice: 'royal-basmati-1121-40kg',
  Poultry: 'chilled-chicken',
}

const MARKETS: { region: Copy; note: Copy; countries: Copy[] }[] = [
  {
    region: { en: 'Gulf (GCC)', ar: 'الخليج' },
    note: { en: 'Short cold-chain legs from Jeddah', ar: 'رحلات تبريد قصيرة من جدة' },
    countries: [
      { en: 'UAE', ar: 'الإمارات' },
      { en: 'Kuwait', ar: 'الكويت' },
      { en: 'Oman', ar: 'عُمان' },
      { en: 'Bahrain', ar: 'البحرين' },
      { en: 'Qatar', ar: 'قطر' },
    ],
  },
  {
    region: { en: 'Europe', ar: 'أوروبا' },
    note: { en: 'Caliber, Brix and paperwork for EU importers', ar: 'معايرة ونسبة سكر ووثائق لمستوردي أوروبا' },
    countries: [
      { en: 'Netherlands', ar: 'هولندا' },
      { en: 'Germany', ar: 'ألمانيا' },
      { en: 'United Kingdom', ar: 'المملكة المتحدة' },
      { en: 'Italy', ar: 'إيطاليا' },
      { en: 'Spain', ar: 'إسبانيا' },
    ],
  },
  {
    region: { en: 'Asia', ar: 'آسيا' },
    note: { en: 'Retail and food-service programs', ar: 'برامج للتجزئة والخدمات الغذائية' },
    countries: [
      { en: 'India', ar: 'الهند' },
      { en: 'Malaysia', ar: 'ماليزيا' },
      { en: 'Singapore', ar: 'سنغافورة' },
      { en: 'China', ar: 'الصين' },
    ],
  },
  {
    region: { en: 'Africa', ar: 'أفريقيا' },
    note: { en: 'Quoted by lane and volume', ar: 'بعرض سعر حسب المسار والكمية' },
    countries: [
      { en: 'Kenya', ar: 'كينيا' },
      { en: 'South Africa', ar: 'جنوب أفريقيا' },
      { en: 'Senegal', ar: 'السنغال' },
    ],
  },
]

const MARKET_COUNT = MARKETS.reduce((n, m) => n + m.countries.length, 0)

const JOURNEY: { icon: typeof Sprout; title: Copy; body: Copy; chip: Copy; image: string }[] = [
  {
    icon: Sprout,
    title: { en: 'Partner farms', ar: 'مزارع شريكة' },
    body: {
      en: 'Citrus, dates, fruits and vegetables sourced from trusted partner farms, with clear origin traceability.',
      ar: 'موالح وتمور وفواكه وخضروات من مزارع شريكة موثوقة، مع تتبع واضح للمنشأ.',
    },
    chip: { en: 'Origin traceability', ar: 'تتبع المنشأ' },
    image: '/images/brand/sections/farm.webp',
  },
  {
    icon: Ruler,
    title: { en: 'Sorting & grading', ar: 'الفرز والمعايرة' },
    body: {
      en: 'Sorted by size and graded to the caliber, Brix and grade written on your quote.',
      ar: 'فرز حسب الحجم ومعايرة بالمقاس ونسبة السكر والدرجة المكتوبة في عرض السعر.',
    },
    chip: { en: 'Caliber · Brix · Grade', ar: 'مقاس · سكر · درجة' },
    image: '/images/brand/sections/people.webp',
  },
  {
    icon: FlaskConical,
    title: { en: 'Quality checks', ar: 'فحص الجودة' },
    body: {
      en: 'Moisture and residue analysis for destination-market rules, with standards reviewed before every export.',
      ar: 'تحليل الرطوبة والمتبقيات حسب اشتراطات سوق الوجهة، ومراجعة المعايير قبل كل تصدير.',
    },
    chip: { en: 'Checked per shipment', ar: 'فحص لكل شحنة' },
    image: '/images/brand/hero-reel/produce.png',
  },
  {
    icon: Boxes,
    title: { en: 'Packing', ar: 'التعبئة' },
    body: {
      en: 'Telescopic cartons, mesh bags, sacks, retail packs and gift boxes, from 400 g packs to 40 kg sacks.',
      ar: 'كراتين تلسكوبية، أكياس شبك، شكائر، عبوات تجزئة وعلب هدايا، من 400 جم حتى 40 كجم.',
    },
    chip: { en: '400 g – 40 kg', ar: '400 جم – 40 كجم' },
    image: '/images/brand/studio/oranges-isolated.webp',
  },
  {
    icon: Snowflake,
    title: { en: 'Cold chain to the port', ar: 'سلسلة التبريد حتى الميناء' },
    body: {
      en: 'Coordinated reefer transport to Jeddah port and active reefer containers. IQF lines are held at −18°C.',
      ar: 'نقل مبرد منسق إلى ميناء جدة وحاويات مبردة. خطوط IQF تُحفظ عند −18°م.',
    },
    chip: { en: 'Reefer · IQF −18°C', ar: 'مبرد · IQF −18°م' },
    image: '/images/brand/sections/logistics.webp',
  },
  {
    icon: Ship,
    title: { en: 'To your port', ar: 'إلى ميناء وصولك' },
    body: {
      en: 'FOB Jeddah by default. CIF, CFR, EXW or DAP quoted by lane and volume, with commercial invoice, packing list and certificate of origin.',
      ar: 'FOB جدة افتراضيًا، وCIF أو CFR أو EXW أو DAP بعرض حسب المسار والكمية، مع الفاتورة التجارية وقائمة التعبئة وشهادة المنشأ.',
    },
    chip: { en: 'FOB · CIF · CFR · EXW · DAP', ar: 'FOB · CIF · CFR · EXW · DAP' },
    image: '/images/brand/hero-reel/port.png',
  },
]

const SPECS: { value: string; label: Copy; product: Copy }[] = [
  { value: '11–12°', label: { en: 'Brix', ar: 'نسبة السكر' }, product: { en: 'Valencia oranges', ar: 'برتقال فالنسيا' } },
  { value: '11–13°', label: { en: 'Brix, seedless', ar: 'نسبة السكر، بدون بذور' }, product: { en: 'Navel oranges', ar: 'برتقال نافيل' } },
  { value: '14°+', label: { en: 'Brix', ar: 'نسبة السكر' }, product: { en: 'Kent mangoes', ar: 'مانجو كينت' } },
  { value: '20–24%', label: { en: 'Moisture', ar: 'الرطوبة' }, product: { en: 'Medjool dates', ar: 'تمر مجدول' } },
  { value: '22%+', label: { en: 'Oil content', ar: 'نسبة الزيت' }, product: { en: 'Hass avocados', ar: 'أفوكادو هاس' } },
  { value: '−18°C', label: { en: 'Grade A/B', ar: 'درجة A/B' }, product: { en: 'IQF strawberries', ar: 'فراولة IQF' } },
]

const VALUES: { icon: typeof Handshake; title: Copy; body: Copy }[] = [
  {
    icon: Handshake,
    title: { en: 'Trust', ar: 'الثقة' },
    body: {
      en: 'What is on the quote is what loads: grade, volume, packing and term, in writing.',
      ar: 'ما في عرض السعر هو ما يُشحن: الدرجة والكمية والتعبئة وشرط التسليم، مكتوبة.',
    },
  },
  {
    icon: HeartHandshake,
    title: { en: 'Hospitality', ar: 'الضيافة' },
    body: {
      en: 'Neighborly care in every conversation, from the first message to the last container.',
      ar: 'روح الجوار في كل محادثة، من أول رسالة حتى آخر حاوية.',
    },
  },
  {
    icon: ShieldCheck,
    title: { en: 'Quality', ar: 'الجودة' },
    body: {
      en: 'Graded to spec, checked for the destination market, and kept cold to the port.',
      ar: 'معايرة حسب المواصفة، وفحص حسب سوق الوجهة، وتبريد حتى الميناء.',
    },
  },
  {
    icon: FileCheck2,
    title: { en: 'Clarity', ar: 'الوضوح' },
    body: {
      en: 'Price, availability and schedule are confirmed, never assumed. Prices on the site are indicative.',
      ar: 'السعر والتوفر والموعد تُؤكد ولا تُفترض. الأسعار على الموقع استرشادية.',
    },
  },
]

function tx(isAr: boolean, copy: Copy) {
  return isAr ? copy.ar : copy.en
}

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const isAr = lang === 'ar'
  return buildPageMetadata({
    lang,
    path: '/about',
    title: isAr ? 'من نحن: تصدير الخضار والفاكهة من جدة' : 'About Us: Fresh & Frozen Produce Exporter from Jeddah',
    description: isAr
      ? 'خير الجوار جروب للتصدير: شركة توريد وتصدير غذائي مقيدة في سجل المصدرين، مركز تعاملها جدة. موالح وتمور وفواكه وخضروات ومجمدات IQF وأرز، FOB جدة أو حتى ميناء وصولك.'
      : 'Khair El Jewar Group for Export: a registered food wholesale and export company trading from Jeddah. Citrus, dates, fruits, vegetables, IQF frozen and rice, FOB Jeddah or to your port.',
  })
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        'mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] sm:mb-4 sm:text-xs',
        light ? 'text-secondary' : 'text-harvest-deep'
      )}
    >
      <span className={cn('h-px w-7', light ? 'bg-secondary' : 'bg-harvest')} aria-hidden />
      {children}
    </p>
  )
}

function Accent({ isAr, children }: { isAr: boolean; children: ReactNode }) {
  return <span className={cn('text-harvest', !isAr && 'font-display italic')}>{children}</span>
}

function SectionTitle({
  isAr,
  eyebrow,
  title,
  accent,
  lead,
  light = false,
}: {
  isAr: boolean
  eyebrow: string
  title: string
  accent?: string
  lead?: string
  light?: boolean
}) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-12">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          'text-[1.75rem] font-bold leading-[1.2] sm:text-[2.6rem]',
          light ? 'text-cream' : 'text-dark',
          isAr ? 'font-arabic-display' : 'font-display tracking-tight'
        )}
      >
        {title}
        {accent && (
          <>
            {' '}
            <Accent isAr={isAr}>{accent}</Accent>
          </>
        )}
      </h2>
      {lead && (
        <p
          className={cn(
            'mt-3 text-[15px] leading-relaxed sm:mt-4 sm:text-lg',
            light ? 'text-cream/75' : 'text-gray-600'
          )}
        >
          {lead}
        </p>
      )}
    </div>
  )
}

export default async function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const isAr = lang === 'ar'
  const t = (copy: Copy) => tx(isAr, copy)
  const font = isAr ? 'font-arabic' : 'font-sans'
  const Arrow = isAr ? ArrowLeft : ArrowRight

  const products = await getProducts()
  const categories = PRODUCT_CATEGORIES.filter((c) => c.id !== 'All' && c.id !== 'New')
    .map((c) => {
      const items = products.filter((p) => p.category.en === c.id)
      const hero = items.find((p) => p.slug === CATEGORY_HERO[c.id]) ?? items[0]
      return { ...c, count: items.length, hero }
    })
    .filter((c) => c.count > 0)
  const productCount = categories.reduce((n, c) => n + c.count, 0)

  const waUrl = (text: string) => `https://wa.me/${BRAND.contact.phoneWa}?text=${encodeURIComponent(text)}`
  const waQuote = waUrl(
    isAr
      ? 'مرحبًا خير الجوار، أرغب في عرض سعر للتصدير.'
      : 'Hello Khair Aljaar, I would like an export quote.'
  )

  const faqs: { q: Copy; a: Copy }[] = [
    {
      q: { en: 'Who is Khair Aljaar?', ar: 'من هي خير الجوار؟' },
      a: {
        en: `Khair El Jewar Group for Export (${LEGAL.latin}) is a food wholesale and export company, founded in ${LEGAL.founded}. It is listed in the Egyptian exporters' register (no. ${LEGAL.exportRegister}) and trades from Jeddah, Saudi Arabia.`,
        ar: `خير الجوار جروب للتصدير شركة توريد وتصدير غذائي تأسست عام ${LEGAL.founded}، ومقيدة في سجل المصدرين المصري برقم ${LEGAL.exportRegister}، ومركز تعاملها جدة في المملكة العربية السعودية.`,
      },
    },
    {
      q: { en: 'Where are you based?', ar: 'أين مقركم؟' },
      a: {
        en: `Our trading hub is in Jeddah (${BRAND.contact.address.en}). Our Egypt office is at ${LEGAL.cairo.en}.`,
        ar: `مركز التعامل في جدة (${BRAND.contact.address.ar})، ومكتب مصر في ${LEGAL.cairo.ar}.`,
      },
    },
    {
      q: { en: 'What do you export?', ar: 'ما المنتجات التي تصدّرونها؟' },
      a: {
        en: `${productCount} product lines across ${categories.length} categories: citrus, dates, fruits, vegetables, IQF frozen lines, rice, grocery and poultry.`,
        ar: `${productCount} صنفًا في ${categories.length} أقسام: موالح، تمور، فواكه، خضروات، مجمدات IQF، أرز، بقالة، ودواجن.`,
      },
    },
    {
      q: { en: 'What is the minimum order?', ar: 'ما الحد الأدنى للطلب؟' },
      a: {
        en: 'Most lines start from 1 MT or 1 container depending on the product. The exact MOQ is shown on each product card and confirmed on the quote.',
        ar: 'معظم الأصناف تبدأ من 1 طن متري أو حاوية واحدة حسب المنتج. الحد الأدنى الدقيق موضح على بطاقة كل منتج ويُؤكد في عرض السعر.',
      },
    },
    {
      q: { en: 'Which Incoterms do you work with?', ar: 'ما شروط التسليم التي تعملون بها؟' },
      a: {
        en: 'FOB Jeddah is our default. CIF, CFR, EXW and DAP can be quoted by destination, volume and season.',
        ar: 'FOB جدة هو الافتراضي، ويمكن تسعير CIF وCFR وEXW وDAP حسب الوجهة والكمية والموسم.',
      },
    },
    {
      q: { en: 'Which documents come with a shipment?', ar: 'ما الوثائق المرفقة مع الشحنة؟' },
      a: {
        en: 'Commercial invoice, packing list and certificate of origin as required, plus quality notes and cold-chain guidance. Quality documents are available on request.',
        ar: 'الفاتورة التجارية وقائمة التعبئة وشهادة المنشأ حسب الحاجة، مع ملاحظات الجودة وإرشادات التبريد. وثائق الجودة متاحة عند الطلب.',
      },
    },
    {
      q: { en: 'Which companies are in the group?', ar: 'ما شركات المجموعة؟' },
      a: {
        en: 'Thimar Ardina in the Kingdom of Saudi Arabia, Tasami Al-Wataniya for wholesale food supply, and Al Rehan Al Masi for poultry and eggs.',
        ar: 'ثمار أرضنا في المملكة العربية السعودية، وتسامي الوطنية لتوريد الأغذية بالجملة، والريحان الماسي للدواجن والبيض.',
      },
    },
  ]

  const group = [
    {
      name: { en: 'Khair Aljaar Group', ar: 'خير الجوار جروب' },
      tag: { en: 'Export · Egypt & Jeddah', ar: 'تصدير · مصر وجدة' },
      body: {
        en: 'The export house: produce, frozen lines and rice for importers and wholesalers, FOB Jeddah or to their port.',
        ar: 'بيت التصدير: خضار وفاكهة ومجمدات وأرز للمستوردين وتجار الجملة، FOB جدة أو حتى موانئهم.',
      },
      href: `/${lang}/products`,
      internal: true,
    },
    {
      name: { en: 'Thimar Ardina', ar: 'ثمار أرضنا' },
      tag: { en: 'Sister brand · Saudi Arabia', ar: 'العلامة الشقيقة · السعودية' },
      body: {
        en: "The group's Saudi harvest house, bringing Khair Aljaar's care close to kitchens and partners across the Kingdom.",
        ar: 'بيت الحصاد السعودي للمجموعة، ينقل عناية خير الجوار قريبًا من المطابخ والشركاء في أنحاء المملكة.',
      },
      href: SITES.thimar,
      internal: false,
    },
    {
      name: { en: 'Tasami Al-Wataniya', ar: 'تسامي الوطنية' },
      tag: { en: 'Wholesale food supply', ar: 'توريد أغذية بالجملة' },
      body: {
        en: 'Wholesale food supply for restaurants and markets in Saudi Arabia, and the exclusive Saudi agent for Sallam rice.',
        ar: 'توريد أغذية بالجملة للمطاعم والأسواق في السعودية، والوكيل الحصري لأرز سلام في المملكة.',
      },
      href: SITES.tasami,
      internal: false,
    },
    {
      name: { en: 'Al Rehan Al Masi', ar: 'الريحان الماسي' },
      tag: { en: 'Poultry · Eggs', ar: 'دواجن · بيض' },
      body: {
        en: 'Chilled and frozen chicken, table eggs and processed lines for hotels, restaurants and catering.',
        ar: 'دجاج مبرد ومجمد، وبيض مائدة، ومصنعات للفنادق والمطاعم وشركات التموين.',
      },
      href: SITES.alrehan,
      internal: false,
    },
  ]

  const glance: [Copy, string][] = [
    [{ en: 'Legal name', ar: 'الاسم النظامي' }, t(LEGAL.name)],
    [{ en: 'Latin name', ar: 'الاسم باللاتينية' }, LEGAL.latin],
    [{ en: 'Legal form', ar: 'الشكل القانوني' }, t(LEGAL.form)],
    [{ en: 'Activity', ar: 'النشاط' }, t(LEGAL.activity)],
    [{ en: 'Founded', ar: 'سنة التأسيس' }, LEGAL.founded],
    [{ en: "Exporters' register", ar: 'سجل المصدرين' }, LEGAL.exportRegister],
    [{ en: 'Tax ID', ar: 'الرقم الضريبي' }, LEGAL.taxId],
    [{ en: 'Trading hub', ar: 'مركز التعامل' }, isAr ? 'جدة، السعودية' : 'Jeddah, Saudi Arabia'],
    [{ en: 'Egypt office', ar: 'مكتب مصر' }, isAr ? 'التجمع الخامس، القاهرة الجديدة' : 'Fifth Settlement, New Cairo'],
    [{ en: 'Hours', ar: 'ساعات العمل' }, t(BRAND.contact.hours)],
  ]

  const comparison: { need: Copy; other: Copy; khair: Copy }[] = [
    {
      need: { en: 'Specification', ar: 'المواصفة' },
      other: { en: 'Whatever is in stock that week', ar: 'المتوفر في ذلك الأسبوع' },
      khair: { en: 'Caliber, Brix and grade stated per product and on the quote', ar: 'المقاس ونسبة السكر والدرجة مكتوبة لكل منتج وفي عرض السعر' },
    },
    {
      need: { en: 'Price', ar: 'السعر' },
      other: { en: 'Numbers without terms', ar: 'أرقام بلا شروط واضحة' },
      khair: { en: 'Written quote per grade, volume and Incoterm', ar: 'عرض مكتوب حسب الدرجة والكمية وشرط التسليم' },
    },
    {
      need: { en: 'Range', ar: 'التشكيلة' },
      other: { en: 'One product per supplier', ar: 'منتج واحد لكل مورد' },
      khair: {
        en: `${productCount} lines in ${categories.length} categories, one team`,
        ar: `${productCount} صنفًا في ${categories.length} أقسام، وفريق واحد`,
      },
    },
    {
      need: { en: 'Cold chain', ar: 'سلسلة التبريد' },
      other: { en: 'Varies by supplier', ar: 'تختلف من مورد لآخر' },
      khair: { en: 'Reefer to Jeddah port; IQF held at −18°C', ar: 'نقل مبرد حتى ميناء جدة، وIQF عند −18°م' },
    },
    {
      need: { en: 'Shipping terms', ar: 'شروط الشحن' },
      other: { en: 'Left to the buyer', ar: 'متروكة للمشتري' },
      khair: { en: 'FOB Jeddah by default; CIF, CFR, EXW, DAP quoted', ar: 'FOB جدة افتراضيًا، وCIF وCFR وEXW وDAP بعرض' },
    },
    {
      need: { en: 'Export documents', ar: 'وثائق التصدير' },
      other: { en: 'Collected from several parties', ar: 'تُجمع من أكثر من جهة' },
      khair: { en: 'Commercial invoice, packing list, certificate of origin', ar: 'فاتورة تجارية، قائمة تعبئة، شهادة منشأ' },
    },
    {
      need: { en: 'Who you deal with', ar: 'الجهة التي تتعامل معها' },
      other: { en: 'Unregistered intermediaries', ar: 'وسطاء غير مسجلين' },
      khair: {
        en: `A registered exporter, register no. ${LEGAL.exportRegister}`,
        ar: `مُصدّر مقيد في سجل المصدرين برقم ${LEGAL.exportRegister}`,
      },
    },
  ]

  const terms: { icon: typeof Boxes; value: string; title: Copy; body: Copy }[] = [
    {
      icon: Boxes,
      value: isAr ? '1 طن' : '1 MT',
      title: { en: 'Minimum order', ar: 'الحد الأدنى' },
      body: { en: 'Or 1 container, depending on the product.', ar: 'أو حاوية واحدة حسب المنتج.' },
    },
    {
      icon: Ship,
      value: 'FOB',
      title: { en: 'Default term', ar: 'شرط التسليم' },
      body: { en: 'FOB Jeddah; CIF, CFR, EXW and DAP quoted.', ar: 'FOB جدة، وCIF وCFR وEXW وDAP بعرض.' },
    },
    {
      icon: FileCheck2,
      value: isAr ? '3 وثائق' : '3 docs',
      title: { en: 'Export documents', ar: 'وثائق التصدير' },
      body: { en: 'Invoice, packing list, certificate of origin.', ar: 'فاتورة، قائمة تعبئة، شهادة منشأ.' },
    },
    {
      icon: Clock,
      value: isAr ? 'بالموسم' : 'Seasonal',
      title: { en: 'Lead time', ar: 'مدة التجهيز' },
      body: {
        en: 'Share your ship window; we confirm a realistic schedule.',
        ar: 'أرسل موعد الشحن المطلوب، ونؤكد لك جدولًا واقعيًا.',
      },
    },
  ]

  const timeline: { mark: string; title: Copy; body: Copy }[] = [
    {
      mark: isAr ? `${LEGAL.founded} · التأسيس` : `${LEGAL.founded} · Founded`,
      title: { en: 'Khair Aljaar is founded', ar: 'تأسيس خير الجوار' },
      body: {
        en: 'The journey in food trade begins: wholesale supply, then export.',
        ar: 'بداية الرحلة في تجارة الغذاء: التوريد بالجملة، ثم التصدير.',
      },
    },
    {
      mark: isAr ? '2025 · سجل المصدرين' : "2025 · Exporters' register",
      title: { en: 'Registered exporter', ar: 'مُصدّر مقيد' },
      body: {
        en: `Listed in the Egyptian exporters' register, no. ${LEGAL.exportRegister}, valid to 2030.`,
        ar: `القيد في سجل المصدرين المصري برقم ${LEGAL.exportRegister}، ساري حتى 2030.`,
      },
    },
    {
      mark: isAr ? 'جدة' : 'Jeddah',
      title: { en: 'Red Sea trading hub', ar: 'مركز على البحر الأحمر' },
      body: {
        en: 'Jeddah becomes the trading and logistics base for the Gulf and beyond.',
        ar: 'جدة قاعدة التعامل واللوجستيات للخليج وما بعده.',
      },
    },
    {
      mark: isAr ? 'المملكة' : 'Saudi Arabia',
      title: { en: 'Thimar Ardina', ar: 'ثمار أرضنا' },
      body: {
        en: "The group's name reaches Saudi kitchens and partners as Thimar Ardina.",
        ar: 'اسم المجموعة يصل إلى مطابخ وشركاء المملكة باسم ثمار أرضنا.',
      },
    },
    {
      mark: isAr ? 'المجموعة' : 'The group',
      title: { en: 'Tasami & Al Rehan', ar: 'تسامي والريحان' },
      body: {
        en: 'Wholesale supply and poultry join the group, reaching restaurants, markets and catering.',
        ar: 'التوريد بالجملة والدواجن ينضمان للمجموعة، وصولًا إلى المطاعم والأسواق والتموين.',
      },
    },
    {
      mark: isAr ? 'هذا الموسم' : 'This season',
      title: { en: 'New lines', ar: 'أصناف جديدة' },
      body: {
        en: 'Ajwa Al Madinah, fresh strawberries and kiwi, red peppers, and new frozen lines.',
        ar: 'عجوة المدينة، فراولة وكيوي طازج، فلفل أحمر، ومجمدات جديدة.',
      },
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: isAr ? 'من نحن | خير الجوار' : 'About Khair Aljaar',
        inLanguage: isAr ? 'ar' : 'en',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: t(f.q),
          acceptedAnswer: { '@type': 'Answer', text: t(f.a) },
        })),
      },
    ],
  }

  return (
    <div className={cn('min-h-screen bg-canvas', font)}>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: isAr ? 'من نحن' : 'About', path: '/about' }])} />
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-canvas">
        <div
          className="pointer-events-none absolute -top-40 start-1/2 h-[30rem] w-[30rem] rounded-full bg-secondary/20 blur-3xl"
          aria-hidden
        />
        <Container size="large" className="relative grid grid-cols-1 items-center gap-10 py-10 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div className="min-w-0">
            <Eyebrow>{isAr ? 'عن مجموعة خير الجوار' : 'About Khair Aljaar Group'}</Eyebrow>
            <h1
              className={cn(
                'text-[2.15rem] font-bold leading-[1.12] text-dark sm:text-5xl lg:text-[3.7rem]',
                isAr ? 'font-arabic-display leading-[1.3]' : 'font-display tracking-tight'
              )}
            >
              {isAr ? 'خضار وفاكهة طازجة ومجمدة،' : 'Fresh & frozen produce,'}
              <br />
              <Accent isAr={isAr}>{isAr ? 'من جدة إلى العالم' : 'from Jeddah to the world'}</Accent>
            </h1>
            <p
              className={cn(
                'mt-4 text-lg font-semibold leading-snug text-primary sm:mt-5 sm:text-2xl',
                isAr ? 'font-arabic-display' : 'font-display'
              )}
            >
              {isAr
                ? 'من مزارع شريكة، مفرزة ومعبأة وموثقة لسوقك، وتُشحن FOB جدة أو حتى ميناء وصولك.'
                : 'From partner farms. Graded, packed and documented for your market. Shipped FOB Jeddah or to your port.'}
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-600 sm:text-lg">
              {isAr
                ? `خير الجوار جروب للتصدير شركة توريد وتصدير غذائي تأسست عام ${LEGAL.founded}، مقيدة في سجل المصدرين، ومركز تعاملها جدة في المملكة العربية السعودية. نورد ${productCount} صنفًا من الموالح والتمور والفواكه والخضروات والمجمدات والأرز لتجار الجملة والمستوردين والتجزئة والخدمات الغذائية.`
                : `Khair El Jewar Group for Export is a food wholesale and export company, founded in ${LEGAL.founded}, listed in the Egyptian exporters' register, and trading from Jeddah, Saudi Arabia. We supply ${productCount} lines of citrus, dates, fruits, vegetables, frozen produce and rice to wholesalers, importers, retail and food service.`}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <a
                href={waQuote}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 font-bold text-white shadow-[0_12px_30px_-12px_rgba(37,211,102,0.7)] touch-manipulation"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
              </a>
              <Link
                href={`/${lang}/products`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 font-bold text-primary touch-manipulation"
              >
                {isAr ? 'تصفح الكتالوج' : 'Explore the catalog'}
                <Arrow className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <dl className="mt-8 grid max-w-xl grid-cols-4 gap-2 sm:gap-3">
              {[
                { v: LEGAL.founded, l: isAr ? 'سنة التأسيس' : 'founded' },
                { v: String(productCount), l: isAr ? 'صنفًا' : 'product lines' },
                { v: String(categories.length), l: isAr ? 'أقسام' : 'categories' },
                { v: String(MARKETS.length), l: isAr ? 'مناطق تصدير' : 'export regions' },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-primary/10 bg-white px-2.5 py-3 shadow-sm sm:px-4 sm:py-4">
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="font-display text-xl font-bold leading-none text-primary sm:text-3xl">{s.v}</dd>
                  <dd className="mt-1.5 text-[10px] font-semibold leading-tight text-gray-500 sm:text-xs">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-w-0">
            <div className="grid grid-cols-[1.35fr_1fr] gap-3 sm:gap-4">
              <div className="relative row-span-2 min-h-[300px] overflow-hidden rounded-[1.6rem] shadow-[0_30px_60px_-30px_rgba(12,24,18,0.6)] sm:min-h-[460px]">
                <Image
                  src="/images/brand/sections/hero-jeddah.webp"
                  alt={isAr ? 'جدة ومنتجات خير الجوار' : 'Jeddah and Khair Aljaar produce'}
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 360px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-[145px] overflow-hidden rounded-[1.4rem] shadow-lg sm:h-[222px]">
                <Image src="/images/brand/sections/farm.webp" alt={isAr ? 'مزرعة برتقال' : 'Orange grove'} fill sizes="240px" className="object-cover" />
              </div>
              <div className="relative h-[145px] overflow-hidden rounded-[1.4rem] shadow-lg sm:h-[222px]">
                <Image src="/images/brand/hero-reel/port.png" alt={isAr ? 'شاحنة مبردة في الميناء' : 'Reefer truck at port'} fill sizes="240px" className="object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-5 start-3 flex items-center gap-3 rounded-2xl bg-primary px-4 py-3 text-cream shadow-2xl sm:start-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                <BadgeCheck className="h-5 w-5" aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] font-semibold text-cream/60">
                  {isAr ? 'مقيدة في سجل المصدرين' : "Exporters' register"}
                </span>
                <span className="block font-display text-sm font-bold sm:text-base" dir="ltr">
                  No. {LEGAL.exportRegister}
                </span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Trust strip ── */}
      <div className="bg-primary text-cream">
        <Container size="large">
          <ul className="scrollbar-hide flex gap-4 overflow-x-auto whitespace-nowrap py-4 text-[13px] font-semibold sm:gap-7 sm:text-sm">
            {[
              isAr ? `منذ ${LEGAL.founded}` : `Since ${LEGAL.founded}`,
              isAr ? `الرقم الضريبي ${LEGAL.taxId}` : `Tax ID ${LEGAL.taxId}`,
              isAr ? `سجل المصدرين ${LEGAL.exportRegister}` : `Exporters' register ${LEGAL.exportRegister}`,
              isAr ? 'FOB جدة افتراضيًا' : 'FOB Jeddah by default',
              isAr ? 'مجمدات IQF عند −18°م' : 'IQF frozen at −18°C',
              isAr ? 'من 1 طن أو حاوية' : 'From 1 MT or 1 container',
              isAr ? 'فاتورة · قائمة تعبئة · شهادة منشأ' : 'Invoice · packing list · certificate of origin',
            ].map((item) => (
              <li key={item} className="flex shrink-0 items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-secondary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* ── In detail + at a glance ── */}
      <section className="bg-cream-soft py-14 sm:py-24">
        <Container size="large" className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div className="min-w-0">
            <SectionTitle
              isAr={isAr}
              eyebrow={isAr ? 'من نحن' : 'Who we are'}
              title={isAr ? 'خير الجوار،' : 'Khair Aljaar,'}
              accent={isAr ? 'بالتفصيل' : 'in detail'}
            />
            <p
              className={cn(
                'text-xl font-semibold leading-relaxed text-primary sm:text-2xl',
                isAr ? 'font-arabic-display' : 'font-display'
              )}
            >
              {isAr
                ? 'بيت تصدير واحد بين المزرعة وميناء وصولك: نورد ونفرز ونعبئ ونوثق ونشحن، وتتعامل مع فريق واحد من عرض السعر حتى التحميل.'
                : 'One export house between the farm and your port. We source, grade, pack, document and ship, and you deal with one team from quote to loading.'}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-gray-600 sm:text-lg">
              {isAr
                ? 'الاسم يقول القصة: الجوار يعني الثقة والضيافة. نعمل بالقيم نفسها مع كل مشترٍ، سواء كان الطلب حاوية برتقال فالنسيا لتاجر تجزئة في الخليج، أو فراولة IQF لمصنع أغذية في أوروبا. ومن خير الجوار في مصر إلى ثمار أرضنا في المملكة، ومعها شركات المجموعة الأخرى.'
                : 'The name tells the story: al-jewar means neighborliness. We bring the same values of trust and hospitality to every buyer, whether the order is a container of Valencia oranges for a GCC retailer or IQF strawberries for a European processor. From Khair Aljaar in Egypt to Thimar Ardina in Saudi Arabia, and the other group companies.'}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-primary/10 bg-white p-5 sm:p-6">
                <Eyebrow>{isAr ? 'التشكيلة' : 'Our range'}</Eyebrow>
                <p className="text-[15px] leading-relaxed text-gray-700">
                  {isAr
                    ? `${productCount} صنفًا في ${categories.length} أقسام، لكل صنف مواصفاته وعبوته وحده الأدنى.`
                    : `${productCount} lines in ${categories.length} categories, each with its own spec, pack and MOQ.`}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {categories.map((c) => (
                    <span key={c.id} className="rounded-full border border-primary/10 bg-cream px-2.5 py-1 text-[11px] font-semibold text-primary">
                      {isAr ? c.ar : c.en}
                    </span>
                  ))}
                </div>
              </article>
              <article className="rounded-2xl border border-secondary/50 bg-secondary-50 p-5 sm:p-6">
                <Eyebrow>{isAr ? 'التسجيل' : 'Registrations'}</Eyebrow>
                <ul className="space-y-2 text-[15px] leading-relaxed text-gray-700">
                  <li>
                    {isAr ? 'مصلحة الضرائب المصرية: ' : 'Egyptian Tax Authority: '}
                    <strong dir="ltr">{LEGAL.taxId}</strong>
                  </li>
                  <li>
                    {isAr ? 'سجل المصدرين: ' : "Exporters' register (GOEIC): "}
                    <strong dir="ltr">{LEGAL.exportRegister}</strong>
                  </li>
                  <li className="text-sm text-gray-500">{t(LEGAL.exportRegisterValid)}</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-primary/10 bg-white p-5 sm:p-6">
                <Eyebrow>{isAr ? 'الجودة' : 'Quality'}</Eyebrow>
                <p className="text-[15px] leading-relaxed text-gray-700">
                  {isAr
                    ? 'فرز حسب الحجم، وفحص الرطوبة والمتبقيات حسب سوق الوجهة، وسلسلة تبريد حتى الميناء. وثائق الجودة متاحة عند الطلب.'
                    : 'Sorting by size, moisture and residue checks for the destination market, and a cold chain to the port. Quality documents are available on request.'}
                </p>
              </article>
              <article className="rounded-2xl border border-primary/10 bg-white p-5 sm:p-6">
                <Eyebrow>{isAr ? 'المجموعة' : 'The group'}</Eyebrow>
                <p className="text-[15px] leading-relaxed text-gray-700">
                  {isAr
                    ? 'ثمار أرضنا في المملكة، وتسامي الوطنية للتوريد بالجملة، والريحان الماسي للدواجن والبيض.'
                    : 'Thimar Ardina in Saudi Arabia, Tasami Al-Wataniya for wholesale supply, and Al Rehan Al Masi for poultry and eggs.'}
                </p>
              </article>
            </div>
          </div>

          <aside className="rounded-[1.6rem] bg-primary p-6 text-cream shadow-[0_30px_60px_-30px_rgba(12,24,18,0.75)] sm:p-7 lg:sticky lg:top-28">
            <Eyebrow light>{isAr ? 'بطاقة الشركة' : 'At a glance'}</Eyebrow>
            <dl className="divide-y divide-cream/10 text-sm">
              {glance.map(([k, v]) => (
                <div key={k.en} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="shrink-0 font-semibold text-cream/55">{t(k)}</dt>
                  <dd className="text-end font-bold" dir={/^[\d\s\-A-Z]+$/.test(v) ? 'ltr' : undefined}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={waQuote}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-secondary font-bold text-primary touch-manipulation"
            >
              {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
              <Arrow className="h-4 w-4" aria-hidden />
            </a>
          </aside>
        </Container>
      </section>

      {/* ── Journey ── */}
      <section className="bg-canvas py-14 sm:py-24">
        <Container size="large">
          <SectionTitle
            isAr={isAr}
            eyebrow={isAr ? 'كيف نعمل' : 'How we work'}
            title={isAr ? 'من المزرعة الشريكة' : 'From a partner farm'}
            accent={isAr ? 'إلى ميناء وصولك' : 'to your port'}
            lead={
              isAr
                ? 'ست مراحل يمر بها كل صنف، وفي كل مرحلة تعرف ما الذي يُفحص وما الذي يُكتب.'
                : 'Six stages every line goes through, and what is checked and written down at each one.'
            }
          />
          <ol className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {JOURNEY.map((step, i) => (
              <li
                key={step.title.en}
                className="w-[82%] shrink-0 snap-start overflow-hidden rounded-[1.4rem] border border-primary/10 bg-white shadow-sm sm:w-auto"
              >
                <div className="relative h-36 sm:h-44">
                  <Image src={step.image} alt={t(step.title)} fill sizes="(max-width: 640px) 100vw, 380px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <span className="absolute bottom-3 start-4 font-display text-4xl font-bold text-cream/90">0{i + 1}</span>
                  <span className="absolute bottom-3 end-4 grid h-10 w-10 place-items-center rounded-xl bg-cream/95 text-primary">
                    <step.icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className={cn('text-lg font-bold text-dark', isAr ? 'font-arabic-display' : 'font-display')}>{t(step.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{t(step.body)}</p>
                  <span className="mt-3 inline-block rounded-full bg-harvest/10 px-2.5 py-1 text-[11px] font-bold text-harvest-deep" dir={isAr && /^[A-Z]/.test(t(step.chip)) ? 'ltr' : undefined}>
                    {t(step.chip)}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Specs ── */}
      <section className="bg-primary py-14 sm:py-24">
        <Container size="large">
          <SectionTitle
            isAr={isAr}
            light
            eyebrow={isAr ? 'الجودة بالأرقام' : 'Quality you can measure'}
            title={isAr ? 'مواصفات مكتوبة،' : 'Specs in writing,'}
            accent={isAr ? 'لا وعود عامة' : 'not adjectives'}
            lead={
              isAr
                ? 'أمثلة من مواصفات الكتالوج كما هي منشورة على بطاقات المنتجات.'
                : 'Examples from the catalog, exactly as published on the product cards.'
            }
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
            {SPECS.map((s) => (
              <div key={s.product.en} className="rounded-[1.25rem] border border-cream/10 bg-cream/5 p-4 sm:p-5">
                <p className="font-display text-2xl font-bold text-secondary sm:text-3xl" dir="ltr">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-cream/60">{t(s.label)}</p>
                <p className={cn('mt-3 text-sm font-bold text-cream', isAr ? 'font-arabic-display' : 'font-display')}>
                  {t(s.product)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Categories ── */}
      <section className="bg-cream-soft py-14 sm:py-24">
        <Container size="large">
          <SectionTitle
            isAr={isAr}
            eyebrow={isAr ? 'ماذا نصدّر' : 'What we export'}
            title={isAr ? `${categories.length} أقسام،` : `${categories.length} categories,`}
            accent={isAr ? 'فريق واحد' : 'one team'}
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/${lang}/products?category=${c.id}`}
                className="group overflow-hidden rounded-[1.25rem] border border-primary/10 bg-white shadow-sm transition-shadow hover:shadow-lg touch-manipulation"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  {c.hero && (
                    <Image
                      src={resolveProductImage(c.hero.image, c.hero.category.en, c.hero.slug)}
                      alt={isAr ? c.ar : c.en}
                      fill
                      sizes="(max-width: 1024px) 50vw, 280px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {c.hero && isOrchardImage(c.hero.image) && <BrandStamp size="sm" />}
                  <span className="absolute top-2 start-2 rounded-full bg-primary/85 px-2 py-0.5 text-[10px] font-bold text-cream">
                    {isAr ? `${c.count} صنف` : `${c.count} ${c.count === 1 ? 'line' : 'lines'}`}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
                  <h3 className={cn('text-[15px] font-bold text-dark sm:text-lg', isAr ? 'font-arabic-display' : 'font-display')}>
                    {isAr ? c.ar : c.en}
                  </h3>
                  <Arrow className="h-4 w-4 shrink-0 text-harvest transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Promise ── */}
      <section className="bg-canvas py-14 sm:py-20">
        <Container className="max-w-[900px] text-center">
          <Quote className="mx-auto h-10 w-10 text-harvest" aria-hidden />
          <p
            className={cn(
              'mt-6 text-[1.45rem] font-bold leading-[1.5] text-dark sm:text-[2.1rem]',
              isAr ? 'font-arabic-display' : 'font-display'
            )}
          >
            {isAr
              ? 'الاسم يصل مع الشحنة. كل كرتونة تحمل اسم خير الجوار، فكل ما بداخلها يجب أن يكون على قدر هذا الاسم.'
              : 'The name travels with the goods. Every carton carries the Khair Aljaar name, so everything inside has to live up to it.'}
          </p>
          <p className="mt-5 text-sm font-semibold text-gray-500">{isAr ? 'مجموعة خير الجوار' : 'Khair Aljaar Group'}</p>
        </Container>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-cream-soft py-14 sm:py-24">
        <Container size="large">
          <SectionTitle
            isAr={isAr}
            eyebrow={isAr ? 'مسيرتنا' : 'Our journey'}
            title={isAr ? `منذ ${LEGAL.founded}،` : `Since ${LEGAL.founded},`}
            accent={isAr ? 'اتجاه واحد' : 'one direction'}
          />
          <ol className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-6">
            {timeline.map((item) => (
              <li
                key={item.mark}
                className="relative w-[72%] shrink-0 snap-start rounded-[1.25rem] border border-primary/10 bg-white p-5 md:w-auto"
              >
                <span className="absolute -top-px start-5 h-1 w-12 rounded-b-full bg-harvest" aria-hidden />
                <p className="text-xs font-bold text-harvest-deep">{item.mark}</p>
                <h3 className={cn('mt-2 text-lg font-bold text-dark', isAr ? 'font-arabic-display' : 'font-display')}>
                  {t(item.title)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{t(item.body)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Group companies ── */}
      <section className="bg-canvas py-14 sm:py-24">
        <Container size="large">
          <SectionTitle
            isAr={isAr}
            eyebrow={isAr ? 'شركات المجموعة' : 'Group companies'}
            title={isAr ? 'أربع شركات،' : 'Four companies,'}
            accent={isAr ? 'اسم واحد' : 'one name'}
            lead={
              isAr
                ? 'من خير الجوار في مصر إلى ثمار أرضنا في المملكة العربية السعودية، ومن خير الجوار الشركات الأخرى.'
                : 'From Khair Aljaar in Egypt to Thimar Ardina in the Kingdom of Saudi Arabia, and from Khair Aljaar, the other group companies.'
            }
          />
          <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {group.map((g, i) => {
              const inner = (
                <>
                  <span
                    className={cn(
                      'grid h-12 w-12 place-items-center rounded-2xl',
                      i === 0 ? 'bg-secondary text-primary' : 'bg-farm-soft text-primary'
                    )}
                  >
                    <Leaf className="h-6 w-6" aria-hidden />
                  </span>
                  <p className="mt-4 text-[11px] font-bold text-harvest-deep">{t(g.tag)}</p>
                  <h3 className={cn('mt-1 text-xl font-bold', i === 0 ? 'text-cream' : 'text-dark', isAr ? 'font-arabic-display' : 'font-display')}>
                    {t(g.name)}
                  </h3>
                  <p className={cn('mt-2 text-sm leading-relaxed', i === 0 ? 'text-cream/75' : 'text-gray-600')}>{t(g.body)}</p>
                  <span className={cn('mt-4 inline-flex items-center gap-1 text-sm font-bold', i === 0 ? 'text-secondary' : 'text-farm')}>
                    {i === 0 ? (isAr ? 'الكتالوج' : 'Catalog') : isAr ? 'زيارة الموقع' : 'Visit site'}
                    <Arrow className="h-4 w-4" aria-hidden />
                  </span>
                </>
              )
              const cls = cn(
                'block w-[80%] shrink-0 snap-start rounded-[1.4rem] border p-6 shadow-sm transition-colors touch-manipulation sm:w-auto',
                i === 0 ? 'border-primary bg-primary' : 'border-primary/10 bg-white hover:border-harvest/40'
              )
              return g.internal ? (
                <Link key={g.name.en} href={g.href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a key={g.name.en} href={g.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── Comparison ── */}
      <section className="bg-cream-soft py-14 sm:py-24">
        <Container size="large">
          <SectionTitle
            isAr={isAr}
            eyebrow={isAr ? 'الفرق' : 'The difference'}
            title={isAr ? 'ماذا يتغير عندما' : 'What changes when you'}
            accent={isAr ? 'تشتري من بيت تصدير واحد' : 'buy from one export house'}
          />
          <div className="hidden overflow-hidden rounded-[1.4rem] border border-primary/10 bg-white md:block">
            <table className="w-full text-start text-[15px]">
              <thead>
                <tr className="bg-cream text-dark">
                  <th className={cn('w-[22%] p-4 text-start font-bold', isAr ? 'font-arabic-display' : 'font-display')}>
                    {isAr ? 'ما تحتاجه' : 'What you need'}
                  </th>
                  <th className={cn('w-[32%] p-4 text-start font-bold text-gray-500', isAr ? 'font-arabic-display' : 'font-display')}>
                    {isAr ? 'المصادر المتفرقة' : 'Fragmented sourcing'}
                  </th>
                  <th className={cn('bg-primary p-4 text-start font-bold text-cream', isAr ? 'font-arabic-display' : 'font-display')}>
                    {isAr ? 'خير الجوار' : 'Khair Aljaar'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.need.en} className="border-t border-primary/10">
                    <td className="p-4 font-bold text-dark">{t(row.need)}</td>
                    <td className="p-4 text-gray-500">{t(row.other)}</td>
                    <td className="bg-primary/[0.04] p-4 font-semibold text-primary">
                      <span className="inline-flex items-start gap-2">
                        <BadgeCheck className="h-5 w-5 shrink-0 text-farm" aria-hidden />
                        {t(row.khair)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 md:hidden">
            {comparison.map((row) => (
              <div key={row.need.en} className="rounded-2xl border border-primary/10 bg-white p-4">
                <p className={cn('font-bold text-dark', isAr ? 'font-arabic-display' : 'font-display')}>{t(row.need)}</p>
                <p className="mt-2 text-sm text-gray-500">{t(row.other)}</p>
                <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-primary">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-farm" aria-hidden />
                  {t(row.khair)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Markets ── */}
      <section className="bg-canvas py-14 sm:py-24">
        <Container size="large">
          <SectionTitle
            isAr={isAr}
            eyebrow={isAr ? 'أسواق التصدير' : 'Export markets'}
            title={isAr ? 'من جدة إلى' : 'From Jeddah to'}
            accent={isAr ? `${MARKETS.length} مناطق` : `${MARKETS.length} regions`}
            lead={
              isAr
                ? `${MARKET_COUNT} سوقًا نعمل عليها من جدة، ومعيار واحد في كل شحنة.`
                : `${MARKET_COUNT} markets we work with from Jeddah, with one standard in every shipment.`
            }
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {MARKETS.map((m) => (
              <div key={m.region.en} className="rounded-[1.4rem] border border-primary/10 bg-white p-4 shadow-sm sm:p-6">
                <MapPin className="h-6 w-6 text-harvest" aria-hidden />
                <h3 className={cn('mt-3 text-lg font-bold text-dark sm:mt-4 sm:text-xl', isAr ? 'font-arabic-display' : 'font-display')}>{t(m.region)}</h3>
                <p className="mt-1 text-[13px] text-gray-500 sm:text-sm">{t(m.note)}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.countries.map((c) => (
                    <span key={c.en} className="rounded-full bg-cream px-2.5 py-1 text-xs font-semibold text-primary">
                      {t(c)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Link
            href={`/${lang}/export-markets`}
            className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-farm"
          >
            {isAr ? 'تفاصيل أسواق التصدير' : 'Export market details'}
            <Arrow className="h-4 w-4" aria-hidden />
          </Link>
        </Container>
      </section>

      {/* ── Terms ── */}
      <section className="bg-cream-soft py-14 sm:py-20">
        <Container size="large">
          <SectionTitle
            isAr={isAr}
            eyebrow={isAr ? 'شروط التعامل' : 'Working terms'}
            title={isAr ? 'كل شيء' : 'Everything'}
            accent={isAr ? 'واضح من البداية' : 'clear from day one'}
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {terms.map((term) => (
              <div key={term.title.en} className="rounded-[1.4rem] border border-primary/10 bg-white p-4 shadow-sm sm:p-6">
                <term.icon className="h-6 w-6 text-harvest" aria-hidden />
                <p className="mt-3 font-display text-2xl font-bold text-primary sm:mt-4 sm:text-3xl">{term.value}</p>
                <h3 className={cn('mt-1 text-base font-bold text-dark sm:text-lg', isAr ? 'font-arabic-display' : 'font-display')}>
                  {t(term.title)}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-600 sm:text-sm">{t(term.body)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Mission, vision, values ── */}
      <section className="bg-canvas py-14 sm:py-24">
        <Container size="large">
          <SectionTitle
            isAr={isAr}
            eyebrow={isAr ? 'ما نؤمن به' : 'What we stand for'}
            title={isAr ? 'المهمة والرؤية' : 'Mission, vision'}
            accent={isAr ? 'والقيم' : '& values'}
          />
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-[1.4rem] bg-primary p-6 text-cream sm:p-8">
              <Eyebrow light>{isAr ? 'مهمتنا' : 'Our mission'}</Eyebrow>
              <p className={cn('text-xl font-bold leading-relaxed sm:text-2xl', isAr ? 'font-arabic-display' : 'font-display')}>
                {isAr
                  ? 'أن نوصل محاصيل المزارع الشريكة من جدة إلى المشترين في الخليج وما بعده: معايرة حسب المواصفة، موثقة، وبشروط شحن واضحة.'
                  : 'To bring partner-farm produce from Jeddah to buyers across the Gulf and beyond: graded to spec, documented, and shipped on clear terms.'}
              </p>
            </div>
            <div className="rounded-[1.4rem] bg-harvest p-6 text-white sm:p-8">
              <p className="mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/80 sm:mb-4 sm:text-xs">
                <span className="h-px w-7 bg-white/80" aria-hidden />
                {isAr ? 'رؤيتنا' : 'Our vision'}
              </p>
              <p className={cn('text-xl font-bold leading-relaxed sm:text-2xl', isAr ? 'font-arabic-display' : 'font-display')}>
                {isAr
                  ? 'أن نكون الجار الذي يثق به المستوردون في الخضار والفاكهة الطازجة والمجمدة من المنطقة.'
                  : 'To be the neighbor importers trust for fresh and frozen produce from the region.'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title.en} className="rounded-[1.4rem] border border-primary/10 bg-cream-soft p-6">
                <v.icon className="h-6 w-6 text-farm" aria-hidden />
                <h3 className={cn('mt-4 text-lg font-bold text-dark', isAr ? 'font-arabic-display' : 'font-display')}>{t(v.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(v.body)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="bg-canvas pb-14 sm:pb-24">
        <Container size="large">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(145deg,#0C1812_0%,#1A332A_55%,#2F5C48_100%)] px-6 py-10 text-cream sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -end-20 -top-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" aria-hidden />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className={cn('text-[1.75rem] font-bold leading-tight sm:text-4xl', isAr ? 'font-arabic-display' : 'font-display')}>
                  {isAr ? 'جاهزون عندما تكون جاهزًا.' : 'Ready when you are.'}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/80 sm:text-lg">
                  {isAr
                    ? 'أرسل المنتج والكمية وميناء الوصول وموعد الشحن، ونرد عليك بعرض سعر مكتوب.'
                    : 'Send the product, volume, destination port and ship window. We reply with a written quote.'}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <a
                  href={waQuote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-secondary px-6 font-bold text-primary touch-manipulation"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  {isAr ? 'واتساب' : 'WhatsApp'}
                </a>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-cream/60 px-6 font-bold text-cream touch-manipulation"
                >
                  {isAr ? 'نموذج التواصل' : 'Contact form'}
                  <Arrow className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Addresses ── */}
      <section className="bg-cream-soft py-14 sm:py-20">
        <Container size="large">
          <SectionTitle
            isAr={isAr}
            eyebrow={isAr ? 'العناوين' : 'Addresses'}
            title={isAr ? 'عنوانان،' : 'Two addresses,'}
            accent={isAr ? 'فريق واحد' : 'one team'}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-[1.4rem] border border-primary/10 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-[11px] font-bold text-harvest-deep">{isAr ? 'مركز التعامل' : 'Trading hub'}</p>
              <h3 className={cn('mt-1 text-2xl font-bold text-dark', isAr ? 'font-arabic-display' : 'font-display')}>
                {isAr ? 'جدة، السعودية' : 'Jeddah, Saudi Arabia'}
              </h3>
              <div className="mt-4 space-y-3 text-[15px] text-gray-700">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-harvest" aria-hidden />
                  {t(BRAND.contact.address)}
                </p>
                <a href={`tel:${BRAND.contact.phoneTel}`} className="flex items-center gap-3 font-semibold text-dark">
                  <Phone className="h-5 w-5 text-harvest" aria-hidden />
                  <span dir="ltr">{BRAND.contact.phone}</span>
                </a>
                <a href={`mailto:${BRAND.contact.email}`} className="flex items-center gap-3 break-all font-semibold text-dark">
                  <Mail className="h-5 w-5 shrink-0 text-harvest" aria-hidden />
                  {BRAND.contact.email}
                </a>
                <p className="flex items-center gap-3 text-sm text-gray-500">
                  <Clock className="h-5 w-5 text-harvest" aria-hidden />
                  {t(BRAND.contact.hours)}
                </p>
              </div>
            </div>
            <div className="rounded-[1.4rem] border border-primary/10 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-[11px] font-bold text-harvest-deep">{isAr ? 'مكتب مصر' : 'Egypt office'}</p>
              <h3 className={cn('mt-1 text-2xl font-bold text-dark', isAr ? 'font-arabic-display' : 'font-display')}>
                {isAr ? 'القاهرة الجديدة، مصر' : 'New Cairo, Egypt'}
              </h3>
              <div className="mt-4 space-y-3 text-[15px] text-gray-700">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-harvest" aria-hidden />
                  {t(LEGAL.cairo)}
                </p>
                <a href={`tel:${BRAND.contact.egypt.phoneTel}`} className="flex items-center gap-3 font-semibold text-dark">
                  <Phone className="h-5 w-5 text-harvest" aria-hidden />
                  <span dir="ltr">{BRAND.contact.egypt.phone}</span>
                </a>
                <p className="flex items-center gap-3 text-sm text-gray-500">
                  <Truck className="h-5 w-5 text-harvest" aria-hidden />
                  {isAr
                    ? `الرقم الضريبي ${LEGAL.taxId} · س.ت ${LEGAL.cr}`
                    : `Tax ID ${LEGAL.taxId} · C.R. ${LEGAL.cr}`}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-canvas py-14 sm:py-24">
        <Container className="max-w-[900px]">
          <SectionTitle
            isAr={isAr}
            eyebrow={isAr ? 'أسئلة شائعة' : 'FAQ'}
            title={isAr ? 'أسئلة عن' : 'Questions about'}
            accent={isAr ? 'خير الجوار' : 'Khair Aljaar'}
          />
          <div className="divide-y divide-primary/10 rounded-[1.4rem] border border-primary/10 bg-white">
            {faqs.map((f) => (
              <details key={f.q.en} className="group p-5 sm:p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary
                  className={cn(
                    'flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-dark sm:text-lg',
                    isAr ? 'font-arabic-display' : 'font-display'
                  )}
                >
                  {t(f.q)}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream text-xl font-bold text-harvest transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-600">{t(f.a)}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
