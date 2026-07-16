import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthUser } from '@/features/auth/model/useAuthUser'
import { ROUTES } from '@/shared/lib/constants'

export function PrivateRoute() {
  const { isAuthenticated } = useAuthUser()
  const location = useLocation()

  if (!isAuthenticated) {
    const from = `${location.pathname}${location.search}${location.hash}`
    const loginUrl = `${ROUTES.LOGIN}?from=${encodeURIComponent(from)}`

    return <Navigate to={loginUrl} replace />
  }

  return <Outlet />
}
