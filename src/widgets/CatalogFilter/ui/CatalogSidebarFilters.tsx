import { FC, useState } from 'react'
import { Checkbox } from '@/shared/ui/Checkbox'
import { FilterCategory } from '@/shared/ui/FilterCategory'
import { IconArrow } from '@/shared/assets/icons'
import type { City, ExchangeType, GenderType, SkillCategory } from '../model/types'
import cls from '../CatalogFilters.module.css'

interface CatalogSidebarFiltersProps {
  exchangeType: ExchangeType
  gender: GenderType
  selectedSubCategoryIds: number[]
  selectedCityNames: string[]
  categories: SkillCategory[]
  cities: City[]
  onExchangeChange: (value: ExchangeType) => void
  onGenderChange: (value: GenderType) => void
  onSubCategoryToggle: (id: number) => void
  onCityToggle: (name: string) => void
}

export const CatalogSidebarFilters: FC<CatalogSidebarFiltersProps> = ({
  exchangeType,
  gender,
  selectedSubCategoryIds,
  selectedCityNames,
  categories,
  cities,
  onExchangeChange,
  onGenderChange,
  onSubCategoryToggle,
  onCityToggle,
}) => {
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false)
  const [isAllCitiesOpen, setIsAllCitiesOpen] = useState(false)
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Set<number>>(new Set())

  const visibleCities = isAllCitiesOpen ? cities : cities.slice(0, 5)
  const visibleCategories = isAllCategoriesOpen ? categories : categories.slice(0, 3)

  const toggleCategoryExpand = (id: number) => {
    setExpandedCategoryIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const exchangeOptions = [
    { value: 'all', label: 'Всё' },
    { value: 'learn', label: 'Хочу научиться' },
    { value: 'teach', label: 'Могу научить' },
  ] as const

  const genderOptions = [
    { value: 'any', label: 'Не имеет значения' },
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
  ] as const

  return (
    <aside className={cls.filtersSidebar}>
      {/* Направление обмена */}
      <section className={cls.section}>
        <div className={cls.optionsList}>
          {exchangeOptions.map((opt) => (
            <label key={opt.value} className={cls.label}>
              <input
                type="radio"
                name="exchange_sidebar"
                className={cls.input}
                checked={exchangeType === opt.value}
                onChange={() => onExchangeChange(opt.value)}
              />
              <span className={cls.radioControl}></span>
              {opt.label}
            </label>
          ))}
        </div>
      </section>

      {/* Навыки */}
      <section className={cls.section}>
        <h3 className={cls.sectionTitle}>Навыки</h3>
        <div className={cls.optionsList}>
          {visibleCategories.map((cat) => {
            const selCount = cat.subCategories.filter((s) =>
              selectedSubCategoryIds.includes(s.id),
            ).length

            return (
              <FilterCategory
                key={cat.id}
                label={cat.name}
                checked={selCount === cat.subCategories.length && cat.subCategories.length > 0}
                indeterminate={selCount > 0 && selCount < cat.subCategories.length}
                isExpanded={expandedCategoryIds.has(cat.id)}
                hasChildren={cat.subCategories.length > 0}
                onCheckboxChange={() => {
                  cat.subCategories.forEach((s) => onSubCategoryToggle(s.id))
                }}
                onToggleExpand={() => toggleCategoryExpand(cat.id)}
              >
                {cat.subCategories.map((sub) => (
                  <Checkbox
                    key={sub.id}
                    label={sub.name}
                    checked={selectedSubCategoryIds.includes(sub.id)}
                    onChange={() => onSubCategoryToggle(sub.id)}
                  />
                ))}
              </FilterCategory>
            )
          })}
        </div>
        {categories.length > 3 && (
          <button
            type="button"
            className={cls.showMoreBtn}
            onClick={() => setIsAllCategoriesOpen(!isAllCategoriesOpen)}
          >
            {isAllCategoriesOpen ? 'Свернуть категории' : 'Все категории'}
            <IconArrow
              className={`${cls.showMoreIcon} ${isAllCategoriesOpen ? cls.arrowExpanded : ''}`}
            />
          </button>
        )}
      </section>

      {/* Пол автора */}
      <section className={cls.section}>
        <h3 className={cls.sectionTitle}>Пол автора</h3>
        <div className={cls.optionsList}>
          {genderOptions.map((opt) => (
            <label key={opt.value} className={cls.label}>
              <input
                type="radio"
                name="gender_sidebar"
                className={cls.input}
                checked={gender === opt.value}
                onChange={() => onGenderChange(opt.value)}
              />
              <span className={cls.radioControl}></span>
              {opt.label}
            </label>
          ))}
        </div>
      </section>

      {/* Город */}
      <section className={cls.section}>
        <h3 className={cls.sectionTitle}>Город</h3>
        <div className={cls.optionsList}>
          {visibleCities.map((city) => (
            <Checkbox
              key={city.id}
              label={city.name}
              checked={selectedCityNames.includes(city.name)}
              onChange={() => onCityToggle(city.name)}
            />
          ))}
        </div>
        {cities.length > 5 && (
          <button
            type="button"
            className={cls.showMoreBtn}
            onClick={() => setIsAllCitiesOpen(!isAllCitiesOpen)}
          >
            {isAllCitiesOpen ? 'Свернуть города' : 'Все города'}
            <IconArrow
              className={`${cls.showMoreIcon} ${isAllCitiesOpen ? cls.arrowExpanded : ''}`}
            />
          </button>
        )}
      </section>
    </aside>
  )
}
