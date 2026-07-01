import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './Input.module.css';
import searchIcon from '@/shared/assets/img/search-icon.svg'; // ← импорт

export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'search';
  name?: string;
  id?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
  autoFocus?: boolean;
  required?: boolean;
  maxLength?: number;
  isSearch?: boolean;
  isForm?: boolean;
  onSearch?: () => void;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  name,
  id,
  error = false,
  errorText = '',
  disabled = false,
  multiline = false,
  rows = 4,
  className = '',
  autoFocus = false,
  required = false,
  maxLength,
  isSearch = false,
  isForm = false,
  onSearch,
  ...props
}) => {
  const inputClasses = `
    ${styles.input}
    ${error ? styles.error : ''}
    ${disabled ? styles.disabled : ''}
    ${isSearch ? styles.search : ''}
    ${isForm ? styles.form : ''}
    ${className}
  `.trim();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && isSearch && onSearch) {
      onSearch();
    }
  };

  if (multiline) {
    return (
      <div className={styles.wrapper}>
        <textarea
          className={inputClasses}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={id}
          disabled={disabled}
          rows={rows}
          autoFocus={autoFocus}
          required={required}
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
        {error && errorText && (
          <span className={styles.errorText}>{errorText}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${isSearch ? styles.searchWrapper : ''}`}>
      <div className={styles.inputWrapper}>
        {isSearch && (
          <img 
            src={searchIcon} 
            alt="Поиск" 
            className={styles.searchIcon}
            onClick={onSearch}
          />
        )}
        <input
          className={inputClasses}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={id}
          disabled={disabled}
          autoFocus={autoFocus}
          required={required}
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      </div>
      {error && errorText && (
        <span className={styles.errorText}>{errorText}</span>
      )}
    </div>
  );
};

export default Input;