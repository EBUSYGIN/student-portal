'use client';

import { useState } from 'react';

import { useAnyInfo } from '@/assets/lib/hooks/useAnyInfo';
import { organizationHandlers } from '@/entities/organization/handlers';
import { IOrganization, Organization } from '@/entities/organization/ui';
import {
  OrganizationCreateForm,
  OrganizationEditForm,
} from '@/features/organization';
import { StatusFilter } from '@/shared';

import styles from './OrganizationList.module.css';

export function OrganizationList() {
  const [isActiveFilter, setIsActiveFilter] = useState(true);
  const [editingOrganization, setEditingOrganization] =
    useState<IOrganization | null>(null);
  const statusFilter = isActiveFilter ? 'active' : 'deleted';

  const { data: organizations = [], refetch } = useAnyInfo(
    `organizations-${statusFilter}`,
    () =>
      organizationHandlers.getOrganizations(
        isActiveFilter ? undefined : 'deleted',
      ),
  );

  return (
    <>
      <div className={styles.filterActions}>
        <div className={styles.filterActionsRight}>
          <OrganizationCreateForm refetchOrganizations={refetch} />
          <StatusFilter
            isActive={isActiveFilter}
            onToggle={setIsActiveFilter}
          />
        </div>
      </div>
      <ul className={styles.list}>
        <div className={styles.listHead}>
          <span>Название организации</span>
          <span>Статус</span>
          <span>Действия</span>
        </div>
        {organizations.map((organization) => (
          <Organization
            key={organization.id}
            organization={organization}
            isDeleted={!isActiveFilter}
            onEdit={setEditingOrganization}
            refetchOrganizations={refetch}
          />
        ))}
      </ul>
      {editingOrganization && (
        <OrganizationEditForm
          organization={editingOrganization}
          refetchOrganizations={refetch}
          isOpen={Boolean(editingOrganization)}
          setIsOpen={(open) => {
            if (!open) {
              setEditingOrganization(null);
            }
          }}
        />
      )}
    </>
  );
}
