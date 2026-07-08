import React, { useState, useRef, useEffect } from 'react'
import cls from './Select.module.css'
import { IconArrow } from '@/shared/assets/icons'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  selectedValue?: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: boolean
  errorText?: string
  className?: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  selectedValue,
  onChange,
  placeholder = 'Не указано',
  label,
  disabled = false,
  error = false,
  errorText,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === selectedValue)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev)
    }
  }

  const handleOptionClick = (value: string) => {
    onChange(value)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent, value?: string) => {
    if (disabled) return

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (value !== undefined) {
        handleOptionClick(value)
      } else {
        handleToggle()
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const containerClasses = [
    cls.container,
    disabled ? cls.disabled : '',
    error ? cls.errorContainer : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses} ref={selectRef}>
      {label && <span className={cls.label}>{label}</span>}

      <div
        className={`${cls.selectTrigger} ${isOpen ? cls.open : ''}`}
        onClick={handleToggle}
        onKeyDown={(e) => handleKeyDown(e)}
        tabIndex={disabled ? -1 : 0}
      >
        <span className={!selectedOption ? cls.placeholder : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`${cls.arrow} ${isOpen ? cls.arrowOpen : ''}`}>
          <IconArrow />
        </span>
      </div>

      {isOpen && (
        <ul className={cls.optionsList}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${cls.optionItem} ${option.value === selectedValue ? cls.selected : ''}`}
              onClick={() => handleOptionClick(option.value)}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
              tabIndex={0}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {error && errorText && <span className={cls.errorText}>{errorText}</span>}
    </div>
  )
}
