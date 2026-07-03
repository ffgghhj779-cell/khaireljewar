'use client'

import { useEffect, useState } from 'react'

const MOBILE_QUERY = '(max-width: 1023px)'

export function useIsMobile(breakpoint = MOBILE_QUERY) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(breakpoint).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(breakpoint)
    const update = () => setIsMobile(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])

  return isMobile
}
