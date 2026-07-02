import { FC, useEffect, useRef, useState, HTMLAttributes } from 'react'
import { Chip } from '../Chip'
import cls from './ChipList.module.css'

export interface ChipItem {
  id: string | number
  label: string
  bgColorFromDb?: string
  textColorFromDb?: string
}

export interface ChipListProps extends HTMLAttributes<HTMLDivElement> {
  items: ChipItem[]
  size?: 'sm' | 'md' // Передаем размер для адаптации формулы
}

export const ChipList: FC<ChipListProps> = ({
  items,
  size = 'sm',
  className = '',
  ...otherProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(items.length)

  useEffect(() => {
    const container = containerRef.current
    if (!container || items.length === 0) return

    const calculateVisibleChips = () => {
      const childNodes = Array.from(container.children) as HTMLElement[]
      if (childNodes.length === 0) return

      // Временно показываем все элементы, чтобы честно измерить их реальную ширину
      childNodes.forEach((node) => {
        node.style.display = 'inline-flex'
      })

      const containerWidth = container.clientWidth
      let currentWidth = 0
      let maxVisible = items.length

      // Динамический gap: 12px для большого размера, 4px для маленького
      const gap = size === 'md' ? 12 : 4

      const counterNode = childNodes.find((node) => node.dataset.variant === 'counter')
      const counterWidth = counterNode ? counterNode.offsetWidth + gap : 40

      for (let i = 0; i < childNodes.length; i++) {
        const child = childNodes[i]
        if (child.dataset.variant === 'counter') continue

        // Считаем ширину текущего чипа с учетом динамического gap
        const childWidth = child.offsetWidth + gap

        if (
          currentWidth + childWidth >
          containerWidth - (i < items.length - 1 ? counterWidth : 0)
        ) {
          maxVisible = i
          break
        }
        currentWidth += childWidth
      }

      setVisibleCount(maxVisible)

      // Финально скрываем те элементы, которые не поместились
      childNodes.forEach((node, index) => {
        if (node.dataset.variant === 'counter') {
          node.style.display = maxVisible < items.length ? 'inline-flex' : 'none'
        } else {
          node.style.display = index < maxVisible ? 'inline-flex' : 'none'
        }
      })
    }

    const resizeObserver = new ResizeObserver(() => calculateVisibleChips())
    resizeObserver.observe(container)
    calculateVisibleChips()

    return () => resizeObserver.disconnect()
  }, [items, size])

  const hiddenCount = items.length - visibleCount

  return (
    <div
      ref={containerRef}
      className={`${cls.listContainer} ${cls[size]} ${className}`}
      {...otherProps}
    >
      {items.map((item) => (
        <Chip
          key={item.id}
          label={item.label}
          size={size} // Передаем размер в каждый дочерний чип
          bgColorFromDb={item.bgColorFromDb}
          textColorFromDb={item.textColorFromDb}
        />
      ))}
      <Chip variant="counter" label={`+${hiddenCount}`} size={size} data-variant="counter" />
    </div>
  )
}
