import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './Input.module.css';

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
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
        {error && errorText && (
          <span className={styles.errorText}>{errorText}</span>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
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
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
      />
      {error && errorText && (
        <span className={styles.errorText}>{errorText}</span>
      )}
    </div>
  );
};

export default Input;