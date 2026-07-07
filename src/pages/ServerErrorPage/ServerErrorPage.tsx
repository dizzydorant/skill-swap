import { useNavigate } from 'react-router-dom';
import { ErrorState } from '@/widgets/ErrorState';
import error500 from '@/shared/assets/images/errors/500.svg';

export const ServerErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleReportError = () => {
    console.log('Сообщить об ошибке 500');
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
        imageSrc={error500}
        imageAlt="500 — Ошибка сервера"
        title="На сервере произошла ошибка"
        description="Попробуйте позже или вернитесь на главную страницу"
        onGoHome={handleGoHome}
        onReportError={handleReportError}
      />
    </div>
  );
};

export default ServerErrorPage;