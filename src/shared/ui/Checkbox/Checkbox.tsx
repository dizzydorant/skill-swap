import { FC, InputHTMLAttributes } from 'react'
import cls from './Checkbox.module.css'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  indeterminate?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  indeterminate = false,
  className = '',
  checked,
  ...props
}) => {
  return (
    <label className={cls.labelContainer}>
      <input type="checkbox" className={cls.hiddenInput} checked={checked} {...props} />
      <span
        className={[cls.customCheckbox, indeterminate ? cls.indeterminate : '', className]
          .filter(Boolean)
          .join(' ')}
      />
      {label && <span className={cls.labelText}>{label}</span>}
    </label>
  )
}
