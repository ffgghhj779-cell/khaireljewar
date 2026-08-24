# بوت رفع المنتجات — خير الجوار (بدون زد)

## الهدف
من تليجرام: صورة + تفاصيل المنتج → يتخزن في **Supabase** → يظهر كـ **Product Card** على الموقع الرئيسي.

## حالة مهمة
مشروع Supabase في `.env.local` الحالي **غير متاح** (`wmjfvijkgsjqlpfjcioy.supabase.co` = DNS dead).
لازم مشروع Supabase جديد (أو استعادة القديم) قبل ما البوت يشتغل فعليًا.

## خطوات تفعيل قاعدة البيانات
1. أنشئ مشروع على https://supabase.com
2. SQL Editor → نفّذ بالترتيب:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_products.sql` (اختياري)
   - `supabase/migrations/003_update_product_images.sql` (اختياري)
   - `supabase/migrations/004_product_images_storage.sql`
3. انسخ إلى `.env.local` و Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PRODUCT_BOT_SECRET` (مفتاح عشوائي قوي)
4. Deploy الموقع (Vercel) عشان `/api/products` يبقى live.

## API
### قراءة الكتالوج
`GET /api/products`

### رفع منتج (البوت)
`POST /api/products`  
Headers:
- `Content-Type: application/json`
- `x-product-bot-secret: <PRODUCT_BOT_SECRET>`

Body مثال:
```json
{
  "title_ar": "برتقال فالنسيا تجريبي",
  "title_en": "Valencia Oranges Test",
  "category_en": "Citrus",
  "desc_ar": "وصف عربي",
  "desc_en": "English description",
  "index_price": "$420/MT",
  "min_order": 24,
  "unit": "MT",
  "image_base64": "<base64 بدون data-url أو مع data-url>",
  "image_filename": "oranges.jpg"
}
```

أو مرّر `image` كرابط عام جاهز بدل `image_base64`.

نجاح الرد يرجع:
- `product` (شكل الكارت)
- `urls.en` / `urls.ar` لصفحة المنتج

## تدفق البوت المقترح (n8n)
1. Telegram Trigger (صورة أو نص)
2. Allowlist للمستخدمين
3. OpenAI/Gemini يستخرج JSON الحقول من الكابشن/المحادثة
4. HTTP Request → `POST https://khairaljewargroup.com/api/products`
5. رد للمستخدم برابط المنتج على الموقع

## حقول الكارت (مختصر)
| حقل | مطلوب |
|-----|--------|
| title_ar / title_en | نعم |
| category_en | نعم (Citrus/Dates/Fruits/Vegetables/Frozen) |
| desc_ar / desc_en | نعم |
| image | نعم (رفع أو URL) |
| min_order, unit, packaging, sizes, season, price | اختياري بdefaults |

## ملاحظة
الموقع لو Supabase واقف يرجع تلقائيًا لـ `MOCK_PRODUCTS` عشان الصفحات متتكسرش.
