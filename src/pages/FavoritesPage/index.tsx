import { Navigate } from 'react-router-dom'

import { ROUTES } from '@/shared/lib/constants'

export default function FavoritesPage() {
  return <Navigate to={ROUTES.PROFILE} replace />
}
