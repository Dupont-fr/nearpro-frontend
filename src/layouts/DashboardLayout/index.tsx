import { LayoutDashboard, PlusCircle } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

export function DashboardLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 pb-safe sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              N
            </span>
            <span className="hidden text-lg font-semibold text-text-primary sm:inline">
              NearPro
            </span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/my-businesses"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-border-light"
            >
              <LayoutDashboard size={16} />
              Mes activités
            </Link>
            <Link
              to="/my-businesses/new"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-border-light"
            >
              <PlusCircle size={16} />
              Nouvelle activité
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full flex-1 px-4 py-6 pb-safe sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
