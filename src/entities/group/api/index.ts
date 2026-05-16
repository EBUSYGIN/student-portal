import API_URL from '@/assets/lib/api';

export const ClientGroupEndpoints = {
  createGroup: () => '/api/admin/organization/group',
  editGroup: () => '/api/admin/organization/group/edit',
  deleteGroup: (
    organizationId: string,
    specialityId: string,
    id: string,
  ) => {
    const params = new URLSearchParams({ organizationId, specialityId, id });
    return `/api/admin/organization/group/delete?${params.toString()}`;
  },

  getGroups: (
    organizationId: string,
    specialityId: string,
    deleted?: 'deleted',
  ) => {
    const params = new URLSearchParams({ organizationId, specialityId });

    if (deleted) {
      params.set('deleted', deleted);
    }

    return `/api/admin/organization/group?${params.toString()}`;
  },
};

export const ServerGroupEndpoints = {
  createGroup: (organizationId: string, specialityId: string) =>
    `${API_URL}/organizations/${organizationId}/specialities/${specialityId}/groups/`,

  editGroup: (organizationId: string, specialityId: string, id: string) =>
    `${API_URL}/organizations/${organizationId}/specialities/${specialityId}/groups/${id}/`,

  deleteGroup: (organizationId: string, specialityId: string, id: string) =>
    `${API_URL}/organizations/${organizationId}/specialities/${specialityId}/groups/${id}/`,

  getGroups: (
    organizationId: string,
    specialityId: string,
    deleted?: 'deleted',
  ) =>
    `${API_URL}/organizations/${organizationId}/specialities/${specialityId}/groups${deleted ? '/deleted' : ''}/`,
};
