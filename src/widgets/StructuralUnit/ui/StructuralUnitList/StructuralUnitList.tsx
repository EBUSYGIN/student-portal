'use client';

import { useState } from 'react';

import { unitHandlers } from '@/entities/unit/handlers';
import { useAnyInfo } from '@/assets/lib/hooks/useAnyInfo';
import { StructuralUnit } from '@/entities/unit';
import { IStructuralUnit } from '@/entities/unit/model';

import { UnitCreationForm, UnitFilter } from '@/features/unit';
import { UnitStatusFilter } from '@/features/unit';
import { UnitEditForm } from '@/features/unit';

import styles from './StructuralUnitList.module.css';

export function StructuralUnitList() {
  const [statusFilter, setStatusFilter] = useState<UnitStatusFilter>('all');
  const [editingUnit, setEditingUnit] = useState<IStructuralUnit | null>(null);
  const organizationId = '6f042136-7c57-4572-b801-4c73176f01ab';

  const { data: structuralUnits = [], refetch } = useAnyInfo(
    `structuralUnits-${statusFilter}`,
    () =>
      unitHandlers.getStructuralUnits(
        organizationId,
        statusFilter === 'deleted' ? 'deleted' : undefined,
      ),
  );

  return (
    <>
      <div className={styles.filterActions}>
        {/* <Input placeholder='Поиск' icon='Search' appearance='search' /> */}
        <div className={styles.filterActionsRight}>
          <UnitCreationForm
            organizationId={organizationId}
            refetchUnits={refetch}
          />
          <UnitFilter value={statusFilter} onChange={setStatusFilter} />
        </div>
      </div>
      <ul className={styles.list}>
        <div className={styles.listHead}>
          <span>Название подразделения</span>
          <span>Статус</span>
          <span>Действия</span>
        </div>
        {structuralUnits.map((unit) => (
          <StructuralUnit
            key={unit.id}
            unit={unit}
            isDeleted={statusFilter === 'deleted'}
            refetchUnits={refetch}
            onEdit={setEditingUnit}
          />
        ))}
      </ul>
      {editingUnit && (
        <UnitEditForm
          unit={editingUnit}
          refetchUnits={refetch}
          isOpen={Boolean(editingUnit)}
          setIsOpen={(isOpen) => {
            if (!isOpen) {
              setEditingUnit(null);
            }
          }}
        />
      )}
    </>
  );
}
