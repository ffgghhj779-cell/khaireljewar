'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      className={cn('bg-gray-200/80 rounded-lg', className)}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn('bg-white border border-gray-200 rounded-2xl p-5 space-y-4', className)}>
      <div className="flex items-center gap-4">
        <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <Skeleton className="h-2 w-3/4 rounded-full" />
    </div>
  )
}

export function SkeletonTable({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      ))}
    </div>
  )
}

export function PortalSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <Skeleton className="h-5 w-40 mb-6" />
          <SkeletonTable rows={3} />
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <Skeleton className="h-5 w-48 mb-6" />
          <SkeletonTable rows={3} />
        </div>
      </div>
    </div>
  )
}

export function ProductCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('bg-white border border-gray-200 overflow-hidden', compact ? 'rounded-2xl' : 'rounded-3xl')}>
      <Skeleton className={cn('w-full rounded-none', compact ? 'aspect-[16/11]' : 'aspect-[4/3]')} />
      <div className={cn('space-y-3', compact ? 'p-4' : 'p-6')}>
        <Skeleton className="h-5 w-3/4" />
        {!compact && (
          <>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Skeleton className="h-12 rounded-lg" />
              <Skeleton className="h-12 rounded-lg" />
            </div>
          </>
        )}
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="h-[52vh] md:h-[70vh] bg-gray-200/60 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-lg shrink-0" />
          ))}
        </div>
        <div className="md:hidden flex gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="shrink-0 w-[85vw] max-w-sm">
              <ProductCardSkeleton compact />
            </div>
          ))}
        </div>
        <div className="hidden md:grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    </div>
  )
}
