import cn from 'classnames';

import { ICardProps } from './Card.types';
import styles from './Card.module.css';

export function Card({ className, children }: ICardProps) {
  return <div className={cn(styles.card, className)}>{children}</div>;
}
