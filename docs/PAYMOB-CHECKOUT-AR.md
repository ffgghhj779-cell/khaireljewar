# تفعيل الدفع الإلكتروني — Paymob + متجر خير الجوار

هذا الدليل للخطوات التي **يجب تنفيذها يدويًا** بعد رفع الكود. كل ما يمكن برمجيًا تم في المشروع.

## 1) قاعدة البيانات (Supabase)

1. افتح [Supabase Dashboard](https://supabase.com/dashboard) → مشروع الموقع → **SQL Editor**
2. انسخ محتوى الملف `supabase/migrations/005_ecommerce_paymob.sql` ونفّذه **Run**
3. تأكد أن الجداول `orders` و `order_items` ظهرت
4. عدّل أسعار التجزئة في جدول `products` → عمود `retail_price_egp` حسب السوق

## 2) حساب Paymob Accept (مصر)

1. سجّل في [accept.paymob.com](https://accept.paymob.com) باسم الشركة/المؤسسة المصرية
2. أكمل التحقق (KYC) وفعّل **Card payments**
3. من **Settings → Account info** انسخ:
   - **Secret Key**
   - **Public Key**
   - **HMAC Secret** (للـ webhook)
4. من **Payment Integrations** انسخ **Integration ID** الخاص بالبطاقات (Card)

## 3) متغيرات البيئة على Vercel

في **Project Settings → Environment Variables** أضف:

| المتغير | الوصف |
|---------|--------|
| `PAYMOB_SECRET_KEY` | Secret Key من Paymob |
| `PAYMOB_PUBLIC_KEY` | Public Key |
| `PAYMOB_INTEGRATION_ID` | رقم تكامل البطاقات |
| `PAYMOB_HMAC_SECRET` | HMAC للتحقق من الـ webhook |
| `SUPABASE_SERVICE_ROLE_KEY` | موجود مسبقًا — مطلوب لإنشاء الطلبات |

تأكد أيضًا أن `NEXT_PUBLIC_SITE_URL=https://khairaljewargroup.com`

بعد الحفظ: **Redeploy** للموقع.

## 4) Webhook في Paymob

في لوحة Paymob → **Developers → Webhooks** (أو Transaction processed callback):

- **URL:** `https://khairaljewargroup.com/api/paymob/webhook`
- **Method:** POST
- فعّل HMAC إن وُجد

## 5) اختبار الشراء

1. افتح الموقع → منتج → **أضف للسلة**
2. **السلة** → **إتمام الشراء**
3. أدخل بيانات التوصيل (محافظة مصر)
4. يُوجّهك لصفحة Paymob Unified Checkout
5. استخدم **بطاقة اختبار** من Paymob (وضع Test mode)
6. بعد الدفع: `/ar/order/success?ref=KA-...`

## 6) أسعار ووحدات المستهلك

- السعر المعروض للمستهلك: `retail_price_egp` + وحدة `consumer_unit_ar/en`
- شحن ثابت: **49 جنيه** داخل مصر (قابل للتعديل في `src/lib/commerce/types.ts`)
- طلب الجملة (MT) ما زال ظاهرًا للمعلومة — السلة تستخدم سعر التجزئة فقط

## 7) ما لا يزال اختياريًا / B2B

- **طلب عرض سعر بالجملة:** صفحة `/contact` وواتساب ما زالت متاحة
- **متجر Zid:** منفصل — هذا المسار للمستهلك المصري على الموقع الرئيسي

## استكشاف الأخطاء

| المشكلة | الحل |
|---------|------|
| `503 Payment not configured` | متغيرات Paymob أو Service Role ناقصة على Vercel |
| السلة فارغة بعد الدفع | طبيعي — الطلب محفوظ في Supabase |
| Webhook لا يحدّث الحالة | تحقق من HMAC Secret وURL الـ webhook |
| سعر خاطئ | حدّث `retail_price_egp` في Supabase |

## الدعم

- Paymob: [docs.paymob.com](https://docs.paymob.com)
- بعد التفعيل: راقب جدول `orders` في Supabase للطلبات الجديدة
