'use client';

import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useAnyInfo } from '@/assets/lib/hooks/useAnyInfo';
import { invalidateGroupsQueries } from '@/entities/group/lib/invalidateGroupsQueries';
import { Group, IGroup } from '@/entities/group';
import { resolveOptionId } from '@/entities/group/lib/normalizeGroup';
import { groupHandlers } from '@/entities/group/handlers';
import { professionHandlers } from '@/entities/profession/handlers';
import { unitHandlers } from '@/entities/unit/handlers';
import { GroupCreationForm, GroupEditForm } from '@/features/group';
import { OptionFilter, StatusFilter } from '@/shared';

import styles from './GroupList.module.css';

export function GroupList() {
  const [isActiveFilter, setIsActiveFilter] = useState(true);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [selectedSpecialityId, setSelectedSpecialityId] = useState<string | null>(
    null,
  );
  const [editingGroup, setEditingGroup] = useState<IGroup | null>(null);

  const organizationId = '8da9058f-ba16-4de3-8861-7cf67eb8ea2c';
  const statusFilter = isActiveFilter ? 'active' : 'deleted';
  const isFiltersReady = Boolean(selectedUnitId && selectedSpecialityId);
  const queryClient = useQueryClient();

  const refreshGroupsCache = useCallback(
    () => invalidateGroupsQueries(queryClient, organizationId),
    [queryClient, organizationId],
  );

  const { data: structuralUnits = [] } = useAnyInfo(
    'structuralUnits-for-groups',
    () => unitHandlers.getStructuralUnits(organizationId),
  );

  const { data: specialities = [] } = useAnyInfo(
    'specialities-for-groups',
    () => professionHandlers.getProfessions(organizationId),
  );

  const { data: groups = [] } = useAnyInfo(
    `groups-${organizationId}-${selectedSpecialityId}-${statusFilter}`,
    () =>
      groupHandlers.getGroups(
        organizationId,
        selectedSpecialityId!,
        isActiveFilter ? undefined : 'deleted',
      ),
    { enabled: isFiltersReady },
  );

  const filteredGroups = useMemo(
    () =>
      groups.filter(
        (group) =>
          resolveOptionId(
            group.structural_unit,
            structuralUnits,
            selectedUnitId ?? '',
          ) === selectedUnitId,
      ),
    [groups, selectedUnitId, structuralUnits],
  );

  const handleUnitSelect = (unitId: string) => {
    setSelectedUnitId(unitId);
    setSelectedSpecialityId(null);
  };

  return (
    <>
      <div className={styles.filterActions}>
        <div className={styles.filterActionsLeft}>
          <OptionFilter
            label='Подразделение'
            placeholder='Выберите подразделение'
            options={structuralUnits}
            selectedId={selectedUnitId}
            onSelect={handleUnitSelect}
          />
          <OptionFilter
            label='Специальность'
            placeholder={
              selectedUnitId
                ? 'Выберите специальность'
                : 'Сначала выберите подразделение'
            }
            options={specialities}
            selectedId={selectedSpecialityId}
            onSelect={setSelectedSpecialityId}
            disabled={!selectedUnitId}
          />
        </div>
        <div className={styles.filterActionsRight}>
          <GroupCreationForm
            organizationId={organizationId}
            structuralUnits={structuralUnits}
            specialities={specialities}
            refreshGroupsCache={refreshGroupsCache}
          />
          <StatusFilter
            isActive={isActiveFilter}
            onToggle={setIsActiveFilter}
          />
        </div>
      </div>
      {isFiltersReady ? (
        <ul className={styles.list}>
          <div className={styles.listHead}>
            <span>Наименование</span>
            <span>Специальность</span>
            <span>Структурное подразделение</span>
            <span>Семестры</span>
            <span>Статус</span>
            <span>Действия</span>
          </div>
          {filteredGroups.map((group) => {
            const specialityName =
              specialities.find((item) => item.id === group.speciality)?.name ??
              specialities.find((item) => item.name === group.speciality)?.name ??
              '—';
            const structuralUnitName =
              structuralUnits.find((item) => item.id === group.structural_unit)
                ?.name ??
              structuralUnits.find((item) => item.name === group.structural_unit)
                ?.name ??
              '—';

            return (
              <Group
                key={group.id}
                group={group}
                organizationId={organizationId}
                selectedSpecialityId={selectedSpecialityId!}
                specialityName={specialityName}
                structuralUnitName={structuralUnitName}
                isDeleted={!isActiveFilter}
                refreshGroupsCache={refreshGroupsCache}
                onEdit={setEditingGroup}
              />
            );
          })}
        </ul>
      ) : null}
      {editingGroup ? (
        <GroupEditForm
          key={editingGroup.id}
          group={editingGroup}
          organizationId={organizationId}
          selectedSpecialityId={selectedSpecialityId!}
          selectedUnitId={selectedUnitId!}
          structuralUnits={structuralUnits}
          specialities={specialities}
          isOpen={Boolean(editingGroup)}
          setIsOpen={(isOpen) => {
            if (!isOpen) {
              setEditingGroup(null);
            }
          }}
          refreshGroupsCache={refreshGroupsCache}
        />
      ) : null}
    </>
  );
}
