import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { DatePicker } from '@/shared/ui/DatePicker'
import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'

import cls from './ProfilePersonalDataForm.module.css'

export interface ProfilePersonalData {
  id: string
  email: string
  fullName: string
  sex: 'male' | 'female' | 'other' | ''
  birthday: string
  avatarUrl: string | null
  location: string
  bio: string
}

export interface ProfileCity {
  id: string
  name: string
}

export interface ProfilePersonalDataFormProps {
  initialUser: ProfilePersonalData
  cities: ProfileCity[]
  onSubmit?: (user: ProfilePersonalData) => void | Promise<void>
}

const genderOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
  { value: 'other', label: 'Другой' },
]

export const ProfilePersonalDataForm: React.FC<ProfilePersonalDataFormProps> = ({
  initialUser,
  cities,
  onSubmit,
}) => {
  const [user, setUser] = useState<ProfilePersonalData>(initialUser)
  const [savedUser, setSavedUser] = useState<ProfilePersonalData>(initialUser)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setUser(initialUser)
    setSavedUser(initialUser)
  }, [initialUser])

  const cityOptions = useMemo(() => {
    const options = cities.map((city) => ({ value: city.name, label: city.name }))

    if (user.location && !options.some((option) => option.value === user.location)) {
      return [{ value: user.location, label: user.location }, ...options]
    }

    return options
  }, [cities, user.location])

  const isFormValid = useMemo(() => {
    const hasEmail = Boolean(user.email.trim())
    const hasFullName = Boolean(user.fullName.trim())

    return hasEmail && hasFullName
  }, [user.email, user.fullName])

  const isDirty = useMemo(() => {
    return (
      user.email !== savedUser.email ||
      user.fullName !== savedUser.fullName ||
      user.sex !== savedUser.sex ||
      user.birthday !== savedUser.birthday ||
      user.avatarUrl !== savedUser.avatarUrl ||
      user.location !== savedUser.location ||
      user.bio !== savedUser.bio
    )
  }, [savedUser, user])

  const canSubmit = isDirty && isFormValid

  const birthdayAsDate = useMemo(() => {
    if (!user.birthday) return null

    const date = new Date(user.birthday)
    return Number.isNaN(date.getTime()) ? null : date
  }, [user.birthday])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    if (name) {
      setUser((currentUser) => ({ ...currentUser, [name]: value }))
    }
  }

  const handleDirectChange = (key: keyof ProfilePersonalData, value: string) => {
    setUser((currentUser) => ({ ...currentUser, [key]: value }))
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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      handleDirectChange('avatarUrl', typeof reader.result === 'string' ? reader.result : '')
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!canSubmit || isSaving) return

    try {
      setIsSaving(true)
      await onSubmit?.(user)
      setSavedUser(user)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={cls.card}>
      <form onSubmit={handleSubmit} className={cls.formLayout}>
        <div className={cls.fieldsSection}>
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

          <div className={cls.gridHalf}>
            <DatePicker
              label="Дата рождения"
              value={birthdayAsDate}
              onChange={handleDateChange}
            />

            <Select
              label="Пол"
              selectedValue={user.sex}
              options={genderOptions}
              onChange={(value: string) => handleDirectChange('sex', value)}
            />
          </div>

          <Select
            label="Город"
            selectedValue={user.location}
            options={cityOptions}
            onChange={(value: string) => handleDirectChange('location', value)}
          />

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

          <div className={cls.submitWrapper}>
            <Button type="submit" variant="primary" fullWidth disabled={!canSubmit || isSaving}>
              Сохранить
            </Button>
          </div>
        </div>

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
