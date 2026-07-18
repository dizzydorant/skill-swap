import { useEffect, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import { selectRegisteredUsers } from '@/features/auth/model/authSlice'
import { useNotifications } from '@/features/notifications/hooks/useNotifications'
import {
  loadNotificationPreviews,
  type NotificationPreview,
} from '@/features/notifications/lib/loadNotificationPreviews'
import { selectProfileOverridesByUserId } from '@/features/profile/model/profileSlice'
import { ROUTES } from '@/shared/lib/constants'
import { Avatar } from '@/shared/ui/Avatar'
import { useAppSelector } from '@/store'

import styles from './NotificationsDropdown.module.css'

const formatNotificationDate = (dateString: string): string => {
  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export interface NotificationsDropdownProps {
  onClose?: () => void
}

export const NotificationsDropdown = ({ onClose }: NotificationsDropdownProps) => {
  const navigate = useNavigate()
  const { notifications, markAllAsSeen, markNotificationAsSeen } = useNotifications()
  const registeredUsers = useAppSelector(selectRegisteredUsers)
  const profileOverridesByUserId = useAppSelector(selectProfileOverridesByUserId)
  const [items, setItems] = useState<NotificationPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    markAllAsSeen()
  }, [markAllAsSeen])

  useEffect(() => {
    let isMounted = true

    const loadItems = async () => {
      setIsLoading(true)

      try {
        const loadedItems = await loadNotificationPreviews(
          notifications,
          registeredUsers,
          profileOverridesByUserId,
        )

        if (isMounted) {
          setItems(loadedItems)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadItems()

    return () => {
      isMounted = false
    }
  }, [notifications, profileOverridesByUserId, registeredUsers])

  const handleItemClick = (item: NotificationPreview) => {
    markNotificationAsSeen(item.id)
    onClose?.()
    navigate(generatePath(ROUTES.SKILL, { id: item.skillId }))
  }

  return (
    <div className={styles.dropdown} role="region" aria-label="Уведомления">
      <div className={styles.header}>
        <h3 className={styles.title}>Уведомления</h3>
        <span className={styles.count}>{notifications.length}</span>
      </div>

      {isLoading ? (
        <p className={styles.stateText}>Загружаем...</p>
      ) : items.length === 0 ? (
        <p className={styles.stateText}>Новых предложений обмена пока нет</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>
              <button
                className={styles.item}
                type="button"
                onClick={() => handleItemClick(item)}
              >
                <Avatar
                  className={styles.avatar}
                  src={item.fromUserAvatar}
                  name={item.fromUserName}
                  size="small"
                />

                <span className={styles.itemContent}>
                  <span className={styles.message}>
                    <strong>{item.fromUserName}</strong> предлагает обмен
                  </span>
                  <span className={styles.skillTitle}>{item.skillTitle}</span>
                  <span className={styles.date}>{formatNotificationDate(item.createdAt)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
