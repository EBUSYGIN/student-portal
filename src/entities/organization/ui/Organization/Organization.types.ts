import { IOrganization } from '../../model';

export interface IOrganizationProps {
  organization: IOrganization;
  isDeleted?: boolean;
  onEdit: (organization: IOrganization) => void;
  refetchOrganizations: () => Promise<unknown>;
}
