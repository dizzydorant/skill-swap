import { useCallback, useEffect, useState } from 'react'

import { subscribeToSwapRequestsStorage } from '@/features/exchange-offer/model/exchangeOfferStorage'
import type { SwapRequest } from '@/shared/types'

import {
  getIncomingNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsAsSeen,
  subscribeToNotificationsStorage,
} from '../model/notificationsStorage'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<SwapRequest[]>(() => getIncomingNotifications())
  const [unreadCount, setUnreadCount] = useState(() => getUnreadNotificationsCount())

  const refresh = useCallback(() => {
    setNotifications(getIncomingNotifications())
    setUnreadCount(getUnreadNotificationsCount())
  }, [])

  useEffect(() => {
    refresh()

    const unsubscribeNotifications = subscribeToNotificationsStorage(refresh)
    const unsubscribeRequests = subscribeToSwapRequestsStorage(refresh)

    return () => {
      unsubscribeNotifications()
      unsubscribeRequests()
    }
  }, [refresh])

  const markAllAsSeen = useCallback(() => {
    markAllNotificationsAsSeen()
    refresh()
  }, [refresh])

  return {
    notifications,
    unreadCount,
    markAllAsSeen,
  }
}
