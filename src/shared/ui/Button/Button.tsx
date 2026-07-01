import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import cls from './Button.module.css'

export type ButtonVariant = 'primary' | 'outline'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: ButtonVariant
  children?: ReactNode
  fullWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className = '',
    variant = 'primary',
    fullWidth = false,
    type = 'button',
    disabled,
    ...otherProps
  } = props

  const classNames = [cls.button, cls[variant], fullWidth ? cls.fullWidth : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button disabled={disabled} type={type} className={classNames} {...otherProps}>
      {children}
    </button>
  )
}
