'use client'

import { useEffect, useState } from 'react'

const COMPACT_THRESHOLD = 48

export function useScrollCompact() {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setIsCompact(window.scrollY > COMPACT_THRESHOLD)
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return isCompact
}
