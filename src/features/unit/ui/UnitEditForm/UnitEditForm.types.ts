import { IStructuralUnit } from '@/entities/unit/model';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface IUnitEditFormProps {
  unit: IStructuralUnit;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetchUnits: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<IStructuralUnit[], Error>>;
}
