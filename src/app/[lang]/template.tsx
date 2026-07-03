'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useLightMotion } from '@/hooks/useLightMotion'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion()
  const lightMotion = useLightMotion()

  if (reduceMotion || lightMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
