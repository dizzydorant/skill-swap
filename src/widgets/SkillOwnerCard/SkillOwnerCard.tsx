import { Avatar } from '@/shared/ui/Avatar'
import { Chip } from '@/shared/ui/Chip'

import styles from './SkillOwnerCard.module.css'

export interface SkillOwnerCardProps {
  avatarUrl?: string
  name: string
  city: string
  age: number
  description: string
  teachSkills: string[]
  learnSkills: string[]
  className?: string
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

const renderSkills = (skills: string[], chipBackgroundColor: string) => {
  if (skills.length === 0) {
    return <p className={styles.emptyText}>Пока не указано</p>
  }

  return (
    <div className={styles.chips}>
      {skills.map((skill, index) => (
        <Chip
          key={`${skill}-${index}`}
          className={styles.chip}
          label={skill}
          size="sm"
          bgColorFromDb={chipBackgroundColor}
          textColorFromDb="#253017"
        />
      ))}
    </div>
  )
}

export const SkillOwnerCard = ({
  avatarUrl,
  name,
  city,
  age,
  description,
  teachSkills,
  learnSkills,
  className = '',
}: SkillOwnerCardProps) => {
  const cardClassName = [styles.card, className].filter(Boolean).join(' ')

  return (
    <aside className={cardClassName} aria-label="Автор навыка">
      <div className={styles.header}>
        <Avatar
          className={styles.avatar}
          src={avatarUrl}
          name={name}
          alt={`Аватар ${name}`}
          size="medium"
        />

        <div className={styles.userInfo}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.meta}>
            {city}, {getAgeLabel(age)}
          </p>
        </div>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.skillsBlock}>
        <h3 className={styles.skillsTitle}>Может научить:</h3>
        {renderSkills(teachSkills, '#f4edcf')}
      </div>

      <div className={styles.skillsBlock}>
        <h3 className={styles.skillsTitle}>Хочет научиться:</h3>
        {renderSkills(learnSkills, '#e7f3e5')}
      </div>
    </aside>
  )
}
