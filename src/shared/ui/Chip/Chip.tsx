import { HTMLAttributes, FC, MouseEvent, CSSProperties } from 'react'
import cls from './Chip.module.css'

export type ChipVariant = 'default' | 'counter'

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  className?: string
  variant?: ChipVariant
  disabled?: boolean
  size?: 'sm' | 'md' // Добавлен пропс для размеров с макета (sm для карточки, md для интерактивного фильтра)
  bgColorFromDb?: string
  textColorFromDb?: string
  onDelete?: (e: MouseEvent<HTMLSpanElement>) => void
}

export const Chip: FC<ChipProps> = (props) => {
  const {
    label,
    className = '',
    variant = 'default',
    disabled,
    size = 'sm', // По умолчанию маленький для карточки
    bgColorFromDb,
    textColorFromDb,
    onDelete,
    ...otherProps
  } = props

  const isCounter = variant === 'counter'
  const hasDelete = Boolean(onDelete) && !isCounter

  const classNames = [
    cls.chip,
    cls[size], // Применяет класс sm или md
    isCounter ? cls.counter : '',
    hasDelete ? cls.filter : cls.info,
    disabled ? cls.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleDelete = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    if (!disabled && onDelete) {
      onDelete(e)
    }
  }

  const inlineStyles: CSSProperties = {
    ...otherProps.style,
    backgroundColor: bgColorFromDb ? bgColorFromDb : undefined,
    color: textColorFromDb ? textColorFromDb : undefined,
  }

  return (
    <div className={classNames} style={inlineStyles} {...otherProps}>
      <span className={cls.label}>{label}</span>

      {hasDelete && (
        <span
          className={cls.deleteBtn}
          onClick={handleDelete}
          role="button"
          tabIndex={0}
          aria-label="Удалить фильтр"
        >
          ✕
        </span>
      )}
    </div>
  )
}
