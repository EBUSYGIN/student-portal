import { Button, StatusTag } from '@/shared';

import styles from './StructuralUnit.module.css';

export function StructuralUnit() {
  return (
    <li className={styles.structuralUnit}>
      <span className={styles.name}>
        Какое-то невероятно длинное подразделение боже мой огоогогогогогого
      </span>
      <StatusTag status={'success'}>Активно</StatusTag>
      <div className={styles.actions}>
        <Button size={'s'} icon='Edit' appearance='ghost' />
        <Button size='s' icon='Trash' appearance='ghost' />
      </div>
    </li>
  );
}
