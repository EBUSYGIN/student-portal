import { groupHandlers } from '../../handlers';
import { Button, StatusTag } from '@/shared';

import { IGroupProps } from './Group.types';
import styles from './Group.module.css';

export function Group({
  group,
  organizationId,
  selectedSpecialityId,
  specialityName,
  structuralUnitName,
  isDeleted = false,
  refreshGroupsCache,
  onEdit,
}: IGroupProps) {
  const onDelete = async () => {
    await groupHandlers.deleteGroup(
      organizationId,
      selectedSpecialityId,
      group.id,
    );
    await refreshGroupsCache();
  };

  return (
    <li className={styles.group}>
      <span className={styles.name}>{group.name}</span>
      <span>{specialityName}</span>
      <span>{structuralUnitName}</span>
      <span>{group.semesters_number}</span>
      <StatusTag
        className={styles.status}
        status={isDeleted ? 'error' : 'success'}
      >
        {isDeleted ? 'Удалено' : 'Активно'}
      </StatusTag>
      <div className={styles.actions}>
        <Button
          size='s'
          icon='Edit'
          appearance='ghost'
          disabled={isDeleted}
          onClick={() => onEdit(group)}
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
