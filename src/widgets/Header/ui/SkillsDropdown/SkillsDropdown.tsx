import React from 'react';
import { skillCategories } from '@/shared/lib/categories';

import { 
  IconBusiness, 
  IconArt, 
  IconLanguage, 
  IconBook, 
  IconHome, 
  IconLifestyle 
} from '../../../../shared/assets/icons'; 

import styles from './SkillsDropdown.module.css';

const iconMap: Record<string, React.ReactNode> = {
  briefcase: <IconBusiness />,
  palette: <IconArt />,
  global: <IconLanguage />,
  book: <IconBook />,
  home: <IconHome />,
  lifestyle: <IconLifestyle />,
};

export const SkillsDropdown = () => {
  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.grid}>
        {skillCategories.map((category) => (
          <div key={category.id} className={styles.categoryBlock}>
            
            {/* Шапка категории: Иконка + Название */}
            <div className={styles.categoryHeader}>
              <span className={styles.iconWrapper}>
                {iconMap[category.iconKey]}
              </span>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
            </div>

            {/* Список подкатегорий */}
            <ul className={styles.subCategoryList}>
              {category.subCategories.map((sub) => (
                <li key={sub.id} className={styles.subCategoryItem}>
                  {sub.name}
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </div>
  );
};
