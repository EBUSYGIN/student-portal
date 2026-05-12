import { Button, StatusTag } from '@/shared';

import { organizationHandlers } from '../../handlers';
import { IOrganizationProps } from './Organization.types';
import styles from './Organization.module.css';

export function Organization({
  organization,
  isDeleted = false,
  onEdit,
  refetchOrganizations,
}: IOrganizationProps) {
  const onDelete = async () => {
    await organizationHandlers.deleteOrganization(organization);
    await refetchOrganizations();
  };

  return (
    <li className={styles.organization}>
      <span className={styles.name}>{organization.name}</span>
      <StatusTag status={isDeleted ? 'error' : 'success'}>
        {isDeleted ? 'Удалено' : 'Активно'}
      </StatusTag>
      <div className={styles.actions}>
        <Button
          size={'s'}
          icon='Edit'
          appearance='ghost'
          onClick={() => onEdit(organization)}
        />
        <Button size='s' icon='Trash' appearance='ghost' onClick={onDelete} />
      </div>
    </li>
  );
}
