import { useState } from 'react'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { SkillDetailsCard } from '@/widgets/SkillDetailsCard'
import { SkillImageGallery } from '@/widgets/SkillImageGallery'
import { SkillOwnerCard } from '@/widgets/SkillOwnerCard'
import { SkillSection } from '@/widgets/SkillSection'

import { IconLike, IconLikeFilled, IconShare, IconMore } from '@/shared/assets/icons'

import { MOCK_SKILL_PAGE_DATA } from './MockData'
import styles from './index.module.css'

export default function SkillPage() {
  const { skill, author, similarSkills } = MOCK_SKILL_PAGE_DATA
  const [isLiked, setIsLiked] = useState(false)

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev)
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Ссылка скопирована в буфер обмена!')
    } catch (err) {
      console.error('Не удалось скопировать:', err)
    }
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.topSection}>
          <aside className={styles.leftColumn}>
            <SkillOwnerCard
              avatarUrl={author.avatarUrl}
              name={author.fullName}
              city={author.location}
              age={author.age}
              description={author.bio}
              teachSkills={author.teachSkillTitles}
              learnSkills={author.learnSkillTitles}
            />
          </aside>

          {/* Исходная карточка SkillDetailsCard */}
          <SkillDetailsCard
            title={skill.title}
            category={skill.tags?.[0] ?? 'Творчество и искусство'}
            subCategory={skill.tags?.[1] ?? 'Музыка и звук'}
            description={skill.description}
            isExchangeOffered={false}
            onExchange={() => console.log('Клик по кнопке Предложить обмен')}
          >
            <div className={styles.galleryWithActionsContainer}>
              <div className={styles.actionButtons}>
                <button
                  className={`${styles.circleBtn} ${isLiked ? styles.activeLike : ''}`}
                  onClick={handleLikeToggle}
                  aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
                >
                  {isLiked ? <IconLikeFilled /> : <IconLike />}
                </button>

                <button className={styles.circleBtn} onClick={handleShare} aria-label="Поделиться">
                  <IconShare />
                </button>

                <button className={styles.squareBtn} aria-label="Дополнительно">
                  <IconMore />
                </button>
              </div>

              <SkillImageGallery images={skill.images} />
            </div>
          </SkillDetailsCard>
        </section>

        <SkillSection
          title="Похожие предложения"
          cards={similarSkills}
          initialLimit={4}
          className={styles.similarSection}
        />
      </main>

      <Footer />
    </div>
  )
}
