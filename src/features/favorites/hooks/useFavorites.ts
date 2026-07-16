import { useCallback, useEffect, useState } from 'react'

import {
  getFavoriteSkillIds,
  isFavoriteSkill,
  subscribeToFavoritesStorage,
  toggleFavoriteSkill,
} from '../model/favoritesStorage'

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavoriteSkillIds())

  useEffect(() => {
    return subscribeToFavoritesStorage(() => {
      setFavoriteIds(getFavoriteSkillIds())
    })
  }, [])

  const isFavorite = useCallback((skillId: string) => isFavoriteSkill(skillId), [])

  const toggleFavorite = useCallback((skillId: string) => {
    toggleFavoriteSkill(skillId)
    setFavoriteIds(getFavoriteSkillIds())
  }, [])

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
  }
}
