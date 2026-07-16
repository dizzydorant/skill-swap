import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { DatePicker } from '@/shared/ui/DatePicker'
import { Input } from '@/shared/ui/Input'
import { Select, type SelectOption } from '@/shared/ui/Select'
import { IconAdd } from '@/shared/assets/icons'
import cls from './RegisterProfileForm.module.css'

export interface RegisterProfileFormProps {
  onBack: () => void
  onNext: (data: {
    name: string
    birthday: Date | null
    gender: string
    city: string
    cityName: string
    categoryId: string
    subCategoryId: string
    categoryName: string
    subCategoryName: string
    avatarUrl: string | null
  }) => void
  className?: string
}

interface CityDto {
  id: string
  name: string
}

interface SubCategoryDto {
  id: number
  name: string
}

interface CategoryDto {
  id: number
  name: string
  subCategories: SubCategoryDto[]
}

const genderOptions: SelectOption[] = [
  { value: 'not_selected', label: 'Не указан' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

const emptyOptions: SelectOption[] = []

export const RegisterProfileForm = ({
  onBack,
  onNext,
  className = '',
}: RegisterProfileFormProps) => {
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [gender, setGender] = useState('not_selected')
  const [city, setCity] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [cities, setCities] = useState<CityDto[]>([])
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let isMounted = true

    Promise.all([fetch('/db/cities.json'), fetch('/db/categories.json')])
      .then(async ([citiesResponse, categoriesResponse]) => {
        if (!citiesResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to load registration dictionaries')
        }

        const [loadedCities, loadedCategories] = (await Promise.all([
          citiesResponse.json(),
          categoriesResponse.json(),
        ])) as [CityDto[], CategoryDto[]]

        if (isMounted) {
          setCities(loadedCities)
          setCategories(loadedCategories)
        }
      })
      .catch(() => {
        if (isMounted) {
          setCities([])
          setCategories([])
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingData(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const cityOptions = useMemo<SelectOption[]>(
    () => cities.map((item) => ({ value: item.id, label: item.name })),
    [cities],
  )

  const categoryOptions = useMemo<SelectOption[]>(
    () => categories.map((item) => ({ value: String(item.id), label: item.name })),
    [categories],
  )

  const subCategoryOptions = useMemo<SelectOption[]>(() => {
    const selectedCategory = categories.find((item) => String(item.id) === categoryId)

    if (!selectedCategory) {
      return emptyOptions
    }

    return selectedCategory.subCategories.map((item) => ({
      value: String(item.id),
      label: item.name,
    }))
  }, [categories, categoryId])

  const handleCategoryChange = (value: string) => {
    setCategoryId(value)
    setSubCategoryId('')
  }

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      setAvatarUrl(typeof reader.result === 'string' ? reader.result : null)
    })

    reader.readAsDataURL(file)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const selectedCity = cities.find((item) => item.id === city)
    const selectedCategory = categories.find((item) => String(item.id) === categoryId)
    const selectedSubCategory = selectedCategory?.subCategories.find(
      (item) => String(item.id) === subCategoryId,
    )

    onNext({
      name: name.trim(),
      birthday,
      gender,
      city,
      cityName: selectedCity?.name ?? '',
      categoryId,
      subCategoryId,
      categoryName: selectedCategory?.name ?? '',
      subCategoryName: selectedSubCategory?.name ?? '',
      avatarUrl,
    })
  }

  const formClassName = [cls.form, className].filter(Boolean).join(' ')

  return (
    <form className={formClassName} onSubmit={handleSubmit} noValidate>
      <div className={cls.avatarBlock}>
        <Avatar className={cls.avatar} src={avatarUrl} name={name} size="small" />
        <button
          className={cls.avatarButton}
          type="button"
          aria-label="Добавить фото профиля"
          onClick={() => avatarInputRef.current?.click()}
        >
          <IconAdd />
        </button>
        <input
          ref={avatarInputRef}
          className={cls.avatarInput}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </div>

      <div className={cls.fields}>
        <label className={cls.field} htmlFor="register-profile-name">
          <span className={cls.label}>Имя</span>
          <Input
            id="register-profile-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Введите ваше имя"
          />
        </label>

        <div className={cls.inlineFields}>
          <DatePicker
            className={cls.inlineField}
            label="Дата рождения"
            placeholder="дд.мм.гггг"
            value={birthday}
            onChange={setBirthday}
            maxDate={new Date()}
          />

          <div className={cls.inlineField}>
            <Select
              label="Пол"
              options={genderOptions}
              selectedValue={gender}
              onChange={setGender}
              placeholder="Не указан"
            />
          </div>
        </div>

        <div className={cls.field}>
          <Select
            label="Город"
            options={cityOptions}
            selectedValue={city}
            onChange={setCity}
            placeholder="Не указан"
            disabled={isLoadingData}
          />
        </div>

        <div className={cls.field}>
          <Select
            label="Категория навыка, которому хотите научиться"
            options={categoryOptions}
            selectedValue={categoryId}
            onChange={handleCategoryChange}
            placeholder="Выберите категорию"
            disabled={isLoadingData}
          />
        </div>

        <div className={cls.field}>
          <Select
            label="Подкатегория навыка, которому хотите научиться"
            options={subCategoryOptions}
            selectedValue={subCategoryId}
            onChange={setSubCategoryId}
            placeholder="Выберите подкатегорию"
            disabled={isLoadingData || !categoryId}
          />
        </div>
      </div>

      <div className={cls.actions}>
        <Button className={cls.actionButton} variant="outline" type="button" onClick={onBack}>
          Назад
        </Button>
        <Button className={cls.actionButton} type="submit">
          Продолжить
        </Button>
      </div>
    </form>
  )
}
