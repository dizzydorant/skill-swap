import { getAuthUser } from '@/features/auth/model/authUtils'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import { generateId } from '@/shared/lib/helpers'
import type { SwapRequest } from '@/shared/types'

const GUEST_USER_ID = 'guest'

const isSwapRequest = (value: unknown): value is SwapRequest => {
  if (!value || typeof value !== 'object') {
    return false
  }

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
  if (!Array.isArray(data)) {
    return []
  }

  return data.filter(isSwapRequest)
}

export const getCurrentUserId = (): string => {
  return getAuthUser()?.id ?? GUEST_USER_ID
}

export const getSwapRequests = (): SwapRequest[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.REQUESTS)

    if (!raw) {
      return []
    }

    return parseSwapRequests(JSON.parse(raw))
  } catch {
    return []
  }
}

export const saveSwapRequests = (requests: SwapRequest[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.REQUESTS, JSON.stringify(requests))
  } catch {
    console.error(`Failed to save to localStorage: ${LOCAL_STORAGE_KEYS.REQUESTS}`)
  }
}

export const hasPendingRequest = (skillId: string, fromUserId: string): boolean => {
  return getSwapRequests().some(
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
  if (hasPendingRequest(skillId, fromUserId)) {
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

  const requests = getSwapRequests()
  saveSwapRequests([...requests, newRequest])

  return newRequest
}
