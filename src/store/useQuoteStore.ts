import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
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

let notificationTimer: ReturnType<typeof setTimeout> | null = null

function clearNotificationTimer() {
  if (notificationTimer) {
    clearTimeout(notificationTimer)
    notificationTimer = null
  }
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isCheckoutOpen: false,
      currency: 'USD',
      notification: null,

      addItem: (item, lang = 'ar') => {
        const { items } = get()
        const existing = items.find((i) => i.id === item.id)
        const updatedItems = existing
          ? items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          : [...items, item]

        const totalCount = existing ? existing.quantity + item.quantity : item.quantity

        clearNotificationTimer()
        notificationTimer = setTimeout(() => {
          set({ notification: null })
          notificationTimer = null
        }, 4000)

        set({
          items: updatedItems,
          notification: {
            show: true,
            count: totalCount,
            productName: lang === 'ar' ? item.title.ar : item.title.en,
            unit: item.unit,
          },
        })
      },

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, quantity) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }),

      setCurrency: (currency) => set({ currency }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      toggleCheckout: () =>
        set((state) => ({ isCheckoutOpen: !state.isCheckoutOpen, isOpen: false })),

      clearNotification: () => {
        clearNotificationTimer()
        set({ notification: null })
      },

      clearCart: () => set({ items: [] }),

      getTotalMt: () =>
        get().items.reduce((sum, item) => {
          const mt = item.unit === 'MT' ? item.quantity : item.quantity * 12
          return sum + mt
        }, 0),
    }),
    {
      name: 'khair-aljaar-quote',
      partialize: (state) => ({ items: state.items, currency: state.currency }),
    }
  )
)

/** Narrow selectors — avoid full-store re-renders */
export const useAddToQuote = () => useQuoteStore((s) => s.addItem)
export const useQuoteItems = () => useQuoteStore((s) => s.items)
export const useQuoteCartOpen = () => useQuoteStore((s) => s.isOpen)
export const useQuoteDrawer = () =>
  useQuoteStore(
    useShallow((s) => ({
      isOpen: s.isOpen,
      items: s.items,
      toggleCart: s.toggleCart,
      removeItem: s.removeItem,
      updateQuantity: s.updateQuantity,
      notification: s.notification,
      clearNotification: s.clearNotification,
      toggleCheckout: s.toggleCheckout,
      currency: s.currency,
      getTotalMt: s.getTotalMt,
    }))
  )
