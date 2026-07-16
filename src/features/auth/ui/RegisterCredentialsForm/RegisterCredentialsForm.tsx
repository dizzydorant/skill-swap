import { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { IconEye } from '@/shared/assets/icons'
import googleIcon from '@/shared/assets/icons/Google.svg'
import appleIcon from '@/shared/assets/icons/Apple.svg'
import cls from './RegisterCredentialsForm.module.css'

export interface RegisterCredentialsFormProps {
  onNext: (data: { email: string; password: string }) => void
  emailError?: string
  onEmailErrorReset?: () => void
  className?: string
}

interface FormErrors {
  email?: string
  password?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 8

export const RegisterCredentialsForm = ({
  onNext,
  emailError,
  onEmailErrorReset,
  className = '',
}: RegisterCredentialsFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = () => {
    const nextErrors: FormErrors = {}
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      nextErrors.email = 'Введите email'
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = 'Введите корректный email'
    }

    if (!password) {
      nextErrors.password = 'Введите пароль'
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      nextErrors.password = 'Минимум 8 символов'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value)
    onEmailErrorReset?.()

    if (errors.email) {
      setErrors((currentErrors) => ({ ...currentErrors, email: undefined }))
    }
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value)

    if (errors.password) {
      setErrors((currentErrors) => ({ ...currentErrors, password: undefined }))
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    onNext({ email: email.trim(), password })
  }

  const formClassName = [cls.form, className].filter(Boolean).join(' ')
  const passwordHint =
    password.length >= MIN_PASSWORD_LENGTH ? 'Надёжный' : 'Пароль должен содержать не менее 8 знаков'

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
        <label className={cls.field} htmlFor="register-email">
          <span className={cls.label}>Email</span>
          <Input
            id="register-email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Введите email"
            error={Boolean(errors.email || emailError)}
            errorText={errors.email || emailError}
          />
        </label>

        <label className={cls.field} htmlFor="register-password">
          <span className={cls.label}>Пароль</span>
          <span className={cls.passwordInput}>
            <Input
              id="register-password"
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Придумайте надёжный пароль"
              error={Boolean(errors.password)}
              errorText={errors.password}
              className={cls.passwordControl}
            />
            <button
              className={cls.passwordToggle}
              type="button"
              aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
              onClick={() => setIsPasswordVisible((current) => !current)}
            >
              <IconEye />
            </button>
          </span>
          <span className={cls.passwordHint}>{passwordHint}</span>
        </label>
      </div>

      <Button className={cls.submitButton} fullWidth type="submit">
        Далее
      </Button>
    </form>
  )
}
