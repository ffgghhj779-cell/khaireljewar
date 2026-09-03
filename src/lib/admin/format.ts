export function formatEGP(amount: number) {
  return `EGP ${Number(amount).toLocaleString('en-EG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-EG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
