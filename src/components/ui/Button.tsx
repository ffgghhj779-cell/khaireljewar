import React from 'react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none touch-manipulation',
        'rounded-xl ease-luxury',
        variant === 'primary' && 'bg-primary text-cream hover:bg-primary-700 shadow-soft',
        variant === 'secondary' && 'bg-secondary text-primary hover:bg-secondary/90',
        variant === 'outline' &&
          'border border-primary/20 bg-transparent text-primary hover:bg-primary hover:text-cream',
        variant === 'ghost' && 'bg-transparent text-primary hover:bg-primary/8',
        size === 'sm' && 'h-9 px-4 text-sm',
        size === 'md' && 'h-11 px-6 text-[15px]',
        size === 'lg' && 'min-h-[52px] px-8 text-base',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
