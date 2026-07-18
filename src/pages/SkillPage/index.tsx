import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  generatePath,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom'

import {
  clearCreatedSkillSuccess,
  getCreatedSkillSuccessSkillId,
  getRegisteredSkillPageData,
  type RegisteredUser,
} from '@/features/auth/model/authUtils'

import { useFavorites } from '@/features/favorites/hooks/useFavorites'
import { selectRegisteredUsers } from '@/features/auth/model/authSlice'
import { useAuthUser } from '@/features/auth/model/useAuthUser'
import { useExchangeOffer } from '@/features/exchange-offer/hooks/useExchangeOffer'
import { ExchangeOfferModal } from '@/features/exchange-offer/ui/ExchangeOfferModal'
import { acceptRequest } from '@/features/exchange-offer/model/exchangeRequestsSlice'
import { selectProfileOverridesByUserId } from '@/features/profile/model/profileSlice'
import type { ProfileOverridesByUserId } from '@/features/profile/model/types'
import { useAppDispatch, useAppSelector } from '@/store'
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
import checkCircleIcon from '@/shared/assets/icons/check-circle.svg'
import { ROUTES } from '@/shared/lib/constants'
import type { ChipItem } from '@/shared/ui/ChipList'
import { SuccessModal } from '@/shared/ui/SuccessModal'

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
  wantedSkillTitles?: string[]
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

const applyProfileOverridesToUsers = (
  users: UserDbItem[],
  overridesByUserId: ProfileOverridesByUserId,
): UserDbItem[] =>
  users.map((user) => {
    const profileOverride = overridesByUserId[user.id]

    return profileOverride
      ? {
          ...user,
          fullName: profileOverride.fullName,
          birthday: profileOverride.birthday || user.birthday,
          avatarUrl: profileOverride.avatarUrl,
          location: profileOverride.location,
          bio: profileOverride.bio,
        }
      : user
  })

const mergeSkillPageData = (
  skills: SkillDbItem[],
  users: UserDbItem[],
  categories: SkillCategoryDbItem[],
  registeredUsers: RegisteredUser[],
  profileOverridesByUserId: ProfileOverridesByUserId,
): SkillPageDbData => {
  const registeredData = getRegisteredSkillPageData(registeredUsers, profileOverridesByUserId)

  return {
    skills: [...skills, ...registeredData.skills],
    users: [...applyProfileOverridesToUsers(users, profileOverridesByUserId), ...registeredData.users],
    categories,
  }
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
  const localLearnSkills = (author.wantedSkillTitles ?? []).map((title) => ({
    id: `${author.id}-${title}`,
    label: title,
    bgColorFromDb: CHIP_BACKGROUND_COLORS[0],
    textColorFromDb: CHIP_TEXT_COLOR,
  }))

  return {
    id: skill.id,
    user: {
      name: author.fullName,
      city: author.location ?? '',
      age: getAgeFromBirthday(author.birthday),
      avatar: author.avatarUrl ?? undefined,
    },
    teachSkills: teachSkills.map(createChip),
    learnSkills: localLearnSkills.length > 0 ? localLearnSkills : learnSkills.map(createChip),
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
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [data, setData] = useState<SkillPageDbData | null>(null)
  const location = useLocation()
  const { isAuthenticated, user: authUser } = useAuthUser()
  const registeredUsers = useAppSelector(selectRegisteredUsers)
  const profileOverridesByUserId = useAppSelector(selectProfileOverridesByUserId)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<Error | null>(null)

  const [isCreatedSkillModalOpen, setIsCreatedSkillModalOpen] = useState(false)

  const { isFavorite, toggleFavorite, favoriteIds } = useFavorites()

  const isFromNotification = searchParams.get('fromNotification') === 'true'
  const requestId = searchParams.get('requestId') ?? ''

  const handleLikeToggle = useCallback(
    (targetSkillId?: string) => {
      if (!isAuthenticated) {
        const currentUrl = `${location.pathname}${location.search}${location.hash}`
        navigate(`${ROUTES.LOGIN}?from=${encodeURIComponent(currentUrl)}`)
        return
      }

      const idToLike = targetSkillId ?? id
      if (idToLike) {
        toggleFavorite(idToLike)
      }
    },
    [
      isAuthenticated,
      location.pathname,
      location.search,
      location.hash,
      navigate,
      id,
      toggleFavorite,
    ],
  )

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
          setData(
            mergeSkillPageData(
              skills,
              users,
              categories,
              registeredUsers,
              profileOverridesByUserId,
            ),
          )
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
  }, [profileOverridesByUserId, registeredUsers])

  useEffect(() => {
    setIsCreatedSkillModalOpen(Boolean(id && getCreatedSkillSuccessSkillId() === id))
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

    const category = data.categories.find(
      (currentCategory) => currentCategory.id === skill.categoryId,
    )
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

    const authorLearnSkillTitles =
      author.wantedSkillTitles && author.wantedSkillTitles.length > 0
        ? author.wantedSkillTitles
        : authorLearnSkills.map((learnSkill) => learnSkill.tags?.[0] ?? learnSkill.title)

    const similarSkills = data.skills
      .filter(
        (currentSkill) =>
          currentSkill.id !== skill.id &&
          (currentSkill.categoryId === skill.categoryId ||
            currentSkill.subCategoryId === skill.subCategoryId),
      )
      .slice(0, 4)
      .map((similarSkill): SkillSectionCard | null => {
        const cardData = createSkillCard(
          similarSkill,
          userById,
          skillById,
          skillsByAuthorId,
          navigate,
        )
        if (!cardData) return null

        const isCurrentlyLiked = favoriteIds.includes(similarSkill.id)

        return {
          ...cardData,
          id: similarSkill.id,
          isLiked: isCurrentlyLiked,
          likesCount: isCurrentlyLiked
            ? (similarSkill.likesCount ?? 0) + 1
            : (similarSkill.likesCount ?? 0),

          onLikeClick: () => handleLikeToggle(similarSkill.id),
        }
      })
      .filter((card): card is SkillSectionCard => card !== null)

    return {
      skill,
      author,
      categoryName: category?.name ?? skill.tags?.[0] ?? 'Категория не указана',
      subCategoryName: subCategory?.name ?? skill.tags?.[0] ?? 'Подкатегория не указана',
      authorTeachSkillTitles: authorTeachSkills.map(
        (teachSkill) => teachSkill.tags?.[0] ?? teachSkill.title,
      ),
      authorLearnSkillTitles,
      similarSkills,
    }
  }, [data, id, navigate, favoriteIds, handleLikeToggle])

  const {
    isExchangeOffered,
    isModalOpen: isExchangeModalOpen,
    openModal: openExchangeModal,
    closeModal: closeExchangeModal,
    confirmOffer: confirmExchangeOffer,
  } = useExchangeOffer({
    skillId: preparedData?.skill.id ?? '',
    toUserId: preparedData?.author.id ?? '',
  })

  const isSkillLiked = id ? isFavorite(id) : false
  const isOwnSkill = Boolean(authUser && preparedData?.author.id === authUser.id)

  const handleExchangeClick = useCallback(() => {
    if (!isAuthenticated) {
      const currentUrl = `${location.pathname}${location.search}${location.hash}`
      navigate(`${ROUTES.LOGIN}?from=${encodeURIComponent(currentUrl)}`)
      return
    }

    // Если авторизован — открываем модалку предложения обмена
    openExchangeModal()
  }, [
    isAuthenticated,
    location.pathname,
    location.search,
    location.hash,
    navigate,
    openExchangeModal,
  ])

  const handleShare = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      alert(
        'Ваш браузер не поддерживает автоматическое копирование. Скопируйте ссылку из адресной строки.',
      )
      return
    }

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

  const handleCreatedSkillModalClose = () => {
    clearCreatedSkillSuccess()
    setIsCreatedSkillModalOpen(false)
  }

  const handleAcceptExchange = (id: string) => {
    dispatch(acceptRequest({ requestId: id }))

    alert('Обмен успешно принят! Теперь вы можете связаться с пользователем.')

    if (preparedData?.skill.id) {
      navigate(generatePath(ROUTES.SKILL, { id: preparedData.skill.id }))
    }
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
                isExchangeOffered={isFromNotification ? false : isExchangeOffered}
                isExchangeDisabled={!isFromNotification && isOwnSkill}
                actionText={
                  isFromNotification ? 'Принять обмен' : isOwnSkill ? 'Это ваш навык' : undefined
                }
                onExchange={
                  isFromNotification ? () => handleAcceptExchange(requestId) : handleExchangeClick
                }
              >
                <div className={styles.galleryWithActionsContainer}>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.circleBtn} ${isSkillLiked ? styles.activeLike : ''}`}
                      onClick={() => handleLikeToggle()}
                      aria-label={isSkillLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
                    >
                      {isSkillLiked ? <IconLikeFilled /> : <IconLike />}
                    </button>

                    <button
                      className={styles.circleBtn}
                      onClick={handleShare}
                      aria-label="Поделиться"
                    >
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

      <SuccessModal
        isOpen={Boolean(preparedData) && isCreatedSkillModalOpen}
        onClose={handleCreatedSkillModalClose}
        onAction={handleCreatedSkillModalClose}
        icon={checkCircleIcon}
        title="Ваше предложение создано"
        description="Теперь вы можете предложить обмен"
        buttonText="Готово"
        ariaLabel="Предложение создано"
      />

      <Footer />
    </div>
  )
}
