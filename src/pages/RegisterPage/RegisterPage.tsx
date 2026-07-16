import { useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import {
  getRegisteredUserSkillId,
  isEmailTaken,
  markCreatedSkillSuccess,
  registerUser,
} from '@/features/auth/model/authUtils'
import { RegisterCredentialsForm } from '@/features/auth/ui/RegisterCredentialsForm'
import { RegisterProfileForm } from '@/features/auth/ui/RegisterProfileForm'
import { RegisterSkillForm, type ImageFile } from '@/features/auth/ui/RegisterSkillForm'
import {
  RegisterSkillPreviewModal,
  type RegisterSkillPreviewData,
} from '@/features/auth/ui/RegisterSkillPreviewModal'
import { ROUTES } from '@/shared/lib/constants'
import lampImage from '@/shared/assets/images/auth/lampochka.svg'
import boardImage from '@/shared/assets/images/auth/school-board.svg'
import userInfoImage from '@/shared/assets/images/auth/user-info.svg'
import { AuthLayout } from '@/widgets/AuthLayout'
import { AuthPromoCard } from '@/widgets/AuthPromoCard'

type RegisterStep = 1 | 2 | 3

const TOTAL_STEPS = 3

interface CredentialsFormData {
  email: string
  password: string
}

interface ProfileFormData {
  name: string
  birthday: Date | null
  gender: string
  city: string
  cityName: string
  categoryId: string
  subCategoryId: string
  categoryName: string
  subCategoryName: string
  avatarUrl: string | null
}

interface SkillFormData {
  title: string
  categoryId: string
  subCategoryId: string
  categoryName: string
  subCategoryName: string
  description: string
  images: ImageFile[]
}

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
  const [credentialsData, setCredentialsData] = useState<CredentialsFormData | null>(null)
  const [profileData, setProfileData] = useState<ProfileFormData | null>(null)
  const [skillData, setSkillData] = useState<SkillFormData | null>(null)
  const [previewSkill, setPreviewSkill] = useState<RegisterSkillPreviewData | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const promo = promoByStep[step]

  const handleClose = () => {
    navigate(ROUTES.HOME)
  }

  const handleBack = () => {
    setStep((currentStep) => (currentStep === 3 ? 2 : 1))
  }

  const handleCredentialsNext = async (data: CredentialsFormData) => {
    setEmailError('')

    try {
      if (await isEmailTaken(data.email)) {
        setEmailError('Пользователь с таким email уже существует')
        return
      }

      setCredentialsData(data)
      setStep(2)
    } catch (error) {
      setEmailError(error instanceof Error ? error.message : 'Не удалось проверить email')
    }
  }

  const handleProfileNext = (data: ProfileFormData) => {
    setProfileData(data)
    setStep(3)
  }

  const handleSkillPreview = (data: SkillFormData) => {
    setSubmitError('')
    setSkillData(data)
    setPreviewSkill({
      title: data.title,
      categoryName: data.categoryName,
      subCategoryName: data.subCategoryName,
      description: data.description,
      images: data.images.map((image) => image.preview),
    })
    setIsPreviewOpen(true)
  }

  const handlePreviewEdit = () => {
    setIsPreviewOpen(false)
    setSubmitError('')
  }

  const handleFinish = async () => {
    if (!credentialsData || !profileData || !skillData) {
      setIsPreviewOpen(false)
      setStep(1)
      return
    }

    setSubmitError('')
    setIsSubmitting(true)

    try {
      const authUser = await registerUser({
        ...credentialsData,
        ...profileData,
        offeredSkill: {
          title: skillData.title,
          categoryId: skillData.categoryId,
          subCategoryId: skillData.subCategoryId,
          categoryName: skillData.categoryName,
          subCategoryName: skillData.subCategoryName,
          description: skillData.description,
          images: skillData.images.map((image) => image.preview),
        },
      })
      const skillId = getRegisteredUserSkillId(authUser.id)

      markCreatedSkillSuccess(skillId)
      navigate(generatePath(ROUTES.SKILL, { id: skillId }), { replace: true })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Не удалось завершить регистрацию')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AuthLayout
        title={`Шаг ${step} из ${TOTAL_STEPS}`}
        step={step}
        totalSteps={TOTAL_STEPS}
        onClose={handleClose}
        leftSlot={
          <>
            {step === 1 ? (
              <RegisterCredentialsForm
                onNext={handleCredentialsNext}
                emailError={emailError}
                onEmailErrorReset={() => setEmailError('')}
              />
            ) : null}
            {step === 2 ? (
              <RegisterProfileForm onBack={handleBack} onNext={handleProfileNext} />
            ) : null}
            {step === 3 ? (
              <RegisterSkillForm onBack={handleBack} onNext={handleSkillPreview} />
            ) : null}
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

      <RegisterSkillPreviewModal
        isOpen={isPreviewOpen}
        skill={previewSkill}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onEdit={handlePreviewEdit}
        onDone={handleFinish}
      />
    </>
  )
}
