import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import cls from './IconButton.module.css'

export type IconButtonVariant = 'clear' | 'primary' | 'outline'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  icon: ReactNode
  'aria-label': string
  variant?: IconButtonVariant
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const IconButton: FC<IconButtonProps> = (props) => {
  const {
    icon,
    className = '',
    variant = 'clear',
    type = 'button',
    disabled,
    ...otherProps
  } = props

  const classNames = [
    cls.iconButton, 
    cls[variant], 
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button 
      disabled={disabled} 
      type={type} 
      className={classNames} 
      {...otherProps}
    >
      {icon}
    </button>
  )
}
