'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import cn from 'classnames';

import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';

import { IModalProps } from './Modal.types';
import styles from './Modal.module.css';

export function Modal({
  isOpen,
  setIsOpen,
  children,
  className,
  title,
}: IModalProps) {
  return (
    <Dialog open={isOpen} onClose={setIsOpen} className={styles.modal}>
      <div className={styles.backdrop} aria-hidden='true' />
      <div className={styles.wrapper}>
        <DialogPanel className={styles.panel}>
          <Card className={cn(styles.card, className)}>
            <button
              type='button'
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label='Close modal'
            >
              <Icon.Close />
            </button>
            {title && (
              <DialogTitle className={styles.title}>{title}</DialogTitle>
            )}
            <div className={styles.content}>{children}</div>
          </Card>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
