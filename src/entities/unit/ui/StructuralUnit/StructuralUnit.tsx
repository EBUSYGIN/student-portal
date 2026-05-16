import { unitHandlers } from '../../handlers';
import { Button, StatusTag } from '@/shared';

import { IStructuralUnitProps } from './StructuralUnit.types';
import styles from './StructuralUnit.module.css';

export function StructuralUnit({
  unit,
  isDeleted = false,
  refetchUnits,
  onEdit,
}: IStructuralUnitProps) {
  const onDelete = async () => {
    await unitHandlers.deleteStructuralUnit(unit);
    await refetchUnits();
  };

  return (
    <li className={styles.structuralUnit}>
      <span className={styles.name}>{unit.name}</span>
      <StatusTag status={isDeleted ? 'error' : 'success'}>
        {isDeleted ? 'Удалено' : 'Активно'}
      </StatusTag>
      <div className={styles.actions}>
        <Button
          size={'s'}
          icon='Edit'
          appearance='ghost'
          disabled={isDeleted}
          onClick={() => onEdit(unit)}
        />
        <Button
          size='s'
          icon='Trash'
          appearance='ghost'
          disabled={isDeleted}
          onClick={onDelete}
        />
      </div>
    </li>
  );
}
