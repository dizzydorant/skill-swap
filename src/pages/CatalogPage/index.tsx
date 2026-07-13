import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Footer } from '../../widgets/Footer'
import { Header } from '../../widgets/Header'
import { SkillSection } from '../../widgets/SkillSection'
import { ErrorState } from '../../widgets/ErrorState'
import { CatalogSelectedChips, CatalogSidebarFilters } from '../../widgets/CatalogFilter'
import type { City, SkillCategory } from '../../widgets/CatalogFilter/model/types'

import error500 from '../../shared/assets/images/errors/500.svg'
import { Button } from '../../shared/ui/Button'

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

export const CatalogPage: React.FC = () => {
  const navigate = useNavigate()
  const [catalogData, setCatalogData] = useState<CatalogDbData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<Error | null>(null)
  const [visibleRecommendedCount, setVisibleRecommendedCount] = useState(RECOMMENDED_PAGE_SIZE)

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

  const preparedData = useMemo(
    () =>
      catalogData
        ? prepareCatalogSections(catalogData, {
            exchangeType,
            gender,
            selectedSubCategoryIds,
            selectedCityNames,
          })
        : null,
    [catalogData, exchangeType, gender, selectedCityNames, selectedSubCategoryIds],
  )

  useEffect(() => {
    setVisibleRecommendedCount(RECOMMENDED_PAGE_SIZE)
  }, [preparedData?.recommendedCards])

  const visibleRecommendedCards =
    preparedData?.recommendedCards.slice(0, visibleRecommendedCount) ?? []
  const hasMoreRecommendedCards = preparedData
    ? visibleRecommendedCards.length < preparedData.recommendedCards.length
    : false

  const handleShowMoreRecommended = () => {
    setVisibleRecommendedCount((current) => current + RECOMMENDED_PAGE_SIZE)
  }

  const handleReportError = () => {
    if (loadError) {
      console.error(loadError)
    }
  }

  return (
    <div className={cls.page}>
      <Header />

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
              ) : (
                <>
                  <SkillSection
                    title="Популярное"
                    cards={preparedData?.popularCards ?? []}
                    initialLimit={3}
                  />
                  <SkillSection
                    title="Новое"
                    cards={preparedData?.newCards ?? []}
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
