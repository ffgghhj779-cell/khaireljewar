/** Shared Framer Motion viewport — animate once, trigger slightly before enter */
export const SCROLL_VIEWPORT = { once: true, margin: '-100px' as const }

/** Mobile: show content immediately when any pixel enters view */
export const SCROLL_VIEWPORT_INSTANT = { once: true, amount: 0 as const }

export const SPRING_HOVER = { type: 'spring' as const, stiffness: 300, damping: 20 }

/** Native-app feel — tight easeOut for mobile overlays */
export const MOBILE_EASE_OUT = [0.16, 1, 0.3, 1] as const

export const MOBILE_SPRING = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.8 }

export const MOBILE_DRAWER_SPRING = { type: 'spring' as const, stiffness: 380, damping: 36 }

export const TAP_SCALE = { scale: 0.95 }
