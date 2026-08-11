const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const assets =
  'C:/Users/lenovo/.cursor/projects/c-Users-lenovo-Downloads-khaireljewar-main-khaireljewar-main/assets'
const root = 'C:/Users/lenovo/Downloads/khaireljewar-main/khaireljewar-main'

const products = [
  'valencia-oranges',
  'navel-oranges',
  'medjool-dates',
  'barhi-dates',
  'hass-avocados',
  'kent-mangoes',
  'pomegranates',
  'spunta-potatoes',
  'red-onions',
  'fresh-garlic',
  'frozen-strawberries',
  'frozen-mixed-vegetables',
]

const studio = [
  ['hero-stage', 1600],
  ['dates-isolated', 1000],
  ['oranges-isolated', 1000],
]

async function toWebp(srcPng, destWebp, width) {
  await sharp(srcPng)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(destWebp)
  console.log('OK', path.basename(destWebp), fs.statSync(destWebp).size)
}

async function main() {
  for (const slug of products) {
    const src = path.join(assets, `${slug}.png`)
    if (!fs.existsSync(src)) {
      console.error('MISSING', src)
      continue
    }
    const dest1 = path.join(root, 'public/images/brand/products', `${slug}.webp`)
    const dest2 = path.join(root, 'zid-theme/assets/images/products', `${slug}.webp`)
    await toWebp(src, dest1, 1200)
    fs.copyFileSync(dest1, dest2)
  }

  const aliases = {
    'oranges.webp': 'valencia-oranges.webp',
    'dates.webp': 'medjool-dates.webp',
    'avocados.webp': 'hass-avocados.webp',
    'mangoes.webp': 'kent-mangoes.webp',
    'potatoes.webp': 'spunta-potatoes.webp',
    'strawberries.webp': 'frozen-strawberries.webp',
    'frozen-veg.webp': 'frozen-mixed-vegetables.webp',
    'alliums.webp': 'fresh-garlic.webp',
  }
  for (const [alias, srcName] of Object.entries(aliases)) {
    const src = path.join(root, 'public/images/brand/products', srcName)
    if (!fs.existsSync(src)) continue
    fs.copyFileSync(src, path.join(root, 'public/images/brand/products', alias))
    fs.copyFileSync(src, path.join(root, 'zid-theme/assets/images/products', alias))
  }

  for (const [name, width] of studio) {
    const src = path.join(assets, `${name}.png`)
    if (!fs.existsSync(src)) {
      console.error('MISSING', src)
      continue
    }
    const destStudio = path.join(root, 'public/images/brand/studio', `${name}.webp`)
    await toWebp(src, destStudio, width)
    const zidBrand = path.join(root, 'zid-theme/assets/images/brand', `${name}.webp`)
    fs.copyFileSync(destStudio, zidBrand)
    const zidStudio = path.join(root, 'zid-theme/assets/images/brand/studio')
    fs.mkdirSync(zidStudio, { recursive: true })
    fs.copyFileSync(destStudio, path.join(zidStudio, `${name}.webp`))
  }

  console.log('DONE')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
