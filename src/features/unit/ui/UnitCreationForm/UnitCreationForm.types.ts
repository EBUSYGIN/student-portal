import { IStructuralUnit } from '@/entities/unit/model';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface IUnitCreationFormProps {
  organizationId: string;
  refetchUnits: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<IStructuralUnit[], Error>>;
}
