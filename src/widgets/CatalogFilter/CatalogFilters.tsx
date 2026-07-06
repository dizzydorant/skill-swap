import { FC, useState, useMemo, useEffect } from 'react'
import { Chip } from '../../shared/ui/Chip'
import { Checkbox } from '@/shared/ui/Checkbox'
import { FilterCategory } from '@/shared/ui/FilterCategory'
import categoriesData from '../../../public/db/categories.json'
import citiesData from '../../../public/db/cities.json'
import { IconArrow } from '@/shared/assets/icons'
import cls from './CatalogFilters.module.css'

// --- ТИПЫ И ИНТЕРФЕЙСЫ ---
interface SubCategory {
  id: number
  name: string
}
interface SkillCategory {
  id: number
  name: string
  iconKey: string
  subCategories: SubCategory[]
}
interface City {
  id: string
  name: string
}

export type ExchangeType = 'all' | 'learn' | 'teach'
export type GenderType = 'any' | 'male' | 'female'

export interface CatalogFiltersValue {
  exchangeType: ExchangeType
  gender: GenderType
  subCategoryIds: number[]
  cityNames: string[]
}

interface CatalogFiltersProps {
  onChange?: (value: CatalogFiltersValue) => void
}

const MOCK_CATEGORIES = categoriesData as SkillCategory[]
const MOCK_CITIES = citiesData as City[]

// --- ВСПОМОГАТЕЛЬНЫЕ ПОДКОМПОНЕНТЫ ---

// 1. Секция Радио-кнопок
interface RadioSectionProps<T extends string> {
  title?: string
  name: string
  options: { value: T; label: string }[]
  selectedValue: T
  onChange: (value: T) => void
}

const RadioSection = <T extends string>({
  title,
  name,
  options,
  selectedValue,
  onChange,
}: RadioSectionProps<T>) => (
  <section className={cls.section}>
    {title && <h3 className={cls.sectionTitle}>{title}</h3>}
    <div className={cls.optionsList}>
      {options.map((opt) => (
        <label key={opt.value} className={cls.label}>
          <input
            type="radio"
            name={name}
            className={cls.input}
            checked={selectedValue === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <span className={cls.radioControl}></span>
          {opt.label}
        </label>
      ))}
    </div>
  </section>
)

// 2. Секция Городов
const CitiesSection: FC<{
  selectedCities: Set<string>
  isOpen: boolean
  onToggleOpen: () => void
  onCityToggle: (name: string) => void
}> = ({ selectedCities, isOpen, onToggleOpen, onCityToggle }) => {
  const visibleCities = isOpen ? MOCK_CITIES : MOCK_CITIES.slice(0, 5)
  return (
    <section className={cls.section}>
      <h3 className={cls.sectionTitle}>Город</h3>
      <div className={cls.optionsList}>
        {visibleCities.map((city) => (
          <Checkbox
            key={city.id}
            label={city.name}
            checked={selectedCities.has(city.name)}
            onChange={() => onCityToggle(city.name)}
          />
        ))}
      </div>
      {MOCK_CITIES.length > 5 && (
        <button type="button" className={cls.showMoreBtn} onClick={onToggleOpen}>
          {isOpen ? 'Свернуть города' : 'Все города'}
          <IconArrow className={`${cls.showMoreIcon} ${isOpen ? cls.arrowExpanded : ''}`} />
        </button>
      )}
    </section>
  )
}

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
export const CatalogFilters: FC<CatalogFiltersProps> = ({ onChange }) => {
  const [exchangeType, setExchangeType] = useState<ExchangeType>('all')
  const [gender, setGender] = useState<GenderType>('any')
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<Set<number>>(new Set())
  const [selectedCityNames, setSelectedCityNames] = useState<Set<string>>(new Set())
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false)
  const [isAllCitiesOpen, setIsAllCitiesOpen] = useState(false)
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Set<number>>(new Set())

  const subCategoriesString = useMemo(
    () => Array.from(selectedSubCategoryIds).join(','),
    [selectedSubCategoryIds],
  )
  const citiesString = useMemo(() => Array.from(selectedCityNames).join(','), [selectedCityNames])

  useEffect(() => {
    if (!onChange) return
    onChange({
      exchangeType,
      gender,
      subCategoryIds: Array.from(selectedSubCategoryIds),
      cityNames: Array.from(selectedCityNames),
    })
  }, [
    exchangeType,
    gender,
    subCategoriesString,
    citiesString,
    onChange,
    selectedSubCategoryIds,
    selectedCityNames,
  ])

  const toggleSet = <T,>(setSetter: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) => {
    setSetter((p) => {
      const n = new Set(p)
      if (n.has(value)) {
        n.delete(value)
      } else {
        n.add(value)
      }
      return n
    })
  }

  const handleParentCategoryToggle = (subCategoryIds: number[]) => {
    setSelectedSubCategoryIds((p) => {
      const n = new Set(p)
      const all = subCategoryIds.every((id) => n.has(id))
      subCategoryIds.forEach((id) => {
        if (all) {
          n.delete(id)
        } else {
          n.add(id)
        }
      })
      return n
    })
  }

  const handleResetAll = () => {
    setExchangeType('all')
    setGender('any')
    setSelectedSubCategoryIds(new Set())
    setSelectedCityNames(new Set())
  }

  const selectedSubCategories = useMemo(
    () =>
      MOCK_CATEGORIES.flatMap((c) => c.subCategories).filter((s) =>
        selectedSubCategoryIds.has(s.id),
      ),
    [selectedSubCategoryIds],
  )

  const totalActiveCount =
    (exchangeType !== 'all' ? 1 : 0) +
    (gender !== 'any' ? 1 : 0) +
    selectedSubCategoryIds.size +
    selectedCityNames.size

  const exchangeOptions = [
    { value: 'all', label: 'Всё' },
    { value: 'learn', label: 'Хочу научиться' },
    { value: 'teach', label: 'Могу научить' },
  ]

  const genderOptions = [
    { value: 'any', label: 'Не имеет значения' },
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
  ]

  return (
    <div className={cls.container}>
      {/* ВЕРХНЯЯ ПАНЕЛЬ С ЧИПСАМИ */}
      <div className={cls.topPanel}>
        <span className={cls.filterTitleCount}>Фильтры ({totalActiveCount})</span>
        {totalActiveCount > 0 && (
          <button type="button" className={cls.resetBtn} onClick={handleResetAll}>
            Сбросить ✕
          </button>
        )}

        {exchangeType !== 'all' && (
          <Chip
            label={exchangeType === 'learn' ? 'Хочу научиться' : 'Могу научить'}
            size="md"
            onDelete={() => setExchangeType('all')}
          />
        )}
        {selectedSubCategories.map((s) => (
          <Chip
            key={s.id}
            label={s.name}
            size="md"
            onDelete={() => toggleSet(setSelectedSubCategoryIds, s.id)}
          />
        ))}
        {gender !== 'any' && (
          <Chip
            label={gender === 'male' ? 'Мужской' : 'Женский'}
            size="md"
            onDelete={() => setGender('any')}
          />
        )}
        {[...selectedCityNames].map((name) => (
          <Chip
            key={name}
            label={name}
            size="md"
            onDelete={() => toggleSet(setSelectedCityNames, name)}
          />
        ))}
      </div>

      {/* САЙДБАР ФИЛЬТРОВ */}
      <aside className={cls.filtersSidebar}>
        <RadioSection
          name="exchange"
          options={exchangeOptions}
          selectedValue={exchangeType}
          onChange={(val) => setExchangeType(val as ExchangeType)}
        />

        {/* Навыки */}
        <section className={cls.section}>
          <h3 className={cls.sectionTitle}>Навыки</h3>
          <div className={cls.optionsList}>
            {(isAllCategoriesOpen ? MOCK_CATEGORIES : MOCK_CATEGORIES.slice(0, 3)).map((cat) => {
              const subIds = cat.subCategories.map((s) => s.id)
              const selCount = cat.subCategories.filter((s) =>
                selectedSubCategoryIds.has(s.id),
              ).length
              return (
                <FilterCategory
                  key={cat.id}
                  label={cat.name}
                  checked={selCount === cat.subCategories.length && cat.subCategories.length > 0}
                  indeterminate={selCount > 0 && selCount < cat.subCategories.length}
                  isExpanded={expandedCategoryIds.has(cat.id)}
                  hasChildren={cat.subCategories.length > 0}
                  onCheckboxChange={() => handleParentCategoryToggle(subIds)}
                  onToggleExpand={() => toggleSet(setExpandedCategoryIds, cat.id)}
                >
                  {cat.subCategories.map((sub) => (
                    <Checkbox
                      key={sub.id}
                      label={sub.name}
                      checked={selectedSubCategoryIds.has(sub.id)}
                      onChange={() => toggleSet(setSelectedSubCategoryIds, sub.id)}
                    />
                  ))}
                </FilterCategory>
              )
            })}
          </div>
          {MOCK_CATEGORIES.length > 3 && (
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

        <RadioSection
          title="Пол автора"
          name="gender"
          options={genderOptions}
          selectedValue={gender}
          onChange={(val) => setGender(val as GenderType)}
        />

        <CitiesSection
          selectedCities={selectedCityNames}
          isOpen={isAllCitiesOpen}
          onToggleOpen={() => setIsAllCitiesOpen(!isAllCitiesOpen)}
          onCityToggle={(name) => toggleSet(setSelectedCityNames, name)}
        />
      </aside>
    </div>
  )
}
