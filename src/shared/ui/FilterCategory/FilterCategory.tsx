import { FC, ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { IconArrow } from '@/shared/assets/icons'
import cls from './FilterCategory.module.css'

export interface FilterCategoryProps {
  label: string
  checked: boolean
  indeterminate: boolean
  isExpanded: boolean
  onCheckboxChange: () => void
  onToggleExpand: () => void
  hasChildren?: boolean
  children?: ReactNode
}

export const FilterCategory: FC<FilterCategoryProps> = ({
  label,
  checked,
  indeterminate,
  isExpanded,
  onCheckboxChange,
  onToggleExpand,
  hasChildren = false,
  children,
}) => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.categoryRow}>
        <Checkbox
          label={label}
          checked={checked}
          indeterminate={indeterminate}
          onChange={onCheckboxChange}
        />

        {hasChildren && (
          <button
            type="button"
            className={cls.arrowToggle}
            onClick={onToggleExpand}
            aria-label={isExpanded ? 'Свернуть подкатегории' : 'Развернуть подкатегории'}
          >
            <IconArrow className={`${cls.arrowIcon} ${isExpanded ? cls.arrowExpanded : ''}`} />
          </button>
        )}
      </div>

      {isExpanded && children && <div className={cls.subCategoriesList}>{children}</div>}
    </div>
  )
}
