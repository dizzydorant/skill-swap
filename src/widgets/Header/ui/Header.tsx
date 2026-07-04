import { useState } from 'react';
import { SkillsDropdown } from './SkillsDropdown'; 
import { IconArrow } from '../../../shared/assets/icons';
import styles from './Header.module.css';

export const Header = () => {
  // Создаем стейт для открытия/закрытия дропдауна (false - изначально закрыт)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Функция-переключатель при клике
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Логотип */}
        <div className={styles.logo}>SkillSwap</div>

        {/* Навигация */}
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>О проекте</a>
          
          {/* Пункт меню «Все навыки» с логикой клика */}
          <button 
            type="button" 
            className={`${styles.navButton} ${isDropdownOpen ? styles.active : ''}`} 
            onClick={toggleDropdown}
          >
            Все навыки
            <span className={`${styles.arrow} ${isDropdownOpen ? styles.rotated : ''}`}>
              <IconArrow />
            </span>
          </button>
        </nav>

        {/* Поисковая строка и блок пользователя (заглушки для визуала) */}
        <div className={styles.searchAndAuth}>
          <input type="text" placeholder="Искать навык" className={styles.searchInput} />
          <button type="button" className={styles.loginBtn}>Войти</button>
          <button type="button" className={styles.registerBtn}>Зарегистрироваться</button>
        </div>
      </div>

      {/* Условие: если isDropdownOpen равен true, то рендерим дропдаун */}
      {isDropdownOpen && <SkillsDropdown />}
    </header>
  );
};
