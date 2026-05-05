import { RequestItem } from '@/entities/admin';
import styles from './RequestList.module.css';

export function RequestList() {
  return (
    <div className={styles.requestList}>
      <div className={styles.requestListHeader}>
        <span>Имя</span>
        <span>Email</span>
        <span>Телефон</span>
        <span>Организация</span>
        <span>Дата</span>
        <span>Статус</span>
      </div>
      <RequestItem />
      <RequestItem />
      <RequestItem />
    </div>
  );
}
