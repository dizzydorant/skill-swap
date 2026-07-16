import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthUser } from '@/features/auth/model/useAuthUser'
import { useFavorites } from '@/features/favorites/hooks/useFavorites'
import { ROUTES } from '@/shared/lib/constants'
import {
  getCurrentUserId,
  getIncomingSwapRequests,
  subscribeToSwapRequestsStorage,
} from '@/features/exchange-offer/model/exchangeOfferStorage'
import type { HeaderProps } from '../Header'

export const useHeader = (props: HeaderProps) => {
  const {
    user,
    onSearchChange,
    onLoginClick,
    onRegisterClick,
    onFavoritesClick,
    onNotificationsClick,
    onProfileClick,
    onLogoutClick,
  } = props

  const navigate = useNavigate()
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)
  const { user: authUser, logout } = useAuthUser()
  const { favoriteIds } = useFavorites()

  const currentUserId = getCurrentUserId()
  const [exchangeRequestsCount, setExchangeRequestsCount] = useState(
    () => getIncomingSwapRequests(currentUserId).length,
  )

  useEffect(() => {
    const updateCount = () => {
      setExchangeRequestsCount(getIncomingSwapRequests(currentUserId).length)
    }

    updateCount()
    const unsubscribe = subscribeToSwapRequestsStorage(updateCount)
    window.addEventListener('focus', updateCount)

    return () => {
      unsubscribe()
      window.removeEventListener('focus', updateCount)
    }
  }, [currentUserId])

  const [isSkillsOpen, setIsSkillsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const resolvedUser =
    user === undefined
      ? authUser
        ? { name: authUser.name, avatar: authUser.avatarUrl ?? undefined }
        : null
      : user
  const isAuthorized = Boolean(resolvedUser)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsSkillsOpen(false)
        setIsUserMenuOpen(false)
        setIsFavoritesOpen(false)
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const closeAllPanels = () => {
    setIsSkillsOpen(false)
    setIsUserMenuOpen(false)
    setIsFavoritesOpen(false)
    setIsNotificationsOpen(false)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onSearchChange?.(event.target.value)
  }

  const handleSkillsClick = () => {
    setIsSkillsOpen((currentValue) => !currentValue)
    setIsUserMenuOpen(false)
    setIsFavoritesOpen(false)
    setIsNotificationsOpen(false)
  }

  const handleUserMenuClick = () => {
    setIsUserMenuOpen((currentValue) => !currentValue)
    setIsSkillsOpen(false)
    setIsFavoritesOpen(false)
    setIsNotificationsOpen(false)
  }

  const handleNotificationsClick = () => {
    if (onNotificationsClick) {
      onNotificationsClick()
      return
    }
    setIsNotificationsOpen((currentValue) => !currentValue)
    setIsSkillsOpen(false)
    setIsUserMenuOpen(false)
    setIsFavoritesOpen(false)
  }

  const handleFavoritesClick = () => {
    if (onFavoritesClick) {
      onFavoritesClick()
      return
    }
    setIsFavoritesOpen((currentValue) => !currentValue)
    setIsSkillsOpen(false)
    setIsUserMenuOpen(false)
    setIsNotificationsOpen(false)
  }

  const handleProfileClick = () => {
    onProfileClick?.()
    navigate(ROUTES.PROFILE)
    setIsUserMenuOpen(false)
  }

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick()
      return
    }
    const currentUrl = `${location.pathname}${location.search}${location.hash}`
    const loginUrl =
      currentUrl === ROUTES.LOGIN
        ? ROUTES.LOGIN
        : `${ROUTES.LOGIN}?from=${encodeURIComponent(currentUrl)}`
    navigate(loginUrl)
  }

  const handleRegisterClick = () => {
    if (onRegisterClick) {
      onRegisterClick()
      return
    }
    navigate(ROUTES.REGISTER)
  }

  const handleLogoutClick = () => {
    if (onLogoutClick) {
      onLogoutClick()
    } else {
      logout()
    }
    setIsUserMenuOpen(false)
    closeAllPanels()
    navigate(ROUTES.HOME)
  }

  return {
    headerRef,
    favoriteIds,
    exchangeRequestsCount,
    isSkillsOpen,
    isUserMenuOpen,
    isFavoritesOpen,
    isNotificationsOpen,
    resolvedUser,
    isAuthorized,
    handleSearchChange,
    handleSkillsClick,
    handleUserMenuClick,
    handleNotificationsClick,
    handleFavoritesClick,
    handleProfileClick,
    handleLoginClick,
    handleRegisterClick,
    handleLogoutClick,
    setIsFavoritesOpen,
    setIsNotificationsOpen,
  }
}
