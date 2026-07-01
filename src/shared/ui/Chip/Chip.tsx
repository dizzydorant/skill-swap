import { HTMLAttributes, FC, MouseEvent, useId } from 'react'
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

  // Генерируем уникальный ID для каждого чипа, чтобы точечно покрасить его через тег <style>
  const uniqueId = useId().replace(/:/g, '')
  const chipId = `chip-${uniqueId}`

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

  // Динамические цвета применяются только если они пришли из БД
  const hasCustomColors = Boolean(bgColorFromDb || textColorFromDb)

  return (
    <div id={chipId} className={classNames} {...otherProps}>
      {hasCustomColors && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
          #${chipId} {
            ${bgColorFromDb ? `background-color: ${bgColorFromDb} !important;` : ''}
            ${textColorFromDb ? `color: ${textColorFromDb} !important;` : ''}
          }
        `,
          }}
        />
      )}

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
