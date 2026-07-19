import type { AuthUser } from '@/shared/types'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import type { ProfileOverridesByUserId } from '@/features/profile/model/types'

interface MockUser {
  id: string
  email: string
  password: string
  fullName?: string
  name?: string
  avatarUrl?: string | null
  createdAt?: string
}

export interface RegisteredUser {
  id: string
  email: string
  password: string
  name: string
  avatarUrl: string | null
  createdAt: string
  birthday: string | null
  gender: string
  city: string
  cityName?: string
  learnCategoryId: string
  learnSubCategoryId: string
  learnCategoryName?: string
  learnSubCategoryName?: string
  offeredSkill: RegisteredSkill
}

export interface RegisteredSkill {
  title: string
  categoryId: string
  subCategoryId: string
  categoryName: string
  subCategoryName: string
  description: string
  images: string[]
}

export interface RegisterUserData {
  email: string
  password: string
  name: string
  birthday: Date | null
  gender: string
  city: string
  cityName: string
  categoryId: string
  subCategoryId: string
  categoryName: string
  subCategoryName: string
  avatarUrl: string | null
  offeredSkill: RegisteredSkill
}

export interface RegisteredSkillPageUser {
  id: string
  fullName: string
  sex?: string
  birthday?: string
  avatarUrl: string | null
  location?: string
  bio?: string
  wantedSkillTitles?: string[]
  wantedSkillIds?: string[]
}

export interface RegisteredSkillPageSkill {
  id: string
  title: string
  description: string
  type: 'teach'
  categoryId: number
  subCategoryId: number
  tags: string[]
  imageUrl: string | null
  images: string[]
  authorId: string
  likedByUserIds: string[]
  likesCount: number
  createdAt: string
  updatedAt: string
}

export interface RegisteredSkillPageData {
  users: RegisteredSkillPageUser[]
  skills: RegisteredSkillPageSkill[]
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

let mockUsersPromise: Promise<MockUser[]> | null = null

export const normalizeEmail = (email: string): string => email.trim().toLowerCase()

const canUseLocalStorage = (): boolean =>
  typeof window !== 'undefined' && Boolean(window.localStorage)

const isRegisteredSkill = (value: unknown): value is RegisteredSkill => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const skill = value as Record<string, unknown>

  return (
    typeof skill.title === 'string' &&
    typeof skill.categoryId === 'string' &&
    typeof skill.subCategoryId === 'string' &&
    typeof skill.categoryName === 'string' &&
    typeof skill.subCategoryName === 'string' &&
    typeof skill.description === 'string' &&
    Array.isArray(skill.images) &&
    skill.images.every((image) => typeof image === 'string')
  )
}

export const isRegisteredUser = (value: unknown): value is RegisteredUser => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const user = value as Record<string, unknown>

  return (
    typeof user.id === 'string' &&
    typeof user.email === 'string' &&
    typeof user.password === 'string' &&
    typeof user.name === 'string' &&
    (typeof user.avatarUrl === 'string' || user.avatarUrl === null) &&
    typeof user.createdAt === 'string' &&
    (typeof user.birthday === 'string' || user.birthday === null) &&
    typeof user.gender === 'string' &&
    typeof user.city === 'string' &&
    (typeof user.cityName === 'string' || user.cityName === undefined) &&
    typeof user.learnCategoryId === 'string' &&
    typeof user.learnSubCategoryId === 'string' &&
    (typeof user.learnCategoryName === 'string' || user.learnCategoryName === undefined) &&
    (typeof user.learnSubCategoryName === 'string' || user.learnSubCategoryName === undefined) &&
    isRegisteredSkill(user.offeredSkill)
  )
}

export const isAuthUser = (value: unknown): value is AuthUser => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const user = value as Record<string, unknown>

  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string' &&
    typeof user.token === 'string' &&
    (typeof user.avatarUrl === 'string' || user.avatarUrl === null || user.avatarUrl === undefined) &&
    !('password' in user)
  )
}

const getMockUsers = async (): Promise<MockUser[]> => {
  mockUsersPromise ??= fetch('/db/users.json').then(async (response) => {
    if (!response.ok) {
      throw new AuthError('Не удалось загрузить mock-пользователей')
    }

    return (await response.json()) as MockUser[]
  })

  return mockUsersPromise
}

const getDisplayName = (user: MockUser | RegisteredUser): string => {
  if ('name' in user && user.name) {
    return user.name
  }

  return 'fullName' in user && user.fullName ? user.fullName : user.email
}

const toAuthUser = (user: MockUser | RegisteredUser): AuthUser => ({
  id: user.id,
  name: getDisplayName(user),
  email: normalizeEmail(user.email),
  avatarUrl: user.avatarUrl ?? null,
  token: `mock_token_${user.id}`,
})

const emailHash = (email: string): string => {
  let hash = 0

  for (let index = 0; index < email.length; index += 1) {
    hash = (hash * 31 + email.charCodeAt(index)) >>> 0
  }

  return hash.toString(36)
}

const parseNumericId = (value: string): number => {
  const numericValue = Number(value)

  return Number.isFinite(numericValue) ? numericValue : 0
}

export const getRegisteredUserSkillId = (userId: string): string => `registered-skill-${userId}`

export function getRegisteredSkillPageData(
  users: RegisteredUser[],
  overridesByUserId: ProfileOverridesByUserId = {},
): RegisteredSkillPageData {
  return {
    users: users.map((user) => {
      const wantedSkillTitle = user.learnSubCategoryName || user.learnCategoryName
      const profileOverride = overridesByUserId[user.id]

      return {
        id: user.id,
        fullName: profileOverride?.fullName ?? user.name,
        sex: profileOverride?.sex ?? user.gender,
        birthday: profileOverride?.birthday || user.birthday || undefined,
        avatarUrl: profileOverride?.avatarUrl ?? user.avatarUrl,
        location: profileOverride?.location || user.cityName || user.city,
        bio: profileOverride?.bio ?? '',
        wantedSkillTitles: wantedSkillTitle ? [wantedSkillTitle] : [],
        wantedSkillIds: [],
      }
    }),
    skills: users.map((user) => ({
      id: getRegisteredUserSkillId(user.id),
      title: user.offeredSkill.title,
      description: user.offeredSkill.description,
      type: 'teach',
      categoryId: parseNumericId(user.offeredSkill.categoryId),
      subCategoryId: parseNumericId(user.offeredSkill.subCategoryId),
      tags: [
        user.offeredSkill.subCategoryName ||
          user.offeredSkill.categoryName ||
          user.offeredSkill.title,
      ],
      imageUrl: user.offeredSkill.images[0] ?? null,
      images: user.offeredSkill.images,
      authorId: user.id,
      likedByUserIds: [],
      likesCount: 0,
      createdAt: user.createdAt,
      updatedAt: user.createdAt,
    })),
  }
}

export function markCreatedSkillSuccess(skillId: string): void {
  if (!canUseLocalStorage()) {
    return
  }

  localStorage.setItem(LOCAL_STORAGE_KEYS.CREATED_SKILL_SUCCESS, skillId)
}

export function getCreatedSkillSuccessSkillId(): string | null {
  if (!canUseLocalStorage()) {
    return null
  }

  return localStorage.getItem(LOCAL_STORAGE_KEYS.CREATED_SKILL_SUCCESS)
}

export function clearCreatedSkillSuccess(): void {
  if (!canUseLocalStorage()) {
    return
  }

  localStorage.removeItem(LOCAL_STORAGE_KEYS.CREATED_SKILL_SUCCESS)
}

export async function isEmailTaken(
  email: string,
  registeredUsers: RegisteredUser[] = [],
): Promise<boolean> {
  const normalizedEmail = normalizeEmail(email)
  const mockUsers = await getMockUsers()

  return [...mockUsers, ...registeredUsers].some(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  )
}

export interface RegisterUserResult {
  authUser: AuthUser
  registeredUser: RegisteredUser
}

export async function registerUser(
  data: RegisterUserData,
  registeredUsers: RegisteredUser[] = [],
): Promise<RegisterUserResult> {
  const normalizedEmail = normalizeEmail(data.email)

  if (await isEmailTaken(normalizedEmail, registeredUsers)) {
    throw new AuthError('Пользователь с таким email уже существует')
  }

  const newUser: RegisteredUser = {
    id: `registered-${emailHash(normalizedEmail)}`,
    email: normalizedEmail,
    password: data.password,
    name: data.name.trim() || normalizedEmail,
    avatarUrl: data.avatarUrl,
    createdAt: new Date().toISOString(),
    birthday: data.birthday ? data.birthday.toISOString() : null,
    gender: data.gender,
    city: data.city,
    cityName: data.cityName,
    learnCategoryId: data.categoryId,
    learnSubCategoryId: data.subCategoryId,
    learnCategoryName: data.categoryName,
    learnSubCategoryName: data.subCategoryName,
    offeredSkill: data.offeredSkill,
  }

  return {
    authUser: toAuthUser(newUser),
    registeredUser: newUser,
  }
}

export async function login(
  email: string,
  password: string,
  registeredUsers: RegisteredUser[] = [],
): Promise<AuthUser> {
  const normalizedEmail = normalizeEmail(email)
  const mockUsers = await getMockUsers()
  const user = [...mockUsers, ...registeredUsers].find(
    (item) => normalizeEmail(item.email) === normalizedEmail,
  )

  if (!user || user.password !== password) {
    throw new AuthError('Неверный email или пароль')
  }

  return toAuthUser(user)
}
