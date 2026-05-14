import API_URL from '@/assets/lib/api';

export const ClientProfessionEndpoints = {
  getProfessions: (organizationId: string, deleted?: 'deleted') => {
    const params = new URLSearchParams({ organizationId });

    if (deleted) {
      params.set('deleted', deleted);
    }

    return `/api/admin/organization/profession?${params.toString()}`;
  },
  createProfession: () => '/api/admin/organization/profession',
  deleteProfession: (organizationId: string, id: string) => {
    const params = new URLSearchParams({ organizationId, id });
    return `/api/admin/organization/profession/delete?${params.toString()}`;
  },
};

export const ServerProfessionEndpoints = {
  getProfessions: (organizationId: string, deleted?: 'deleted') =>
    `${API_URL}/organizations/${organizationId}/specialities${deleted ? '/deleted' : ''}/`,
  createProfession: (organizationId: string) =>
    `${API_URL}/organizations/${organizationId}/specialities/`,
  deleteProfession: (organizationId: string, id: string) =>
    `${API_URL}/organizations/${organizationId}/specialities/${id}/`,
};
