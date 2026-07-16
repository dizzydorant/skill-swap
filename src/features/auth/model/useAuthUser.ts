import { useCallback, useEffect, useState } from 'react'
import type { AuthUser } from '@/shared/types'
import { getAuthUser, logout, subscribeToAuthStorage } from './authUtils'

interface UseAuthUserResult {
  user: AuthUser | null
  isAuthenticated: boolean
  logout: () => void
}

export const useAuthUser = (): UseAuthUserResult => {
  const [user, setUser] = useState<AuthUser | null>(() => getAuthUser())

  useEffect(() => {
    return subscribeToAuthStorage(() => {
      setUser(getAuthUser())
    })
  }, [])

  const handleLogout = useCallback(() => {
    logout()
    setUser(null)
  }, [])

  return {
    user,
    isAuthenticated: Boolean(user),
    logout: handleLogout,
  }
}
