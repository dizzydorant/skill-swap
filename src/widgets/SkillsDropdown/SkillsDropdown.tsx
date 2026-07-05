import type { ReactNode } from 'react'
import { skillCategories } from '@/shared/lib/categories'
import {
  IconArt,
  IconBook,
  IconBusiness,
  IconHome,
  IconLanguage,
  IconLifestyle,
} from '@/shared/assets/icons'

import styles from './SkillsDropdown.module.css'

const iconMap: Record<string, ReactNode> = {
  briefcase: <IconBusiness />,
  palette: <IconArt />,
  global: <IconLanguage />,
  book: <IconBook />,
  home: <IconHome />,
  lifestyle: <IconLifestyle />,
}

const iconBgMap: Record<string, string> = {
  briefcase: styles.businessIcon,
  palette: styles.artIcon,
  global: styles.languageIcon,
  book: styles.educationIcon,
  home: styles.homeIcon,
  lifestyle: styles.lifestyleIcon,
}

interface SkillsDropdownProps {
  className?: string
}

export const SkillsDropdown = ({ className = '' }: SkillsDropdownProps) => {
  return (
    <div className={`${styles.dropdownContainer} ${className}`}>
      <div className={styles.grid}>
        {skillCategories.map((category) => (
          <div key={category.id} className={styles.categoryBlock}>
            <div className={styles.categoryHeader}>
              <span
                className={`${styles.iconWrapper} ${iconBgMap[category.iconKey]}`}
              >
                {iconMap[category.iconKey]}
              </span>

              <h3 className={styles.categoryTitle}>{category.name}</h3>
            </div>

            <ul className={styles.subCategoryList}>
              {category.subCategories.map((subCategory) => (
                <li key={subCategory.id} className={styles.subCategoryItem}>
                  {subCategory.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
