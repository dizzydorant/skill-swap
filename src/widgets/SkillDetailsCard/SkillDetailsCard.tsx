import { Button } from '@/shared/ui/Button';
import styles from './SkillDetailsCard.module.css';

export interface SkillDetailsCardProps {
  title: string;
  category: string;
  subCategory: string;
  description: string;
  onExchange?: () => void;
  isExchangeOffered?: boolean;
  className?: string;
}

export const SkillDetailsCard = ({
  title,
  category,
  subCategory,
  description,
  onExchange,
  isExchangeOffered = false,
  className = '',
}: SkillDetailsCardProps) => {
  const buttonText = isExchangeOffered ? 'Обмен предложен' : 'Предложить обмен';

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.content}>
        <div className={styles.textGroup}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <span className={styles.category}>{category}</span>
            <span className={styles.separator}>/</span>
            <span className={styles.subCategory}>{subCategory}</span>
          </div>
        </div>

        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          className={styles.exchangeButton}
          variant={isExchangeOffered ? 'outline' : 'primary'}
          onClick={onExchange}
          disabled={isExchangeOffered}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SkillDetailsCard;