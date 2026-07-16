import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { ROUTES } from '@/shared/lib/constants'
import googleIcon from '@/shared/assets/icons/Google.svg'
import appleIcon from '@/shared/assets/icons/Apple.svg'
import cls from './LoginForm.module.css'

export interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void
  submitError?: string
  onSubmitErrorReset?: () => void
  className?: string
}

interface FormErrors {
  email?: string
  password?: string
}

export const LoginForm = ({
  onSubmit,
  submitError,
  onSubmitErrorReset,
  className = '',
}: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = () => {
    const nextErrors: FormErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'Введите email'
    }

    if (!password.trim()) {
      nextErrors.password = 'Введите пароль'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value)
    onSubmitErrorReset?.()

    if (errors.email) {
      setErrors((currentErrors) => ({ ...currentErrors, email: undefined }))
    }
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value)
    onSubmitErrorReset?.()

    if (errors.password) {
      setErrors((currentErrors) => ({ ...currentErrors, password: undefined }))
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit({ email: email.trim(), password })
  }

  const formClassName = [cls.form, className].filter(Boolean).join(' ')

  return (
    <form className={formClassName} onSubmit={handleSubmit} noValidate>
      <div className={cls.socialButtons}>
        <Button className={cls.socialButton} variant="outline" fullWidth type="button">
          <img src={googleIcon} alt="" className={cls.socialIcon} aria-hidden="true" />
          <span>Продолжить с Google</span>
        </Button>

        <Button className={cls.socialButton} variant="outline" fullWidth type="button">
          <img src={appleIcon} alt="" className={cls.socialIcon} aria-hidden="true" />
          <span>Продолжить с Apple</span>
        </Button>
      </div>

      <div className={cls.divider}>
        <span>или</span>
      </div>

      <div className={cls.fields}>
        <label className={cls.field} htmlFor="login-email">
          <span className={cls.label}>Email</span>
          <Input
            id="login-email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Введите email"
            error={Boolean(errors.email)}
            errorText={errors.email}
          />
        </label>

        <label className={cls.field} htmlFor="login-password">
          <span className={cls.label}>Пароль</span>
          <Input
            id="login-password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Введите ваш пароль"
            error={Boolean(errors.password)}
            errorText={errors.password}
          />
        </label>
      </div>

      {submitError ? (
        <p className={cls.submitError} role="alert">
          {submitError}
        </p>
      ) : null}

      <div className={cls.actions}>
        <Button className={cls.submitButton} fullWidth type="submit">
          Войти
        </Button>

        <Link className={cls.registerLink} to={ROUTES.REGISTER}>
          Зарегистрироваться
        </Link>
      </div>
    </form>
  )
}
