import type { LocalizedString } from '@/lib/i18n/localize'

/** Urdu + Hindi overlays for catalog titles (and key category labels). */
export const PRODUCT_TITLE_SA: Record<string, Pick<LocalizedString, 'ur' | 'hi'>> = {
  'valencia-oranges': { ur: 'ویلنسیا مالٹا', hi: 'वेलेंसिया संतरे' },
  'navel-oranges': { ur: 'پریمیم نیول مالٹا', hi: 'प्रीमियम नेवल संतरे' },
  'medjool-dates': { ur: 'پریمیم مدجول کھجور', hi: 'प्रीमियम मेडजूल खजूर' },
  'barhi-dates': { ur: 'برحی تازہ کھجور', hi: 'बरही ताज़ी खजूर' },
  'hass-avocados': { ur: 'ہیس ایووکاڈو', hi: 'हैस एवोकैडो' },
  pomegranates: { ur: 'پریمیم انار', hi: 'प्रीमियम अनार' },
  'spunta-potatoes': { ur: 'سپنٹا ٹیبل آلو', hi: 'स्पंटा टेबल आलू' },
  'red-onions': { ur: 'لال پیاز', hi: 'लाल प्याज' },
  'fresh-garlic': { ur: 'تازہ لہسن', hi: 'ताज़ा लहसुन' },
  'kent-mangoes': { ur: 'کینٹ آم', hi: 'केंट आम' },
  'frozen-strawberries': { ur: 'IQF منجمد اسٹرابیری', hi: 'IQF फ्रोज़न स्ट्रॉबेरी' },
  'frozen-mixed-vegetables': { ur: 'IQF مخلوط سبزیاں', hi: 'IQF मिक्स्ड सब्ज़ियाँ' },
  'fresh-tomatoes': { ur: 'تازہ ٹماٹر', hi: 'ताज़ा टमाटर' },
  'long-grain-rice': { ur: 'پریمیم لمبے دانے کا چاول', hi: 'प्रीमियम लंबे दाने का चावल' },
  'white-sugar': { ur: 'خالص سفید چینی', hi: 'शुद्ध सफ़ेद चीनी' },
  'vegetable-oil': { ur: 'سبزیوں کا تیل 1 لیٹر', hi: 'वनस्पति तेल 1 लीटर' },
  'chilled-chicken': { ur: 'تازہ ٹھنڈا چکن 1 کلو', hi: 'ताज़ा चिल्ड चिकन 1 किग्रा' },
  'frozen-fries': { ur: 'منجمد آلو فرائز 9×9', hi: 'फ्रोज़न आलू फ्राइज़ 9×9' },
  'fresh-carrots': { ur: 'تازہ گاجر', hi: 'ताज़ी गाजर' },
  'bell-peppers': { ur: 'مخلوط شملہ مرچ', hi: 'मिक्स्ड शिमला मिर्च' },
  'table-grapes': { ur: 'تازہ ٹیبل انگور', hi: 'ताज़े टेबल अंगूर' },
  'green-beans': { ur: 'تازہ سبز پھلیاں', hi: 'ताज़ी हरी फलियाँ' },
  'fresh-okra': { ur: 'تازہ بھنڈی', hi: 'ताज़ी भिंडी' },
  'fresh-molokhia': { ur: 'تازہ ملوخیا پتے', hi: 'ताज़े मोलोखिया पत्ते' },
  'fresh-tangerines': { ur: 'تازہ سنگترہ', hi: 'ताज़े संतरे (टैन्जरिन)' },
  'fresh-lemons': { ur: 'تازہ لیموں', hi: 'ताज़े नींबू' },
  'sweet-potatoes': { ur: 'میٹھے آلو', hi: 'शकरकंद' },
  // Season / new arrivals
  'ajwa-al-madinah-dates': { ur: 'عجوہ مدینہ — پریمیم باکس', hi: 'अजवा अल-मदीना — प्रीमियम बॉक्स' },
  'fresh-strawberries': { ur: 'تازہ اسٹرابیری', hi: 'ताज़ी स्ट्रॉबेरी' },
  'fresh-kiwi': { ur: 'تازہ کیوی', hi: 'ताज़ी कीवी' },
  'red-bell-peppers': { ur: 'لال شملہ مرچ — ایکسپورٹ کارٹن', hi: 'लाल शिमला मिर्च — एक्सपोर्ट कार्टन' },
  'fresh-red-chili-peppers': { ur: 'تازہ لال تیز مرچ', hi: 'ताज़ी लाल तीखी मिर्च' },
  'frozen-green-fava-beans': { ur: 'منجمد چھلی ہوئی سبز پھلیاں', hi: 'फ्रोज़न छिली हरी फली' },
  'elmarwa-frozen-strawberry-400g': {
    ur: 'المروہ منجمد اسٹرابیری 400 گرام',
    hi: 'अल-मरवा फ्रोज़न स्ट्रॉबेरी 400ग्रा',
  },
}

export const CATEGORY_SA: Record<string, Pick<LocalizedString, 'ur' | 'hi'>> = {
  All: { ur: 'سب', hi: 'सभी' },
  New: { ur: 'نیا', hi: 'नया' },
  Citrus: { ur: 'مرکبات', hi: 'साइट्रस' },
  Dates: { ur: 'کھجور', hi: 'खजूर' },
  Fruits: { ur: 'پھل', hi: 'फल' },
  Vegetables: { ur: 'سبزیاں', hi: 'सब्ज़ियाँ' },
  Frozen: { ur: 'منجمد', hi: 'फ्रोज़न' },
  Rice: { ur: 'چاول', hi: 'चावल' },
  Grocery: { ur: 'کرانے', hi: 'किराना' },
  Poultry: { ur: 'پولٹری', hi: 'पोल्ट्री' },
}

export function withSouthAsiaTitle<T extends { slug: string; title: LocalizedString }>(product: T): T {
  const extra = PRODUCT_TITLE_SA[product.slug]
  if (!extra) return product
  return {
    ...product,
    title: { ...product.title, ...extra },
  }
}

export function withSouthAsiaCategory<T extends { id: string; en: string; ar: string }>(
  category: T
): T & LocalizedString {
  const extra = CATEGORY_SA[category.id] || {}
  return {
    ...category,
    ur: extra.ur,
    hi: extra.hi,
  }
}
