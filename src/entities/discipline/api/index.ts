import API_URL from '@/assets/lib/api';

export const ClientDisciplineEndpoints = {
  getDisciplines: (organizationId: string, deleted?: 'deleted') => {
    const params = new URLSearchParams({ organizationId });

    if (deleted) {
      params.set('deleted', deleted);
    }

    return `/api/admin/organization/discipline?${params.toString()}`;
  },
  createDiscipline: () => '/api/admin/organization/discipline',
  deleteDiscipline: (organizationId: string, id: string) => {
    const params = new URLSearchParams({ organizationId, id });
    return `/api/admin/organization/discipline/delete?${params.toString()}`;
  },
  editDiscipline: () => '/api/admin/organization/discipline/edit/',
};

export const ServerDisciplineEndpoints = {
  getDisciplines: (organizationId: string, deleted?: 'deleted') =>
    `${API_URL}/organizations/${organizationId}/disciplines${deleted ? '/deleted' : ''}/`,
  createDiscipline: (organizationId: string) =>
    `${API_URL}/organizations/${organizationId}/disciplines/`,
  deleteDiscipline: (organizationId: string, id: string) =>
    `${API_URL}/organizations/${organizationId}/disciplines/${id}/`,
  editDiscipline: (organizationId: string, id: string) =>
    `${API_URL}/organizations/${organizationId}/disciplines/${id}/`,
};
