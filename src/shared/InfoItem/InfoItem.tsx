import cn from 'classnames';

import { InfoItemProps } from './InfoItems.types';
import styles from './InfoItem.module.css';

export function InfoItem({ label, value, className }: InfoItemProps) {
  return (
    <div className={cn(styles.info, className)}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
