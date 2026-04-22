import cn from 'classnames';

import { Icon } from '../Icon/Icon';

import { IInputTypes } from './Input.types';
import styles from './Input.module.css';

export function Input({
  placeholder,
  label,
  error,
  icon,
  className,
  ...props
}: IInputTypes) {
  const IconComponent = icon && Icon[icon];

  return (
    <div className={cn(styles.inputBox, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {IconComponent && <IconComponent className={styles.icon} />}
        <input className={styles.input} placeholder={placeholder} {...props} />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
