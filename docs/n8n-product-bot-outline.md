# n8n — Product Upload Bot (Khair Aljaar)

Import this into n8n after Supabase + site deploy are ready.

## Nodes outline
1. Telegram Trigger
2. Auth Gate (allowlist)
3. Switch: photo | text | /help
4. Ack: "جاري تجهيز المنتج…"
5. (photo) Get file → OpenAI Vision extract JSON product fields
6. HTTP Request POST {{SITE_URL}}/api/products
   - Header x-product-bot-secret
   - Body: extracted JSON + image_base64
7. Reply with product card confirmation + urls.ar

## Extract prompt (Vision)
Return JSON only:
{
  "title_ar": "",
  "title_en": "",
  "category_en": "Citrus|Dates|Fruits|Vegetables|Frozen",
  "desc_ar": "",
  "desc_en": "",
  "index_price": "",
  "min_order": 1,
  "unit": "MT",
  "packaging_ar": "",
  "packaging_en": "",
  "sizes_ar": "",
  "sizes_en": "",
  "harvest_season_ar": "",
  "harvest_season_en": ""
}

## Env needed in n8n
- SITE_URL=https://khairaljewargroup.com
- PRODUCT_BOT_SECRET=...
- Telegram credential
- OpenAI credential
