import type { ReactElement, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks'
import type { UserRole } from '../../types'

interface RequireRoleProps {
  roles: UserRole[]
  children: ReactNode
}

export function RequireRole({ roles, children }: RequireRoleProps): ReactElement {
  const { user, status } = useAuth()
  const location = useLocation()

  if (status === 'idle') {
    return <div className="flex min-h-dvh items-center justify-center" />
  }

  if (!user || status !== 'authenticated') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export function RequireAuth({ children }: { children: ReactNode }): ReactElement {
  return <RequireRole roles={['CUSTOMER', 'PROFESSIONAL', 'ADMIN']}>{children}</RequireRole>
}

export function RequireProfessional({ children }: { children: ReactNode }): ReactElement {
  return <RequireRole roles={['PROFESSIONAL']}>{children}</RequireRole>
}
