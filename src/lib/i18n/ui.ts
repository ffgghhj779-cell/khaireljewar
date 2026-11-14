import type { LocalizedString } from './localize'

/** Shared chrome / CTA copy — complete in all four storefront locales */
export const UI = {
  nav: {
    products: {
      en: 'Products',
      ar: 'المنتجات',
      ur: 'مصنوعات',
      hi: 'उत्पाद',
    },
    about: {
      en: 'About',
      ar: 'من نحن',
      ur: 'ہمارے بارے میں',
      hi: 'हमारे बारे में',
    },
    partners: {
      en: 'Partners',
      ar: 'شركاؤنا',
      ur: 'شراکت دار',
      hi: 'साझेदार',
    },
    quality: {
      en: 'Quality',
      ar: 'الجودة',
      ur: 'معیار',
      hi: 'गुणवत्ता',
    },
    logistics: {
      en: 'Logistics',
      ar: 'اللوجستيات',
      ur: 'لاجسٹکس',
      hi: 'रसद',
    },
    contact: {
      en: 'Contact',
      ar: 'اتصل بنا',
      ur: 'رابطہ',
      hi: 'संपर्क',
    },
    home: {
      en: 'Home',
      ar: 'الرئيسية',
      ur: 'ہوم',
      hi: 'होम',
    },
    cart: {
      en: 'Cart',
      ar: 'السلة',
      ur: 'ٹوکری',
      hi: 'कार्ट',
    },
    login: {
      en: 'Sign in',
      ar: 'دخول',
      ur: 'سائن ان',
      hi: 'साइन इन',
    },
    reach: {
      en: 'Contact',
      ar: 'تواصل',
      ur: 'رابطہ کریں',
      hi: 'संपर्क करें',
    },
  },
  cta: {
    requestQuote: {
      en: 'Request a quote',
      ar: 'اطلب عرض سعر',
      ur: 'قیمت کی درخواست',
      hi: 'कोटेशन माँगें',
    },
    viewProducts: {
      en: 'Products',
      ar: 'المنتجات',
      ur: 'مصنوعات دیکھیں',
      hi: 'उत्पाद देखें',
    },
    allNew: {
      en: 'All new products',
      ar: 'كل المنتجات الجديدة',
      ur: 'تمام نئی مصنوعات',
      hi: 'सभी नए उत्पाद',
    },
    switchLanguage: {
      en: 'Language',
      ar: 'اللغة',
      ur: 'زبان',
      hi: 'भाषा',
    },
  },
  newArrivals: {
    eyebrow: {
      en: 'Just arrived',
      ar: 'وصل حديثاً',
      ur: 'ابھی آیا',
      hi: 'अभी आया',
    },
    title: {
      en: 'New this season at Khair Aljaar.',
      ar: 'جديد الموسم في خير الجوار.',
      ur: 'اس موسم کی نئی مصنوعات خیر الجوار پر۔',
      hi: 'इस सीज़न के नए उत्पाद ख़ैर अल-जवार पर।',
    },
    lead: {
      en: 'Ajwa from Al Madinah, strawberries and kiwi, red peppers, and new frozen lines. Each has its own page with photos and specs, priced by written quote.',
      ar: 'عجوة المدينة، فراولة وكيوي، فلفل أحمر، ومجمدات جديدة. كل منتج له صفحة بصوره ومواصفاته، والسعر بعرض مكتوب.',
      ur: 'مدینہ کی عجوہ، اسٹرابیری اور کیوی، لال مرچیں، اور نئی منجمد لائنیں۔ ہر مصنوع کی الگ صفحہ تصاویر اور تفصیلات کے ساتھ؛ قیمت تحریری کوٹیشن پر۔',
      hi: 'मदीना की अजवा, स्ट्रॉबेरी और कीवी, लाल मिर्च, और नई फ्रोज़न लाइनें। हर उत्पाद का अपना पेज फ़ोटो व स्पेक्स के साथ; कीमत लिखित कोटेशन पर।',
    },
  },
  footer: {
    rights: {
      en: 'All rights reserved.',
      ar: 'جميع الحقوق محفوظة.',
      ur: 'جملہ حقوق محفوظ ہیں۔',
      hi: 'सर्वाधिकार सुरक्षित।',
    },
  },
  a11y: {
    mainNav: {
      en: 'Main navigation',
      ar: 'التنقل الرئيسي',
      ur: 'مرکزی نیویگیشن',
      hi: 'मुख्य नेविगेशन',
    },
    chooseLanguage: {
      en: 'Choose language',
      ar: 'اختر اللغة',
      ur: 'زبان منتخب کریں',
      hi: 'भाषा चुनें',
    },
  },
} as const satisfies Record<string, Record<string, LocalizedString>>
