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
    <div className="min-h-[60vh] flex items-center py-20 bg-canvas-soft">
      <Container>
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-dark mb-3 font-display">Something went wrong</h1>
          <p className="text-gray-500 mb-8 font-sans">We could not load this page. Please try again.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={reset}
              className="px-7 py-3.5 min-h-[52px] rounded-full bg-dark text-white font-semibold hover:bg-primary transition-colors touch-manipulation font-sans"
            >
              Try again
            </button>
            <Link
              href="/en"
              className="px-7 py-3.5 min-h-[52px] rounded-full border border-dark/15 font-semibold hover:border-primary hover:text-primary transition-colors touch-manipulation font-sans"
            >
              Go home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
