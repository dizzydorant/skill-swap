import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthUser } from '@/features/auth/model/useAuthUser'
import { useFavorites } from '@/features/favorites/hooks/useFavorites'
import { selectUnreadNotificationsCount } from '@/features/notifications/model/notificationsSlice'
import { selectCurrentProfile } from '@/features/profile/model/profileSlice'
import { ROUTES } from '@/shared/lib/constants'
import { useAppSelector } from '@/store'
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
  const { logout } = useAuthUser()
  const currentProfile = useAppSelector(selectCurrentProfile)
  const { favoriteIds } = useFavorites()
  const notificationsCount = useAppSelector(selectUnreadNotificationsCount)

  const [isSkillsOpen, setIsSkillsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const resolvedUser =
    user === undefined
      ? currentProfile
        ? { name: currentProfile.fullName, avatar: currentProfile.avatarUrl ?? undefined }
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
    notificationsCount,
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
