import {
  getRegisteredSkillPageData,
  type RegisteredUser,
} from '@/features/auth/model/authUtils'
import type { ProfileOverridesByUserId } from '@/features/profile/model/types'
import { fetchJson } from '@/pages/CatalogPage/catalogData'

export interface FavoriteCardPreview {
  id: string
  title: string
  userName: string
  userAvatar?: string
  teachLabel: string
}

interface SkillDbItem {
  id: string
  title: string
  authorId: string
  tags?: string[]
}

interface UserDbItem {
  id: string
  fullName: string
  avatarUrl: string | null
}

export const loadFavoriteCards = async (
  skillIds: string[],
  registeredUsers: RegisteredUser[],
  profileOverridesByUserId: ProfileOverridesByUserId,
): Promise<FavoriteCardPreview[]> => {
  if (skillIds.length === 0) {
    return []
  }

  const [skills, users] = await Promise.all([
    fetchJson<SkillDbItem[]>('/db/skills.json'),
    fetchJson<UserDbItem[]>('/db/users.json'),
  ])

  const registeredData = getRegisteredSkillPageData(registeredUsers, profileOverridesByUserId)
  const allSkills = [...skills, ...registeredData.skills]
  const allUsers = [
    ...users.map((user) => {
      const profileOverride = profileOverridesByUserId[user.id]

      return profileOverride
        ? {
            ...user,
            fullName: profileOverride.fullName,
            avatarUrl: profileOverride.avatarUrl,
          }
        : user
    }),
    ...registeredData.users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
    })),
  ]

  const skillById = new Map(allSkills.map((skill) => [skill.id, skill]))
  const userById = new Map(allUsers.map((user) => [user.id, user]))

  return skillIds
    .map((skillId): FavoriteCardPreview | null => {
      const skill = skillById.get(skillId)
      const author = skill ? userById.get(skill.authorId) : undefined

      if (!skill || !author) {
        return null
      }

      return {
        id: skill.id,
        title: skill.title,
        userName: author.fullName,
        userAvatar: author.avatarUrl || undefined,
        teachLabel: skill.tags?.[0] ?? skill.title,
      }
    })
    .filter((card): card is FavoriteCardPreview => card !== null)
}
