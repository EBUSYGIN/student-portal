import cn from 'classnames';

import { Icon } from '../Icon/Icon';

import { IInputTypes } from './Input.types';
import styles from './Input.module.css';

export function Input({
  placeholder,
  label,
  error,
  icon,
  appearance = 'default',
  className,
  ...props
}: IInputTypes) {
  const IconComponent = icon && Icon[icon];

  return (
    <div className={cn(styles.inputBox, className, appearance === 'search' && styles.inputBoxSearch)}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {IconComponent && <IconComponent className={styles.icon} />}
        <input
          className={cn(styles.input, IconComponent && styles.inputWithIcon)}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
