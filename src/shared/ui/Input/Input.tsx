import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'
import cls from './Input.module.css'

export interface InputProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'search'
  name?: string
  id?: string
  error?: boolean
  errorText?: string
  disabled?: boolean
  multiline?: boolean
  rows?: number
  className?: string
  autoFocus?: boolean
  required?: boolean
  maxLength?: number
  isSearch?: boolean
  isForm?: boolean
  onSearch?: () => void
  iconRight?: ReactNode
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      value,
      onChange,
      placeholder = '',
      type = 'text',
      name,
      id,
      error = false,
      errorText = '',
      disabled = false,
      multiline = false,
      rows = 4,
      className = '',
      autoFocus = false,
      required = false,
      maxLength,
      isSearch = false,
      isForm = false,
      onSearch,
      iconRight,
      ...props
    },
    ref,
  ) => {
    const inputClasses = [
      cls.input,
      error ? cls.error : '',
      disabled ? cls.disabled : '',
      isSearch ? cls.search : '',
      isForm ? cls.form : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && isSearch && onSearch) {
        onSearch()
      }
    }

    if (multiline) {
      return (
        <div className={cls.wrapper}>
          <div className={cls.inputWrapper}>
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={inputClasses}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              name={name}
              id={id}
              disabled={disabled}
              rows={rows}
              autoFocus={autoFocus}
              required={required}
              maxLength={maxLength}
              onKeyDown={handleKeyDown}
              style={{ paddingRight: iconRight ? '48px' : undefined, resize: 'none' }}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
            {iconRight && <span className={cls.pencilIconTextarea}>{iconRight}</span>}
          </div>
          {error && errorText && <span className={cls.errorText}>{errorText}</span>}
        </div>
      )
    }

    return (
      <div className={`${cls.wrapper} ${isSearch ? cls.searchWrapper : ''}`}>
        <div className={cls.inputWrapper}>
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={inputClasses}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            id={id}
            disabled={disabled}
            autoFocus={autoFocus}
            required={required}
            maxLength={maxLength}
            onKeyDown={handleKeyDown}
            style={{ paddingRight: iconRight ? '48px' : undefined }}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
          {iconRight && <span className={cls.pencilIconInput}>{iconRight}</span>}
        </div>
        {error && errorText && <span className={cls.errorText}>{errorText}</span>}
      </div>
    )
  },
)

Input.displayName = 'Input'
export default Input
