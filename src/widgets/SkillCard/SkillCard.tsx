// src/widgets/SkillCard/SkillCard.tsx
import type { KeyboardEvent, MouseEvent } from 'react'

import { IconLike, IconLikeFilled } from '@/shared/assets/icons'
import clockIcon from '@/shared/assets/icons/clock.svg'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { IconButton } from '@/shared/ui/IconButton'
import { ChipList } from '@/shared/ui/ChipList' // Импортируем готовый ChipList вместо ручного рендера
import type { ChipItem } from '@/shared/ui/ChipList' // Импортируем тип объекта навыка

import cls from './SkillCard.module.css'

export interface SkillCardUser {
  name: string
  city: string
  age: number
  avatar?: string
}

export interface SkillCardProps {
  user: SkillCardUser
  /* 
    ОБНОВЛЯЕМ ТИПЫ ТУТ:
    Вместо string[] указываем ChipItem[], чтобы карточка умела 
    нативно принимать объекты с цветами из нашей новой структуры моков!
  */
  teachSkills: ChipItem[]
  learnSkills: ChipItem[]
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
  actionText,
  className = '',
  onCardClick,
  onLikeClick,
  onActionClick,
}: SkillCardProps) => {
  const resolvedActionText = actionText ?? (isExchangeOffered ? 'Обмен предложен' : 'Подробнее')

  // Везде используем лаконичное имя cls:
  const cardClassName = [cls.card, onCardClick ? cls.clickable : '', className]
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

  return (
    <article
      className={cardClassName}
      role={onCardClick ? 'button' : undefined}
      tabIndex={onCardClick ? 0 : undefined}
      onClick={onCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <div className={cls.top}>
        <Avatar
          className={cls.avatar}
          src={user.avatar}
          name={user.name}
          alt={`Аватар ${user.name}`}
          size="medium"
        />

        <div className={cls.userInfo}>
          <h3 className={cls.name}>{user.name}</h3>
          <p className={cls.meta}>
            {user.city}, {getAgeLabel(user.age)}
          </p>
        </div>

        <div className={cls.likeGroup}>
          <IconButton
            className={`${cls.likeButton} ${isLiked ? cls.liked : ''}`}
            icon={isLiked ? <IconLikeFilled /> : <IconLike />}
            aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
            onClick={handleLikeClick}
          />
          <span className={cls.likesCount}>{likesCount}</span>
        </div>
      </div>

      <div className={cls.skillsBlock}>
        <h4 className={cls.skillsTitle}>Может научить:</h4>
        <ChipList items={teachSkills} size="sm" />
      </div>

      <div className={cls.skillsBlock}>
        <h4 className={cls.skillsTitle}>Хочет научиться:</h4>
        <ChipList
          items={learnSkills}
          size="sm"
          counterBgColor="#edf1fb"
          counterTextColor="#253017"
        />
      </div>

      <Button
        className={`${cls.actionButton} ${isExchangeOffered ? cls.offeredButton : ''}`}
        variant={isExchangeOffered ? 'outline' : 'primary'}
        fullWidth
        onClick={handleActionClick}
      >
        {isExchangeOffered && <img className={cls.clockIcon} src={clockIcon} alt="" />}
        {resolvedActionText}
      </Button>
    </article>
  )
}
