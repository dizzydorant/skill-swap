import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import { generateId } from '@/shared/lib/helpers'
import type { RequestStatus, SwapRequest } from '@/shared/types'
import type { RootState } from '@/store'
import { readStorage } from '@/store/storage'

export interface ExchangeRequestsState {
  items: SwapRequest[]
}

interface CreateRequestPayload {
  skillId: string
  fromUserId: string
  toUserId: string
}

interface UpdateRequestStatusPayload {
  requestId: string
  status: RequestStatus
}

const requestStatuses: readonly RequestStatus[] = [
  'pending',
  'accepted',
  'rejected',
  'inProgress',
  'done',
]

const isRequestStatus = (value: unknown): value is RequestStatus =>
  typeof value === 'string' && requestStatuses.includes(value as RequestStatus)

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
    isRequestStatus(request.status) &&
    typeof request.createdAt === 'string' &&
    typeof request.updatedAt === 'string'
  )
}

const isSwapRequests = (value: unknown): value is SwapRequest[] =>
  Array.isArray(value) && value.every(isSwapRequest)

const hasPendingRequest = (
  requests: SwapRequest[],
  skillId: string,
  fromUserId: string,
): boolean =>
  requests.some(
    (request) =>
      request.skillId === skillId &&
      request.fromUserId === fromUserId &&
      request.status === 'pending',
  )

const initialState: ExchangeRequestsState = {
  items: readStorage<SwapRequest[]>(LOCAL_STORAGE_KEYS.REQUESTS, [], isSwapRequests),
}

const exchangeRequestsSlice = createSlice({
  name: 'exchangeRequests',
  initialState,
  reducers: {
    createRequest: {
      reducer: (state, action: PayloadAction<SwapRequest>) => {
        const request = action.payload

        if (
          request.fromUserId === request.toUserId ||
          hasPendingRequest(state.items, request.skillId, request.fromUserId)
        ) {
          return
        }

        state.items.push(request)
      },
      prepare: ({ skillId, fromUserId, toUserId }: CreateRequestPayload) => {
        const now = new Date().toISOString()

        return {
          payload: {
            id: generateId(),
            skillId,
            fromUserId,
            toUserId,
            status: 'pending' as const,
            createdAt: now,
            updatedAt: now,
          },
        }
      },
    },
    updateRequestStatus: (state, action: PayloadAction<UpdateRequestStatusPayload>) => {
      const request = state.items.find((item) => item.id === action.payload.requestId)

      if (!request) {
        return
      }

      request.status = action.payload.status
      request.updatedAt = new Date().toISOString()
    },
    acceptRequest: (state, action: PayloadAction<{ requestId: string }>) => {
      const request = state.items.find((item) => item.id === action.payload.requestId)

      if (!request) {
        return
      }

      request.status = 'accepted'
      request.updatedAt = new Date().toISOString()
    },
    rejectRequest: (state, action: PayloadAction<{ requestId: string }>) => {
      const request = state.items.find((item) => item.id === action.payload.requestId)

      if (!request) {
        return
      }

      request.status = 'rejected'
      request.updatedAt = new Date().toISOString()
    },
    cancelRequest: (state, action: PayloadAction<{ requestId: string }>) => {
      state.items = state.items.filter((request) => request.id !== action.payload.requestId)
    },
  },
})

export const {
  acceptRequest,
  cancelRequest,
  createRequest,
  rejectRequest,
  updateRequestStatus,
} = exchangeRequestsSlice.actions

export const selectAllRequests = (state: RootState): SwapRequest[] => state.exchangeRequests.items

const selectUserIdParam = (_state: RootState, userId: string): string => userId

const selectSkillIdParam = (_state: RootState, skillId: string): string => skillId

const selectFromUserIdParam = (
  _state: RootState,
  _skillId: string,
  fromUserId: string,
): string => fromUserId

export const selectIncomingRequestsByUserId = createSelector(
  [selectAllRequests, selectUserIdParam],
  (requests, userId): SwapRequest[] => requests.filter((request) => request.toUserId === userId),
)

export const selectOutgoingRequestsByUserId = createSelector(
  [selectAllRequests, selectUserIdParam],
  (requests, userId): SwapRequest[] => requests.filter((request) => request.fromUserId === userId),
)

export const selectIncomingPendingRequests = createSelector(
  [selectIncomingRequestsByUserId],
  (requests): SwapRequest[] => requests.filter((request) => request.status === 'pending'),
)

export const selectHasPendingRequest = createSelector(
  [selectAllRequests, selectSkillIdParam, selectFromUserIdParam],
  (requests, skillId, fromUserId): boolean => hasPendingRequest(requests, skillId, fromUserId),
)

export const selectOfferedSkillIds = createSelector(
  [selectOutgoingRequestsByUserId],
  (requests): Set<string> =>
    new Set(
      requests
        .filter((request) => request.status === 'pending')
        .map((request) => request.skillId),
    ),
)

export const selectIncomingRequestsCount = (state: RootState, userId: string): number =>
  selectIncomingPendingRequests(state, userId).length

export const exchangeRequestsReducer = exchangeRequestsSlice.reducer
