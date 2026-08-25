# بوت إدارة المنتجات — خير الجوار

## الهدف
من تليجرام: رفع / تعديل / حذف / إرجاع منتجات + صور → **Supabase** → كروت الموقع.

## أوامر البوت
| أمر | وظيفة |
|-----|--------|
| `/new` | منتج جديد (مع أزرار تصنيف وتأكيد رفع) |
| `/list` | عرض المنتجات النشطة + slug |
| `/search ليمون` | بحث بالاسم/التصنيف |
| `/edit slug` | تعديل (اسم/سعر/تصنيف/وصف/صورة) بأزرار |
| `/photo slug` | استبدال صورة فقط |
| `/delete slug` | حذف ناعم **بعد تأكيد** |
| `/restore slug` | إرجاع منتج مخفي |
| `/status` | مسودة الرفع الحالية |
| `/confirm` | عرض تأكيد الرفع |
| `/cancel` | إلغاء المسودة |
| `/help` | المساعدة |

## API (مصادق بـ `x-product-bot-secret`)
- `GET /api/products` — كتالوج عام
- `GET /api/products?bot=1&q=` — قائمة/بحث للأدمن
- `POST /api/products` — إنشاء/تحديث كامل (+ `image_base64`)
- `PATCH /api/products` — تعديل جزئي / `restore:true` / صورة
- `DELETE /api/products` — soft-delete (`is_active=false`)

بعد كل كتابة: إعادة تحقق لصفحات الهوم والمنتجات.

## نشر workflow
على VPS: `python3 /tmp/upgrade-product-bot-v2.py`  
(سكربت: `scripts/upgrade-product-bot-v2.py`)
