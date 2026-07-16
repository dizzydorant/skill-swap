import { getRegisteredSkillPageData } from '@/features/auth/model/authUtils'
import { fetchJson } from '@/pages/CatalogPage/catalogData'
import type { SwapRequest } from '@/shared/types'

export interface NotificationPreview {
  id: string
  skillId: string
  fromUserName: string
  fromUserAvatar?: string
  skillTitle: string
  createdAt: string
}

interface SkillDbItem {
  id: string
  title: string
  authorId: string
}

interface UserDbItem {
  id: string
  fullName: string
  avatarUrl: string | null
}

export const loadNotificationPreviews = async (
  requests: SwapRequest[],
): Promise<NotificationPreview[]> => {
  if (requests.length === 0) {
    return []
  }

  const [skills, users] = await Promise.all([
    fetchJson<SkillDbItem[]>('/db/skills.json'),
    fetchJson<UserDbItem[]>('/db/users.json'),
  ])

  const registeredData = getRegisteredSkillPageData()

  const userById = new Map([
    ...users.map((user) => [user.id, user] as const),
    ...registeredData.users.map(
      (user) =>
        [user.id, { id: user.id, fullName: user.fullName, avatarUrl: user.avatarUrl }] as const,
    ),
  ])

  return requests
    .filter((request) => userById.has(request.fromUserId))
    .map((request): NotificationPreview => {
      const senderSkill = skills.find((s) => s.authorId === request.fromUserId)
      const fromUser = userById.get(request.fromUserId)!

      return {
        id: request.id,
        skillId: senderSkill
          ? `${senderSkill.id}?fromNotification=true&requestId=${request.id}`
          : request.skillId,
        fromUserName: fromUser.fullName,
        fromUserAvatar: fromUser.avatarUrl || undefined,
        skillTitle: senderSkill ? senderSkill.title : 'навык обмена',
        createdAt: request.createdAt,
      }
    })
}
