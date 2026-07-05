import type { KeyboardEvent, MouseEvent } from 'react'

import { IconLike, IconLikeFilled } from '@/shared/assets/icons'
import clockIcon from '@/shared/assets/icons/clock.svg'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Chip } from '@/shared/ui/Chip'
import { IconButton } from '@/shared/ui/IconButton'

import styles from './SkillCard.module.css'

export interface SkillCardUser {
  name: string
  city: string
  age: number
  avatar?: string
}

export interface SkillCardProps {
  user: SkillCardUser
  teachSkills: string[]
  learnSkills: string[]
  likesCount?: number
  isLiked?: boolean
  isExchangeOffered?: boolean
  maxVisibleSkills?: number
  actionText?: string
  className?: string
  onCardClick?: () => void
  onLikeClick?: () => void
  onActionClick?: () => void
}

const getVisibleSkills = (skills: string[], maxVisible: number) => {
  const visible = skills.slice(0, maxVisible)
  const hiddenCount = Math.max(skills.length - maxVisible, 0)

  return {
    visible,
    hiddenCount,
  }
}

const getAgeLabel = (age: number) => {
  const lastDigit = age % 10
  const lastTwoDigits = age % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${age} лет`
  }

  if (lastDigit === 1) {
    return `${age} год`
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${age} года`
  }

  return `${age} лет`
}

export const SkillCard = ({
  user,
  teachSkills,
  learnSkills,
  likesCount = 0,
  isLiked = false,
  isExchangeOffered = false,
  maxVisibleSkills = 2,
  actionText,
  className = '',
  onCardClick,
  onLikeClick,
  onActionClick,
}: SkillCardProps) => {
  const teachSkillsInfo = getVisibleSkills(teachSkills, maxVisibleSkills)
  const learnSkillsInfo = getVisibleSkills(learnSkills, maxVisibleSkills)
  const resolvedActionText = actionText ?? (isExchangeOffered ? 'Обмен предложен' : 'Подробнее')
  const cardClassName = [styles.card, onCardClick ? styles.clickable : '', className]
    .filter(Boolean)
    .join(' ')

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!onCardClick || event.target !== event.currentTarget) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onCardClick()
    }
  }

  const handleLikeClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onLikeClick?.()
  }

  const handleActionClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onActionClick?.()
  }

  const renderSkills = (
    skillsInfo: ReturnType<typeof getVisibleSkills>,
    colorClassName: string,
  ) => (
    <div className={styles.chips}>
      {skillsInfo.visible.map((skill, index) => (
        <Chip key={`${skill}-${index}`} className={colorClassName} label={skill} size="sm" />
      ))}

      {skillsInfo.hiddenCount > 0 && (
        <Chip
          className={styles.counterChip}
          label={`+${skillsInfo.hiddenCount}`}
          size="sm"
          variant="counter"
        />
      )}
    </div>
  )

  return (
    <article
      className={cardClassName}
      role={onCardClick ? 'button' : undefined}
      tabIndex={onCardClick ? 0 : undefined}
      onClick={onCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <div className={styles.top}>
        <Avatar
          className={styles.avatar}
          src={user.avatar}
          name={user.name}
          alt={`Аватар ${user.name}`}
          size="medium"
        />

        <div className={styles.userInfo}>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.meta}>
            {user.city}, {getAgeLabel(user.age)}
          </p>
        </div>

        <div className={styles.likeGroup}>
          <IconButton
            className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
            icon={isLiked ? <IconLikeFilled /> : <IconLike />}
            aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
            onClick={handleLikeClick}
          />
          <span className={styles.likesCount}>{likesCount}</span>
        </div>
      </div>

      <div className={styles.skillsBlock}>
        <h4 className={styles.skillsTitle}>Может научить:</h4>
        {renderSkills(teachSkillsInfo, styles.teachChip)}
      </div>

      <div className={styles.skillsBlock}>
        <h4 className={styles.skillsTitle}>Хочет научиться:</h4>
        {renderSkills(learnSkillsInfo, styles.learnChip)}
      </div>

      <Button
        className={`${styles.actionButton} ${isExchangeOffered ? styles.offeredButton : ''}`}
        variant={isExchangeOffered ? 'outline' : 'primary'}
        fullWidth
        onClick={handleActionClick}
      >
        {isExchangeOffered && <img className={styles.clockIcon} src={clockIcon} alt="" />}
        {resolvedActionText}
      </Button>
    </article>
  )
}
