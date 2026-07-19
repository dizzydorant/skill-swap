import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { selectAuthUser } from '@/features/auth/model/authSlice'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import type { RootState } from '@/store'
import { readStorage } from '@/store/storage'

import type { ProfileData, ProfileOverridesByUserId } from './types'

export interface ProfileState {
  overridesByUserId: ProfileOverridesByUserId
}

interface SaveProfilePayload {
  userId: string
  data: ProfileData
}

interface RemoveProfileOverridePayload {
  userId: string
}

const isProfileData = (value: unknown): value is ProfileData => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const profile = value as Record<string, unknown>

  return (
    typeof profile.id === 'string' &&
    typeof profile.email === 'string' &&
    typeof profile.fullName === 'string' &&
    (profile.sex === 'male' ||
      profile.sex === 'female' ||
      profile.sex === 'other' ||
      profile.sex === '') &&
    typeof profile.birthday === 'string' &&
    (typeof profile.avatarUrl === 'string' || profile.avatarUrl === null) &&
    typeof profile.location === 'string' &&
    typeof profile.bio === 'string' &&
    !('password' in profile)
  )
}

const normalizeProfileOverrides = (value: unknown): ProfileOverridesByUserId => {
  if (Array.isArray(value)) {
    return value.reduce<ProfileOverridesByUserId>((acc, profile) => {
      if (isProfileData(profile)) {
        acc[profile.id] = profile
      }

      return acc
    }, {})
  }

  if (!value || typeof value !== 'object') {
    return {}
  }

  return Object.entries(value as Record<string, unknown>).reduce<ProfileOverridesByUserId>(
    (acc, [userId, profile]) => {
      if (typeof userId === 'string' && userId && isProfileData(profile)) {
        acc[userId] = { ...profile, id: userId }
      }

      return acc
    },
    {},
  )
}

const createProfileFromAuthUser = (
  authUser: ReturnType<typeof selectAuthUser>,
): ProfileData | null =>
  authUser
    ? {
        id: authUser.id,
        email: authUser.email,
        fullName: authUser.name,
        sex: '',
        birthday: '',
        avatarUrl: authUser.avatarUrl ?? null,
        location: '',
        bio: '',
      }
    : null

const initialState: ProfileState = {
  overridesByUserId: normalizeProfileOverrides(
    readStorage<unknown>(LOCAL_STORAGE_KEYS.PROFILE_OVERRIDES, {}),
  ),
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveProfile: (state, action: PayloadAction<SaveProfilePayload>) => {
      const { userId, data } = action.payload

      if (!userId || userId !== data.id) {
        return
      }

      state.overridesByUserId[userId] = data
    },
    removeProfileOverride: (state, action: PayloadAction<RemoveProfileOverridePayload>) => {
      delete state.overridesByUserId[action.payload.userId]
    },
  },
})

export const { removeProfileOverride, saveProfile } = profileSlice.actions

export const selectProfileOverridesByUserId = (state: RootState): ProfileOverridesByUserId =>
  state.profile.overridesByUserId

export const selectProfileOverrideByUserId = (
  state: RootState,
  userId: string,
): ProfileData | null => state.profile.overridesByUserId[userId] ?? null

export const selectCurrentProfileOverride = createSelector(
  [
    selectProfileOverridesByUserId,
    (state: RootState): string | null => state.auth.user?.id ?? null,
  ],
  (overridesByUserId, userId): ProfileData | null =>
    userId ? (overridesByUserId[userId] ?? null) : null,
)

export const selectCurrentProfile = createSelector(
  [selectAuthUser, selectCurrentProfileOverride],
  (authUser, profileOverride): ProfileData | null => {
    const baseProfile = createProfileFromAuthUser(authUser)

    if (!baseProfile) {
      return null
    }

    return profileOverride ? { ...baseProfile, ...profileOverride } : baseProfile
  },
)

export const profileReducer = profileSlice.reducer
