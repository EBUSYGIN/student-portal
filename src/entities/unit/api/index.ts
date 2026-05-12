import API_URL from '@/assets/lib/api';

export const UnitClientEndpoints = {
  createStructuralUnit: '/api/admin/organization/structural-unit',

  getStructuralUnits: (organizationId: string, deleted?: 'deleted') => {
    const params = new URLSearchParams({ organizationId });

    if (deleted) {
      params.set('deleted', deleted);
    }

    return `/api/admin/organization/structural-unit?${params.toString()}`;
  },

  deleteStructuralUnit: (organizationId: string, id: string) => {
    const params = new URLSearchParams({ organizationId, id });
    return `/api/admin/organization/structural-unit/delete?${params.toString()}`;
  },
  editStructuralUnit: () => `/api/admin/organization/structural-unit/edit/`,
};

export const UnitServerEndpoints = {
  createStructuralUnit: (organizationId: string) =>
    `${API_URL}/organizations/${organizationId}/structural_units/`,
  getStructuralUnits: (organizationId: string, deleted?: 'deleted') =>
    `${API_URL}/organizations/${organizationId}/structural_units${deleted ? '/deleted' : ''}/`,
  deleteStructuralUnit: (organizationId: string, id: string) =>
    `${API_URL}/organizations/${organizationId}/structural_units/${id}/`,
  editStructuralUnit: (organizationId: string, id: string) =>
    `${API_URL}/organizations/${organizationId}/structural_units/${id}/`,
};
