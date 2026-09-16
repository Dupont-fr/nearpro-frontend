import type { ComponentPropsWithRef, ReactNode } from 'react'

interface InputProps extends ComponentPropsWithRef<'input'> {
  label?: string
  error?: string
  leading?: ReactNode
  trailing?: ReactNode
}

const inputClasses = (hasError: boolean) =>
  `block w-full rounded-md border bg-surface px-3 py-2 text-base text-text-primary shadow-sm
   placeholder:text-text-muted transition-colors focus:outline-2 focus:outline-offset-1
   ${hasError ? 'border-error focus:outline-error' : 'border-border focus:outline-primary'}`

export function Input({
  label,
  error,
  leading,
  trailing,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id ?? (props.name ? `input-${props.name}` : undefined)

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-text-primary">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leading ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3 text-base font-medium text-text-muted">
            {leading}
          </span>
        ) : null}
        <input
          id={inputId}
          className={`${inputClasses(Boolean(error))} ${leading ? 'pl-12' : ''} ${trailing ? 'pr-11' : ''} ${className}`}
          {...props}
        />
        {trailing ? (
          <span className="absolute inset-y-0 right-0 z-10 flex items-center pr-1.5">{trailing}</span>
        ) : null}
      </div>
      {error ? (
        <p className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}