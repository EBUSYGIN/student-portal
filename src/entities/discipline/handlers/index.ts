import axiosInstance from '@/assets/lib/axios/axiosInstance';

import { ClientDisciplineEndpoints } from '../api';
import { IDiscipline, IDisciplineCreation } from '../model';

const getDisciplines = async (
  organizationId: string,
  deleted?: 'deleted',
) => {
  const response = await axiosInstance.get<IDiscipline[]>(
    ClientDisciplineEndpoints.getDisciplines(organizationId, deleted),
  );
  return response.data;
};

const createDiscipline = async (discipline: IDisciplineCreation) => {
  const response = await axiosInstance.post(
    ClientDisciplineEndpoints.createDiscipline(),
    discipline,
  );
  return response.data;
};

const deleteDiscipline = async (discipline: IDiscipline) => {
  await axiosInstance.delete(
    ClientDisciplineEndpoints.deleteDiscipline(
      discipline.organization,
      discipline.id,
    ),
  );
};

export const disciplineHandlers = {
  getDisciplines,
  createDiscipline,
  deleteDiscipline,
};
