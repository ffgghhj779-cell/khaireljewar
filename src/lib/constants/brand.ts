/** KHAIR ALJAAR FOODS — Jeddah, Saudi Arabia */

function envOr(key: string, fallback: string): string {
  const value = process.env[key]?.trim()
  return value || fallback
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

const phoneDisplay = envOr('NEXT_PUBLIC_CONTACT_PHONE', '+966 56 443 9652')
const phoneWa = digitsOnly(envOr('NEXT_PUBLIC_WHATSAPP_NUMBER', '966564439652'))
const phoneTel = phoneDisplay.startsWith('+') ? phoneDisplay.replace(/\s/g, '') : `+${phoneWa}`

export const BRAND = {
  name: {
    en: 'Khair Aljaar',
    ar: 'خير الجوار',
    ur: 'خیر الجوار',
    hi: 'ख़ैर अल-जवार',
  },
  nameFull: {
    en: 'Khair Aljaar Foods',
    ar: 'خير الجوار للأغذية',
    ur: 'خیر الجوار فوڈز',
    hi: 'ख़ैर अल-जवार फ़ूड्स',
  },
  nameGroup: {
    en: 'Khair Aljaar Group',
    ar: 'مجموعة خير الجوار',
    ur: 'خیر الجوار گروپ',
    hi: 'ख़ैर अल-जवार समूह',
  },
  sisterBrand: {
    en: 'Thimar Ardina',
    ar: 'ثمار أرضنا',
    ur: 'ثمار ارضنا',
    hi: 'थिमर अर्दिना',
  },
  tagline: {
    ar: 'خير الجوار… من جدة إلى العالم',
    en: 'Neighborly goodness — from Jeddah to the world',
    ur: 'خیر الجوار… جدّہ سے دنیا تک',
    hi: 'पड़ोस की भलाई — जेद्दाह से दुनिया तक',
  },
  positioning: {
    en: 'A Jeddah food house — hospitality, trust, and export-ready quality.',
    ar: 'بيت غذائي من جدة — ضيافة، ثقة، وجودة جاهزة للتصدير.',
    ur: 'جدّہ کا فوڈ ہاؤس — مہمان نوازی، اعتماد، اور برآمد کے لیے تیار معیار۔',
    hi: 'जेद्दाह का फ़ूड हाउस — मेहमाननवाज़ी, भरोसा और निर्यात-तैयार गुणवत्ता।',
  },
  sourcing: {
    en: 'We source from trusted partner farms and coordinate export with care from Jeddah.',
    ar: 'نورد من مزارع شريكة موثوقة وننسّق التصدير بعناية من جدة.',
    ur: 'ہم معتبر پارٹنر فارمز سے سامان حاصل کرتے ہیں اور جدّہ سے برآمد کو احتیاط سے مربوط کرتے ہیں۔',
    hi: 'हम विश्वसनीय साझेदार फ़ार्मों से स्रोत करते हैं और जेद्दाह से निर्यात सावधानी से समन्वयित करते हैं।',
  },
  bio: {
    en: [
      'From Khair Aljaar in Egypt to Thimar Ardina in the Kingdom of Saudi Arabia',
      'And from Khair Aljaar, the other group companies',
    ],
    ar: [
      'من خير الجوار في مصر إلى ثمار أرضنا في المملكة العربية السعودية',
      'ومن خير الجوار الشركات الأخرى',
    ],
    ur: [
      'مصر میں خیر الجوار سے سعودی عرب میں ثمار ارضنا تک',
      'اور خیر الجوار کی دیگر گروپ کمپنیاں',
    ],
    hi: [
      'मिस्र में ख़ैर अल-जवार से सऊदी अरब में थिमर अर्दिना तक',
      'और ख़ैर अल-जवार की अन्य समूह कंपनियाँ',
    ],
  },
  city: {
    en: 'Jeddah',
    ar: 'جدة',
    ur: 'جدّہ',
    hi: 'जेद्दाह',
  },
  country: {
    en: 'Saudi Arabia',
    ar: 'المملكة العربية السعودية',
    ur: 'مملکت سعودی عرب',
    hi: 'सऊदी अरब',
  },
  contact: {
    address: {
      en: "Abu Ma'ali Al-Hadari, Al-Safa, Jeddah 23454, Saudi Arabia",
      ar: 'أبو معالي الحضري، الصفا، جدة 23454، المملكة العربية السعودية',
      ur: 'ابو معالی الحضری، الصفا، جدّہ 23454، سعودی عرب',
      hi: 'अबू माअली अल-हदरी, अल-सफा, जेद्दाह 23454, सऊदी अरब',
    },
    phone: phoneDisplay,
    phoneTel,
    phoneWa,
    email: envOr('NEXT_PUBLIC_CONTACT_EMAIL', 'info@khairaljaarfoods.com'),
    hours: {
      en: 'Sun – Thu · 9:00 – 17:00 (AST)',
      ar: 'الأحد – الخميس · 9:00 – 17:00 (توقيت السعودية)',
      ur: 'اتوار – جمعرات · 9:00 – 17:00 (سعودی وقت)',
      hi: 'रवि – गुरु · 9:00 – 17:00 (सऊदी समय)',
    },
    egypt: {
      address: {
        en: 'Fifth Settlement — Gardina, Cairo, Egypt',
        ar: 'التجمع الخامس - جاردينا',
        ur: 'پانچواں سیٹلمنٹ — گاردینا، قاہرہ، مصر',
        hi: 'फिफ़्थ सेटलमेंट — गार्डिना, काहिरा, मिस्र',
      },
      phone: '01122049900',
      phoneTel: '+201122049900',
    },
  },
  legal: {
    taxCard: '767-430-832',
    commercialRegister: '247538',
    line: {
      en: 'Tax ID: 767-430-832  ·  C.R.: 247538',
      ar: 'ب.ض: 767-430-832  |  س.ت: 247538',
      ur: 'ٹیکس آئی ڈی: 767-430-832  ·  سی.آر: 247538',
      hi: 'टैक्स आईडी: 767-430-832  ·  सी.आर.: 247538',
    },
    crHint: {
      en: 'Tax card 767-430-832 · Commercial registration 247538',
      ar: 'ب.ض: 767-430-832 | س.ت: 247538',
      ur: 'ٹیکس کارڈ 767-430-832 · تجارتی رجسٹریشن 247538',
      hi: 'टैक्स कार्ड 767-430-832 · वाणिज्यिक पंजीकरण 247538',
    },
  },
} as const

export const INCOTERMS = ['FOB', 'CIF', 'CFR', 'EXW', 'DAP'] as const
export type Incoterm = (typeof INCOTERMS)[number]
