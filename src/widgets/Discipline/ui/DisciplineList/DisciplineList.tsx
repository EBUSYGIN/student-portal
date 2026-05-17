'use client';

import { useState } from 'react';

import { useAnyInfo } from '@/assets/lib/hooks/useAnyInfo';
import { Discipline } from '@/entities/discipline';
import { disciplineHandlers } from '@/entities/discipline/handlers';
import { IDiscipline } from '@/entities/discipline/model';
import {
  DisciplineCreationForm,
  DisciplineEditForm,
} from '@/features/discipline';
import { StatusFilter } from '@/shared';

import styles from './DisciplineList.module.css';

export function DisciplineList() {
  const [isActiveFilter, setIsActiveFilter] = useState(true);
  const [editingDiscipline, setEditingDiscipline] = useState<IDiscipline | null>(
    null,
  );
  const organizationId = '8da9058f-ba16-4de3-8861-7cf67eb8ea2c';
  const statusFilter = isActiveFilter ? 'active' : 'deleted';

  const { data: disciplines = [], refetch } = useAnyInfo(
    `disciplines-${organizationId}-${statusFilter}`,
    () =>
      disciplineHandlers.getDisciplines(
        organizationId,
        isActiveFilter ? undefined : 'deleted',
      ),
  );

  return (
    <>
      <div className={styles.filterActions}>
        <div className={styles.filterActionsRight}>
          <DisciplineCreationForm
            organizationId={organizationId}
            refetchDisciplines={refetch}
          />
          <StatusFilter
            isActive={isActiveFilter}
            onToggle={setIsActiveFilter}
          />
        </div>
      </div>
      <ul className={styles.list}>
        <div className={styles.listHead}>
          <span>Полное наименование</span>
          <span>Сокращенное</span>
          <span>Вид</span>
          <span>Часы по семестрам</span>
          <span>Группы</span>
          <span>Действия</span>
        </div>
        {disciplines.map((discipline) => (
          <Discipline
            key={discipline.id}
            discipline={discipline}
            isDeleted={!isActiveFilter}
            onEdit={setEditingDiscipline}
            refetchDisciplines={refetch}
          />
        ))}
      </ul>
      {editingDiscipline ? (
        <DisciplineEditForm
          discipline={editingDiscipline}
          refetchDisciplines={refetch}
          isOpen={Boolean(editingDiscipline)}
          setIsOpen={(open) => {
            if (!open) {
              setEditingDiscipline(null);
            }
          }}
        />
      ) : null}
    </>
  );
}
