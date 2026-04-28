'use client ';

import cn from 'classnames';

import { Icon } from '../Icon/Icon';

import { IButtonTypes } from './Button.types';
import styles from './Button.module.css';

export function Button({
  appearance = 'default',
  size,
  children,
  icon,
  className,
  ...props
}: IButtonTypes) {
  const IconComponent = icon ? Icon[icon] : null;

  return (
    <button
      className={cn(styles.button, styles[appearance], styles[size], className)}
      {...props}
    >
      {children} {IconComponent && <IconComponent />}
    </button>
  );
}
