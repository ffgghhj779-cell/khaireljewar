export function getPaymobConfig() {
  const secretKey = process.env.PAYMOB_SECRET_KEY?.trim()
  const publicKey = process.env.PAYMOB_PUBLIC_KEY?.trim()
  const integrationId = process.env.PAYMOB_INTEGRATION_ID?.trim()
  const hmacSecret = process.env.PAYMOB_HMAC_SECRET?.trim()
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

  return {
    secretKey,
    publicKey,
    integrationId: integrationId ? Number(integrationId) : null,
    hmacSecret,
    siteUrl,
    isConfigured: Boolean(secretKey && publicKey && integrationId && hmacSecret),
  }
}

export function unifiedCheckoutUrl(publicKey: string, clientSecret: string): string {
  const params = new URLSearchParams({ publicKey, clientSecret })
  return `https://accept.paymob.com/unifiedcheckout/?${params.toString()}`
}
