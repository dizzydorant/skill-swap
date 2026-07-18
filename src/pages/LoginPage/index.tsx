import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  loginSuccess,
  selectRegisteredUsers,
} from '@/features/auth/model/authSlice'
import { login } from '@/features/auth/model/authUtils'
import { LoginForm } from '@/features/auth/ui/LoginForm'
import { ROUTES } from '@/shared/lib/constants'
import { useAppDispatch, useAppSelector } from '@/store'
import loginImage from '@/shared/assets/images/auth/lampochka.svg'
import { AuthLayout } from '@/widgets/AuthLayout'
import { AuthPromoCard } from '@/widgets/AuthPromoCard'

interface LoginFormData {
  email: string
  password: string
}

const getSafeRedirectPath = (from: string | null): string => {
  if (!from || !from.startsWith('/') || from.startsWith('//')) {
    return ROUTES.HOME
  }

  const redirectUrl = new URL(from, window.location.origin)

  if (redirectUrl.pathname === ROUTES.LOGIN || redirectUrl.pathname === ROUTES.REGISTER) {
    return ROUTES.HOME
  }

  return `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const registeredUsers = useAppSelector(selectRegisteredUsers)
  const [authError, setAuthError] = useState('')

  const handleClose = () => {
    navigate(ROUTES.HOME)
  }

  const handleLogin = async (data: LoginFormData) => {
    setAuthError('')

    try {
      const user = await login(data.email, data.password, registeredUsers)
      dispatch(loginSuccess(user))
      navigate(getSafeRedirectPath(searchParams.get('from')), { replace: true })
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Не удалось войти')
    }
  }

  return (
    <AuthLayout
      title="Вход"
      onClose={handleClose}
      leftSlot={
        <LoginForm
          onSubmit={handleLogin}
          submitError={authError}
          onSubmitErrorReset={() => setAuthError('')}
        />
      }
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
