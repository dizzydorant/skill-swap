import { getAuthUser } from '@/features/auth/model/authUtils'
import { getIncomingSwapRequests } from '@/features/exchange-offer/model/exchangeOfferStorage'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import type { SwapRequest } from '@/shared/types'

const NOTIFICATIONS_STORAGE_EVENT = 'skillswap-notifications-storage'

const canUseLocalStorage = (): boolean =>
  typeof window !== 'undefined' && Boolean(window.localStorage)

const notifyNotificationsChanged = (): void => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(NOTIFICATIONS_STORAGE_EVENT))
  }
}

export const subscribeToNotificationsStorage = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  const handleStorage = (event: StorageEvent) => {
    if (
      !event.key ||
      event.key === LOCAL_STORAGE_KEYS.SEEN_NOTIFICATIONS ||
      event.key === LOCAL_STORAGE_KEYS.REQUESTS
    ) {
      callback()
    }
  }

  window.addEventListener(NOTIFICATIONS_STORAGE_EVENT, callback)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(NOTIFICATIONS_STORAGE_EVENT, callback)
    window.removeEventListener('storage', handleStorage)
  }
}

const readSeenNotificationIds = (): string[] => {
  if (!canUseLocalStorage()) {
    return []
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.SEEN_NOTIFICATIONS)
    const parsed: unknown = raw ? JSON.parse(raw) : []

    return Array.isArray(parsed) && parsed.every((item) => typeof item === 'string') ? parsed : []
  } catch {
    return []
  }
}

const writeSeenNotificationIds = (ids: string[]): void => {
  if (!canUseLocalStorage()) {
    return
  }

  localStorage.setItem(LOCAL_STORAGE_KEYS.SEEN_NOTIFICATIONS, JSON.stringify(ids))
  notifyNotificationsChanged()
}

export const getIncomingNotifications = (): SwapRequest[] => {
  const userId = getAuthUser()?.id

  if (!userId) {
    return []
  }

  return getIncomingSwapRequests(userId).sort(
    (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  )
}

export const getUnreadNotificationsCount = (): number => {
  const seenIds = new Set(readSeenNotificationIds())

  return getIncomingNotifications().filter((request) => !seenIds.has(request.id)).length
}

export const markNotificationsAsSeen = (notificationIds: string[]): void => {
  if (notificationIds.length === 0) {
    return
  }

  const seenIds = new Set(readSeenNotificationIds())
  notificationIds.forEach((id) => seenIds.add(id))
  writeSeenNotificationIds([...seenIds])
}

export const markAllNotificationsAsSeen = (): void => {
  const incomingIds = getIncomingNotifications().map((request) => request.id)
  markNotificationsAsSeen(incomingIds)
}
