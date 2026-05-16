import { IGroup } from '@/entities/group/model';

import { IOptionFilterItem } from '@/shared/OptionFilter/OptionFilter.types';

export interface IGroupEditFormProps {
  group: IGroup;
  organizationId: string;
  selectedSpecialityId: string;
  selectedUnitId: string;
  structuralUnits: IOptionFilterItem[];
  specialities: IOptionFilterItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refreshGroupsCache: () => Promise<void>;
}
