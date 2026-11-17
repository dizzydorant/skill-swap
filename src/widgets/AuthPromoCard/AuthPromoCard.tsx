import React from 'react'
import styles from './AuthPromoCard.module.css'

interface AuthPromoCardProps {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  className?: string
}

export const AuthPromoCard: React.FC<AuthPromoCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`${styles.promoContainer} ${className}`}>
      <img src={imageSrc} alt={imageAlt} className={styles.illustration} />

      <div className={styles.textBlock}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
