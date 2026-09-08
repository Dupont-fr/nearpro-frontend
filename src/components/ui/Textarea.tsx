import type { ComponentPropsWithRef } from 'react'

interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const textareaId = id ?? (props.name ? `textarea-${props.name}` : undefined)

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-text-primary">
          {label}
        </label>
      ) : null}
      <textarea
        id={textareaId}
        className={`block min-h-24 w-full rounded-md border bg-surface px-3 py-2 text-base text-text-primary
          shadow-sm placeholder:text-text-muted transition-colors focus:outline-2 focus:outline-offset-1
          ${error ? 'border-error focus:outline-error' : 'border-border focus:outline-primary'} ${className}`}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}