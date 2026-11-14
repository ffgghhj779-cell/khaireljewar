import fs from 'fs'

const file = 'src/app/[lang]/about/page.tsx'
let source = fs.readFileSync(file, 'utf8')
const next = source.replace(/tx\(lang,/g, 'txLang(lang,')
fs.writeFileSync(file, next)
console.log('replacements', (source.match(/tx\(lang,/g) || []).length)
