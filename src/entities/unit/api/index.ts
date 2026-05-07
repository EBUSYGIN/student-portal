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
};

export const UnitServerEndpoints = {
  createStructuralUnit: (organizationId: string) =>
    `${API_URL}/organizations/${organizationId}/structural_units/`,
  getStructuralUnits: (organizationId: string, deleted?: 'deleted') =>
    `${API_URL}/organizations/${organizationId}/structural_units${deleted ? '/deleted' : ''}/`,
};
