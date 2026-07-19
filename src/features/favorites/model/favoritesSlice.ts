import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { selectCurrentUserId } from '@/features/auth/model/authSlice'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import type { RootState } from '@/store'
import { readStorage } from '@/store/storage'

export interface FavoritesState {
  byUserId: Record<string, string[]>
}

const EMPTY_FAVORITE_IDS: string[] = []

interface FavoritePayload {
  userId: string
  skillId: string
}

interface HydrateUserFavoritesPayload {
  userId: string
  skillIds: string[]
}

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const isFavoritesByUser = (value: unknown): value is FavoritesState['byUserId'] => {
  if (!value || typeof value !== 'object') {
    return false
  }

  return Object.values(value).every(isStringArray)
}

const uniqueSkillIds = (skillIds: string[]): string[] => [...new Set(skillIds)]

const normalizeFavoritesByUser = (
  favoritesByUser: FavoritesState['byUserId'],
): FavoritesState['byUserId'] =>
  Object.fromEntries(
    Object.entries(favoritesByUser).map(([userId, skillIds]) => [userId, uniqueSkillIds(skillIds)]),
  )

const initialState: FavoritesState = {
  byUserId: normalizeFavoritesByUser(
    readStorage<FavoritesState['byUserId']>(
      LOCAL_STORAGE_KEYS.FAVORITES,
      {},
      isFavoritesByUser,
    ),
  ),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    hydrateUserFavorites: (state, action: PayloadAction<HydrateUserFavoritesPayload>) => {
      if (action.payload.userId in state.byUserId) {
        return
      }

      state.byUserId[action.payload.userId] = uniqueSkillIds(action.payload.skillIds)
    },
    toggleFavorite: (state, action: PayloadAction<FavoritePayload>) => {
      const currentFavorites = state.byUserId[action.payload.userId] ?? []
      const isFavorite = currentFavorites.includes(action.payload.skillId)

      state.byUserId[action.payload.userId] = isFavorite
        ? currentFavorites.filter((skillId) => skillId !== action.payload.skillId)
        : uniqueSkillIds([...currentFavorites, action.payload.skillId])
    },
    removeFavorite: (state, action: PayloadAction<FavoritePayload>) => {
      const currentFavorites = state.byUserId[action.payload.userId] ?? []

      state.byUserId[action.payload.userId] = currentFavorites.filter(
        (skillId) => skillId !== action.payload.skillId,
      )
    },
    clearUserFavorites: (state, action: PayloadAction<{ userId: string }>) => {
      state.byUserId[action.payload.userId] = []
    },
  },
})

export const {
  clearUserFavorites,
  hydrateUserFavorites,
  removeFavorite,
  toggleFavorite,
} = favoritesSlice.actions

export const selectFavoriteIdsByUserId = (state: RootState, userId: string): string[] =>
  state.favorites.byUserId[userId] ?? EMPTY_FAVORITE_IDS

export const selectCurrentUserFavoriteIds = (state: RootState): string[] => {
  const userId = selectCurrentUserId(state)

  return userId ? selectFavoriteIdsByUserId(state, userId) : EMPTY_FAVORITE_IDS
}

export const selectHasFavoritesEntryForCurrentUser = (state: RootState): boolean => {
  const userId = selectCurrentUserId(state)

  return Boolean(userId && userId in state.favorites.byUserId)
}

export const selectIsFavorite = (state: RootState, skillId: string): boolean =>
  selectCurrentUserFavoriteIds(state).includes(skillId)

export const selectFavoritesCount = (state: RootState): number =>
  selectCurrentUserFavoriteIds(state).length

export const favoritesReducer = favoritesSlice.reducer
