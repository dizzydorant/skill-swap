import { HTMLAttributes, FC, MouseEvent, CSSProperties } from 'react'
import cls from './Chip.module.css'

export type ChipVariant = 'default' | 'counter'

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  className?: string
  variant?: ChipVariant
  disabled?: boolean
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
    bgColorFromDb,
    textColorFromDb,
    onDelete,
    ...otherProps
  } = props

  const isCounter = variant === 'counter'
  const hasDelete = Boolean(onDelete) && !isCounter

  const classNames = [
    cls.chip,
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

  // Безопасное и быстрое применение динамических цветов из БД
  const inlineStyles: CSSProperties = {
    ...otherProps.style, // Сохраняем внешние стили, если их передадут в компонент
    ...(bgColorFromDb && { backgroundColor: bgColorFromDb }),
    ...(textColorFromDb && { color: textColorFromDb }),
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
