import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProductUnit } from '@/lib/data/products'
import type { CurrencyCode } from '@/lib/utils/currency'

export interface QuoteItem {
  id: string
  slug: string
  title: { en: string; ar: string }
  image: string
  quantity: number
  packaging: string
  unit: ProductUnit
  indexPrice?: string
}

interface QuoteNotification {
  show: boolean
  count: number
  productName: string
  unit: ProductUnit
}

interface QuoteStore {
  items: QuoteItem[]
  isOpen: boolean
  isCheckoutOpen: boolean
  currency: CurrencyCode
  notification: QuoteNotification | null
  notificationTimer: ReturnType<typeof setTimeout> | null
  addItem: (item: QuoteItem, lang?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  setCurrency: (currency: CurrencyCode) => void
  toggleCart: () => void
  toggleCheckout: () => void
  clearNotification: () => void
  clearCart: () => void
  getTotalMt: () => number
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isCheckoutOpen: false,
      currency: 'USD',
      notification: null,
      notificationTimer: null,

      addItem: (item, lang = 'ar') => {
        const state = get()
        const existing = state.items.find((i) => i.id === item.id)
        const updatedItems = existing
          ? state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          : [...state.items, item]

        const totalCount = existing ? existing.quantity + item.quantity : item.quantity

        if (state.notificationTimer) clearTimeout(state.notificationTimer)

        const timer = setTimeout(() => {
          set({ notification: null, notificationTimer: null })
        }, 4000)

        set({
          items: updatedItems,
          notification: {
            show: true,
            count: totalCount,
            productName: lang === 'ar' ? item.title.ar : item.title.en,
            unit: item.unit,
          },
          notificationTimer: timer,
        })
      },

      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)),
        })),

      setCurrency: (currency) => set({ currency }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      toggleCheckout: () =>
        set((state) => ({ isCheckoutOpen: !state.isCheckoutOpen, isOpen: false })),

      clearNotification: () => {
        const { notificationTimer } = get()
        if (notificationTimer) clearTimeout(notificationTimer)
        set({ notification: null, notificationTimer: null })
      },

      clearCart: () => set({ items: [] }),

      getTotalMt: () => {
        return get().items.reduce((sum, item) => {
          const mt = item.unit === 'MT' ? item.quantity : item.quantity * 12
          return sum + mt
        }, 0)
      },
    }),
    {
      name: 'khair-aljaar-quote',
      partialize: (state) => ({ items: state.items, currency: state.currency }),
    }
  )
)
