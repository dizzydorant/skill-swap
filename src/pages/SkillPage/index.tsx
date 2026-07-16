import { useEffect, useMemo, useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'

import { useExchangeOffer } from '@/features/exchange-offer/hooks/useExchangeOffer'
import { ExchangeOfferModal } from '@/features/exchange-offer/ui/ExchangeOfferModal'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { ErrorState } from '@/widgets/ErrorState'
import { SkillDetailsCard } from '@/widgets/SkillDetailsCard'
import { SkillImageGallery } from '@/widgets/SkillImageGallery'
import { SkillOwnerCard } from '@/widgets/SkillOwnerCard'
import { SkillSection, type SkillSectionCard } from '@/widgets/SkillSection'

import { IconLike, IconLikeFilled, IconShare, IconMore } from '@/shared/assets/icons'
import error404 from '@/shared/assets/images/errors/404.svg'
import error500 from '@/shared/assets/images/errors/500.svg'
import { ROUTES } from '@/shared/lib/constants'
import type { ChipItem } from '@/shared/ui/ChipList'

import { fetchJson } from '@/pages/CatalogPage/catalogData'
import styles from './index.module.css'

interface SkillDbItem {
  id: string
  title: string
  description: string
  type: string
  categoryId: number
  subCategoryId: number
  tags?: string[]
  imageUrl: string | null
  images: string[]
  authorId: string
  likedByUserIds?: string[]
  likesCount: number
  createdAt: string
  updatedAt?: string
}

interface UserDbItem {
  id: string
  fullName: string
  birthday?: string
  avatarUrl: string | null
  location?: string
  bio?: string
  wantedSkillIds?: string[]
}

interface SkillCategoryDbItem {
  id: number
  name: string
  subCategories: Array<{
    id: number
    name: string
  }>
}

interface SkillPageDbData {
  skills: SkillDbItem[]
  users: UserDbItem[]
  categories: SkillCategoryDbItem[]
}

const CHIP_BACKGROUND_COLORS = ['#f7e7f2', '#e8f2ff', '#e9f7e7', '#fff5d9', '#f0ecff', '#e9f7f7']
const CHIP_TEXT_COLOR = '#253017'

const getSkillPath = (id: string) => generatePath(ROUTES.SKILL, { id })

const getAgeFromBirthday = (birthday: string | undefined): number => {
  if (!birthday) {
    return 0
  }

  const birthDate = new Date(birthday)

  if (Number.isNaN(birthDate.getTime())) {
    return 0
  }

  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

  return hasBirthdayPassed ? age : age - 1
}

const createChip = (skill: SkillDbItem): ChipItem => ({
  id: skill.id,
  label: skill.tags?.[0] ?? skill.title,
  bgColorFromDb: CHIP_BACKGROUND_COLORS[skill.categoryId % CHIP_BACKGROUND_COLORS.length],
  textColorFromDb: CHIP_TEXT_COLOR,
})

const createSkillCard = (
  skill: SkillDbItem,
  userById: Map<string, UserDbItem>,
  skillById: Map<string, SkillDbItem>,
  skillsByAuthorId: Map<string, SkillDbItem[]>,
  navigate: ReturnType<typeof useNavigate>,
): SkillSectionCard | null => {
  const author = userById.get(skill.authorId)

  if (!author) {
    return null
  }

  const teachSkills = skillsByAuthorId.get(author.id) ?? []
  const learnSkills = (author.wantedSkillIds ?? [])
    .map((wantedSkillId) => skillById.get(wantedSkillId))
    .filter((wantedSkill): wantedSkill is SkillDbItem => Boolean(wantedSkill))

  return {
    id: skill.id,
    user: {
      name: author.fullName,
      city: author.location ?? '',
      age: getAgeFromBirthday(author.birthday),
      avatar: author.avatarUrl ?? undefined,
    },
    teachSkills: teachSkills.map(createChip),
    learnSkills: learnSkills.map(createChip),
    likesCount: skill.likesCount,
    onActionClick: () => navigate(getSkillPath(skill.id)),
  }
}

const createSkillsByAuthorId = (skills: SkillDbItem[]): Map<string, SkillDbItem[]> => {
  const skillsByAuthorId = new Map<string, SkillDbItem[]>()

  skills.forEach((skill) => {
    const authorSkills = skillsByAuthorId.get(skill.authorId) ?? []
    skillsByAuthorId.set(skill.authorId, [...authorSkills, skill])
  })

  return skillsByAuthorId
}

export default function SkillPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [data, setData] = useState<SkillPageDbData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<Error | null>(null)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadSkillPageData = async () => {
      try {
        setIsLoading(true)
        setLoadError(null)

        const [skills, users, categories] = await Promise.all([
          fetchJson<SkillDbItem[]>('/db/skills.json'),
          fetchJson<UserDbItem[]>('/db/users.json'),
          fetchJson<SkillCategoryDbItem[]>('/db/categories.json'),
        ])

        if (isMounted) {
          setData({ skills, users, categories })
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error instanceof Error ? error : new Error('Skill page data loading failed'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadSkillPageData()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    setIsLiked(false)
  }, [id])

  const preparedData = useMemo(() => {
    if (!data || !id) {
      return null
    }

    const skill = data.skills.find((currentSkill) => currentSkill.id === id)

    if (!skill) {
      return null
    }

    const author = data.users.find((user) => user.id === skill.authorId)

    if (!author) {
      return null
    }

    const category = data.categories.find((currentCategory) => currentCategory.id === skill.categoryId)
    const subCategory = category?.subCategories.find(
      (currentSubCategory) => currentSubCategory.id === skill.subCategoryId,
    )
    const skillById = new Map(data.skills.map((currentSkill) => [currentSkill.id, currentSkill]))
    const userById = new Map(data.users.map((user) => [user.id, user]))
    const skillsByAuthorId = createSkillsByAuthorId(data.skills)
    const authorTeachSkills = skillsByAuthorId.get(author.id) ?? []
    const authorLearnSkills = (author.wantedSkillIds ?? [])
      .map((wantedSkillId) => skillById.get(wantedSkillId))
      .filter((wantedSkill): wantedSkill is SkillDbItem => Boolean(wantedSkill))
    const similarSkills = data.skills
      .filter(
        (currentSkill) =>
          currentSkill.id !== skill.id &&
          (currentSkill.categoryId === skill.categoryId ||
            currentSkill.subCategoryId === skill.subCategoryId),
      )
      .slice(0, 4)
      .map((similarSkill) =>
        createSkillCard(similarSkill, userById, skillById, skillsByAuthorId, navigate),
      )
      .filter((card): card is SkillSectionCard => Boolean(card))

    return {
      skill,
      author,
      categoryName: category?.name ?? skill.tags?.[1] ?? 'Категория не указана',
      subCategoryName: subCategory?.name ?? skill.tags?.[0] ?? 'Подкатегория не указана',
      authorTeachSkillTitles: authorTeachSkills.map((teachSkill) => teachSkill.tags?.[0] ?? teachSkill.title),
      authorLearnSkillTitles: authorLearnSkills.map((learnSkill) => learnSkill.tags?.[0] ?? learnSkill.title),
      similarSkills,
    }
  }, [data, id, navigate])

  const {
    isExchangeOffered,
    isModalOpen: isExchangeModalOpen,
    openModal: openExchangeModal,
    closeModal: closeExchangeModal,
    confirmOffer: confirmExchangeOffer,
  } = useExchangeOffer({
    skillId: preparedData?.skill.id ?? id ?? '',
    toUserId: preparedData?.author.id ?? '',
  })

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev)
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Ссылка скопирована в буфер обмена!')
    } catch (err) {
      console.error('Не удалось скопировать:', err)
    }
  }

  const handleReportError = () => {
    if (loadError) {
      console.error(loadError)
    }
  }

  const handleGoHome = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {isLoading ? (
          <div className={styles.stateContainer} role="status" aria-live="polite">
            <p className={styles.loadingText}>Загружаем навык...</p>
          </div>
        ) : loadError ? (
          <ErrorState
            imageSrc={error500}
            imageAlt="Ошибка загрузки навыка"
            title="Не удалось загрузить навык"
            description="Попробуйте обновить страницу или вернитесь на главную"
            onGoHome={handleGoHome}
            onReportError={handleReportError}
          />
        ) : !preparedData ? (
          <ErrorState
            imageSrc={error404}
            imageAlt="Навык не найден"
            title="Навык не найден"
            description="Такого навыка нет в каталоге или ссылка устарела"
            onGoHome={handleGoHome}
            onReportError={() => undefined}
          />
        ) : (
          <>
            <section className={styles.topSection}>
              <aside className={styles.leftColumn}>
                <SkillOwnerCard
                  avatarUrl={preparedData.author.avatarUrl ?? undefined}
                  name={preparedData.author.fullName}
                  city={preparedData.author.location ?? ''}
                  age={getAgeFromBirthday(preparedData.author.birthday)}
                  description={preparedData.author.bio ?? ''}
                  teachSkills={preparedData.authorTeachSkillTitles}
                  learnSkills={preparedData.authorLearnSkillTitles}
                />
              </aside>

              <SkillDetailsCard
                title={preparedData.skill.title}
                category={preparedData.categoryName}
                subCategory={preparedData.subCategoryName}
                description={preparedData.skill.description}
                isExchangeOffered={isExchangeOffered}
                onExchange={openExchangeModal}
              >
                <div className={styles.galleryWithActionsContainer}>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.circleBtn} ${isLiked ? styles.activeLike : ''}`}
                      onClick={handleLikeToggle}
                      aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
                    >
                      {isLiked ? <IconLikeFilled /> : <IconLike />}
                    </button>

                    <button className={styles.circleBtn} onClick={handleShare} aria-label="Поделиться">
                      <IconShare />
                    </button>

                    <button className={styles.squareBtn} aria-label="Дополнительно">
                      <IconMore />
                    </button>
                  </div>

                  <SkillImageGallery images={preparedData.skill.images} />
                </div>
              </SkillDetailsCard>
            </section>

            <SkillSection
              title="Похожие предложения"
              cards={preparedData.similarSkills}
              initialLimit={4}
              className={styles.similarSection}
            />
          </>
        )}
      </main>

      <ExchangeOfferModal
        isOpen={isExchangeModalOpen}
        onClose={closeExchangeModal}
        onConfirm={confirmExchangeOffer}
      />

      <Footer />
    </div>
  )
}
