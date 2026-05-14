'use client';

import { useState } from 'react';

import { Profession } from '@/entities/profession';
import { IProfession } from '@/entities/profession/model';
import { useAnyInfo } from '@/assets/lib/hooks/useAnyInfo';
import { professionHandlers } from '@/entities/profession/handlers';
import {
  ProfessionCreationForm,
  ProfessionEditForm,
} from '@/features/profession';
import { StatusFilter } from '@/shared';

import styles from './ProfessionList.module.css';

export function ProfessionList() {
  const [isActiveFilter, setIsActiveFilter] = useState(true);
  const [editingProfession, setEditingProfession] =
    useState<IProfession | null>(null);
  const organizationId = '8da9058f-ba16-4de3-8861-7cf67eb8ea2c';
  const statusFilter = isActiveFilter ? 'active' : 'deleted';

  const { data: professions = [], refetch } = useAnyInfo(
    `professions-${organizationId}-${statusFilter}`,
    () =>
      professionHandlers.getProfessions(
        organizationId,
        isActiveFilter ? undefined : 'deleted',
      ),
  );

  return (
    <>
      <div className={styles.filterActions}>
        <div className={styles.filterActionsRight}>
          <ProfessionCreationForm
            organizationId={organizationId}
            refetchProfessions={refetch}
          />
          <StatusFilter
            isActive={isActiveFilter}
            onToggle={setIsActiveFilter}
          />
        </div>
      </div>
      <ul className={styles.list}>
      <div className={styles.listHead}>
        <span>Код</span>
        <span>Наименование</span>
        <span>Тип</span>
        <span>Семестры</span>
        <span>Статус</span>
        <span>Действия</span>
      </div>
      {professions.map((profession) => (
        <Profession
          key={profession.id}
          profession={profession}
          isDeleted={!isActiveFilter}
          onEdit={setEditingProfession}
          refetchProfessions={refetch}
        />
      ))}
    </ul>
      {editingProfession ? (
        <ProfessionEditForm
          profession={editingProfession}
          refetchProfessions={refetch}
          isOpen={Boolean(editingProfession)}
          setIsOpen={(open) => {
            if (!open) {
              setEditingProfession(null);
            }
          }}
        />
      ) : null}
    </>
  );
}
