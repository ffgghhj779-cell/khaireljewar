import fs from 'fs'
import path from 'path'

const root = path.resolve('src')

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) acc.push(full)
  }
  return acc
}

const files = walk(root)
let changed = 0

for (const file of files) {
  if (file.includes(`${path.sep}lib${path.sep}i18n`)) continue
  let source = fs.readFileSync(file, 'utf8')
  const original = source

  source = source.replace(/isAr\s*\?\s*([A-Za-z0-9_$.]+)\.ar\s*:\s*\1\.en/g, 'tx(lang, $1)')
  source = source.replace(
    /lang\s*===\s*['"]ar['"]\s*\?\s*([A-Za-z0-9_$.]+)\.ar\s*:\s*\1\.en/g,
    'tx(lang, $1)'
  )
  source = source.replace(
    /isAr\s*\?\s*['"]font-arabic['"]\s*:\s*['"]font-sans['"]/g,
    'localeFontClass(lang)'
  )
  source = source.replace(
    /isAr\s*\?\s*['"]font-arabic['"]\s*:\s*['"]font-display['"]/g,
    'localeDisplayClass(lang)'
  )
  source = source.replace(
    /isAr\s*\?\s*['"]rtl['"]\s*:\s*['"]ltr['"]/g,
    "(isRtl(lang) ? 'rtl' : 'ltr')"
  )

  if (source === original) continue

  const needsTx = /tx\(lang/.test(source)
  const needsFont = /localeFontClass\(lang\)|localeDisplayClass\(lang\)/.test(source)
  const needsRtl = /isRtl\(lang\)/.test(source)

  if ((needsTx || needsFont || needsRtl) && !source.includes("from '@/lib/i18n/localize'")) {
    const parts = []
    if (needsTx) parts.push('tx')
    if (/localeFontClass\(lang\)/.test(source)) parts.push('localeFontClass')
    if (/localeDisplayClass\(lang\)/.test(source)) parts.push('localeDisplayClass')
    if (needsRtl) parts.push('isRtl')
    const uniq = [...new Set(parts)]
    const importLine = `import { ${uniq.join(', ')} } from '@/lib/i18n/localize'\n`
    const match = source.match(/^((?:import .+;\r?\n)+)/m)
    if (match) source = source.replace(match[1], `${match[1]}${importLine}`)
    else source = `${importLine}${source}`
  }

  fs.writeFileSync(file, source)
  changed += 1
  console.log('updated', path.relative(process.cwd(), file))
}

console.log(`files changed: ${changed}`)
