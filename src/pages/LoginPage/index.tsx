import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/features/auth/ui/LoginForm'
import { ROUTES } from '@/shared/lib/constants'
import loginImage from '@/shared/assets/images/auth/lampochka.svg'
import { AuthLayout } from '@/widgets/AuthLayout'
import { AuthPromoCard } from '@/widgets/AuthPromoCard'

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate(ROUTES.HOME)
  }

  const handleLogin = (data: LoginFormData) => {
    console.log('login submit', data)
    navigate(ROUTES.HOME)
  }

  return (
    <AuthLayout
      title="Вход"
      onClose={handleClose}
      leftSlot={<LoginForm onSubmit={handleLogin} />}
      rightSlot={
        <AuthPromoCard
          imageSrc={loginImage}
          imageAlt="Иллюстрация входа"
          title="С возвращением в SkillSwap!"
          description="Обменивайтесь знаниями и навыками с другими людьми"
        />
      }
    />
  )
}
