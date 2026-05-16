import axiosInstance from '@/assets/lib/axios/axiosInstance';

import { ClientProfessionEndpoints } from '../api';
import { IProfession, IProfessionCreation } from '../model';

const getProfessions = async (
  organizationId: string,
  deleted?: 'deleted',
) => {
  const response = await axiosInstance.get<IProfession[]>(
    ClientProfessionEndpoints.getProfessions(organizationId, deleted),
  );
  return response.data;
};

const createProfession = async (profession: IProfessionCreation) => {
  const response = await axiosInstance.post(
    ClientProfessionEndpoints.createProfession(),
    profession,
  );
  return response.data;
};

const deleteProfession = async (profession: IProfession) => {
  await axiosInstance.delete(
    ClientProfessionEndpoints.deleteProfession(
      profession.organization,
      profession.id,
    ),
  );
};

export const professionHandlers = {
  getProfessions,
  createProfession,
  deleteProfession,
};
