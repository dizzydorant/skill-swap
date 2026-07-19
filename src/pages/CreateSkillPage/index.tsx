import { Navigate } from 'react-router-dom'

import { ROUTES } from '@/shared/lib/constants'

export default function CreateSkillPage() {
  return <Navigate to={ROUTES.PROFILE} replace />
}
