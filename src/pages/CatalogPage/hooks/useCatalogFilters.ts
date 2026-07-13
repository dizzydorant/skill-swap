// src/pages/CatalogPage/hooks/useCatalogFilters.ts
import { useState } from 'react'
import type { ExchangeType, GenderType } from '../../../widgets/CatalogFilter/model/types'

export const useCatalogFilters = () => {
  const [exchangeType, setExchangeType] = useState<ExchangeType>('all')
  const [gender, setGender] = useState<GenderType>('any')
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<number[]>([])
  const [selectedCityNames, setSelectedCityNames] = useState<string[]>([])

  const handleSubCategoryToggle = (id: number) => {
    setSelectedSubCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const handleCityToggle = (name: string) => {
    setSelectedCityNames((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name],
    )
  }

  const handleResetAll = () => {
    setExchangeType('all')
    setGender('any')
    setSelectedSubCategoryIds([])
    setSelectedCityNames([])
  }

  return {
    exchangeType,
    gender,
    selectedSubCategoryIds,
    selectedCityNames,
    setExchangeType,
    setGender,
    handleSubCategoryToggle,
    handleCityToggle,
    handleResetAll,
  }
}
