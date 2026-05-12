import axiosInstance from '@/assets/lib/axios/axiosInstance';

import { ProfessionClientEndpoints } from '../api';
import { IProfession } from '../model';

const deleteProfession = async (profession: IProfession) => {
  await axiosInstance.delete(
    ProfessionClientEndpoints.deleteProfession(
      profession.organization,
      profession.id,
    ),
  );
};

export const professionHandlers = {
  deleteProfession,
};
