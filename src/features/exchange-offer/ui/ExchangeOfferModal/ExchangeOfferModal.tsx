import bellIcon from '@/shared/assets/icons/bell.svg'
import { SuccessModal } from '@/shared/ui/SuccessModal'

export interface ExchangeOfferModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const ExchangeOfferModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ExchangeOfferModalProps) => {
  return (
    <SuccessModal
      isOpen={isOpen}
      onClose={onClose}
      onAction={onConfirm}
      icon={bellIcon}
      title="Вы предложили обмен"
      description="Теперь дождитесь подтверждения. Вам придёт уведомление"
      buttonText="Готово"
      ariaLabel="Подтверждение предложения обмена"
    />
  )
}
