import cn from 'classnames';

import { IMainContainerProps } from './MainContainer.types';
import styles from './MainContainer.module.css';

export function MainContainer({ className, children }: IMainContainerProps) {
  return (
    <main className={cn(styles.mainContainer, className)}>{children}</main>
  );
}
