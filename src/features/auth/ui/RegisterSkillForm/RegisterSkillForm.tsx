import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { ImageUpload, type ImageFile } from '@/shared/ui/ImageUpload'
import { Input } from '@/shared/ui/Input'
import { Select, type SelectOption } from '@/shared/ui/Select'
import cls from './RegisterSkillForm.module.css'

export type { ImageFile }

export interface RegisterSkillFormProps {
  onBack: () => void
  onNext: (data: {
    title: string
    categoryId: string
    subCategoryId: string
    categoryName: string
    subCategoryName: string
    description: string
    images: ImageFile[]
  }) => void | Promise<void>
  isSubmitting?: boolean
  submitError?: string
  className?: string
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

const emptyOptions: SelectOption[] = []

export const RegisterSkillForm = ({
  onBack,
  onNext,
  isSubmitting = false,
  submitError = '',
  className = '',
}: RegisterSkillFormProps) => {
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<ImageFile[]>([])
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetch('/db/categories.json')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to load categories')
        }

        return (await response.json()) as CategoryDto[]
      })
      .then((loadedCategories) => {
        if (isMounted) {
          setCategories(loadedCategories)
        }
      })
      .catch(() => {
        if (isMounted) {
          setCategories([])
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingCategories(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const selectedCategory = categories.find((item) => String(item.id) === categoryId)
    const selectedSubCategory = selectedCategory?.subCategories.find(
      (item) => String(item.id) === subCategoryId,
    )

    onNext({
      title: title.trim(),
      categoryId,
      subCategoryId,
      categoryName: selectedCategory?.name ?? '',
      subCategoryName: selectedSubCategory?.name ?? '',
      description: description.trim(),
      images,
    })
  }

  const formClassName = [cls.form, className].filter(Boolean).join(' ')

  return (
    <form className={formClassName} onSubmit={handleSubmit} noValidate>
      <div className={cls.fields}>
        <label className={cls.field} htmlFor="register-skill-title">
          <span className={cls.label}>Название навыка</span>
          <Input
            id="register-skill-title"
            name="title"
            value={title}
            onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              setTitle(event.target.value)
            }
            placeholder="Введите название вашего навыка"
          />
        </label>

        <div className={cls.field}>
          <Select
            label="Категория навыка"
            options={categoryOptions}
            selectedValue={categoryId}
            onChange={handleCategoryChange}
            placeholder="Выберите категорию навыка"
            disabled={isLoadingCategories}
          />
        </div>

        <div className={cls.field}>
          <Select
            label="Подкатегория навыка"
            options={subCategoryOptions}
            selectedValue={subCategoryId}
            onChange={setSubCategoryId}
            placeholder="Выберите подкатегорию навыка"
            disabled={isLoadingCategories || !categoryId}
          />
        </div>

        <label className={cls.field} htmlFor="register-skill-description">
          <span className={cls.label}>Описание</span>
          <Input
            id="register-skill-description"
            name="description"
            value={description}
            onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              setDescription(event.target.value)
            }
            placeholder="Коротко опишите, чему можете научить"
            multiline
            rows={4}
          />
        </label>

        <ImageUpload value={images} onChange={setImages} />
      </div>

      <div className={cls.actions}>
        <Button className={cls.actionButton} variant="outline" type="button" onClick={onBack}>
          Назад
        </Button>
        {submitError ? <p className={cls.submitError}>{submitError}</p> : null}

        <Button className={cls.actionButton} type="submit" disabled={isSubmitting}>
          Продолжить
        </Button>
      </div>
    </form>
  )
}
