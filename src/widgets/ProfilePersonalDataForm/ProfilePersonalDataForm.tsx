import React, { useState, useRef, useMemo } from 'react'
import { mockUsersList, UserMockData } from './MockData'

import { Input } from '@/shared/ui/Input'
import { Avatar } from '@/shared/ui/Avatar'
import { DatePicker } from '@/shared/ui/DatePicker'
import { Select } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'

import cls from './ProfilePersonalDataForm.module.css'

export const ProfilePersonalDataForm: React.FC = () => {
  const [user, setUser] = useState<UserMockData>(mockUsersList)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Вычисляем "грязное" состояние формы глубоким сравнением объектов
  const isDirty = useMemo(() => {
    return JSON.stringify(user) !== JSON.stringify(mockUsersList)
  }, [user])

  // Валидация обязательных полей на заполненность
  const isFormValid = useMemo(() => {
    const hasEmail = Boolean(user.email && user.email.trim())
    const hasFullName = Boolean(user.fullName && user.fullName.trim())
    const hasBirthday = Boolean(user.birthday && user.birthday.trim())

    return hasEmail && hasFullName && hasBirthday
  }, [user.email, user.fullName, user.birthday])

  const canSubmit = isDirty && isFormValid

  // Конвертируем строку даты в объект Date для DatePicker
  const birthdayAsDate = useMemo(() => {
    if (!user.birthday) return null
    const date = new Date(user.birthday)
    return isNaN(date.getTime()) ? null : date
  }, [user.birthday])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name) {
      setUser((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleDirectChange = (key: keyof UserMockData, value: string) => {
    setUser((prev) => ({ ...prev, [key]: value }))
  }

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      handleDirectChange('birthday', '')
      return
    }
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    handleDirectChange('birthday', `${year}-${month}-${day}`)
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleDirectChange('avatarUrl', URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    console.log('SkillSwap — Сохранение данных формы:', user)
  }

  return (
    <div className={cls.card}>
      <form onSubmit={handleSubmit} className={cls.formLayout}>
        {/* ЛЕВАЯ ЧАСТЬ: Поля формы */}
        <div className={cls.fieldsSection}>
          {/* Поле Почта */}
          <div className={cls.fieldGroup}>
            <label className={cls.label}>Почта</label>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              isForm
            />
            <button type="button" className={cls.passwordLink}>
              Изменить пароль
            </button>
          </div>

          {/* Поле Имя */}
          <div className={cls.fieldGroup}>
            <label className={cls.label}>Имя</label>
            <Input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleInputChange}
              isForm
            />
          </div>

          {/* Сетка: Дата рождения и Пол */}
          <div className={cls.gridHalf}>
            <DatePicker label="Дата рождения" value={birthdayAsDate} onChange={handleDateChange} />

            <Select
              label="Пол"
              selectedValue={user.sex}
              options={[
                { value: 'male', label: 'Мужской' },
                { value: 'female', label: 'Женский' },
                { value: 'other', label: 'Другой' },
              ]}
              onChange={(val: string) => handleDirectChange('sex', val)}
            />
          </div>

          {/* Поле Город */}
          <Select
            label="Город"
            selectedValue={user.location}
            options={[
              { value: 'Москва', label: 'Москва' },
              { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
              { value: 'Казань', label: 'Казань' },
            ]}
            onChange={(val: string) => handleDirectChange('location', val)}
          />

          {/* Многострочное поле О себе */}
          <div className={cls.fieldGroup}>
            <label className={cls.label}>О себе</label>
            <Input
              multiline
              rows={4}
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
              isForm
            />
          </div>

          {/* Кнопка Сохранить */}
          <div className={cls.submitWrapper}>
            <Button type="submit" variant="primary" fullWidth disabled={!canSubmit}>
              Сохранить
            </Button>
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Блок Аватара */}
        <div className={cls.avatarSection}>
          <Avatar
            src={user.avatarUrl}
            size="large"
            name={user.fullName}
            editable
            onEditClick={handleAvatarClick}
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      </form>
    </div>
  )
}
