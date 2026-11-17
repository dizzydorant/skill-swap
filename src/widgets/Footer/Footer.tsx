import { Logo } from '../../shared/ui/Logo'
import styles from './Footer.module.css'

interface FooterLink {
  label: string
  href: string
}

const column1: FooterLink[] = [
  { label: 'О проекте', href: '/about' },
  { label: 'Все навыки', href: '/skills' },
]

const column2: FooterLink[] = [
  { label: 'Контакты', href: '/contacts' },
  { label: 'Блог', href: '/blog' },
]

const column3: FooterLink[] = [
  { label: 'Политика конфиденциальности', href: '/privacy' },
  { label: 'Пользовательское соглашение', href: '/terms' },
]

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Logo />
        </div>

        <div className={styles.linksWrapper}>
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

        <div className={styles.copyright}>
          <span>SkillSwap — 2026</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
