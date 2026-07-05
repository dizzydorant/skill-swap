import { Logo } from '@/shared/ui/Logo'
import styles from './Footer.module.css'

interface FooterLink {
  label: string
  href: string
}

// Колонка 1: О проекте, Все навыки
const column1: FooterLink[] = [
  { label: 'О проекте', href: '/about' },
  { label: 'Все навыки', href: '/skills' },
]

// Колонка 2: Контакты, Блог
const column2: FooterLink[] = [
  { label: 'Контакты', href: '/contacts' },
  { label: 'Блог', href: '/blog' },
]

// Колонка 3: Политика конфиденциальности, Пользовательское соглашение
const column3: FooterLink[] = [
  { label: 'Политика конфиденциальности', href: '/privacy' },
  { label: 'Пользовательское соглашение', href: '/terms' },
]

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logoSection}>
          <Logo />
        </div>

        {/* Блок со ссылками — отдельный div */}
        <div className={styles.linksWrapper}>
          {/* Колонка 1 */}
          <div className={styles.column}>
            <ul className={styles.linksList}>
              {column1.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 2 */}
          <div className={styles.column}>
            <ul className={styles.linksList}>
              {column2.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3 */}
          <div className={styles.column}>
            <ul className={styles.linksList}>
              {column3.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className={styles.copyright}>
          <span>SkillSwap — 2025</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
