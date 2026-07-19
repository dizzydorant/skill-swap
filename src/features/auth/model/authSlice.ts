import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import type { AuthUser } from '@/shared/types'
import type { RootState } from '@/store'
import { readStorage } from '@/store/storage'
import type { ProfileData } from '@/features/profile/model/types'

import {
  isAuthUser,
  isRegisteredUser,
  type RegisteredUser,
} from './authUtils'

interface AuthState {
  user: AuthUser | null
  registeredUsers: RegisteredUser[]
}

interface RegisterSuccessPayload {
  authUser: AuthUser
  registeredUser: RegisteredUser
}

const isRegisteredUsers = (value: unknown): value is RegisteredUser[] =>
  Array.isArray(value) && value.every(isRegisteredUser)

const initialState: AuthState = {
  user: readStorage<AuthUser | null>(LOCAL_STORAGE_KEYS.AUTH_USER, null, (value) =>
    value === null || isAuthUser(value),
  ),
  registeredUsers: readStorage<RegisteredUser[]>(
    LOCAL_STORAGE_KEYS.REGISTERED_USERS,
    [],
    isRegisteredUsers,
  ),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
    },
    registerSuccess: (state, action: PayloadAction<RegisterSuccessPayload>) => {
      state.user = action.payload.authUser
      state.registeredUsers = [
        ...state.registeredUsers.filter((user) => user.id !== action.payload.registeredUser.id),
        action.payload.registeredUser,
      ]
    },
    logout: (state) => {
      state.user = null
    },
    updateAuthUser: (state, action: PayloadAction<Omit<AuthUser, 'token'>>) => {
      state.user = {
        ...action.payload,
        token: `mock_token_${action.payload.id}`,
      }
    },
    updateRegisteredUserProfile: (state, action: PayloadAction<ProfileData>) => {
      const profile = action.payload

      state.registeredUsers = state.registeredUsers.map((user) =>
        user.id === profile.id
          ? {
              ...user,
              email: profile.email,
              name: profile.fullName,
              avatarUrl: profile.avatarUrl,
              birthday: profile.birthday || null,
              gender: profile.sex,
              cityName: profile.location,
            }
          : user,
      )
    },
  },
})

export const {
  loginSuccess,
  registerSuccess,
  logout,
  updateAuthUser,
  updateRegisteredUserProfile,
} = authSlice.actions

export const selectAuthUser = (state: RootState): AuthUser | null => state.auth.user
export const selectIsAuthenticated = (state: RootState): boolean => Boolean(state.auth.user)
export const selectCurrentUserId = (state: RootState): string | null => state.auth.user?.id ?? null
export const selectRegisteredUsers = (state: RootState): RegisteredUser[] =>
  state.auth.registeredUsers

export const authReducer = authSlice.reducer
