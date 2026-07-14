import { useCallback, useEffect, useState } from 'react'

import {
  createSwapRequest,
  getCurrentUserId,
  hasPendingRequest,
} from '../model/exchangeOfferStorage'

interface UseExchangeOfferParams {
  skillId: string
  toUserId: string
}

export const useExchangeOffer = ({ skillId, toUserId }: UseExchangeOfferParams) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExchangeOffered, setIsExchangeOffered] = useState(false)

  useEffect(() => {
    if (!skillId) {
      return
    }

    setIsExchangeOffered(hasPendingRequest(skillId, getCurrentUserId()))
  }, [skillId])

  const openModal = useCallback(() => {
    if (!isExchangeOffered) {
      setIsModalOpen(true)
    }
  }, [isExchangeOffered])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const confirmOffer = useCallback(() => {
    const fromUserId = getCurrentUserId()
    const createdRequest = createSwapRequest({
      skillId,
      fromUserId,
      toUserId,
    })

    if (createdRequest) {
      setIsExchangeOffered(true)
      setIsModalOpen(false)
    }
  }, [skillId, toUserId])

  return {
    isExchangeOffered,
    isModalOpen,
    openModal,
    closeModal,
    confirmOffer,
  }
}
