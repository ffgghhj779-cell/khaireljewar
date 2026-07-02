'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center py-20">
      <Container>
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-black text-dark mb-3">Something went wrong</h1>
          <p className="text-gray-500 mb-8">We could not load this page. Please try again.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={reset}
              className="px-6 py-3 min-h-[48px] rounded-xl bg-dark text-white font-bold hover:bg-primary transition-colors touch-manipulation"
            >
              Try again
            </button>
            <Link href="/en" className="px-6 py-3 min-h-[48px] rounded-xl border border-gray-200 font-bold hover:border-primary transition-colors touch-manipulation">
              Go home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
