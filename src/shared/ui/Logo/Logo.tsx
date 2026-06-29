import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Logo.module.css'

interface LogoProps {
  /** Дополнительный класс для внешних отступов в Header/Footer */
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
  const combinedClassName = className ? `${styles.logoLink} ${className}` : styles.logoLink

  return (
    <Link to="/" className={combinedClassName}>
      <svg className={styles.icon} viewBox="0 0 40 40" fill="none" xmlns="http://w3.org">
        <circle cx="20" cy="20" r="20" fill="#ABD27A" />

        <path
          className={styles.star}
          d="M20 7.5C20 14.375 14.375 20 7.5 20C14.375 20 20 25.625 20 32.5C20 25.625 25.625 20 32.5 20C25.625 20 20 14.375 20 7.5Z"
          fill="#FFFFFF"
        />
      </svg>

      <span className={styles.text}>SkillSwap</span>
    </Link>
  )
}
