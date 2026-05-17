import { IDiscipline } from '../../model';

export interface IDisciplineProps {
  discipline: IDiscipline;
  isDeleted?: boolean;
  refetchDisciplines: () => Promise<unknown>;
  onEdit: (discipline: IDiscipline) => void;
}
