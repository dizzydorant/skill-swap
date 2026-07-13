import React, { useState } from 'react'
import { IconArrow } from '@/shared/assets/icons'
import styles from './SkillImageGallery.module.css'

export interface SkillImageGalleryProps {
  images: string[]
  initialIndex?: number
  maxVisibleThumbnails?: number
  className?: string
}

export const SkillImageGallery: React.FC<SkillImageGalleryProps> = ({
  images,
  initialIndex = 0,
  maxVisibleThumbnails = 3,
  className = '',
}) => {
  const safeInitialIndex =
    images && images.length > 0 ? Math.max(0, Math.min(initialIndex, images.length - 1)) : 0

  const [activeIndex, setActiveIndex] = useState<number>(safeInitialIndex)

  // Fallback, если массив пустой
  if (!images || images.length === 0) {
    return (
      <div className={`${styles.fallbackContainer} ${className}`.trim()}>
        <span>Изображения отсутствуют</span>
      </div>
    )
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const visibleThumbnails = images.slice(0, maxVisibleThumbnails)
  const hiddenCount = images.length - maxVisibleThumbnails

  return (
    <div className={`${styles.container} ${className}`.trim()}>
      {/* Главное изображение (слева) */}
      <div className={styles.mainImageWrapper}>
        <img
          src={images[activeIndex]}
          alt={`Главное изображение ${activeIndex + 1}`}
          className={styles.mainImage}
          draggable={false}
          fetchPriority="high"
        />

        {/* Навигационные стрелки */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className={`${styles.arrowButton} ${styles.prevButton}`}
              aria-label="Предыдущий слайд"
            >
              <IconArrow className={styles.prevIcon} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={`${styles.arrowButton} ${styles.nextButton}`}
              aria-label="Следующий слайд"
            >
              <IconArrow className={styles.nextIcon} />
            </button>
          </>
        )}
      </div>

      {/* Список миниатюр в колонку (справа) */}
      {images.length > 1 && (
        <div className={styles.thumbnailsColumn}>
          {visibleThumbnails.map((img, idx) => {
            const isLastVisible = idx === maxVisibleThumbnails - 1
            const showCounter = isLastVisible && hiddenCount > 0
            const isActive =
              idx === activeIndex || (showCounter && activeIndex >= maxVisibleThumbnails - 1)

            const buttonClasses =
              `${styles.thumbnailButton} ${isActive ? styles.thumbnailActive : ''}`.trim()

            return (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={buttonClasses}
                aria-label={
                  showCounter ? 'Показать скрытые изображения' : `Открыть изображение ${idx + 1}`
                }
                aria-current={isActive ? 'true' : undefined}
              >
                <img
                  src={img}
                  alt={`Миниатюра ${idx + 1}`}
                  className={styles.thumbnailImage}
                  draggable={false}
                  loading="lazy"
                />

                {/* Счётчик скрытых изображений вида +N */}
                {showCounter && <div className={styles.counterOverlay}>+{hiddenCount}</div>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
