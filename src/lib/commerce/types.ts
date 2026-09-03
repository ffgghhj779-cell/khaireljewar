export type CartLine = {
  slug: string
  titleEn: string
  titleAr: string
  image: string
  unitLabelEn: string
  unitLabelAr: string
  unitPriceEgp: number
  quantity: number
}

export type CheckoutCustomer = {
  fullName: string
  email: string
  phone: string
  street: string
  city: string
  governorate: string
  notes?: string
}

export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'failed'
  | 'cancelled'
  | 'fulfillment'
  | 'delivered'

export const EGYPT_GOVERNORATES = [
  { en: 'Cairo', ar: 'القاهرة' },
  { en: 'Giza', ar: 'الجيزة' },
  { en: 'Alexandria', ar: 'الإسكندرية' },
  { en: 'Dakahlia', ar: 'الدقهلية' },
  { en: 'Red Sea', ar: 'البحر الأحمر' },
  { en: 'Beheira', ar: 'البحيرة' },
  { en: 'Fayoum', ar: 'الفيوم' },
  { en: 'Gharbia', ar: 'الغربية' },
  { en: 'Ismailia', ar: 'الإسماعيلية' },
  { en: 'Monufia', ar: 'المنوفية' },
  { en: 'Minya', ar: 'المنيا' },
  { en: 'Qalyubia', ar: 'القليوبية' },
  { en: 'New Valley', ar: 'الوادي الجديد' },
  { en: 'Suez', ar: 'السويس' },
  { en: 'Aswan', ar: 'أسوان' },
  { en: 'Assiut', ar: 'أسيوط' },
  { en: 'Beni Suef', ar: 'بني سويف' },
  { en: 'Port Said', ar: 'بورسعيد' },
  { en: 'Damietta', ar: 'دمياط' },
  { en: 'Sharkia', ar: 'الشرقية' },
  { en: 'South Sinai', ar: 'South Sinai' },
  { en: 'Kafr El Sheikh', ar: 'كفر الشيخ' },
  { en: 'Matrouh', ar: 'مطروح' },
  { en: 'Luxor', ar: 'الأقصر' },
  { en: 'Qena', ar: 'قنا' },
  { en: 'North Sinai', ar: 'North Sinai' },
  { en: 'Sohag', ar: 'سوهاج' },
] as const

export const SHIPPING_FEE_EGP = 49
