'use client'

import { useEffect, useState } from 'react'

const MOBILE_QUERY = '(max-width: 1023px)'

export function useIsMobile(breakpoint = MOBILE_QUERY) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(breakpoint)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])

  return isMobile
}
