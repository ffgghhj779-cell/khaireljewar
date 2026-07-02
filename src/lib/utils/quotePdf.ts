import type { QuoteItem } from '@/store/useQuoteStore'
import type { CurrencyCode } from './currency'
import { formatCurrency, parsePricePerMt } from './currency'
import { BRAND } from '@/lib/constants/brand'

interface QuotePdfOptions {
  items: QuoteItem[]
  currency: CurrencyCode
  lang: string
  companyName?: string
}

export function downloadQuoteSheet({ items, currency, lang, companyName }: QuotePdfOptions) {
  const isAr = lang === 'ar'
  const date = new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  let totalMt = 0
  let estimatedUsd = 0

  const rows = items
    .map((item, i) => {
      const unitPrice = item.indexPrice ? parsePricePerMt(item.indexPrice) : 0
      const qty = item.unit === 'MT' ? item.quantity : item.quantity * 12
      totalMt += qty
      const lineUsd = unitPrice * qty
      estimatedUsd += lineUsd
      const lineLocal = formatCurrency(
        unitPrice * (currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'AED' ? 3.67 : 50.5) * qty,
        currency,
        lang
      )
      const title = isAr ? item.title.ar : item.title.en
      return `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #E9ECEF;">${i + 1}</td>
          <td style="padding:12px;border-bottom:1px solid #E9ECEF;font-weight:600;">${title}</td>
          <td style="padding:12px;border-bottom:1px solid #E9ECEF;">${item.quantity} ${item.unit}</td>
          <td style="padding:12px;border-bottom:1px solid #E9ECEF;">${item.packaging}</td>
          <td style="padding:12px;border-bottom:1px solid #E9ECEF;text-align:end;font-family:monospace;">${lineLocal}</td>
        </tr>`
    })
    .join('')

  const html = `<!DOCTYPE html>
<html dir="${isAr ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8"/>
  <title>${BRAND.name.en} — B2B Quote</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; color:#0D1B2A; padding:48px; background:#fff; }
    .header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:3px solid #00C9D7; padding-bottom:24px; margin-bottom:32px; }
    .brand { font-size:28px; font-weight:900; letter-spacing:-0.02em; }
    .tagline { font-size:10px; text-transform:uppercase; letter-spacing:0.25em; color:#6C757D; margin-top:4px; }
    .meta { text-align:${isAr ? 'left' : 'right'}; font-size:12px; color:#6C757D; }
    .meta strong { display:block; color:#0D1B2A; font-size:14px; margin-bottom:4px; }
    table { width:100%; border-collapse:collapse; margin:24px 0; font-size:13px; }
    th { background:#F8F9FA; padding:12px; text-align:${isAr ? 'right' : 'left'}; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; color:#6C757D; border-bottom:2px solid #E9ECEF; }
    .totals { display:flex; justify-content:flex-end; margin-top:24px; }
    .totals-box { background:#F8F9FA; border:1px solid #E9ECEF; border-radius:12px; padding:20px 28px; min-width:280px; }
    .totals-row { display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; }
    .totals-row.grand { font-size:18px; font-weight:900; border-top:2px solid #00C9D7; padding-top:12px; margin-top:12px; }
    .footer { margin-top:48px; padding-top:24px; border-top:1px solid #E9ECEF; font-size:11px; color:#ADB5BD; }
    .badge { display:inline-block; background:#00C9D7; color:#0D1B2A; font-size:10px; font-weight:700; padding:4px 10px; border-radius:4px; text-transform:uppercase; letter-spacing:0.1em; }
    @media print { body { padding:24px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">${BRAND.name.en}</div>
      <div class="sub">${BRAND.tagline.en}</div>
      <div class="tagline">${isAr ? 'تصدير زراعي متميز' : 'Premium Agricultural Export Corp'}</div>
    </div>
    <div class="meta">
      <strong>${isAr ? 'طلب تسعير B2B' : 'B2B Quote Request'}</strong>
      <span class="badge">${isAr ? 'مسودة' : 'DRAFT'}</span>
      <div style="margin-top:12px;">${date}</div>
      ${companyName ? `<div style="margin-top:8px;font-weight:600;color:#0D1B2A;">${companyName}</div>` : ''}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>${isAr ? 'السلعة' : 'Commodity'}</th>
        <th>${isAr ? 'الكمية' : 'Quantity'}</th>
        <th>${isAr ? 'التعبئة' : 'Packaging'}</th>
        <th style="text-align:end">${isAr ? 'تقدير القيمة' : 'Est. Value'}</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="totals">
    <div class="totals-box">
      <div class="totals-row"><span>${isAr ? 'إجمالي الوزن' : 'Total Weight'}</span><span>${totalMt} MT</span></div>
      <div class="totals-row"><span>${isAr ? 'عدد الأصناف' : 'Line Items'}</span><span>${items.length}</span></div>
      <div class="totals-row grand"><span>${isAr ? 'التقدير الإجمالي' : 'Grand Estimate'}</span><span>${formatCurrency(estimatedUsd * (currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'AED' ? 3.67 : 50.5), currency, lang)}</span></div>
    </div>
  </div>

  <div class="footer">
    ${isAr ? 'هذا المستند تقديري ولا يُعتبر عرض سعر ملزم. الأسعار الفعلية تخضع للتوفر والموسم وشروط الشحن.' : 'This document is indicative and not a binding offer. Final pricing subject to availability, seasonality, and shipping terms.'}
    <br/>${BRAND.contact.email} · ${BRAND.contact.phone} · ${BRAND.contact.address.en}
  </div>
  <script>window.onload = () => { window.print(); }</script>
</body>
</html>`

  const win = window.open('', '_blank')
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}
