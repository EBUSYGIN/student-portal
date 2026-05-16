import { professionHandlers } from '../../handlers';
import { Button, StatusTag } from '@/shared';

import { IProfessionProps } from './Profession.types';
import styles from './Profession.module.css';

export function Profession({
  profession,
  isDeleted = false,
  refetchProfessions,
  onEdit,
}: IProfessionProps) {
  const onDelete = async () => {
    await professionHandlers.deleteProfession(profession);
    await refetchProfessions();
  };

  return (
    <li className={styles.profession}>
      <span>{profession.code}</span>
      <span>{profession.name}</span>
      <span>
        {profession.type === 'specialty' ? 'Специальность' : 'Профессия'}
      </span>
      <span>{profession.semesters_number}</span>
      <StatusTag
        className={styles.status}
        status={isDeleted ? 'error' : 'success'}
      >
        {isDeleted ? 'Удалено' : 'Активно'}
      </StatusTag>
      <div className={styles.actions}>
        <Button
          size={'s'}
          icon='Edit'
          appearance='ghost'
          onClick={() => onEdit(profession)}
        />
        <Button size='s' icon='Trash' appearance='ghost' onClick={onDelete} />
      </div>
    </li>
  );
}
