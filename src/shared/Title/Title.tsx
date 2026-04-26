import cn from 'classnames';
import { createElement } from 'react';

import { ITitleProps } from './Title.types';
import styles from './Title.module.css';

export function Title({ type, size, className, children }: ITitleProps) {
  return createElement(
    type,
    {
      className: cn(styles.title, styles[size], className),
    },
    children,
  );
}
