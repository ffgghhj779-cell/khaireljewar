import Link from 'next/link'
import Container from '@/components/ui/Container'
import { BRAND } from '@/lib/constants/brand'
import { cn } from '@/lib/utils/cn'

export default function LangNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center py-20">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-8xl font-black text-primary/30 mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-black text-dark mb-4 font-manrope">Page Not Found</h1>
          <p className="text-gray-500 mb-8 font-inter">
            The page you requested does not exist. Return home or browse our catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/en" className="px-6 py-3 min-h-[48px] rounded-xl bg-dark text-white font-bold hover:bg-primary transition-colors touch-manipulation">
              Home
            </Link>
            <Link href="/en/products" className="px-6 py-3 min-h-[48px] rounded-xl border border-gray-200 font-bold hover:border-primary transition-colors touch-manipulation">
              Products
            </Link>
          </div>
          <p className="mt-8 text-xs text-gray-400">{BRAND.name.en}</p>
        </div>
      </Container>
    </div>
  )
}
