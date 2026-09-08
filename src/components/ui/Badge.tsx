import type { ReactNode } from 'react'

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-border-light text-text-secondary',
  success: 'bg-success-light text-success',
  warning: 'bg-warning-light text-warning',
  error: 'bg-error-light text-error',
  info: 'bg-info-light text-info',
  primary: 'bg-primary-light text-primary',
  secondary: 'bg-secondary-light text-secondary',
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium
        ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}