import { FC, ReactNode } from 'react'
import { Logo } from '@/shared/ui/Logo'
import { Button } from '@/shared/ui/Button'
import { AuthProgress } from './AuthProgress' // Импортируем наш новый компонент
import cls from './AuthLayout.module.css'

interface AuthLayoutProps {
  title: string
  step?: number
  totalSteps?: number
  onClose: () => void
  leftSlot: ReactNode
  rightSlot: ReactNode
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  title,
  step,
  totalSteps,
  onClose,
  leftSlot,
  rightSlot,
}) => {
  return (
    <div className={cls.layout}>
      {/* ВЕРХНЯЯ ПАНЕЛЬ */}
      <div className={cls.topBar}>
        <div className={cls.logoWrapper}>
          <Logo />
        </div>

        <div className={cls.headerCenter}>
          <h1 className={cls.title}>{title}</h1>
          <AuthProgress step={step} totalSteps={totalSteps} />
        </div>

        <Button
          onClick={onClose}
          variant="outline"
          type="button"
          className={cls.customCloseBtn}
          aria-label="Закрыть страницу"
        >
          <span>Закрыть</span>
          <span className={cls.closeIcon}>✕</span>
        </Button>
      </div>

      <div className={cls.headerMobile}>
        <h1 className={cls.title}>{title}</h1>
        <AuthProgress step={step} totalSteps={totalSteps} />
      </div>

      <main className={cls.mainContainer}>
        <div className={cls.grid}>
          {/* Левая белая карточка (Форма) */}
          <div className={cls.card}>{leftSlot}</div>

          {/* Правая белая карточка (Промо) */}
          <div className={cls.card}>{rightSlot}</div>
        </div>
      </main>

      <div className={cls.spacer} />
    </div>
  )
}
