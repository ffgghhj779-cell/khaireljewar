# -*- coding: utf-8 -*-
from openpyxl import Workbook
from pathlib import Path

out = Path(__file__).with_name("khair-aljaar-products-IMPORT.xlsx")
cdn = "https://static.zid.store/9193f580/images/products"

headers = [
    "اسم المنتج",
    "اسم المنتج بالإنجليزية",
    "وصف المنتج",
    "وصف المنتج بالإنجليزية",
    "سعر المنتج",
    "الكمية",
    "رمز المنتج",
    "التصنيف",
    "صور المنتج",
    "وزن المنتج",
    "حالة المنتج",
]

products = [
    (
        "برتقال فالنسيا",
        "Valencia Oranges",
        "برتقال عصير من الدرجة الأولى من مزارع شريكة موثوقة. نسبة سكر 11–12°. بتنسيق من جدة.",
        "World-class juicing oranges from trusted partner farms. High Brix 11–12°. Coordinated from Jeddah.",
        420,
        1000,
        "KA-VAL-ORANGE",
        "الموالح",
        f"{cdn}/valencia-oranges.webp",
    ),
    (
        "برتقال نافيل فاخر",
        "Premium Navel Oranges",
        "برتقال نافيل بدون بذور بلون قشرة نابض وحلاوة متوازنة.",
        "Seedless Navel oranges with vibrant peel and balanced sweetness.",
        450,
        1000,
        "KA-NAV-ORANGE",
        "الموالح",
        f"{cdn}/navel-oranges.webp",
    ),
    (
        "تمر مجدول فاخر",
        "Premium Medjool Dates",
        "تمر مجدول كبير غني بالكراميل. درجة جامبو برطوبة 20%+.",
        "Large caramel-rich Medjool dates. Jumbo grade with 20%+ moisture.",
        3200,
        500,
        "KA-MED-DATES",
        "التمور",
        f"{cdn}/medjool-dates.webp",
    ),
    (
        "تمر برحي طازج",
        "Barhi Fresh Dates",
        "تمر برحي أصفر مقرمش لبرامج فاخرة موسمية.",
        "Crisp yellow Barhi dates for seasonal luxury programs.",
        2400,
        400,
        "KA-BAR-DATES",
        "التمور",
        f"{cdn}/barhi-dates.webp",
    ),
    (
        "أفوكادو هاس",
        "Hass Avocados",
        "أفوكادو هاس كريمي بنسبة زيت 22%+. تصدير بسلسلة تبريد.",
        "Creamy Hass avocados with 22%+ oil content. Cold-chain export ready.",
        1850,
        400,
        "KA-HASS-AVO",
        "الفواكه",
        f"{cdn}/hass-avocados.webp",
    ),
    (
        "رمان فاخر",
        "Premium Pomegranates",
        "رمان بحبوب ياقوتية وإنتاجية عصير عالية.",
        "Ruby arils with high juice yield for retail and juice programs.",
        980,
        500,
        "KA-POM-FRUIT",
        "الفواكه",
        f"{cdn}/pomegranates.webp",
    ),
    (
        "بطاطس سبونتا مائدة",
        "Spunta Table Potatoes",
        "بطاطس سبونتا مغسولة بأحجام موحدة. عمر تخزين طويل.",
        "Washed Spunta potatoes with uniform sizing. Long shelf life.",
        380,
        2000,
        "KA-SPU-POT",
        "الخضروات",
        f"{cdn}/spunta-potatoes.webp",
    ),
    (
        "بصل أحمر",
        "Red Onions",
        "بصل أحمر متماسك بلون قوي وعمر تخزين طويل.",
        "Firm red onions with strong color and long storage life.",
        420,
        1500,
        "KA-RED-ONI",
        "الخضروات",
        f"{cdn}/red-onions.webp",
    ),
    (
        "ثوم طازج",
        "Fresh Garlic",
        "ثوم أبيض طازج بفصوص متماسكة وقشور نظيفة.",
        "White fresh garlic with tight cloves and clean skins.",
        1100,
        600,
        "KA-FRH-GAR",
        "الخضروات",
        f"{cdn}/fresh-garlic.webp",
    ),
    (
        "مانجو كينت",
        "Kent Mangoes",
        "مانجو كينت خالية من الألياف بحلاوة استوائية ولحم متماسك.",
        "Fiber-free Kent mangoes with tropical sweetness and firm flesh.",
        1100,
        600,
        "KA-KEN-MANGO",
        "الفواكه",
        f"{cdn}/kent-mangoes.webp",
    ),
    (
        "فراولة مجمدة IQF",
        "IQF Frozen Strawberries",
        "فراولة IQF كاملة ومقطعة عند -18°م. درجة A/B.",
        "IQF strawberries whole and sliced at -18C. Grade A/B.",
        2800,
        200,
        "KA-IQF-STR",
        "المجمدات",
        f"{cdn}/frozen-strawberries.webp",
    ),
    (
        "خضروات مشكلة مجمدة IQF",
        "IQF Mixed Vegetables",
        "خلطات خضروات IQF للخدمات الغذائية والتجزئة.",
        "IQF mixed vegetable blends for foodservice and retail.",
        1450,
        200,
        "KA-IQF-VEG",
        "المجمدات",
        f"{cdn}/frozen-mixed-vegetables.webp",
    ),
]

wb = Workbook()
ws = wb.active
ws.title = "Products"
ws.append(headers)
for row in products:
    name_ar, name_en, desc_ar, desc_en, price, qty, sku, cat, img = row
    ws.append([name_ar, name_en, desc_ar, desc_en, price, qty, sku, cat, img, 1, "published"])

wb.save(out)
print("WROTE", out)
print("ROWS", len(products))
