import { IProfession } from '@/entities/profession/model';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface IProfessionEditFormProps {
  profession: IProfession;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetchProfessions: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<IProfession[], Error>>;
}
