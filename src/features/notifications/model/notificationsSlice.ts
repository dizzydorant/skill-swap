import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { selectAllRequests } from '@/features/exchange-offer/model/exchangeRequestsSlice'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import type { SwapRequest } from '@/shared/types'
import type { RootState } from '@/store'
import { readStorage } from '@/store/storage'

export interface NotificationsState {
  seenIdsByUserId: Record<string, string[]>
}

const EMPTY_NOTIFICATION_IDS: string[] = []
const EMPTY_NOTIFICATIONS: SwapRequest[] = []

interface MarkSeenPayload {
  userId: string
  notificationId: string
}

interface MarkAllIncomingSeenPayload {
  userId: string
  notificationIds: string[]
}

interface ClearSeenPayload {
  userId: string
}

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const normalizeSeenIds = (ids: string[]): string[] => [...new Set(ids)]

const normalizeSeenIdsByUserId = (value: unknown): Record<string, string[]> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  return Object.entries(value as Record<string, unknown>).reduce<Record<string, string[]>>(
    (acc, [userId, ids]) => {
      if (typeof userId === 'string' && userId && isStringArray(ids)) {
        acc[userId] = normalizeSeenIds(ids)
      }

      return acc
    },
    {},
  )
}

const initialState: NotificationsState = {
  seenIdsByUserId: normalizeSeenIdsByUserId(
    readStorage<unknown>(LOCAL_STORAGE_KEYS.SEEN_NOTIFICATIONS, {}),
  ),
}

const ensureUserSeenIds = (state: NotificationsState, userId: string): string[] => {
  state.seenIdsByUserId[userId] = state.seenIdsByUserId[userId] ?? []

  return state.seenIdsByUserId[userId]
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markSeen: (state, action: PayloadAction<MarkSeenPayload>) => {
      const { userId, notificationId } = action.payload

      if (!userId || !notificationId) {
        return
      }

      const seenIds = ensureUserSeenIds(state, userId)

      if (!seenIds.includes(notificationId)) {
        seenIds.push(notificationId)
      }
    },
    markAllIncomingSeen: (state, action: PayloadAction<MarkAllIncomingSeenPayload>) => {
      const { userId, notificationIds } = action.payload

      if (!userId || notificationIds.length === 0) {
        return
      }

      const seenIds = ensureUserSeenIds(state, userId)
      const nextSeenIds = new Set(seenIds)

      notificationIds.forEach((notificationId) => {
        if (notificationId) {
          nextSeenIds.add(notificationId)
        }
      })

      state.seenIdsByUserId[userId] = [...nextSeenIds]
    },
    clearSeen: (state, action: PayloadAction<ClearSeenPayload>) => {
      delete state.seenIdsByUserId[action.payload.userId]
    },
  },
})

export const { clearSeen, markAllIncomingSeen, markSeen } = notificationsSlice.actions

const selectCurrentUserId = (state: RootState): string | null => state.auth.user?.id ?? null

export const selectSeenNotificationIds = createSelector(
  [(state: RootState) => state.notifications.seenIdsByUserId, selectCurrentUserId],
  (seenIdsByUserId, userId): string[] =>
    userId ? (seenIdsByUserId[userId] ?? EMPTY_NOTIFICATION_IDS) : EMPTY_NOTIFICATION_IDS,
)

export const selectIncomingNotifications = createSelector(
  [selectAllRequests, selectCurrentUserId],
  (requests, userId): SwapRequest[] => {
    if (!userId) {
      return EMPTY_NOTIFICATIONS
    }

    return requests
      .filter((request) => request.toUserId === userId && request.status === 'pending')
      .sort(
        (first, second) =>
          new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
      )
  },
)

export const selectUnreadNotifications = createSelector(
  [selectIncomingNotifications, selectSeenNotificationIds],
  (notifications, seenIds): SwapRequest[] => {
    const seenIdsSet = new Set(seenIds)

    return notifications.filter((notification) => !seenIdsSet.has(notification.id))
  },
)

export const selectUnreadNotificationsCount = createSelector(
  [selectUnreadNotifications],
  (notifications): number => notifications.length,
)

export const notificationsReducer = notificationsSlice.reducer
