import Link from 'next/link'
import Container from '@/components/ui/Container'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'

export default function LangNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center py-20 bg-canvas-soft">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <p className={cn('text-7xl md:text-8xl font-bold text-primary/25 mb-4 font-display')}>404</p>
          <h1 className={cn('text-3xl md:text-4xl font-bold text-dark mb-4 font-display')}>Page not found</h1>
          <p className={cn('text-gray-500 mb-8 font-sans')}>
            The page you requested does not exist. Return home or browse our catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en"
              className="px-7 py-3.5 min-h-[52px] rounded-full bg-dark text-white font-semibold hover:bg-primary transition-colors touch-manipulation font-sans"
            >
              Home
            </Link>
            <Link
              href="/en/products"
              className="px-7 py-3.5 min-h-[52px] rounded-full border border-dark/15 font-semibold hover:border-primary hover:text-primary transition-colors touch-manipulation font-sans"
            >
              Products
            </Link>
          </div>
          <p className="mt-10 text-xs text-gray-400 font-sans">{BRAND.nameFull.en}</p>
        </div>
      </Container>
    </div>
  )
}
