import { IGroup } from '../../model';

export interface IGroupProps {
  group: IGroup;
  organizationId: string;
  selectedSpecialityId: string;
  specialityName: string;
  structuralUnitName: string;
  isDeleted?: boolean;
  refreshGroupsCache: () => Promise<void>;
  onEdit: (group: IGroup) => void;
}
