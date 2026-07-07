import { useId, useState } from 'react'

import { IconArrow } from '@/shared/assets/icons'
import { Button } from '@/shared/ui/Button'
import { SkillCard } from '@/widgets/SkillCard'
import type { SkillCardProps } from '@/widgets/SkillCard'

import styles from './SkillSection.module.css'

export interface SkillSectionCard extends SkillCardProps {
  id: string
}

export interface SkillSectionProps {
  title: string
  cards: SkillSectionCard[]
  initialLimit?: number
  className?: string
  onShowAllClick?: () => void
}

const DEFAULT_INITIAL_LIMIT = 3

export const SkillSection = ({
  title,
  cards,
  initialLimit = DEFAULT_INITIAL_LIMIT,
  className = '',
  onShowAllClick,
}: SkillSectionProps) => {
  const titleId = useId()
  const [isExpanded, setIsExpanded] = useState(false)
  const hasHiddenCards = cards.length > initialLimit
  const visibleCards = isExpanded || !hasHiddenCards ? cards : cards.slice(0, initialLimit)
  const sectionClassName = [styles.section, className].filter(Boolean).join(' ')

  const handleShowAllClick = () => {
    if (onShowAllClick) {
      onShowAllClick()
    } else {
      setIsExpanded(true)
    }
  }

  return (
    <section className={sectionClassName} aria-labelledby={titleId}>
      <div className={styles.header}>
        <h2 className={styles.title} id={titleId}>
          {title}
        </h2>

        {(hasHiddenCards || onShowAllClick) && !isExpanded ? (
          <Button className={styles.showAllButton} variant="outline" onClick={handleShowAllClick}>
            Смотреть все
            <span className={styles.showAllIcon} aria-hidden="true">
              <IconArrow />
            </span>
          </Button>
        ) : null}
      </div>

      <div className={styles.grid}>
        {visibleCards.map((card) => {
          const { id, className: cardClassNameProp, ...skillCardProps } = card
          const cardClassName = [styles.card, cardClassNameProp].filter(Boolean).join(' ')

          return <SkillCard key={id} {...skillCardProps} className={cardClassName} />
        })}
      </div>
    </section>
  )
}
