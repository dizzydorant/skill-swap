import React, { useEffect, useMemo, useState } from 'react'
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom'

import { Footer } from '../../widgets/Footer'
import { Header } from '../../widgets/Header'
import { SkillSection } from '../../widgets/SkillSection'
import { ErrorState } from '../../widgets/ErrorState'
import { CatalogSelectedChips, CatalogSidebarFilters } from '../../widgets/CatalogFilter'
import type { City, SkillCategory } from '../../widgets/CatalogFilter/model/types'

import error500 from '../../shared/assets/images/errors/500.svg'
import error404 from '../../shared/assets/images/errors/404.svg'
import { Button } from '../../shared/ui/Button'
import { getCurrentUserId, getSwapRequests } from '@/features/exchange-offer/model/exchangeOfferStorage'
import { ROUTES } from '@/shared/lib/constants'

import {
  fetchJson,
  prepareCatalogSections,
  type CatalogDbData,
  type CatalogSkill,
  type CatalogUser,
} from './catalogData'
import { useCatalogFilters } from './hooks/useCatalogFilters'
import cls from './index.module.css'

const RECOMMENDED_PAGE_SIZE = 9
const getSkillPath = (id: string) => generatePath(ROUTES.SKILL, { id })

const getOfferedSkillIds = () => {
  const currentUserId = getCurrentUserId()

  return new Set(
    getSwapRequests()
      .filter((request) => request.fromUserId === currentUserId && request.status === 'pending')
      .map((request) => request.skillId),
  )
}

export const CatalogPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [catalogData, setCatalogData] = useState<CatalogDbData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<Error | null>(null)
  const [visibleRecommendedCount, setVisibleRecommendedCount] = useState(RECOMMENDED_PAGE_SIZE)
  const [offeredSkillIds, setOfferedSkillIds] = useState(() => getOfferedSkillIds())
  const searchValue = searchParams.get('search') ?? ''

  const {
    exchangeType,
    gender,
    selectedSubCategoryIds,
    selectedCityNames,
    setExchangeType,
    setGender,
    handleSubCategoryToggle,
    handleCityToggle,
    handleResetAll,
  } = useCatalogFilters()

  useEffect(() => {
    let isMounted = true

    const loadCatalogData = async () => {
      try {
        setIsLoading(true)
        setLoadError(null)

        const [users, skills, categories, cities] = await Promise.all([
          fetchJson<CatalogUser[]>('/db/users.json'),
          fetchJson<CatalogSkill[]>('/db/skills.json'),
          fetchJson<SkillCategory[]>('/db/categories.json'),
          fetchJson<City[]>('/db/cities.json'),
        ])

        if (isMounted) {
          setCatalogData({ users, skills, categories, cities })
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error instanceof Error ? error : new Error('Catalog data loading failed'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCatalogData()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const refreshOfferedSkillIds = () => {
      setOfferedSkillIds(getOfferedSkillIds())
    }

    refreshOfferedSkillIds()
    window.addEventListener('focus', refreshOfferedSkillIds)
    window.addEventListener('storage', refreshOfferedSkillIds)

    return () => {
      window.removeEventListener('focus', refreshOfferedSkillIds)
      window.removeEventListener('storage', refreshOfferedSkillIds)
    }
  }, [])

  // фильтр поиска
  const filteredData = useMemo(() => {
    if (!catalogData) {
      return null
    }

    const normalizedSearch = searchValue.trim().toLowerCase()

    if (!normalizedSearch) {
      return catalogData
    }

    const categoryById = new Map(
      catalogData.categories.map((category) => [category.id, category.name]),
    )
    const subCategoryById = new Map<number, string>()

    catalogData.categories.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        subCategoryById.set(subCategory.id, subCategory.name)
      })
    })

    const filteredSkills = catalogData.skills.filter((skill) => {
      const title = skill.title.toLowerCase()
      const category = categoryById.get(skill.categoryId)?.toLowerCase() ?? ''
      const subCategory = subCategoryById.get(skill.subCategoryId)?.toLowerCase() ?? ''

      return (
        title.includes(normalizedSearch) ||
        category.includes(normalizedSearch) ||
        subCategory.includes(normalizedSearch)
      )
    })

    return {
      ...catalogData,
      skills: filteredSkills,
    }
  }, [catalogData, searchValue])

  const preparedData = useMemo(
    () =>
      filteredData
        ? prepareCatalogSections(filteredData, {
            exchangeType,
            gender,
            selectedSubCategoryIds,
            selectedCityNames,
          })
        : null,
    [filteredData, exchangeType, gender, selectedCityNames, selectedSubCategoryIds],
  )

  const preparedDataWithNavigation = useMemo(() => {
    if (!preparedData) {
      return null
    }

    const addDetailsNavigation = (cards: typeof preparedData.popularCards) =>
      cards.map((card) => ({
        ...card,
        isExchangeOffered: offeredSkillIds.has(card.id),
        onActionClick: () => navigate(getSkillPath(card.id)),
      }))

    return {
      ...preparedData,
      popularCards: addDetailsNavigation(preparedData.popularCards),
      newCards: addDetailsNavigation(preparedData.newCards),
      recommendedCards: addDetailsNavigation(preparedData.recommendedCards),
    }
  }, [navigate, offeredSkillIds, preparedData])

  // проверка поиска
  const hasSearchResults = useMemo(() => {
    if (!searchValue.trim()) {
      return true
    }

    if (!preparedDataWithNavigation) {
      return true
    }

    return (
      preparedDataWithNavigation.popularCards.length > 0 ||
      preparedDataWithNavigation.newCards.length > 0 ||
      preparedDataWithNavigation.recommendedCards.length > 0
    )
  }, [preparedDataWithNavigation, searchValue])

  useEffect(() => {
    setVisibleRecommendedCount(RECOMMENDED_PAGE_SIZE)
  }, [preparedData?.recommendedCards])

  const visibleRecommendedCards =
    preparedDataWithNavigation?.recommendedCards.slice(0, visibleRecommendedCount) ?? []
  const hasMoreRecommendedCards = preparedDataWithNavigation
    ? visibleRecommendedCards.length < preparedDataWithNavigation.recommendedCards.length
    : false

  const handleShowMoreRecommended = () => {
    setVisibleRecommendedCount((current) => current + RECOMMENDED_PAGE_SIZE)
  }

  const handleReportError = () => {
    if (loadError) {
      console.error(loadError)
    }
  }

  const handleSearchChange = (value: string) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (value.trim()) {
      nextSearchParams.set('search', value)
    } else {
      nextSearchParams.delete('search')
    }

    setSearchParams(nextSearchParams, { replace: true })
  }

  const handleSearchReset = () => {
    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.delete('search')
    setSearchParams(nextSearchParams, { replace: true })
  }

  const handleEmptySearchReport = () => {
    return undefined
  }

  return (
    <div className={cls.page}>
      <Header searchValue={searchValue} onSearchChange={handleSearchChange} />

      <main className={cls.main}>
        <div className={cls.pageLayoutContainer}>
          <CatalogSelectedChips
            exchangeType={exchangeType}
            gender={gender}
            selectedSubCategoryIds={selectedSubCategoryIds}
            selectedCityNames={selectedCityNames}
            categories={preparedData?.categories ?? []}
            onExchangeChange={setExchangeType}
            onGenderChange={setGender}
            onSubCategoryToggle={handleSubCategoryToggle}
            onCityToggle={handleCityToggle}
            onResetAll={handleResetAll}
          />

          <div className={cls.bottomGridContainer}>
            <CatalogSidebarFilters
              exchangeType={exchangeType}
              gender={gender}
              selectedSubCategoryIds={selectedSubCategoryIds}
              selectedCityNames={selectedCityNames}
              categories={preparedData?.categories ?? []}
              cities={preparedData?.cities ?? []}
              onExchangeChange={setExchangeType}
              onGenderChange={setGender}
              onSubCategoryToggle={handleSubCategoryToggle}
              onCityToggle={handleCityToggle}
            />

            <div className={cls.content}>
              {isLoading ? (
                <div className={cls.stateContainer} role="status" aria-live="polite">
                  <p className={cls.loadingText}>Загружаем каталог...</p>
                </div>
              ) : loadError ? (
                <ErrorState
                  imageSrc={error500}
                  imageAlt="Ошибка загрузки каталога"
                  title="Не удалось загрузить каталог"
                  description="Попробуйте обновить страницу или вернитесь на главную"
                  onGoHome={() => navigate('/')}
                  onReportError={handleReportError}
                />
              ) : !hasSearchResults && searchValue.trim().length > 0 ? (
                <ErrorState
                  imageSrc={error404}
                  imageAlt="Ничего не найдено"
                  title="Ничего не найдено"
                  description={`По запросу "${searchValue}" навыков не найдено. Попробуйте изменить запрос.`}
                  onGoHome={handleSearchReset}
                  onReportError={handleEmptySearchReport}
                />
              ) : (
                <>
                  <SkillSection
                    title="Популярное"
                    cards={preparedDataWithNavigation?.popularCards ?? []}
                    initialLimit={3}
                  />
                  <SkillSection
                    title="Новое"
                    cards={preparedDataWithNavigation?.newCards ?? []}
                    initialLimit={3}
                  />
                  <SkillSection
                    title="Рекомендуем"
                    cards={visibleRecommendedCards}
                    initialLimit={visibleRecommendedCards.length}
                  />
                  {hasMoreRecommendedCards ? (
                    <div className={cls.showMoreContainer}>
                      <Button
                        className={cls.showMoreButton}
                        variant="primary"
                        onClick={handleShowMoreRecommended}
                      >
                        Показать ещё
                      </Button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CatalogPage
