import axiosInstance from '@/assets/lib/axios/axiosInstance';

import { normalizeGroup } from '../lib/normalizeGroup';
import { ClientGroupEndpoints } from '../api';
import { IGroup, IGroupCreation, IGroupEdit } from '../model';

const getGroups = async (
  organizationId: string,
  specialityId: string,
  deleted?: 'deleted',
) => {
  const response = await axiosInstance.get<Record<string, unknown>[]>(
    ClientGroupEndpoints.getGroups(organizationId, specialityId, deleted),
  );
  return response.data.map(normalizeGroup);
};

const createGroup = async (group: IGroupCreation) => {
  const response = await axiosInstance.post(
    ClientGroupEndpoints.createGroup(),
    group,
  );
  return response.data;
};

const editGroup = async (group: IGroupEdit) => {
  const response = await axiosInstance.patch(
    ClientGroupEndpoints.editGroup(),
    group,
  );
  return response.data;
};

const deleteGroup = async (
  organizationId: string,
  specialityId: string,
  groupId: string,
) => {
  await axiosInstance.delete(
    ClientGroupEndpoints.deleteGroup(organizationId, specialityId, groupId),
  );
};

export const groupHandlers = {
  getGroups,
  createGroup,
  editGroup,
  deleteGroup,
};
