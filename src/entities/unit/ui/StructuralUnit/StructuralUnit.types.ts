import { IStructuralUnit } from '../../model';

export interface IStructuralUnitProps {
  unit: IStructuralUnit;
  isDeleted?: boolean;
  refetchUnits: () => Promise<unknown>;
  onEdit: (unit: IStructuralUnit) => void;
}
