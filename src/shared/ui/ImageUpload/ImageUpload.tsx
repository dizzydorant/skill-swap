import { useRef, useState, DragEvent } from 'react'
import styles from './ImageUpload.module.css'

export interface ImageFile {
  id: string
  file: File
  preview: string
}

export interface ImageUploadProps {
  value?: ImageFile[]
  onChange?: (files: ImageFile[]) => void
  maxFiles?: number
  accept?: string
  disabled?: boolean
  error?: boolean
  errorText?: string
  className?: string
}

export const ImageUpload = ({
  value = [],
  onChange,
  maxFiles = 5,
  accept = 'image/*',
  disabled = false,
  error = false,
  errorText = '',
  className = '',
}: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files || disabled) return

    const remainingSlots = maxFiles - value.length
    const selectedFiles = Array.from(files).slice(0, remainingSlots)

    const newFiles: ImageFile[] = selectedFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }))

    onChange?.([...value, ...newFiles])
  }

  const handleRemoveFile = (id: string) => {
    const updatedFiles = value.filter((file) => file.id !== id)
    onChange?.(updatedFiles)
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const isMaxFilesReached = value.length >= maxFiles

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div
        className={`
          ${styles.dropZone}
          ${isDragging ? styles.dragging : ''}
          ${disabled ? styles.disabled : ''}
          ${error ? styles.error : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          disabled={disabled || isMaxFilesReached}
          onChange={(e) => handleFileSelect(e.target.files)}
          className={styles.hiddenInput}
        />

        <div className={styles.content}>
          <p className={styles.placeholderText}>
            {isMaxFilesReached ? (
              `Достигнут лимит (${maxFiles} файлов)`
            ) : (
              <>Перетащите или выберите изображения навыка</>
            )}
          </p>

          <button
            type="button"
            className={styles.selectButton}
            onClick={handleButtonClick}
            disabled={disabled || isMaxFilesReached}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.20951 10.837C7.79555 10.837 6.65137 9.6928 6.65137 8.27884C6.65137 6.86489 7.79555 5.7207 9.20951 5.7207C10.6235 5.7207 11.7676 6.86489 11.7676 8.27884C11.7676 9.6928 10.6235 10.837 9.20951 10.837ZM9.20951 7.11605C8.56765 7.11605 8.04672 7.63698 8.04672 8.27884C8.04672 8.9207 8.56765 9.44163 9.20951 9.44163C9.85137 9.44163 10.3723 8.9207 10.3723 8.27884C10.3723 7.63698 9.85137 7.11605 9.20951 7.11605Z"
                fill="#508826"
              />
              <path
                d="M14.7907 22H9.2093C4.15814 22 2 19.8419 2 14.7907V9.2093C2 4.15814 4.15814 2 9.2093 2H12.9302C13.3116 2 13.6279 2.31628 13.6279 2.69767C13.6279 3.07907 13.3116 3.39535 12.9302 3.39535H9.2093C4.92093 3.39535 3.39535 4.92093 3.39535 9.2093V14.7907C3.39535 19.0791 4.92093 20.6047 9.2093 20.6047H14.7907C19.0791 20.6047 20.6047 19.0791 20.6047 14.7907V10.1395C20.6047 9.75814 20.9209 9.44186 21.3023 9.44186C21.6837 9.44186 22 9.75814 22 10.1395V14.7907C22 19.8419 19.8419 22 14.7907 22Z"
                fill="#508826"
              />
              <path
                d="M20.6045 6.18636H15.4882C15.1068 6.18636 14.7905 5.87009 14.7905 5.48869C14.7905 5.10729 15.1068 4.79102 15.4882 4.79102H20.6045C20.9859 4.79102 21.3022 5.10729 21.3022 5.48869C21.3022 5.87009 20.9859 6.18636 20.6045 6.18636Z"
                fill="#508826"
              />
              <path
                d="M18.0463 8.74405C17.6649 8.74405 17.3486 8.42777 17.3486 8.04638V2.9301C17.3486 2.5487 17.6649 2.23242 18.0463 2.23242C18.4277 2.23242 18.744 2.5487 18.744 2.9301V8.04638C18.744 8.42777 18.4277 8.74405 18.0463 8.74405Z"
                fill="#508826"
              />
              <path
                d="M3.32078 19.1636C3.09753 19.1636 2.87427 19.0519 2.74404 18.8566C2.53008 18.5403 2.61381 18.1031 2.93009 17.8892L7.51613 14.8101C8.52078 14.1403 9.90683 14.2147 10.8185 14.9868L11.1254 15.2566C11.5906 15.6566 12.3812 15.6566 12.8371 15.2566L16.7068 11.9357C17.7022 11.0892 19.2464 11.0892 20.2417 11.9357L21.758 13.238C22.0464 13.4892 22.0836 13.9264 21.8324 14.224C21.5812 14.5124 21.144 14.5496 20.8464 14.2985L19.3301 12.9961C18.865 12.5961 18.0743 12.5961 17.6185 12.9961L13.7487 16.3171C12.7626 17.1636 11.2092 17.1636 10.2138 16.3171L9.90683 16.0473C9.47892 15.6845 8.77195 15.6473 8.29753 15.9729L3.72078 19.0519C3.59055 19.1264 3.45102 19.1636 3.32078 19.1636Z"
                fill="#508826"
              />
            </svg>
            Выбрать изображения
          </button>
        </div>
      </div>

      {value.length > 0 && (
        <div className={styles.previewList}>
          {value.map((image) => (
            <div key={image.id} className={styles.previewItem}>
              <img src={image.preview} alt={image.file.name} className={styles.previewImage} />
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveFile(image.id)}
                disabled={disabled}
              >
                ×
              </button>
              <span className={styles.fileName}>{image.file.name}</span>
            </div>
          ))}
        </div>
      )}

      {error && errorText && <span className={styles.errorText}>{errorText}</span>}
    </div>
  )
}

export default ImageUpload
