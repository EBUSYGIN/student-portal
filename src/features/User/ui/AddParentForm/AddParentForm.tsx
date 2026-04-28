'use client';
import { useState } from 'react';

import { Button, Icon, Input, Modal } from '@/shared';

import styles from './AddParentForm.module.css';

export function AddParentForm({}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button appearance={'default'} size={'s'} onClick={() => setIsOpen(true)}>
        Добавить родителя
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Подключить родителя'>
        <form className={styles.form}>
          <Input
            label='Email'
            name='email'
            type='email'
            placeholder='Введите почту родителя'
          />
          <Button type='submit' size='l'>
            Отправить приглашение
          </Button>
          <div className={styles.infoWrapper}>
            <Icon.InfoWarning className={styles.infoIcon} />
            <span className={styles.infoText}>
              Родитель получит письмо со ссылкой для подключения Максимальное
              количество добавленных родителей 5
            </span>
          </div>
        </form>
      </Modal>
    </div>
  );
}
