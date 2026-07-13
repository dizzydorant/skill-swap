import { FC, useMemo } from 'react'
import { Chip } from '@/shared/ui/Chip'
import type { ExchangeType, GenderType, SkillCategory } from '../model/types'
import cls from '../CatalogFilters.module.css'

interface CatalogSelectedChipsProps {
  exchangeType: ExchangeType
  gender: GenderType
  selectedSubCategoryIds: number[]
  selectedCityNames: string[]
  categories: SkillCategory[] // Передаем список категорий для поиска имен
  onExchangeChange: (value: ExchangeType) => void
  onGenderChange: (value: GenderType) => void
  onSubCategoryToggle: (id: number) => void
  onCityToggle: (name: string) => void
  onResetAll: () => void
}

export const CatalogSelectedChips: FC<CatalogSelectedChipsProps> = ({
  exchangeType,
  gender,
  selectedSubCategoryIds,
  selectedCityNames,
  categories,
  onExchangeChange,
  onGenderChange,
  onSubCategoryToggle,
  onCityToggle,
  onResetAll,
}) => {
  const selectedSubCategories = useMemo(
    () =>
      categories
        .flatMap((c) => c.subCategories)
        .filter((s) => selectedSubCategoryIds.includes(s.id)),
    [categories, selectedSubCategoryIds],
  )

  const totalActiveCount =
    (exchangeType !== 'all' ? 1 : 0) +
    (gender !== 'any' ? 1 : 0) +
    selectedSubCategoryIds.length +
    selectedCityNames.length

  return (
    <div className={cls.topPanel}>
      <span className={cls.filterTitleCount}>Фильтры ({totalActiveCount})</span>
      {totalActiveCount > 0 && (
        <button type="button" className={cls.resetBtn} onClick={onResetAll}>
          Сбросить ✕
        </button>
      )}

      {exchangeType !== 'all' && (
        <Chip
          label={exchangeType === 'learn' ? 'Хочу научиться' : 'Могу научить'}
          size="md"
          onDelete={() => onExchangeChange('all')}
        />
      )}
      {selectedSubCategories.map((s) => (
        <Chip key={s.id} label={s.name} size="md" onDelete={() => onSubCategoryToggle(s.id)} />
      ))}
      {gender !== 'any' && (
        <Chip
          label={gender === 'male' ? 'Мужской' : 'Женский'}
          size="md"
          onDelete={() => onGenderChange('any')}
        />
      )}
      {selectedCityNames.map((name) => (
        <Chip key={name} label={name} size="md" onDelete={() => onCityToggle(name)} />
      ))}
    </div>
  )
}
