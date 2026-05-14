import { forwardRef, useId } from 'react';

import cn from 'classnames';

import { ISelectTypes } from './Select.types';
import styles from './Select.module.css';

export const Select = forwardRef<HTMLSelectElement, ISelectTypes>(
  function Select(
    { label, error, className, id: idProp, children, ...props },
    ref,
  ) {
    const generatedId = useId();
    const id = idProp ?? (label ? generatedId : undefined);

    return (
      <div className={cn(styles.selectBox, className)}>
        {label ? (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        ) : null}
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            id={id}
            className={styles.select}
            {...props}
          >
            {children}
          </select>
        </div>
        {error ? <span className={styles.error}>{error}</span> : null}
      </div>
    );
  },
);
