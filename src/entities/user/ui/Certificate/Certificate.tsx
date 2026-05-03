import { Button, StatusTag } from '@/shared';

import styles from './Certificate.module.css';

export function Certificate() {
  return (
    <div className={styles.certificate}>
      <div className={styles.info}>
        <div className={styles.status}>
          <StatusTag status='info'>8127712-oauo-27382837238</StatusTag>
          <StatusTag status='success'>Выдано</StatusTag>
          <span className={styles.date}>
            Дата: {new Date().toLocaleDateString()}
          </span>
        </div>
        <span className={styles.name}>
          Справка о чем-то невероятно важном и очень важном и очень важном и
          очень важном и очень очень важном
        </span>
      </div>
      <Button size='s'>Перейти</Button>
    </div>
  );
}
