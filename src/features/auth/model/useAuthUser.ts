import { useCallback } from 'react'

import type { AuthUser } from '@/shared/types'
import { useAppDispatch, useAppSelector } from '@/store'

import { logout, selectAuthUser, selectIsAuthenticated } from './authSlice'

interface UseAuthUserResult {
  user: AuthUser | null
  isAuthenticated: boolean
  logout: () => void
}

export const useAuthUser = (): UseAuthUserResult => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuthUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return {
    user,
    isAuthenticated,
    logout: handleLogout,
  }
}
