import { ClientOrganizationEndpoints } from '../api';
import { IOrganization, IOrganizationCreation } from '../model';

const createOrganization = async (organization: IOrganizationCreation) => {
  const response = await fetch(ClientOrganizationEndpoints.createOrganization, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(organization),
  });
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(payload?.message || 'Не удалось создать организацию');
  }

  return response.json();
};

const getOrganizations = async (deleted?: 'deleted') => {
  const response = await fetch(
    ClientOrganizationEndpoints.getOrganizations(deleted),
  );
  if (!response.ok) {
    throw new Error('Не удалось получить список организаций');
  }

  const data = (await response.json()) as IOrganization[];
  return data;
};

const deleteOrganization = async (organization: IOrganization) => {
  const response = await fetch(
    ClientOrganizationEndpoints.deleteOrganization(organization.id),
    {
      method: 'DELETE',
    },
  );
  if (!response.ok) {
    throw new Error('Не удалось удалить организацию');
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

export const organizationHandlers = {
  createOrganization,
  getOrganizations,
  deleteOrganization,
};
