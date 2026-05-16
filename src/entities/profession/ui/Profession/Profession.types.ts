import { IProfession } from '../../model';

export interface IProfessionProps {
  profession: IProfession;
  isDeleted?: boolean;
  onEdit: (profession: IProfession) => void;
  refetchProfessions: () => Promise<unknown>;
}
