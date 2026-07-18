import { useEffect, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import { selectRegisteredUsers } from '@/features/auth/model/authSlice'
import { useFavorites } from '@/features/favorites/hooks/useFavorites'
import { loadFavoriteCards, type FavoriteCardPreview } from '@/features/favorites/lib/loadFavoriteCards'
import { selectProfileOverridesByUserId } from '@/features/profile/model/profileSlice'
import { IconLikeFilled } from '@/shared/assets/icons'
import { ROUTES } from '@/shared/lib/constants'
import { Avatar } from '@/shared/ui/Avatar'
import { IconButton } from '@/shared/ui/IconButton'
import { useAppSelector } from '@/store'

import styles from './FavoritesDropdown.module.css'

export interface FavoritesDropdownProps {
  onClose?: () => void
}

export const FavoritesDropdown = ({ onClose }: FavoritesDropdownProps) => {
  const navigate = useNavigate()
  const { favoriteIds, removeFavorite } = useFavorites()
  const registeredUsers = useAppSelector(selectRegisteredUsers)
  const profileOverridesByUserId = useAppSelector(selectProfileOverridesByUserId)
  const [cards, setCards] = useState<FavoriteCardPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadCards = async () => {
      setIsLoading(true)

      try {
        const loadedCards = await loadFavoriteCards(
          favoriteIds,
          registeredUsers,
          profileOverridesByUserId,
        )

        if (isMounted) {
          setCards(loadedCards)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCards()

    return () => {
      isMounted = false
    }
  }, [favoriteIds, profileOverridesByUserId, registeredUsers])

  const handleCardClick = (skillId: string) => {
    onClose?.()
    navigate(generatePath(ROUTES.SKILL, { id: skillId }))
  }

  const handleRemoveClick = (event: React.MouseEvent, skillId: string) => {
    event.stopPropagation()
    removeFavorite(skillId)
  }

  return (
    <div className={styles.dropdown} role="region" aria-label="Избранное">
      <div className={styles.header}>
        <h3 className={styles.title}>Избранное</h3>
        <span className={styles.count}>{favoriteIds.length}</span>
      </div>

      {isLoading ? (
        <p className={styles.stateText}>Загружаем...</p>
      ) : cards.length === 0 ? (
        <p className={styles.stateText}>Пока нет избранных навыков</p>
      ) : (
        <ul className={styles.list}>
          {cards.map((card) => (
            <li key={card.id}>
              <button
                className={styles.item}
                type="button"
                onClick={() => handleCardClick(card.id)}
              >
                <Avatar
                  className={styles.avatar}
                  src={card.userAvatar}
                  name={card.userName}
                  size="small"
                />

                <span className={styles.itemContent}>
                  <span className={styles.userName}>{card.userName}</span>
                  <span className={styles.skillLabel}>{card.teachLabel}</span>
                </span>

                <IconButton
                  className={styles.removeButton}
                  icon={<IconLikeFilled />}
                  aria-label="Убрать из избранного"
                  onClick={(event) => handleRemoveClick(event, card.id)}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
