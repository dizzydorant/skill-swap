import { IconArrow, IconLike, IconMoon, IconNotification } from '@/shared/assets/icons'
import logoutIcon from '@/shared/assets/icons/logout.svg'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { IconButton } from '@/shared/ui/IconButton'
import { Input } from '@/shared/ui/Input'
import { Logo } from '@/shared/ui/Logo'
import { FavoritesDropdown } from '@/widgets/FavoritesDropdown'
import { NotificationsDropdown } from '@/widgets/NotificationsDropdown'
import { SkillsDropdown } from '@/widgets/SkillsDropdown'

import { useHeader } from './hooks/useHeader'
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

export const Header = (props: HeaderProps) => {
  const { searchValue = '', onThemeClick } = props

  // Подключаем наш кастомный хук и деструктуризируем из него все данные и экшены
  const {
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
  } = useHeader(props)

  return (
    <header ref={headerRef} className={`${styles.header} ${isAuthorized ? styles.authorized : ''}`}>
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
              <div className={styles.panelWrapper}>
                <IconButton
                  className={styles.iconButton}
                  icon={<IconNotification />}
                  aria-label="Открыть уведомления"
                  aria-expanded={isNotificationsOpen}
                  onClick={handleNotificationsClick}
                />
                {notificationsCount > 0 ? (
                  <span className={styles.badge} aria-hidden="true">
                    {notificationsCount}
                  </span>
                ) : null}
                {isNotificationsOpen ? (
                  <div className={styles.panelDropdown}>
                    <NotificationsDropdown onClose={() => setIsNotificationsOpen(false)} />
                  </div>
                ) : null}
              </div>

              <div className={styles.panelWrapper}>
                <IconButton
                  className={styles.iconButton}
                  icon={<IconLike />}
                  aria-label="Открыть избранное"
                  aria-expanded={isFavoritesOpen}
                  onClick={handleFavoritesClick}
                />
                {favoriteIds.length > 0 ? (
                  <span className={styles.badge} aria-hidden="true">
                    {favoriteIds.length}
                  </span>
                ) : null}
                {isFavoritesOpen ? (
                  <div className={styles.panelDropdown}>
                    <FavoritesDropdown onClose={() => setIsFavoritesOpen(false)} />
                  </div>
                ) : null}
              </div>

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
                      <img
                        className={styles.logoutIcon}
                        src={logoutIcon}
                        alt=""
                        aria-hidden="true"
                      />
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
