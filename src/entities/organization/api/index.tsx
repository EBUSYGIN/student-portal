import API_URL from '@/assets/lib/api';

export const ClientOrganizationEndpoints = {
  createOrganization: '/api/superadmin/organizations',
  getOrganizations: (deleted?: 'deleted') => {
    const params = new URLSearchParams();

    if (deleted) {
      params.set('deleted', deleted);
    }

    return `/api/superadmin/organizations${params.toString() ? `?${params.toString()}` : ''}`;
  },

  editOrganization: () => `/api/superadmin/organizations/edit`,
  deleteOrganization: (id: string) => {
    const params = new URLSearchParams({ id });
    return `/api/superadmin/organizations/delete?${params.toString()}`;
  },
};

export const ServerOrganizationEndpoints = {
  createOrganization: () => `${API_URL}/organizations/`,
  getOrganizations: (deleted?: 'deleted') =>
    `${API_URL}/organizations${deleted ? '/deleted' : ''}/`,
  editOrganization: (id: string) => `${API_URL}/organizations/${id}/`,
  deleteOrganization: (id: string) => `${API_URL}/organizations/${id}/`,
};
