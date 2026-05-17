import { disciplineHandlers } from '../../handlers';
import {
  formatDisciplineGroups,
  formatSemesterHours,
  getDisciplineTypeLabel,
} from '../../lib/formatDiscipline';
import { Button } from '@/shared';

import { IDisciplineProps } from './Discipline.types';
import styles from './Discipline.module.css';

export function Discipline({
  discipline,
  isDeleted = false,
  refetchDisciplines,
  onEdit,
}: IDisciplineProps) {
  const onDelete = async () => {
    await disciplineHandlers.deleteDiscipline(discipline);
    await refetchDisciplines();
  };

  return (
    <li className={styles.discipline}>
      <span>{discipline.name}</span>
      <span>{discipline.short_name}</span>
      <span>{getDisciplineTypeLabel(discipline.type)}</span>
      <span>{formatSemesterHours(discipline.semester_hours)}</span>
      <span className={styles.groups}>
        {formatDisciplineGroups(discipline.groups)}
      </span>
      <div className={styles.actions}>
        <Button
          size='s'
          icon='Edit'
          appearance='ghost'
          disabled={isDeleted}
          onClick={() => onEdit(discipline)}
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
