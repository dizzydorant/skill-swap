export type ExchangeType = 'all' | 'learn' | 'teach'
export type GenderType = 'any' | 'male' | 'female'

export interface CatalogFiltersValue {
  exchangeType: ExchangeType
  gender: GenderType
  subCategoryIds: number[]
  cityNames: string[]
}

export interface SubCategory {
  id: number
  name: string
}

export interface SkillCategory {
  id: number
  name: string
  iconKey: string
  subCategories: SubCategory[]
}

export interface City {
  id: string
  name: string
}
