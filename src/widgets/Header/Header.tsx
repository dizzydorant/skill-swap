import { ChangeEvent, useState } from 'react'

import { IconArrow, IconLike, IconMoon, IconNotification } from '@/shared/assets/icons'
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
}

export const Header = ({
  user = null,
  searchValue = '',
  onSearchChange,
  onLoginClick,
  onRegisterClick,
  onThemeClick,
  onFavoritesClick,
  onNotificationsClick,
  onProfileClick,
}: HeaderProps) => {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const isAuthorized = Boolean(user)

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
    setIsUserMenuOpen(false)
  }

  const handleLogoutClick = () => {
    setIsUserMenuOpen(false)
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

          {user ? (
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
                  <span className={styles.userName}>{user.name}</span>
                  <Avatar className={styles.avatar} src={user.avatar} name={user.name} size="small" />
                </button>

                {isUserMenuOpen && (
                  <div className={styles.userDropdown} role="menu">
                    <button
                      className={styles.userDropdownItem}
                      type="button"
                      role="menuitem"
                      onClick={handleProfileClick}
                    >
                      Профиль
                    </button>
                    <button
                      className={styles.userDropdownItem}
                      type="button"
                      role="menuitem"
                      onClick={handleLogoutClick}
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.authActions}>
              <Button className={styles.loginButton} variant="outline" onClick={onLoginClick}>
                Войти
              </Button>
              <Button className={styles.registerButton} onClick={onRegisterClick}>
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
