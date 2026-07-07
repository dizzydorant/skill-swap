import React, { useState } from 'react'

import { Footer } from '../../widgets/Footer'
import { Header } from '../../widgets/Header'
import { SkillSection } from '../../widgets/SkillSection'

import { CatalogSelectedChips, CatalogSidebarFilters } from '../../widgets/CatalogFilter'
import type { ExchangeType, GenderType } from '../../widgets/CatalogFilter/ui/CatalogSidebarFilters'

// Импортируем наборы данных из моков страницы
import { MOCK_CATALOG_DATA, MOCK_FILTER_CATEGORIES, MOCK_FILTER_CITIES } from './mocks'
import cls from './index.module.css'

export const CatalogPage: React.FC = () => {
  // Единое реактивное состояние фильтров на уровне страницы
  const [exchangeType, setExchangeType] = useState<ExchangeType>('all')
  const [gender, setGender] = useState<GenderType>('any')
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<number[]>([])
  const [selectedCityNames, setSelectedCityNames] = useState<string[]>(['Москва'])

  const popularSkills = MOCK_CATALOG_DATA.slice(0, 5)
  const newSkills = MOCK_CATALOG_DATA.slice(5, 10)
  const recommendedSkills = MOCK_CATALOG_DATA.slice(10, 21)

  // Переключатель (toggle) для чекбоксов подкатегорий навыков
  const handleSubCategoryToggle = (id: number) => {
    setSelectedSubCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  // Переключатель (toggle) для чекбоксов городов
  const handleCityToggle = (name: string) => {
    setSelectedCityNames((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name],
    )
  }

  // Функция полного сброса всех активных фильтров в системе
  const handleResetAll = () => {
    setExchangeType('all')
    setGender('any')
    setSelectedSubCategoryIds([])
    setSelectedCityNames([])
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
            categories={MOCK_FILTER_CATEGORIES}
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
              categories={MOCK_FILTER_CATEGORIES}
              cities={MOCK_FILTER_CITIES}
              onExchangeChange={setExchangeType}
              onGenderChange={setGender}
              onSubCategoryToggle={handleSubCategoryToggle}
              onCityToggle={handleCityToggle}
            />

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
