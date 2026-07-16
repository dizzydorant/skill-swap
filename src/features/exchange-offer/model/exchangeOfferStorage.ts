import { getAuthUser } from '@/features/auth/model/authUtils'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import { generateId } from '@/shared/lib/helpers'
import type { SwapRequest } from '@/shared/types'

const GUEST_USER_ID = 'guest'
const REQUESTS_STORAGE_EVENT = 'skillswap-requests-storage'

let requestsCache: SwapRequest[] | null = null

const isSwapRequest = (value: unknown): value is SwapRequest => {
  if (!value || typeof value !== 'object') return false
  const request = value as Record<string, unknown>
  return (
    typeof request.id === 'string' &&
    typeof request.skillId === 'string' &&
    typeof request.fromUserId === 'string' &&
    typeof request.toUserId === 'string' &&
    typeof request.status === 'string' &&
    typeof request.createdAt === 'string' &&
    typeof request.updatedAt === 'string'
  )
}

export const parseSwapRequests = (data: unknown): SwapRequest[] => {
  return Array.isArray(data) ? data.filter(isSwapRequest) : []
}

const notifyRequestsChanged = (): void => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(REQUESTS_STORAGE_EVENT))
  }
}

export const subscribeToSwapRequestsStorage = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') return () => undefined

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === LOCAL_STORAGE_KEYS.REQUESTS) {
      requestsCache = null
      callback()
    }
  }

  const handleCustomEvent = () => {
    requestsCache = null
    callback()
  }

  window.addEventListener(REQUESTS_STORAGE_EVENT, handleCustomEvent)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(REQUESTS_STORAGE_EVENT, handleCustomEvent)
    window.removeEventListener('storage', handleStorage)
  }
}

export const getCurrentUserId = (): string => {
  return getAuthUser()?.id ?? GUEST_USER_ID
}

export const getSwapRequests = (): SwapRequest[] => {
  if (requestsCache !== null) {
    return requestsCache
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.REQUESTS)
    if (!raw) {
      requestsCache = []
      return []
    }
    requestsCache = parseSwapRequests(JSON.parse(raw))
    return requestsCache
  } catch {
    return []
  }
}

export const saveSwapRequests = (requests: SwapRequest[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.REQUESTS, JSON.stringify(requests))
    requestsCache = requests
    notifyRequestsChanged()
  } catch {
    console.error(`Failed to save to localStorage: ${LOCAL_STORAGE_KEYS.REQUESTS}`)
  }
}

export const hasPendingRequest = (
  skillId: string,
  fromUserId: string,
  currentRequests?: SwapRequest[],
): boolean => {
  const list = currentRequests ?? getSwapRequests()
  return list.some(
    (request) =>
      request.skillId === skillId &&
      request.fromUserId === fromUserId &&
      request.status === 'pending',
  )
}

interface CreateSwapRequestParams {
  skillId: string
  fromUserId: string
  toUserId: string
}

export const createSwapRequest = ({
  skillId,
  fromUserId,
  toUserId,
}: CreateSwapRequestParams): SwapRequest | null => {
  const requests = getSwapRequests()

  // Передаем текущий массив, избегая повторного парсинга внутри hasPendingRequest
  if (hasPendingRequest(skillId, fromUserId, requests)) {
    return null
  }

  const now = new Date().toISOString()
  const newRequest: SwapRequest = {
    id: generateId(),
    skillId,
    fromUserId,
    toUserId,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  }

  saveSwapRequests([...requests, newRequest])
  return newRequest
}

export const getIncomingSwapRequests = (userId: string): SwapRequest[] => {
  requestsCache = null
  return getSwapRequests().filter(
    (request) => request.toUserId === userId && request.status === 'pending',
  )
}
