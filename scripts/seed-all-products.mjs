/**
 * Seed full MOCK catalog into Supabase (safe upsert by slug).
 * Run: node scripts/seed-all-products.mjs
 */
import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

const env = Object.fromEntries(
  fs
    .readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    })
)

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

// Inline minimal catalog rows (from MOCK) — keeps script runnable without TS import
const rows = [
  ['valencia-oranges','Citrus','الموالح','Valencia Oranges','برتقال فالنسيا','World-class juicing oranges from trusted partner farms. High Brix (11–12°), thin peel — coordinated from Jeddah.','برتقال عصير من الدرجة الأولى من مزارع شريكة موثوقة. نسبة سكر 11–12° — بتنسيق من جدة.','/images/brand/products/valencia-oranges.webp',24,'MT','11–12°','$420/MT','-0.5%',1],
  ['navel-oranges','Citrus','الموالح','Premium Navel Oranges','برتقال نافيل فاخر','Seedless Navel oranges with vibrant peel color and balanced sweetness.','برتقال نافيل بدون بذور بلون قشرة نابض وحلاوة متوازنة.','/images/brand/products/navel-oranges.webp',24,'MT','11–13°','$450/MT','+1.2%',2],
  ['medjool-dates','Dates','التمور','Premium Medjool Dates','تمر مجدول فاخر','Large, caramel-rich Medjool dates. Jumbo grade with 20%+ moisture.','تمر مجدول كبير غني بالكراميل. درجة جامبو برطوبة 20%+.','/images/brand/products/medjool-dates.webp',10,'MT',null,'$3200/MT','+0.8%',3],
  ['barhi-dates','Dates','التمور','Barhi Fresh Dates','تمر برحي طازج','Crisp yellow Barhi dates for seasonal luxury programs.','تمر برحي أصفر مقرمش لبرامج فاخرة موسمية.','/images/brand/products/barhi-dates.webp',8,'MT',null,'$2400/MT','+0.6%',4],
  ['hass-avocados','Fruits','الفواكه','Hass Avocados','أفوكادو هاس','Creamy Hass avocados with 22%+ oil content. Cold-chain export ready.','أفوكادو هاس كريمي بنسبة زيت 22%+. تصدير بسلسلة تبريد.','/images/brand/products/hass-avocados.webp',12,'MT',null,'$1850/MT','+2.1%',5],
  ['pomegranates','Fruits','الفواكه','Premium Pomegranates','رمان فاخر','Ruby arils with high juice yield for retail and juice programs.','حبوب ياقوتية بإنتاجية عصير عالية.','/images/brand/products/pomegranates.webp',12,'MT',null,'$980/MT','+1.1%',6],
  ['spunta-potatoes','Vegetables','الخضروات','Spunta Table Potatoes','بطاطس سبونتا مائدة','Washed Spunta potatoes with uniform sizing for GCC and EU retail.','بطاطس سبونتا مغسولة بأحجام موحدة.','/images/brand/products/spunta-potatoes.webp',28,'MT',null,'$380/MT','+0.4%',7],
  ['red-onions','Vegetables','الخضروات','Red Onions','بصل أحمر','Firm red onions with strong color and long storage life.','بصل أحمر متماسك بلون قوي وعمر تخزين طويل.','/images/brand/products/red-onions.webp',24,'MT',null,'$420/MT','+0.2%',8],
  ['fresh-garlic','Vegetables','الخضروات','Fresh Garlic','ثوم طازج','White fresh garlic with tight cloves and clean skins.','ثوم أبيض طازج بفصوص متماسكة وقشور نظيفة.','/images/brand/products/fresh-garlic.webp',10,'MT',null,'$1100/MT','+0.9%',9],
  ['kent-mangoes','Fruits','الفواكه','Kent Mangoes','مانجو كينت','Fiber-free Kent mangoes with tropical sweetness and firm flesh.','مانجو كينت خالية من الألياف بحلاوة استوائية.','/images/brand/products/kent-mangoes.webp',15,'MT','14°+','$1100/MT','+1.8%',10],
  ['frozen-strawberries','Frozen','المجمدات','IQF Frozen Strawberries','فراولة مجمدة IQF','IQF strawberries whole and sliced at -18°C. Grade A/B.','فراولة IQF كاملة ومقطعة عند -18°م.','/images/brand/products/frozen-strawberries.webp',1,'Containers',null,'$2800/MT','+0.3%',11],
  ['frozen-mixed-vegetables','Frozen','المجمدات','IQF Mixed Vegetables','خضروات مشكلة مجمدة IQF','IQF mixed vegetable blends for foodservice and retail.','خلطات خضروات IQF للخدمات الغذائية والتجزئة.','/images/brand/products/frozen-mixed-vegetables.webp',1,'Containers',null,'$1450/MT','+0.5%',12],
]

const payload = rows.map(([slug, catEn, catAr, titleEn, titleAr, descEn, descAr, image, minOrder, unit, brix, indexPrice, trend, sortOrder]) => ({
  slug,
  category_en: catEn,
  category_ar: catAr,
  title_en: titleEn,
  title_ar: titleAr,
  desc_en: descEn,
  desc_ar: descAr,
  specs_en: [],
  specs_ar: [],
  image,
  min_order: minOrder,
  unit,
  availability_en: 'In Stock',
  availability_ar: 'متوفر',
  harvest_season_en: 'Year-round',
  harvest_season_ar: 'على مدار العام',
  sizes_en: 'Standard',
  sizes_ar: 'قياسي',
  packaging_en: 'Export cartons',
  packaging_ar: 'كراتين تصدير',
  commodity_class_en: catEn,
  commodity_class_ar: catAr,
  origin_en: 'Jeddah, Saudi Arabia',
  origin_ar: 'جدة، المملكة العربية السعودية',
  brix,
  index_price: indexPrice,
  trend,
  sort_order: sortOrder,
  is_active: true,
}))

const { data, error } = await sb.from('products').upsert(payload, { onConflict: 'slug' }).select('slug')
if (error) {
  console.error('SEED_FAIL', error.message)
  process.exit(1)
}
console.log('SEED_OK', data.length, data.map((r) => r.slug).join(', '))
