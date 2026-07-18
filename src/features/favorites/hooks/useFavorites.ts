import { useCallback, useEffect } from 'react'

import { selectCurrentUserId } from '@/features/auth/model/authSlice'
import { useAppDispatch, useAppSelector } from '@/store'

import { loadMockUserFavoriteIds } from '../lib/loadMockUserFavoriteIds'
import {
  hydrateUserFavorites,
  removeFavorite as removeFavoriteAction,
  selectCurrentUserFavoriteIds,
  selectHasFavoritesEntryForCurrentUser,
  toggleFavorite as toggleFavoriteAction,
} from '../model/favoritesSlice'

export const useFavorites = () => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector(selectCurrentUserId)
  const favoriteIds = useAppSelector(selectCurrentUserFavoriteIds)
  const hasFavoritesEntry = useAppSelector(selectHasFavoritesEntryForCurrentUser)

  useEffect(() => {
    if (!currentUserId || hasFavoritesEntry) {
      return
    }

    let isMounted = true

    const hydrateMockFavorites = async () => {
      const skillIds = await loadMockUserFavoriteIds(currentUserId)

      if (isMounted) {
        dispatch(hydrateUserFavorites({ userId: currentUserId, skillIds }))
      }
    }

    hydrateMockFavorites()

    return () => {
      isMounted = false
    }
  }, [currentUserId, dispatch, hasFavoritesEntry])

  const isFavorite = useCallback(
    (skillId: string) => favoriteIds.includes(skillId),
    [favoriteIds],
  )

  const toggleFavorite = useCallback(
    (skillId: string) => {
      if (!currentUserId) {
        return
      }

      dispatch(toggleFavoriteAction({ userId: currentUserId, skillId }))
    },
    [currentUserId, dispatch],
  )

  const removeFavorite = useCallback(
    (skillId: string) => {
      if (!currentUserId) {
        return
      }

      dispatch(removeFavoriteAction({ userId: currentUserId, skillId }))
    },
    [currentUserId, dispatch],
  )

  return {
    favoriteIds,
    isFavorite,
    removeFavorite,
    toggleFavorite,
  }
}
