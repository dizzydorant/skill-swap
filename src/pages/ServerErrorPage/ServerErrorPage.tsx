import { useNavigate } from 'react-router-dom'

import { ErrorState } from '@/widgets/ErrorState'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'

import error500 from '@/shared/assets/images/errors/500.svg'

import styles from './ServerErrorPage.module.css'

export const ServerErrorPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleReportError = () => {
    console.log('Сообщить об ошибке 500')
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <ErrorState
          imageSrc={error500}
          imageAlt="500 — Ошибка сервера"
          title="На сервере произошла ошибка"
          description="Попробуйте позже или вернитесь на главную страницу"
          onGoHome={handleGoHome}
          onReportError={handleReportError}
        />
      </main>
      <Footer />
    </div>
  )
}

export default ServerErrorPage
