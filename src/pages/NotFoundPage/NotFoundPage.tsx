import { useNavigate } from 'react-router-dom';
import { ErrorState } from '@/widgets/ErrorState';
import error404 from '@/shared/assets/images/errors/404.svg';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleReportError = () => {
    console.log('Сообщить об ошибке 404');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - 232px - 80px)',
      padding: '40px 20px'
    }}>
      <ErrorState
        imageSrc={error404}
        imageAlt="404 — Страница не найдена"
        title="Страница не найдена"
        description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже"
        onGoHome={handleGoHome}
        onReportError={handleReportError}
      />
    </div>
  );
};

export default NotFoundPage;