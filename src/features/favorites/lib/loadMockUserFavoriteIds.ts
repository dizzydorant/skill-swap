interface MockUserFavorites {
  id: string
  favoriteSkillIds?: string[]
}

let mockUserFavoritesPromise: Promise<MockUserFavorites[]> | null = null

import { DATA_BASE } from '../../../shared/lib/dataPaths'

export const loadMockUserFavoriteIds = async (userId: string): Promise<string[]> => {
  mockUserFavoritesPromise ??= fetch(`${DATA_BASE}users.json`).then(async (response) => {
    if (!response.ok) {
      return []
    }

    return (await response.json()) as MockUserFavorites[]
  })

  const users = await mockUserFavoritesPromise
  const user = users.find((item) => item.id === userId)

  return user?.favoriteSkillIds?.filter((skillId) => typeof skillId === 'string') ?? []
}
