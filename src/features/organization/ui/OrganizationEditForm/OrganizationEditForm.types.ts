import { IOrganization } from '@/entities/organization/model';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface IOrganizationEditFormProps {
  organization: IOrganization;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetchOrganizations: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<IOrganization[], Error>>;
}
