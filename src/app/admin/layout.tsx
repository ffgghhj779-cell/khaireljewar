import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s — Khair Aljaar Admin' },
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { height: 100%; }
          body { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
