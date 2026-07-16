import { getAuthUser } from '@/features/auth/model/authUtils'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

const FAVORITES_STORAGE_EVENT = 'skillswap-favorites-storage'

type FavoritesByUser = Record<string, string[]>

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const isFavoritesByUser = (value: unknown): value is FavoritesByUser => {
  if (!value || typeof value !== 'object') {
    return false
  }

  return Object.values(value).every(isStringArray)
}

const canUseLocalStorage = (): boolean =>
  typeof window !== 'undefined' && Boolean(window.localStorage)

const notifyFavoritesChanged = (): void => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(FAVORITES_STORAGE_EVENT))
  }
}

export const subscribeToFavoritesStorage = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === LOCAL_STORAGE_KEYS.FAVORITES) {
      callback()
    }
  }

  window.addEventListener(FAVORITES_STORAGE_EVENT, callback)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(FAVORITES_STORAGE_EVENT, callback)
    window.removeEventListener('storage', handleStorage)
  }
}

const readFavoritesByUser = (): FavoritesByUser => {
  if (!canUseLocalStorage()) {
    return {}
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITES)
    const parsed: unknown = raw ? JSON.parse(raw) : {}

    return isFavoritesByUser(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

const writeFavoritesByUser = (favoritesByUser: FavoritesByUser): void => {
  if (!canUseLocalStorage()) {
    return
  }

  localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITES, JSON.stringify(favoritesByUser))
  notifyFavoritesChanged()
}

const getCurrentUserFavorites = (): string[] => {
  const userId = getAuthUser()?.id

  if (!userId) {
    return []
  }

  return readFavoritesByUser()[userId] ?? []
}

export const getFavoriteSkillIds = (): string[] => getCurrentUserFavorites()

export const isFavoriteSkill = (skillId: string): boolean =>
  getCurrentUserFavorites().includes(skillId)

export const toggleFavoriteSkill = (skillId: string): boolean => {
  const userId = getAuthUser()?.id

  if (!userId) {
    return false
  }

  const favoritesByUser = readFavoritesByUser()
  const currentFavorites = favoritesByUser[userId] ?? []
  const isCurrentlyFavorite = currentFavorites.includes(skillId)
  const nextFavorites = isCurrentlyFavorite
    ? currentFavorites.filter((id) => id !== skillId)
    : [...currentFavorites, skillId]

  writeFavoritesByUser({
    ...favoritesByUser,
    [userId]: nextFavorites,
  })

  return !isCurrentlyFavorite
}

export const removeFavoriteSkill = (skillId: string): void => {
  const userId = getAuthUser()?.id

  if (!userId) {
    return
  }

  const favoritesByUser = readFavoritesByUser()
  const currentFavorites = favoritesByUser[userId] ?? []

  writeFavoritesByUser({
    ...favoritesByUser,
    [userId]: currentFavorites.filter((id) => id !== skillId),
  })
}
