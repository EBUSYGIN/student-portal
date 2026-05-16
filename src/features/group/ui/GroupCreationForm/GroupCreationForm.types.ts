import { IOptionFilterItem } from '@/shared/OptionFilter/OptionFilter.types';

export interface IGroupCreationFormProps {
  organizationId: string;
  structuralUnits: IOptionFilterItem[];
  specialities: IOptionFilterItem[];
  refreshGroupsCache: () => Promise<void>;
}
