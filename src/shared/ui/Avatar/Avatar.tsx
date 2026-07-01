import { FC, useState } from 'react'
import galleryEditIcon from '@/shared/assets/icons/gallery-edit.svg'
import userIcon from '@/shared/assets/icons/user.svg'
import styles from './Avatar.module.css'

export type AvatarSize = 'small' | 'medium' | 'large'

export interface AvatarProps {
  className?: string
  src?: string | null
  alt?: string
  name?: string
  size?: AvatarSize
  editable?: boolean
  onEditClick?: () => void
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return ''
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export const Avatar: FC<AvatarProps> = ({
  className = '',
  src,
  alt,
  name,
  size = 'medium',
  editable = false,
  onEditClick,
}) => {
  const [hasImageError, setHasImageError] = useState(false)

  const initials = name ? getInitials(name) : ''
  const hasImage = Boolean(src) && !hasImageError
  const imageAlt = alt ?? (name ? `Аватар ${name}` : 'Аватар пользователя')

  const wrapperClassName = [
    styles.wrapper,
    styles[size],
    editable ? styles.editable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClassName}>
      {hasImage ? (
        <img
          src={src ?? undefined}
          alt={imageAlt}
          className={styles.image}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className={styles.placeholder} aria-hidden={!initials}>
          {initials ? (
            <span className={styles.initials}>{initials}</span>
          ) : (
            <img src={userIcon} alt="" className={styles.placeholderIcon} />
          )}
        </div>
      )}

      {editable && (
        <button
          type="button"
          className={styles.editButton}
          aria-label="Изменить фото профиля"
          onClick={onEditClick}
        >
          <img src={galleryEditIcon} alt="" className={styles.editIcon} />
        </button>
      )}
    </div>
  )
}
