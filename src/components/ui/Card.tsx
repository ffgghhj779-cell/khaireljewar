import React from 'react'

export default function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white rounded-3xl shadow-soft p-6 ${className}`}>
      {children}
    </div>
  )
}
