import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import editIcon from '@/shared/assets/icons/edit.svg'
import cls from './RegisterSkillPreviewModal.module.css'

export interface RegisterSkillPreviewData {
  title: string
  categoryName: string
  subCategoryName: string
  description: string
  images: string[]
}

export interface RegisterSkillPreviewModalProps {
  isOpen: boolean
  skill: RegisterSkillPreviewData | null
  isSubmitting?: boolean
  submitError?: string
  onEdit: () => void
  onDone: () => void
}

export const RegisterSkillPreviewModal = ({
  isOpen,
  skill,
  isSubmitting = false,
  submitError,
  onEdit,
  onDone,
}: RegisterSkillPreviewModalProps) => {
  if (!skill) {
    return null
  }

  const previewImages = skill.images.slice(0, 4)
  const hiddenImagesCount = Math.max(0, skill.images.length - 3)
  const meta = [skill.categoryName, skill.subCategoryName].filter(Boolean).join(' / ')

  return (
    <Modal
      isOpen={isOpen}
      onClose={onEdit}
      className={cls.modal}
      ariaLabel="Предпросмотр добавленного навыка"
    >
      <div className={cls.content}>
        <div className={cls.header}>
          <h2 className={cls.heading}>Ваше предложение</h2>
          <p className={cls.subheading}>Пожалуйста, проверьте и подтвердите правильность данных</p>
        </div>

        <div className={cls.body}>
          <section className={cls.details}>
            <h3 className={cls.title}>{skill.title || 'Новый навык'}</h3>
            {meta ? <p className={cls.meta}>{meta}</p> : null}
            <p className={cls.description}>
              {skill.description || 'Описание пока не добавлено.'}
            </p>

            {submitError ? (
              <p className={cls.submitError} role="alert">
                {submitError}
              </p>
            ) : null}

            <div className={cls.actions}>
              <Button className={cls.actionButton} variant="outline" type="button" onClick={onEdit}>
                <span>Редактировать</span>
                <img className={cls.editIcon} src={editIcon} alt="" aria-hidden="true" />
              </Button>
              <Button
                className={cls.actionButton}
                type="button"
                onClick={onDone}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Сохраняем...' : 'Готово'}
              </Button>
            </div>
          </section>

          <div className={cls.gallery} aria-label="Изображения добавленного навыка">
            {previewImages.length > 0 ? (
              <>
                <img className={cls.mainImage} src={previewImages[0]} alt={skill.title} />
                {previewImages.length > 1 ? (
                  <div className={cls.thumbnails}>
                    {previewImages.slice(1, 4).map((image, index) => {
                      const isLastThumbnail = index === 2 && hiddenImagesCount > 0

                      return (
                        <div className={cls.thumbnail} key={`${image}-${index}`}>
                          <img src={image} alt="" />
                          {isLastThumbnail ? (
                            <span className={cls.thumbnailCounter}>+{hiddenImagesCount}</span>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                ) : null}
              </>
            ) : (
              <div className={cls.imageFallback}>Изображения отсутствуют</div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
