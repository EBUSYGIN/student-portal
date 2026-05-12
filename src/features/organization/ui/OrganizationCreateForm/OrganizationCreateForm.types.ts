import { IOrganization } from '@/entities/organization/model';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface IOrganizationCreationFormProps {
  refetchOrganizations: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<IOrganization[], Error>>;
}
