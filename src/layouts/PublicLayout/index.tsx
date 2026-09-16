import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks'
import { logoutUser } from '../../features/auth/services'
import { clearUser } from '../../features/auth/slice'
import { Button } from '../../components/ui/Button'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { useAppDispatch } from '../../store/hooks'

export function PublicLayout() {
  const { user, status } = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logoutUser()
    } catch {
      // cookie déjà expiré : on nettoie quand même l'état local
    }
    dispatch(clearUser())
    navigate('/')
  }

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
            {status === 'authenticated' && user ? (
              <>
                <span className="hidden max-w-40 truncate text-sm text-text-secondary sm:inline">
                  {user.firstName} {user.lastName}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md px-2 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  S&apos;inscrire
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  )
}