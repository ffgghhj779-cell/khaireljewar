"""Compose a 828x1400 mobile hero (2x of Growth's 414x700 spec)."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "images" / "brand" / "studio" / "hero-stage.webp"
OUT_THEME = Path(__file__).resolve().parent / "hero-brand-mobile.jpg"
OUT_ROOT = ROOT / "banner-khair-aljaar-mobile.jpg"

W, H = 828, 1400
CREAM = (247, 244, 236)
# Cream occupies the top so RTL heading/CTA sit on a clean field.
CREAM_H = 560

src = Image.open(SRC).convert("RGB")
sw, sh = src.size

# Keep the product cluster (full landscape) scaled to canvas width.
scale = W / sw
pw, ph = W, int(sh * scale)
photo = src.resize((pw, ph), Image.Resampling.LANCZOS)

canvas = Image.new("RGB", (W, H), CREAM)
# Anchor products to the bottom.
y = H - ph
if y < CREAM_H - 80:
    y = CREAM_H - 80
canvas.paste(photo, (0, y))

# Soft fade from cream into the photo so the two regions don't look cut.
fade_h = 90
fade = Image.new("L", (W, fade_h), 0)
for i in range(fade_h):
    fade.paste(int(255 * (1 - i / (fade_h - 1))), (0, i, W, i + 1))
cream_band = Image.new("RGB", (W, fade_h), CREAM)
canvas.paste(cream_band, (0, y), fade)

for dest in (OUT_THEME, OUT_ROOT):
    canvas.save(dest, "JPEG", quality=88, optimize=True, progressive=True)
    print(dest.name, dest.stat().st_size, canvas.size)
