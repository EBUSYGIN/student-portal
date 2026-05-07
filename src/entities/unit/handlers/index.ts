import axiosInstance from '@/assets/lib/axios/axiosInstance';

import { UnitClientEndpoints } from '../api';
import { IStructuralUnit, IStructuralUnitCreation } from '../model';

const createStructuralUnit = async (unit: IStructuralUnitCreation) => {
  const response = await axiosInstance.post(
    UnitClientEndpoints.createStructuralUnit,
    unit,
  );
  return response.data;
};

const getStructuralUnits = async (
  organizationId: string,
  deleted?: 'deleted',
) => {
  const response = await axiosInstance.get<IStructuralUnit[]>(
    UnitClientEndpoints.getStructuralUnits(organizationId, deleted),
  );
  return response.data;
};

export const unitHandlers = {
  createStructuralUnit,
  getStructuralUnits,
};
