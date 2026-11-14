import fs from 'fs'
import path from 'path'

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (/\.tsx?$/.test(entry.name)) acc.push(full)
  }
  return acc
}

let updated = 0
for (const file of walk('src')) {
  let source = fs.readFileSync(file, 'utf8')
  const next = source.replace(
    /const isAr = lang === 'ar'/g,
    "const isAr = lang === 'ar' || lang === 'ur'"
  )
  if (next !== source) {
    fs.writeFileSync(file, next)
    updated += 1
    console.log(file)
  }
}
console.log('updated', updated)
