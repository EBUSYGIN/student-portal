'use client';

import { useState } from 'react';

import { unitHandlers } from '@/entities/unit/handlers';
import { useAnyInfo } from '@/assets/lib/hooks/useAnyInfo';
import { StructuralUnit } from '@/entities/unit';
import { IStructuralUnit } from '@/entities/unit/model';
import { StatusFilter } from '@/shared';

import { UnitCreationForm } from '@/features/unit';
import { UnitEditForm } from '@/features/unit';

import styles from './StructuralUnitList.module.css';

export function StructuralUnitList() {
  const [isActiveFilter, setIsActiveFilter] = useState(true);
  const [editingUnit, setEditingUnit] = useState<IStructuralUnit | null>(null);
  const organizationId = '6f042136-7c57-4572-b801-4c73176f01ab';
  const statusFilter = isActiveFilter ? 'active' : 'deleted';

  const { data: structuralUnits = [], refetch } = useAnyInfo(
    `structuralUnits-${statusFilter}`,
    () =>
      unitHandlers.getStructuralUnits(
        organizationId,
        isActiveFilter ? undefined : 'deleted',
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
          <StatusFilter isActive={isActiveFilter} onToggle={setIsActiveFilter} />
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
            isDeleted={!isActiveFilter}
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
