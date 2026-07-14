import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import type { CatalogSkill, CatalogUser } from '@/pages/CatalogPage/catalogData'
import { fetchJson } from '@/pages/CatalogPage/catalogData'
import type { SkillCategory } from '@/widgets/CatalogFilter/model/types'

export interface SkillPageData {
  skill: CatalogSkill & {
    description: string
    images: string[]
    imageUrl?: string | null
  }
  author: CatalogUser & { bio?: string }
  categoryName: string
  subCategoryName: string
  teachSkillTitles: string[]
  learnSkillTitles: string[]
}

const getAgeFromBirthday = (birthday: string | undefined): number => {
  if (!birthday) {
    return 0
  }

  const birthDate = new Date(birthday)

  if (Number.isNaN(birthDate.getTime())) {
    return 0
  }

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1
  }

  return age
}

const resolveCategoryNames = (
  categories: SkillCategory[],
  categoryId: number,
  subCategoryId: number,
) => {
  const category = categories.find((item) => item.id === categoryId)
  const subCategory = category?.subCategories.find((item) => item.id === subCategoryId)

  return {
    categoryName: category?.name ?? '',
    subCategoryName: subCategory?.name ?? '',
  }
}

interface SkillJson extends CatalogSkill {
  description: string
  images: string[]
  imageUrl?: string | null
}

interface UserJson extends CatalogUser {
  bio?: string
}

export const useSkillPageData = () => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<SkillPageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) {
      setData(null)
      setIsLoading(false)
      setError(new Error('Skill id is missing'))
      return
    }

    let isMounted = true

    const loadSkillPageData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const [skills, users, categories] = await Promise.all([
          fetchJson<SkillJson[]>('/db/skills.json'),
          fetchJson<UserJson[]>('/db/users.json'),
          fetchJson<SkillCategory[]>('/db/categories.json'),
        ])

        const skill = skills.find((item) => item.id === id)

        if (!skill) {
          throw new Error('Skill not found')
        }

        const author = users.find((item) => item.id === skill.authorId)

        if (!author) {
          throw new Error('Skill author not found')
        }

        const skillById = new Map(skills.map((item) => [item.id, item]))
        const teachSkills = skills.filter((item) => item.authorId === author.id)
        const learnSkills = (author.wantedSkillIds ?? [])
          .map((skillId) => skillById.get(skillId))
          .filter((item): item is SkillJson => Boolean(item))

        const { categoryName, subCategoryName } = resolveCategoryNames(
          categories,
          skill.categoryId,
          skill.subCategoryId,
        )

        if (isMounted) {
          setData({
            skill,
            author,
            categoryName,
            subCategoryName,
            teachSkillTitles: teachSkills.map((item) => item.tags?.[0] ?? item.title),
            learnSkillTitles: learnSkills.map((item) => item.tags?.[0] ?? item.title),
          })
        }
      } catch (loadError) {
        if (isMounted) {
          setData(null)
          setError(loadError instanceof Error ? loadError : new Error('Failed to load skill'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadSkillPageData()

    return () => {
      isMounted = false
    }
  }, [id])

  return {
    data,
    isLoading,
    error,
    authorAge: data ? getAgeFromBirthday(data.author.birthday) : 0,
  }
}
