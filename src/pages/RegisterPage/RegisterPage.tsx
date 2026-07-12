import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterCredentialsForm } from '@/features/auth/ui/RegisterCredentialsForm'
import { RegisterProfileForm } from '@/features/auth/ui/RegisterProfileForm'
import { RegisterSkillForm } from '@/features/auth/ui/RegisterSkillForm'
import { ROUTES } from '@/shared/lib/constants'
import lampImage from '@/shared/assets/images/auth/lampochka.svg'
import boardImage from '@/shared/assets/images/auth/school-board.svg'
import userInfoImage from '@/shared/assets/images/auth/user-info.svg'
import { AuthLayout } from '@/widgets/AuthLayout'
import { AuthPromoCard } from '@/widgets/AuthPromoCard'

type RegisterStep = 1 | 2 | 3

const TOTAL_STEPS = 3

const promoByStep: Record<
  RegisterStep,
  {
    imageSrc: string
    imageAlt: string
    title: string
    description: string
  }
> = {
  1: {
    imageSrc: lampImage,
    imageAlt: 'Иллюстрация лампочки',
    title: 'Добро пожаловать в SkillSwap!',
    description: 'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
  },
  2: {
    imageSrc: userInfoImage,
    imageAlt: 'Иллюстрация профиля пользователя',
    title: 'Расскажите немного о себе',
    description: 'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
  },
  3: {
    imageSrc: boardImage,
    imageAlt: 'Иллюстрация доски с навыком',
    title: 'Укажите, чем вы готовы поделиться',
    description: 'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!',
  },
}

export default function RegisterPage() {
  const [step, setStep] = useState<RegisterStep>(1)
  const navigate = useNavigate()
  const promo = promoByStep[step]

  const handleClose = () => {
    navigate(ROUTES.HOME)
  }

  const handleBack = () => {
    setStep((currentStep) => (currentStep === 3 ? 2 : 1))
  }

  const handleFinish = () => {
    console.log('register submit')
  }

  return (
    <AuthLayout
      title={`Шаг ${step} из ${TOTAL_STEPS}`}
      step={step}
      totalSteps={TOTAL_STEPS}
      onClose={handleClose}
      leftSlot={
        <>
          {step === 1 ? <RegisterCredentialsForm onNext={() => setStep(2)} /> : null}
          {step === 2 ? <RegisterProfileForm onBack={handleBack} onNext={() => setStep(3)} /> : null}
          {step === 3 ? <RegisterSkillForm onBack={handleBack} onNext={handleFinish} /> : null}
        </>
      }
      rightSlot={
        <AuthPromoCard
          imageSrc={promo.imageSrc}
          imageAlt={promo.imageAlt}
          title={promo.title}
          description={promo.description}
        />
      }
    />
  )
}
