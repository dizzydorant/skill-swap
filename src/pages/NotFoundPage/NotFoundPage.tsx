import { useNavigate } from 'react-router-dom'

import { ErrorState } from '@/widgets/ErrorState'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'

import error404 from '@/shared/assets/images/errors/404.svg'

import styles from './NotFoundPage.module.css'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <ErrorState
          imageSrc={error404}
          imageAlt="404 — Страница не найдена"
          title="Страница не найдена"
          description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже"
          onGoHome={handleGoHome}
          onReportError={() => undefined}
        />
      </main>
      <Footer />
    </div>
  )
}

export default NotFoundPage
