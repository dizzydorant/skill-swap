import { useNavigate } from 'react-router-dom'

import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { SkillDetailsCard } from '@/widgets/SkillDetailsCard'
import { SkillImageGallery } from '@/widgets/SkillImageGallery'
import { SkillOwnerCard } from '@/widgets/SkillOwnerCard'
import { ErrorState } from '@/widgets/ErrorState'
import { ExchangeOfferModal } from '@/features/exchange-offer/ui/ExchangeOfferModal'
import { useExchangeOffer } from '@/features/exchange-offer/hooks/useExchangeOffer'

import error404 from '@/shared/assets/images/errors/404.svg'

import { useSkillPageData } from './hooks/useSkillPageData'
import styles from './index.module.css'

export default function SkillPage() {
  const navigate = useNavigate()
  const { data, isLoading, error, authorAge } = useSkillPageData()

  const exchangeOffer = useExchangeOffer({
    skillId: data?.skill.id ?? '',
    toUserId: data?.skill.authorId ?? '',
  })

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <p className={styles.stateMessage}>Загрузка...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <ErrorState
            imageSrc={error404}
            imageAlt="Навык не найден"
            title="Навык не найден"
            description="Возможно, ссылка устарела или навык был удалён."
            onGoHome={() => navigate('/')}
            onReportError={() => console.log('Сообщить об ошибке: skill not found')}
          />
        </main>
        <Footer />
      </div>
    )
  }

  const { skill, author, categoryName, subCategoryName, teachSkillTitles, learnSkillTitles } = data
  const galleryImages =
    skill.images.length > 0 ? skill.images : skill.imageUrl ? [skill.imageUrl] : []

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.topSection}>
          <SkillImageGallery className={styles.gallery} images={galleryImages} />

          <SkillOwnerCard
            avatarUrl={author.avatarUrl ?? undefined}
            name={author.fullName}
            city={author.location ?? ''}
            age={authorAge}
            description={author.bio ?? ''}
            teachSkills={teachSkillTitles}
            learnSkills={learnSkillTitles}
          />
        </section>

        <SkillDetailsCard
          className={styles.detailsCard}
          title={skill.title}
          category={categoryName}
          subCategory={subCategoryName}
          description={skill.description}
          isExchangeOffered={exchangeOffer.isExchangeOffered}
          onExchange={exchangeOffer.openModal}
        />
      </main>

      <ExchangeOfferModal
        isOpen={exchangeOffer.isModalOpen}
        onClose={exchangeOffer.closeModal}
        onConfirm={exchangeOffer.confirmOffer}
      />

      <Footer />
    </div>
  )
}
