export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-border-light ${className}`} aria-hidden="true" />
}