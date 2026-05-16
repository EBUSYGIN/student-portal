import { QueryClient } from '@tanstack/react-query';

export const groupsQueryKeyPrefix = (organizationId: string) =>
  `groups-${organizationId}-`;

export const invalidateGroupsQueries = (
  queryClient: QueryClient,
  organizationId: string,
) =>
  queryClient.invalidateQueries({
    predicate: (query) =>
      typeof query.queryKey[0] === 'string' &&
      query.queryKey[0].startsWith(groupsQueryKeyPrefix(organizationId)),
  });
