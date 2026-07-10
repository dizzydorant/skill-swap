import React from 'react';
import { Modal } from '../Modal'; 
import styles from './SuccessModal.module.css';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: string;         
  title: string;
  description: string;
  buttonText: string;   
  className?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
  buttonText,
  className = '',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={`${styles.modalContent} ${className}`}>
        <div className={styles.iconWrapper}>
          <img src={icon} alt="" className={styles.icon} />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <button type="button" className={styles.actionButton} onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </Modal>
  );
};
