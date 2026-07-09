import { FC } from 'react'
import cls from './AuthLayout.module.css'

interface AuthProgressProps {
  step?: number
  totalSteps?: number
}

export const AuthProgress: FC<AuthProgressProps> = ({ step, totalSteps }) => {
  if (!step || !totalSteps) return null

  return (
    <div className={cls.progressContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCurrent = index + 1 === step

        const stepClassName = [cls.progressStep, isCurrent ? cls.progressStepActive : '']
          .filter(Boolean)
          .join(' ')

        return <div key={index} className={stepClassName} />
      })}
    </div>
  )
}
