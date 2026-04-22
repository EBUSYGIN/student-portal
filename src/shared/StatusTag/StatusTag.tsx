import cn from 'classnames';

import styles from './StatusTag.module.css';
import { ReactNode } from 'react';
import { IStatusTagTypes } from './StatusTag.types';

export function StatusTag({ className, status, children }: IStatusTagTypes) {
  return (
    <div className={cn(styles.tag, styles[status], className)}>{children}</div>
  );
}
