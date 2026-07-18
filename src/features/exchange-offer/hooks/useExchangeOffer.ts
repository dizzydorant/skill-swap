import { useCallback, useState } from 'react'

import { selectCurrentUserId } from '@/features/auth/model/authSlice'
import { useAppDispatch, useAppSelector } from '@/store'

import {
  createRequest,
  selectHasPendingRequest,
} from '../model/exchangeRequestsSlice'

interface UseExchangeOfferParams {
  skillId: string
  toUserId: string
}

export const useExchangeOffer = ({ skillId, toUserId }: UseExchangeOfferParams) => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector(selectCurrentUserId)
  const isExchangeOffered = useAppSelector((state) =>
    currentUserId && skillId ? selectHasPendingRequest(state, skillId, currentUserId) : false,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const canCreateRequest = Boolean(
    currentUserId && skillId && toUserId && currentUserId !== toUserId && !isExchangeOffered,
  )

  const openModal = useCallback(() => {
    if (canCreateRequest) {
      setIsModalOpen(true)
    }
  }, [canCreateRequest])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const confirmOffer = useCallback(() => {
    if (!currentUserId || !canCreateRequest) {
      setIsModalOpen(false)
      return
    }

    dispatch(
      createRequest({
        skillId,
        fromUserId: currentUserId,
        toUserId,
      }),
    )
    setIsModalOpen(false)
  }, [canCreateRequest, currentUserId, dispatch, skillId, toUserId])

  return {
    isExchangeOffered,
    isModalOpen,
    openModal,
    closeModal,
    confirmOffer,
  }
}
