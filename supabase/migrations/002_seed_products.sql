-- =============================================================================
-- KHAIR ALJAAR FOODS — Seed products from mock catalog
-- Run AFTER 001_initial_schema.sql
-- =============================================================================

INSERT INTO public.products (
  slug, category_en, category_ar, title_en, title_ar, desc_en, desc_ar,
  specs_en, specs_ar, image, min_order, unit,
  availability_en, availability_ar, harvest_season_en, harvest_season_ar,
  sizes_en, sizes_ar, packaging_en, packaging_ar,
  commodity_class_en, commodity_class_ar, origin_en, origin_ar,
  brix, index_price, trend, sort_order
) VALUES
(
  'valencia-oranges', 'Citrus', 'الموالح',
  'Egyptian Valencia Oranges', 'برتقال فالنسيا المصري',
  'World-class juicing oranges from the Nile Delta. High Brix (11–12°), thin peel, exceptional juice yield for GCC bottlers and EU processors.',
  'برتقال عصير من الدرجة الأولى من دلتا النيل. نسبة سكر عالية، قشرة رقيقة، إنتاجية عصير استثنائية لمصانع الخليج وأوروبا.',
  ARRAY['Caliber: 48/56/64/72/80/88/100', 'Brix: 11–12°', 'Packaging: 15kg Telescopic Cartons'],
  ARRAY['المعايرة: 48/56/64/72/80/88/100', 'نسبة السكر: 11–12°', 'التعبئة: كراتين تلسكوبية 15 كجم'],
  '/images/products/cold-shelf-display.jpeg',
  24, 'MT', 'In Stock', 'متوفر', 'Feb – May', 'فبراير – مايو',
  '48–100', '48–100', 'Telescopic Carton 15kg', 'كرتون تلسكوبي 15 كجم',
  'Citrus', 'موالح', 'Ismailia, Egypt', 'الإسماعيلية، مصر',
  '11–12°', '$420/MT', '-0.5%', 1
),
(
  'navel-oranges', 'Citrus', 'الموالح',
  'Premium Navel Oranges', 'برتقال نافيل فاخر',
  'Seedless Navel oranges with vibrant peel color and balanced sweetness. Export-grade for premium retail chains across Europe and the Gulf.',
  'برتقال نافيل بدون بذور بلون قشرة نابض وحلاوة متوازنة. درجة تصدير لسلاسل التجزئة الفاخرة في أوروبا والخليج.',
  ARRAY['Caliber: 44/48/56/64/72/80', 'Brix: 11–13°', 'Packaging: 15kg Telescopic Cartons'],
  ARRAY['المعايرة: 44/48/56/64/72/80', 'نسبة السكر: 11–13°', 'التعبئة: كراتين تلسكوبية 15 كجم'],
  '/images/products/cold-shelf-display.jpeg',
  24, 'MT', 'In Stock', 'متوفر', 'Dec – Mar', 'ديسمبر – مارس',
  '44–80', '44–80', 'Telescopic Carton 15kg', 'كرتون تلسكوبي 15 كجم',
  'Citrus', 'موالح', 'Beheira, Egypt', 'البحيرة، مصر',
  '11–13°', '$450/MT', '+1.2%', 2
),
(
  'medjool-dates', 'Dates', 'التمور',
  'Premium Medjool Dates', 'تمر مجدول فاخر',
  'Large, caramel-rich Medjool dates from Sinai & New Valley farms. Jumbo grade with 20%+ moisture, ideal for luxury retail and gourmet HORECA.',
  'تمر مجدول كبير غني بالكراميل من مزارع سيناء والوادي الجديد. درجة جامبو برطوبة 20%+، مثالي للتجزئة الفاخرة والفنادق.',
  ARRAY['Grade: Jumbo / Super Jumbo', 'Moisture: 20–24%', 'Packaging: 5kg Cartons / 10kg Bulk'],
  ARRAY['الدرجة: جامبو / سوبر جامبو', 'الرطوبة: 20–24%', 'التعبئة: كراتين 5 كجم / بالجملة 10 كجم'],
  '/images/products/dates-luxury-display.jpeg',
  10, 'MT', 'In Stock', 'متوفر', 'Sep – Nov', 'سبتمبر – نوفمبر',
  'Jumbo+', 'جامبو+', '5kg Cartons', 'كراتين 5 كجم',
  'Dates', 'تمور', 'Sinai, Egypt', 'سيناء، مصر',
  NULL, '$3200/MT', '+0.8%', 3
),
(
  'hass-avocados', 'Fruits', 'الفواكه',
  'Hass Avocados', 'أفوكادو هاس',
  'Creamy Hass avocados with 22%+ oil content. Cold-chain export to GCC premium retail and HORECA programs.',
  'أفوكادو هاس كريمي بنسبة زيت 22%+. تصدير بسلسلة تبريد لبرامج التجزئة الفاخرة والفنادق في الخليج.',
  ARRAY['Caliber: 16/18/20/22', 'Oil: 22%+', 'Packaging: 4kg Cartons'],
  ARRAY['المعايرة: 16/18/20/22', 'الزيت: 22%+', 'التعبئة: كراتين 4 كجم'],
  '/images/products/fruits-shopping-cart.jpeg',
  12, 'MT', 'In Stock', 'متوفر', 'Oct – Feb', 'أكتوبر – فبراير',
  '16–22', '16–22', '4kg Cartons', 'كراتين 4 كجم',
  'Tropical', 'استوائي', 'Fayoum, Egypt', 'الفيوم، مصر',
  NULL, '$1850/MT', '+2.1%', 4
),
(
  'spunta-potatoes', 'Vegetables', 'الخضروات',
  'Spunta Table Potatoes', 'بطاطس سبونتا',
  'Washed Spunta potatoes with uniform sizing for GCC and EU retail. Long shelf life, low sprouting under cold storage.',
  'بطاطس سبونتا مغسولة بأحجام موحدة للتجزئة في الخليج وأوروبا. عمر تخزين طويل، إنبات منخفض تحت التبريد.',
  ARRAY['Caliber: 45mm+, 55mm+', 'Washed & Graded', 'Packaging: 10kg / 25kg Mesh Bags'],
  ARRAY['المعايرة: 45مم+، 55مم+', 'مغسولة ومصنفة', 'التعبئة: أكياس شبك 10/25 كجم'],
  '/images/products/potatoes-display-stand.jpeg',
  28, 'MT', 'In Stock', 'متوفر', 'Year-round', 'على مدار العام',
  '45–55mm+', '45–55مم+', '25kg Mesh Bags', 'أكياس شبك 25 كجم',
  'Root Crop', 'محصول جذري', 'Minya, Egypt', 'المنيا، مصر',
  NULL, '$380/MT', '+0.4%', 5
),
(
  'kent-mangoes', 'Fruits', 'الفواكه',
  'Kent Mangoes', 'مانجو كينت',
  'Fiber-free Kent mangoes with tropical sweetness and firm flesh. Air-freight capable for Gulf luxury fruit programs.',
  'مانجو كينت خالية من الألياف بحلاوة استوائية ولحم متماسك. قابلة للشحن الجوي لبرامج الفواكه الفاخرة في الخليج.',
  ARRAY['Caliber: 6/7/8/9', 'Brix: 14°+', 'Packaging: 4kg Cartons'],
  ARRAY['المعايرة: 6/7/8/9', 'نسبة السكر: 14°+', 'التعبئة: كراتين 4 كجم'],
  '/images/products/mangoes-display.jpeg',
  15, 'MT', 'Seasonal', 'موسمي', 'Jul – Sep', 'يوليو – سبتمبر',
  '6–9', '6–9', '4kg Cartons', 'كراتين 4 كجم',
  'Tropical', 'استوائي', 'Ismailia, Egypt', 'الإسماعيلية، مصر',
  '14°+', '$1100/MT', '+1.8%', 6
)
ON CONFLICT (slug) DO NOTHING;
