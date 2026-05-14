import { IProfession } from '@/entities/profession/model';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface IProfessionCreationFormProps {
  organizationId: string;
  refetchProfessions: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<IProfession[], Error>>;
}
