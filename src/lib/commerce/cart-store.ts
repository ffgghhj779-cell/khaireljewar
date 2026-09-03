'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartLine } from '@/lib/commerce/types'

type CartState = {
  lines: CartLine[]
  addLine: (line: Omit<CartLine, 'quantity'>, quantity?: number) => void
  setQuantity: (slug: string, quantity: number) => void
  removeLine: (slug: string) => void
  clear: () => void
  itemCount: () => number
  subtotalEgp: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addLine: (line, quantity = 1) => {
        const qty = Math.max(1, Math.floor(quantity))
        set((state) => {
          const existing = state.lines.find((l) => l.slug === line.slug)
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.slug === line.slug ? { ...l, quantity: l.quantity + qty } : l
              ),
            }
          }
          return { lines: [...state.lines, { ...line, quantity: qty }] }
        })
      },
      setQuantity: (slug, quantity) => {
        const qty = Math.floor(quantity)
        if (qty <= 0) {
          set((state) => ({ lines: state.lines.filter((l) => l.slug !== slug) }))
          return
        }
        set((state) => ({
          lines: state.lines.map((l) => (l.slug === slug ? { ...l, quantity: qty } : l)),
        }))
      },
      removeLine: (slug) => set((state) => ({ lines: state.lines.filter((l) => l.slug !== slug) })),
      clear: () => set({ lines: [] }),
      itemCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotalEgp: () =>
        get().lines.reduce((sum, l) => sum + l.unitPriceEgp * l.quantity, 0),
    }),
    { name: 'khair-aljaar-cart-v1' }
  )
)
