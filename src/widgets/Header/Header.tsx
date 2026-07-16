import { ChangeEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthUser } from '@/features/auth/model/useAuthUser'
import { IconArrow, IconLike, IconMoon, IconNotification } from '@/shared/assets/icons'
import logoutIcon from '@/shared/assets/icons/logout.svg'
import { ROUTES } from '@/shared/lib/constants'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { IconButton } from '@/shared/ui/IconButton'
import { Input } from '@/shared/ui/Input'
import { Logo } from '@/shared/ui/Logo'
import { SkillsDropdown } from '@/widgets/SkillsDropdown'

import styles from './Header.module.css'

export interface HeaderUser {
  name: string
  avatar?: string
}

export interface HeaderProps {
  user?: HeaderUser | null
  searchValue?: string
  onSearchChange?: (value: string) => void
  onLoginClick?: () => void
  onRegisterClick?: () => void
  onThemeClick?: () => void
  onFavoritesClick?: () => void
  onNotificationsClick?: () => void
  onProfileClick?: () => void
  onLogoutClick?: () => void
}

export const Header = ({
  user,
  searchValue = '',
  onSearchChange,
  onLoginClick,
  onRegisterClick,
  onThemeClick,
  onFavoritesClick,
  onNotificationsClick,
  onProfileClick,
  onLogoutClick,
}: HeaderProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user: authUser, logout } = useAuthUser()
  const [isSkillsOpen, setIsSkillsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const resolvedUser =
    user === undefined
      ? authUser
        ? { name: authUser.name, avatar: authUser.avatarUrl ?? undefined }
        : null
      : user
  const isAuthorized = Boolean(resolvedUser)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onSearchChange?.(event.target.value)
  }

  const handleSkillsClick = () => {
    setIsSkillsOpen((currentValue) => !currentValue)
    setIsUserMenuOpen(false)
  }

  const handleUserMenuClick = () => {
    setIsUserMenuOpen((currentValue) => !currentValue)
    setIsSkillsOpen(false)
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
    navigate(ROUTES.HOME)
  }

  return (
    <header className={`${styles.header} ${isAuthorized ? styles.authorized : ''}`}>
      <div className={styles.inner}>
        <Logo className={styles.logo} />

        <nav className={styles.nav} aria-label="Основная навигация">
          <a className={styles.navLink} href="#about">
            О проекте
          </a>

          <button
            className={styles.skillsButton}
            type="button"
            aria-expanded={isSkillsOpen}
            aria-controls="skills-dropdown"
            onClick={handleSkillsClick}
          >
            <span>Все навыки</span>
            <span className={`${styles.arrow} ${isSkillsOpen ? styles.arrowOpen : ''}`}>
              <IconArrow />
            </span>
          </button>
        </nav>

        <div className={styles.search}>
          <Input
            className={styles.searchInput}
            value={searchValue}
            type="search"
            placeholder="Искать навык"
            isSearch
            onChange={handleSearchChange}
          />
        </div>

        <div className={styles.actions}>
          <IconButton
            className={styles.iconButton}
            icon={<IconMoon />}
            aria-label="Переключить тему"
            onClick={onThemeClick}
          />

          {resolvedUser ? (
            <>
              <IconButton
                className={styles.iconButton}
                icon={<IconNotification />}
                aria-label="Открыть уведомления"
                onClick={onNotificationsClick}
              />
              <IconButton
                className={styles.iconButton}
                icon={<IconLike />}
                aria-label="Открыть избранное"
                onClick={onFavoritesClick}
              />

              <div className={styles.userMenuWrapper}>
                <button
                  className={styles.userButton}
                  type="button"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="menu"
                  onClick={handleUserMenuClick}
                >
                  <span className={styles.userName}>{resolvedUser.name}</span>
                  <Avatar
                    className={styles.avatar}
                    src={resolvedUser.avatar}
                    name={resolvedUser.name}
                    size="small"
                  />
                </button>

                {isUserMenuOpen && (
                  <div className={styles.userDropdown} role="menu">
                    <button
                      className={styles.userDropdownItem}
                      type="button"
                      role="menuitem"
                      onClick={handleProfileClick}
                    >
                      Личный кабинет
                    </button>
                    <button
                      className={styles.userDropdownItem}
                      type="button"
                      role="menuitem"
                      onClick={handleLogoutClick}
                    >
                      <span>Выйти из аккаунта</span>
                      <img className={styles.logoutIcon} src={logoutIcon} alt="" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.authActions}>
              <Button className={styles.loginButton} variant="outline" onClick={handleLoginClick}>
                Войти
              </Button>
              <Button className={styles.registerButton} onClick={handleRegisterClick}>
                Зарегистрироваться
              </Button>
            </div>
          )}
        </div>
      </div>

      {isSkillsOpen && (
        <div className={styles.skillsDropdownWrapper} id="skills-dropdown">
          <SkillsDropdown />
        </div>
      )}
    </header>
  )
}
