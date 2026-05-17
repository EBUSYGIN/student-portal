import { IDiscipline } from '@/entities/discipline/model';

export interface IDisciplineEditFormProps {
  discipline: IDiscipline;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  refetchDisciplines: () => Promise<unknown>;
}
