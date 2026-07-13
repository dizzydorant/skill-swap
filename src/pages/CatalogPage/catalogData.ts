import type { ChipItem } from '@/shared/ui/ChipList'
import type { SkillSectionCard } from '@/widgets/SkillSection'
import type {
  City,
  ExchangeType,
  GenderType,
  SkillCategory,
} from '@/widgets/CatalogFilter/model/types'

export interface CatalogUser {
  id: string
  fullName: string
  sex?: string
  birthday?: string
  avatarUrl: string | null
  location?: string
  wantedSkillIds?: string[]
}

export interface CatalogSkill {
  id: string
  title: string
  categoryId: number
  subCategoryId: number
  tags?: string[]
  authorId: string
  likesCount: number
  createdAt: string
}

export interface CatalogDbData {
  users: CatalogUser[]
  skills: CatalogSkill[]
  categories: SkillCategory[]
  cities: City[]
}

export interface CatalogFilterState {
  exchangeType: ExchangeType
  gender: GenderType
  selectedSubCategoryIds: number[]
  selectedCityNames: string[]
}

export interface PreparedCatalogSections {
  categories: SkillCategory[]
  cities: City[]
  popularCards: SkillSectionCard[]
  newCards: SkillSectionCard[]
  recommendedCards: SkillSectionCard[]
}

interface CatalogCard extends SkillSectionCard {
  skillId: string
  authorId: string
  authorSex: GenderType
  authorCity: string
  teachSubCategoryIds: number[]
  wantedSubCategoryIds: number[]
  mainSubCategoryId: number
  createdAt: string
}

const TOP_SECTION_CARD_COUNT = 6
const CHIP_BACKGROUND_COLORS = ['#f7e7f2', '#e8f2ff', '#e9f7e7', '#fff5d9', '#f0ecff', '#e9f7f7']
const CHIP_TEXT_COLOR = '#253017'

export const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`)
  }

  return (await response.json()) as T
}

export const prepareCatalogSections = (
  data: CatalogDbData,
  filters: CatalogFilterState,
): PreparedCatalogSections => {
  const userById = new Map(data.users.map((user) => [user.id, user]))
  const skillById = new Map(data.skills.map((skill) => [skill.id, skill]))
  const skillsByAuthorId = createSkillsByAuthorId(data.skills)
  const filteredCards = createCatalogCards(data.skills, userById, skillById, skillsByAuthorId).filter(
    (card) => matchesFilters(card, filters),
  )

  const popularCards = takeUniqueAuthors(
    [...filteredCards].sort(
      (first, second) => (second.likesCount ?? 0) - (first.likesCount ?? 0),
    ),
    TOP_SECTION_CARD_COUNT,
  )

  const newCards = takeUniqueAuthors(
    [...filteredCards].sort(
      (first, second) =>
        new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
    ),
    TOP_SECTION_CARD_COUNT,
  )

  const usedSkillIds = new Set([...popularCards, ...newCards].map((card) => card.skillId))
  const recommendedCards = takeUniqueAuthors(
    stableShuffle(filteredCards.filter((card) => !usedSkillIds.has(card.skillId))),
  )

  return {
    categories: data.categories,
    cities: data.cities,
    popularCards: toSkillSectionCards(popularCards),
    newCards: toSkillSectionCards(newCards),
    recommendedCards: toSkillSectionCards(recommendedCards),
  }
}

const createCatalogCards = (
  skills: CatalogSkill[],
  userById: Map<string, CatalogUser>,
  skillById: Map<string, CatalogSkill>,
  skillsByAuthorId: Map<string, CatalogSkill[]>,
): CatalogCard[] =>
  skills.flatMap((skill) => {
    const author = userById.get(skill.authorId)

    if (!author) {
      return []
    }

    const teachSkills = skillsByAuthorId.get(author.id) ?? []
    const wantedSkills = (author.wantedSkillIds ?? [])
      .map((skillId) => skillById.get(skillId))
      .filter(isCatalogSkill)

    return [
      {
        id: skill.id,
        skillId: skill.id,
        authorId: author.id,
        authorSex: normalizeGender(author.sex),
        authorCity: author.location ?? '',
        mainSubCategoryId: skill.subCategoryId,
        teachSubCategoryIds: teachSkills.map((teachSkill) => teachSkill.subCategoryId),
        wantedSubCategoryIds: wantedSkills.map((wantedSkill) => wantedSkill.subCategoryId),
        createdAt: skill.createdAt,
        user: {
          name: author.fullName,
          city: author.location ?? '',
          age: getAgeFromBirthday(author.birthday),
          avatar: author.avatarUrl ?? undefined,
        },
        teachSkills: teachSkills.map(createChip),
        learnSkills: wantedSkills.map(createChip),
        likesCount: skill.likesCount,
      },
    ]
  })

const createSkillsByAuthorId = (skills: CatalogSkill[]): Map<string, CatalogSkill[]> => {
  const skillsByAuthorId = new Map<string, CatalogSkill[]>()

  skills.forEach((skill) => {
    const authorSkills = skillsByAuthorId.get(skill.authorId) ?? []
    skillsByAuthorId.set(skill.authorId, [...authorSkills, skill])
  })

  return skillsByAuthorId
}

const createChip = (skill: CatalogSkill): ChipItem => ({
  id: skill.id,
  label: skill.tags?.[0] ?? skill.title,
  bgColorFromDb: CHIP_BACKGROUND_COLORS[skill.categoryId % CHIP_BACKGROUND_COLORS.length],
  textColorFromDb: CHIP_TEXT_COLOR,
})

const isCatalogSkill = (skill: CatalogSkill | undefined): skill is CatalogSkill => Boolean(skill)

const normalizeGender = (sex: string | undefined): GenderType => {
  if (sex === 'male' || sex === 'female') {
    return sex
  }

  return 'any'
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

const matchesFilters = (card: CatalogCard, filters: CatalogFilterState): boolean => {
  const matchesGender = filters.gender === 'any' || card.authorSex === filters.gender
  const matchesCity =
    filters.selectedCityNames.length === 0 ||
    filters.selectedCityNames.includes(card.authorCity)
  const matchesCategory = matchesCategoryFilter(card, filters)

  return matchesGender && matchesCity && matchesCategory
}

const matchesCategoryFilter = (card: CatalogCard, filters: CatalogFilterState): boolean => {
  if (filters.selectedSubCategoryIds.length === 0) {
    return true
  }

  const selectedIds = new Set(filters.selectedSubCategoryIds)

  if (filters.exchangeType === 'teach') {
    return card.teachSubCategoryIds.some((id) => selectedIds.has(id))
  }

  if (filters.exchangeType === 'learn') {
    return card.wantedSubCategoryIds.some((id) => selectedIds.has(id))
  }

  return (
    selectedIds.has(card.mainSubCategoryId) ||
    card.teachSubCategoryIds.some((id) => selectedIds.has(id)) ||
    card.wantedSubCategoryIds.some((id) => selectedIds.has(id))
  )
}

const takeUniqueAuthors = (cards: CatalogCard[], limit = Number.POSITIVE_INFINITY): CatalogCard[] => {
  const usedAuthorIds = new Set<string>()
  const result: CatalogCard[] = []

  for (const card of cards) {
    if (usedAuthorIds.has(card.authorId)) {
      continue
    }

    usedAuthorIds.add(card.authorId)
    result.push(card)

    if (result.length === limit) {
      break
    }
  }

  return result
}

const stableShuffle = (cards: CatalogCard[]): CatalogCard[] =>
  [...cards].sort((first, second) => getStableScore(first.skillId) - getStableScore(second.skillId))

const getStableScore = (value: string): number => {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 9973
  }

  return hash
}

const toSkillSectionCards = (cards: CatalogCard[]): SkillSectionCard[] =>
  cards.map((card) => ({
    id: card.id,
    user: card.user,
    teachSkills: card.teachSkills,
    learnSkills: card.learnSkills,
    likesCount: card.likesCount,
  }))
