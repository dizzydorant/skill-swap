import React from 'react'

import { Footer } from '../../widgets/Footer'
import { Header } from '../../widgets/Header'
import { SkillSection } from '../../widgets/SkillSection'

import { CatalogSelectedChips, CatalogSidebarFilters } from '../../widgets/CatalogFilter'

import { useCatalogFilters } from './hooks/useCatalogFilters'

// Импортируем моковые наборы данных
import { MOCK_CATALOG_DATA, MOCK_FILTER_CATEGORIES, MOCK_FILTER_CITIES } from './mocks'
import cls from './index.module.css'

export const CatalogPage: React.FC = () => {
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

  // Нарезка расширенного массива моков для нативного появления кнопок "Смотреть все"
  const popularSkills = MOCK_CATALOG_DATA.slice(0, 5)
  const newSkills = MOCK_CATALOG_DATA.slice(5, 10)
  const recommendedSkills = MOCK_CATALOG_DATA.slice(10, 21)

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
            categories={MOCK_FILTER_CATEGORIES}
            onExchangeChange={setExchangeType}
            onGenderChange={setGender}
            onSubCategoryToggle={handleSubCategoryToggle}
            onCityToggle={handleCityToggle}
            onResetAll={handleResetAll}
          />

          <div className={cls.bottomGridContainer}>
            {/* Левая колонка: Сайдбар чекбоксов */}
            <CatalogSidebarFilters
              exchangeType={exchangeType}
              gender={gender}
              selectedSubCategoryIds={selectedSubCategoryIds}
              selectedCityNames={selectedCityNames}
              categories={MOCK_FILTER_CATEGORIES}
              cities={MOCK_FILTER_CITIES}
              onExchangeChange={setExchangeType}
              onGenderChange={setGender}
              onSubCategoryToggle={handleSubCategoryToggle}
              onCityToggle={handleCityToggle}
            />

            {/* Правая колонка: Секции с карточками */}
            <div className={cls.content}>
              <SkillSection title="Популярное" cards={popularSkills} initialLimit={3} />
              <SkillSection title="Новое" cards={newSkills} initialLimit={3} />
              <SkillSection title="Рекомендуем" cards={recommendedSkills} initialLimit={9} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CatalogPage
