import { FC } from 'react'

import { Button } from '@/shared/ui/Button'

import styles from './ErrorState.module.css'

export interface ErrorStateProps {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  onReportError: () => void
  onGoHome: () => void
  className?: string
}

export const ErrorState: FC<ErrorStateProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  onReportError,
  onGoHome,
  className = '',
}) => {
  const rootClassName = [styles.errorState, className].filter(Boolean).join(' ')

  return (
    <section className={rootClassName} aria-labelledby="error-state-title">
      <img src={imageSrc} alt={imageAlt} className={styles.image} />

      <h1 id="error-state-title" className={styles.title}>
        {title}
      </h1>

      <p className={styles.description}>{description}</p>

      <div className={styles.buttons}>
        <Button className={styles.button} variant="outline" onClick={onReportError}>
          Сообщить об ошибке
        </Button>

        <Button className={styles.button} variant="primary" onClick={onGoHome}>
          На главную
        </Button>
      </div>
    </section>
  )
}
