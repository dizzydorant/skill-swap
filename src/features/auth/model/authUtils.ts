import type { AuthUser } from '@/shared/types'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

const AUTH_STORAGE_EVENT = 'skillswap-auth-storage'

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
  learnCategoryId: string
  learnSubCategoryId: string
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
  categoryId: string
  subCategoryId: string
  avatarUrl: string | null
  offeredSkill: RegisteredSkill
}

export interface SavedProfileData {
  id: string
  email: string
  fullName: string
  sex: 'male' | 'female' | 'other' | ''
  birthday: string
  avatarUrl: string | null
  location: string
  bio: string
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

let mockUsersPromise: Promise<MockUser[]> | null = null

export const normalizeEmail = (email: string): string => email.trim().toLowerCase()

const canUseLocalStorage = (): boolean => typeof window !== 'undefined' && Boolean(window.localStorage)

const notifyAuthStorageChanged = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_STORAGE_EVENT))
  }
}

export const subscribeToAuthStorage = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === LOCAL_STORAGE_KEYS.AUTH_USER) {
      callback()
    }
  }

  window.addEventListener(AUTH_STORAGE_EVENT, callback)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(AUTH_STORAGE_EVENT, callback)
    window.removeEventListener('storage', handleStorage)
  }
}

const parseArray = <T>(raw: string | null, guard: (value: unknown) => value is T): T[] => {
  if (!raw) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(guard) : []
  } catch {
    return []
  }
}

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

const isRegisteredUser = (value: unknown): value is RegisteredUser => {
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
    typeof user.learnCategoryId === 'string' &&
    typeof user.learnSubCategoryId === 'string' &&
    isRegisteredSkill(user.offeredSkill)
  )
}

const isAuthUser = (value: unknown): value is AuthUser => {
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

const isSavedProfileData = (value: unknown): value is SavedProfileData => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const profile = value as Record<string, unknown>

  return (
    typeof profile.id === 'string' &&
    typeof profile.email === 'string' &&
    typeof profile.fullName === 'string' &&
    (profile.sex === 'male' ||
      profile.sex === 'female' ||
      profile.sex === 'other' ||
      profile.sex === '') &&
    typeof profile.birthday === 'string' &&
    (typeof profile.avatarUrl === 'string' || profile.avatarUrl === null) &&
    typeof profile.location === 'string' &&
    typeof profile.bio === 'string'
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

const saveRegisteredUsers = (users: RegisteredUser[]): void => {
  if (!canUseLocalStorage()) {
    return
  }

  localStorage.setItem(LOCAL_STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users))
}

const emailHash = (email: string): string => {
  let hash = 0

  for (let index = 0; index < email.length; index += 1) {
    hash = (hash * 31 + email.charCodeAt(index)) >>> 0
  }

  return hash.toString(36)
}

export function getAuthUser(): AuthUser | null {
  if (!canUseLocalStorage()) {
    return null
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER)
    const parsed: unknown = raw ? JSON.parse(raw) : null

    return isAuthUser(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveAuthUser(user: Omit<AuthUser, 'token'>): AuthUser {
  const authUser: AuthUser = { ...user, token: `mock_token_${user.id}` }

  if (canUseLocalStorage()) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser))
    notifyAuthStorageChanged()
  }

  return authUser
}

export function getRegisteredUsers(): RegisteredUser[] {
  if (!canUseLocalStorage()) {
    return []
  }

  return parseArray(localStorage.getItem(LOCAL_STORAGE_KEYS.REGISTERED_USERS), isRegisteredUser)
}

export function getProfileOverrides(): SavedProfileData[] {
  if (!canUseLocalStorage()) {
    return []
  }

  return parseArray(
    localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE_OVERRIDES),
    isSavedProfileData,
  )
}

export function saveProfileOverride(profile: SavedProfileData): void {
  if (!canUseLocalStorage()) {
    return
  }

  const nextProfiles = [
    ...getProfileOverrides().filter((currentProfile) => currentProfile.id !== profile.id),
    profile,
  ]

  localStorage.setItem(LOCAL_STORAGE_KEYS.PROFILE_OVERRIDES, JSON.stringify(nextProfiles))
}

export async function isEmailTaken(email: string): Promise<boolean> {
  const normalizedEmail = normalizeEmail(email)
  const [mockUsers, registeredUsers] = await Promise.all([getMockUsers(), Promise.resolve(getRegisteredUsers())])

  return [...mockUsers, ...registeredUsers].some(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  )
}

export async function registerUser(data: RegisterUserData): Promise<AuthUser> {
  const normalizedEmail = normalizeEmail(data.email)

  if (await isEmailTaken(normalizedEmail)) {
    throw new AuthError('Пользователь с таким email уже существует')
  }

  const registeredUsers = getRegisteredUsers()
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
    learnCategoryId: data.categoryId,
    learnSubCategoryId: data.subCategoryId,
    offeredSkill: data.offeredSkill,
  }

  saveRegisteredUsers([...registeredUsers, newUser])

  return saveAuthUser(toAuthUser(newUser))
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const normalizedEmail = normalizeEmail(email)
  const [mockUsers, registeredUsers] = await Promise.all([getMockUsers(), Promise.resolve(getRegisteredUsers())])
  const user = [...mockUsers, ...registeredUsers].find(
    (item) => normalizeEmail(item.email) === normalizedEmail,
  )

  if (!user || user.password !== password) {
    throw new AuthError('Неверный email или пароль')
  }

  return saveAuthUser(toAuthUser(user))
}

export function logout(): void {
  if (canUseLocalStorage()) {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_USER)
    notifyAuthStorageChanged()
  }
}

export function clearAuthUser(): void {
  logout()
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthUser())
}
