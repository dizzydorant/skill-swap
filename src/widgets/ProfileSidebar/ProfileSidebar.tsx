import type { ReactNode } from 'react'

import { IconLike } from '@/shared/assets/icons'
import ideaIcon from '@/shared/assets/icons/idea.svg'
import messageTextIcon from '@/shared/assets/icons/message-text.svg'
import requestIcon from '@/shared/assets/icons/request.svg'
import userIcon from '@/shared/assets/icons/user.svg'

import styles from './ProfileSidebar.module.css'

interface ProfileSidebarItem {
  id: string
  label: string
  icon: ReactNode
}

const profileSidebarItems: ProfileSidebarItem[] = [
  {
    id: 'requests',
    label: 'Заявки',
    icon: <img src={requestIcon} alt="" aria-hidden="true" />,
  },
  {
    id: 'exchanges',
    label: 'Мои обмены',
    icon: <img src={messageTextIcon} alt="" aria-hidden="true" />,
  },
  {
    id: 'favorites',
    label: 'Избранное',
    icon: <IconLike />,
  },
  {
    id: 'skills',
    label: 'Мои навыки',
    icon: <img src={ideaIcon} alt="" aria-hidden="true" />,
  },
  {
    id: 'personal-data',
    label: 'Личные данные',
    icon: <img src={userIcon} alt="" aria-hidden="true" />,
  },
]

export interface ProfileSidebarProps {
  activeItemId?: string
  onItemClick?: (itemId: string) => void
  className?: string
}

export const ProfileSidebar = ({
  activeItemId,
  onItemClick,
  className = '',
}: ProfileSidebarProps) => {
  const sidebarClassName = [styles.sidebar, className].filter(Boolean).join(' ')

  return (
    <aside className={sidebarClassName} aria-label="Меню профиля">
      <nav>
        <ul className={styles.menuList}>
          {profileSidebarItems.map((item) => {
            const isActive = activeItemId === item.id
            const itemClassName = [
              styles.menuButton,
              isActive ? styles.menuButtonActive : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <li key={item.id}>
                <button
                  className={itemClassName}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => onItemClick?.(item.id)}
                >
                  <span className={styles.icon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
