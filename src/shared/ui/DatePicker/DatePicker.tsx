import { forwardRef, useId, useState } from 'react'
import ReactDatePicker, { registerLocale, type ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { getMonth, getYear } from 'date-fns'
import { ru } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.calendar.css'

import { IconArrow, IconCalendar } from '@/shared/assets/icons'

import styles from './DatePicker.module.css'

registerLocale('ru', ru)

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const WEEK_DAYS: Record<string, string> = {
  понедельник: 'Пн',
  вторник: 'Вт',
  среда: 'Ср',
  четверг: 'Чт',
  пятница: 'Пт',
  суббота: 'Сб',
  воскресенье: 'Вс',
}

const YEARS = Array.from({ length: 201 }, (_, index) => 1900 + index)

type CustomInputProps = {
  id: string
  value?: string
  onClick?: () => void
  hasError: boolean
  placeholder: string
  isOpen: boolean
  disabled?: boolean
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ id, value, onClick, hasError, placeholder, isOpen, disabled }, ref) => {
    const buttonClassName = [
      styles.inputButton,
      hasError ? styles.inputButtonError : '',
      disabled ? styles.inputButtonDisabled : '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        className={buttonClassName}
        onClick={onClick}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {!value ? (
          isOpen ? (
            <span className={styles.activePlaceholder} aria-hidden="true" />
          ) : (
            <span className={`${styles.inputValue} ${styles.inputPlaceholder}`}>{placeholder}</span>
          )
        ) : (
          <span className={styles.inputValue}>{value}</span>
        )}

        <span className={styles.icon} aria-hidden="true">
          <IconCalendar />
        </span>
      </button>
    )
  },
)

CustomInput.displayName = 'CustomInput'

export interface DatePickerProps {
  label?: string
  placeholder?: string
  value: Date | null
  onChange: (date: Date | null) => void
  disabled?: boolean
  error?: boolean
  errorText?: string
  className?: string
  minDate?: Date
  maxDate?: Date
}

export const DatePicker = ({
  label,
  placeholder = 'дд.мм.гггг',
  value,
  onChange,
  disabled = false,
  error = false,
  errorText = '',
  className = '',
  minDate,
  maxDate,
}: DatePickerProps) => {
  const generatedId = useId()
  const fieldId = `date-picker-${generatedId}`
  const [isOpen, setIsOpen] = useState(false)

  const wrapperClassName = [styles.wrapper, className].filter(Boolean).join(' ')

  return (
    <div className={wrapperClassName}>
      {label ? (
        <label className={styles.label} htmlFor={fieldId}>
          {label}
        </label>
      ) : null}

      <ReactDatePicker
        id={fieldId}
        locale="ru"
        selected={value}
        onChange={(date: Date | null) => onChange(date)}
        dateFormat="dd.MM.yyyy"
        placeholderText={placeholder}
        showPopperArrow={false}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        shouldCloseOnSelect
        open={isOpen}
        onInputClick={() => {
          if (!disabled) {
            setIsOpen(true)
          }
        }}
        onCalendarOpen={() => setIsOpen(true)}
        onCalendarClose={() => setIsOpen(false)}
        onClickOutside={() => setIsOpen(false)}
        customInput={
          <CustomInput
            id={fieldId}
            hasError={error}
            placeholder={placeholder}
            isOpen={isOpen}
            disabled={disabled}
          />
        }
        calendarClassName="datePickerCalendar"
        popperClassName="datePickerPopper"
        wrapperClassName={styles.datePicker}
        dayClassName={(date: Date) =>
          getMonth(date) !== getMonth(value || new Date()) ? 'datePickerOutsideDay' : ''
        }
        formatWeekDay={(dayName: string) => WEEK_DAYS[dayName] || dayName.slice(0, 2)}
        renderCustomHeader={({ date, changeYear, changeMonth }: ReactDatePickerCustomHeaderProps) => (
          <div className={styles.header}>
            <div className={styles.selectGroup}>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.select}
                  value={MONTHS[getMonth(date)]}
                  onChange={({ target: { value: monthValue } }) =>
                    changeMonth(MONTHS.indexOf(monthValue))
                  }
                  aria-label="Месяц"
                >
                  {MONTHS.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <IconArrow className={styles.selectIcon} />
              </div>

              <div className={styles.selectWrapper}>
                <select
                  className={styles.select}
                  value={getYear(date)}
                  onChange={({ target: { value: yearValue } }) => changeYear(Number(yearValue))}
                  aria-label="Год"
                >
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <IconArrow className={styles.selectIcon} />
              </div>
            </div>
          </div>
        )}
      />

      {error && errorText ? <span className={styles.errorText}>{errorText}</span> : null}
    </div>
  )
}
