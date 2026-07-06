import { HTMLAttributes, FC, MouseEvent, CSSProperties } from 'react'
import cls from './Chip.module.css'

export type ChipVariant = 'default' | 'counter'

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  className?: string
  variant?: ChipVariant
  disabled?: boolean
  size?: 'sm' | 'md' // sm для карточки, md для интерактивного фильтра
  bgColorFromDb?: string
  textColorFromDb?: string
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Chip: FC<ChipProps> = (props) => {
  const {
    label,
    className = '',
    variant = 'default',
    disabled,
    size = 'sm',
    bgColorFromDb,
    textColorFromDb,
    onDelete,
    ...otherProps
  } = props

  const isCounter = variant === 'counter'
  const hasDelete = Boolean(onDelete) && !isCounter

  const classNames = [
    cls.chip,
    cls[size],
    isCounter ? cls.counter : '',
    hasDelete ? cls.filter : cls.info,
    disabled ? cls.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
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
        <button
          type="button"
          className={cls.deleteBtn}
          onClick={handleDelete}
          disabled={disabled}
          aria-label={`Удалить фильтр ${label}`}
        >
          ✕
        </button>
      )}
    </div>
  )
}
