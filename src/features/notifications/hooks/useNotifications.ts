import { useCallback } from 'react'

import { selectCurrentUserId } from '@/features/auth/model/authSlice'
import { useAppDispatch, useAppSelector } from '@/store'

import {
  markAllIncomingSeen,
  markSeen,
  selectIncomingNotifications,
  selectUnreadNotifications,
  selectUnreadNotificationsCount,
} from '../model/notificationsSlice'

export const useNotifications = () => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector(selectCurrentUserId)
  const notifications = useAppSelector(selectIncomingNotifications)
  const unreadNotifications = useAppSelector(selectUnreadNotifications)
  const unreadCount = useAppSelector(selectUnreadNotificationsCount)

  const markAllAsSeen = useCallback(() => {
    if (!currentUserId) {
      return
    }

    dispatch(
      markAllIncomingSeen({
        userId: currentUserId,
        notificationIds: notifications.map((notification) => notification.id),
      }),
    )
  }, [currentUserId, dispatch, notifications])

  const markNotificationAsSeen = useCallback(
    (notificationId: string) => {
      if (!currentUserId) {
        return
      }

      dispatch(markSeen({ userId: currentUserId, notificationId }))
    },
    [currentUserId, dispatch],
  )

  return {
    notifications,
    unreadNotifications,
    unreadCount,
    markAllAsSeen,
    markNotificationAsSeen,
  }
}
