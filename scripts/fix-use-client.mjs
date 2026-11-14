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

let fixed = 0
for (const file of walk('src')) {
  let source = fs.readFileSync(file, 'utf8')
  const next = source.replace(
    /^(import \{[^}]+\} from '@\/lib\/i18n\/localize'\r?\n)('use client'\r?\n)/,
    '$2$1'
  )
  if (next !== source) {
    fs.writeFileSync(file, next)
    fixed += 1
    console.log('fixed', file)
  }
}
console.log('fixed count', fixed)
