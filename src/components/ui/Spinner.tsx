export function Spinner({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-border border-t-primary ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Chargement"
    />
  )
}