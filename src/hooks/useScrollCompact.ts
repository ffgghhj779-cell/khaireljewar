'use client'

import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

const COMPACT_THRESHOLD = 48

export function useScrollCompact() {
  const isMobile = useIsMobile()
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    if (isMobile) return

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
  }, [isMobile])

  return isMobile ? false : isCompact
}
