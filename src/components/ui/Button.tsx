import { LoaderCircle } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover disabled:bg-primary/60',
  secondary: 'bg-secondary text-white hover:bg-secondary/90 disabled:bg-secondary/60',
  outline:
    'border border-border bg-surface text-text-primary hover:bg-border-light disabled:text-text-muted',
  ghost: 'bg-transparent text-text-secondary hover:bg-border-light hover:text-text-primary',
  danger: 'bg-error text-white hover:bg-error/90 disabled:bg-error/60',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-base gap-2',
  lg: 'h-12 px-6 text-base gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center rounded-md border border-transparent font-medium
        transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-primary disabled:cursor-not-allowed
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading && <LoaderCircle className="animate-spin" size={16} aria-hidden="true" />}
      {children}
    </button>
  )
}