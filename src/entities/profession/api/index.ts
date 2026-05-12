import API_URL from '@/assets/lib/api';

export const ProfessionClientEndpoints = {
  deleteProfession: (organizationId: string, id: string) => {
    const params = new URLSearchParams({ organizationId, id });
    return `/api/admin/organization/profession/delete?${params.toString()}`;
  },
};

export const ProfessionServerEndpoints = {
  deleteProfession: (organizationId: string, id: string) =>
    `${API_URL}/organizations/${organizationId}/professions/${id}/`,
};
