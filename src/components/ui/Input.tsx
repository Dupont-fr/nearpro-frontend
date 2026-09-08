import type { ComponentPropsWithRef } from 'react'

interface InputProps extends ComponentPropsWithRef<'input'> {
  label?: string
  error?: string
}

const inputClasses = (hasError: boolean) =>
  `block w-full rounded-md border bg-surface px-3 py-2 text-base text-text-primary shadow-sm
   placeholder:text-text-muted transition-colors focus:outline-2 focus:outline-offset-1
   ${hasError ? 'border-error focus:outline-error' : 'border-border focus:outline-primary'}`

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id ?? (props.name ? `input-${props.name}` : undefined)

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-text-primary">
          {label}
        </label>
      ) : null}
      <input id={inputId} className={`${inputClasses(Boolean(error))} ${className}`} {...props} />
      {error ? (
        <p className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}