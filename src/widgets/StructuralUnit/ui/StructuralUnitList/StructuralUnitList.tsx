import { StructuralUnit } from '@/entities/unit';

import styles from './StructuralUnitList.module.css';
import { UnitFilter } from '@/features/unit';
import { Input } from '@/shared';

export function StructuralUnitList() {
  return (
    <>
      <div className={styles.filterActions}>
        <Input placeholder='Поиск' icon='Search' appearance='search' />
        <UnitFilter />
      </div>
      <ul className={styles.list}>
        <div className={styles.listHead}>
          <span>Название подразделения</span>
          <span>Статус</span>
          <span>Действия</span>
        </div>
        <StructuralUnit />
        <StructuralUnit />
      </ul>
    </>
  );
}
