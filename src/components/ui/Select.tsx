import type { ComponentPropsWithRef } from 'react'

interface SelectProps extends ComponentPropsWithRef<'select'> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export function Select({
  label,
  error,
  options,
  placeholder,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? (props.name ? `select-${props.name}` : undefined)

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-text-primary">
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={`block w-full appearance-none rounded-md border bg-surface px-3 py-2 text-base text-text-primary
          shadow-sm transition-colors focus:outline-2 focus:outline-offset-1
          ${error ? 'border-error focus:outline-error' : 'border-border focus:outline-primary'} ${className}`}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}