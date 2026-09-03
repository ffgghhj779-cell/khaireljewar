const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const out = path.join(__dirname, '..', 'public', 'images', 'brand', 'products')
const tmp = path.join(__dirname, '..', '.tmp-qa')
fs.mkdirSync(tmp, { recursive: true })

  const posters = [
    'bell-peppers',
    'fresh-carrots',
    'fresh-lemons',
    'fresh-okra',
    'fresh-molokhia',
    'fresh-tangerines',
    'green-beans',
    'sweet-potatoes',
  ]

async function main() {
  for (const slug of posters) {
    const src = path.join(out, `${slug}.webp`)
    const destTmp = path.join(tmp, `${slug}-pad.webp`)
    const meta = await sharp(src).metadata()
    const w = meta.width
    const h = meta.height
    const padX = Math.round(w * 0.05)
    const padY = Math.round(h * 0.05)
    const { data } = await sharp(src)
      .resize(1, 1, { fit: 'cover' })
      .raw()
      .toBuffer({ resolveWithObject: true })
    const bg = { r: data[0], g: data[1], b: data[2] }
    await sharp({
      create: { width: w + padX * 2, height: h + padY * 2, channels: 3, background: bg },
    })
      .composite([{ input: await sharp(src).toBuffer(), left: padX, top: padY }])
      .resize(1400, 1400, { fit: 'inside' })
      .webp({ quality: 85 })
      .toFile(destTmp)

    const dest = path.join(out, `${slug}.webp`)
    try {
      fs.unlinkSync(dest)
    } catch {
      /* ignore */
    }
    fs.copyFileSync(destTmp, dest)
    console.log('padded', slug)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
