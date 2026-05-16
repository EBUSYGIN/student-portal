import { useQuery } from '@tanstack/react-query';

type QueryFunction<T> = () => Promise<T>;

type UseAnyInfoOptions = {
  enabled?: boolean;
};

export const useAnyInfo = <T>(
  key: string,
  queryFn: QueryFunction<T>,
  options?: UseAnyInfoOptions,
) =>
  useQuery<T>({
    queryKey: [`${key}`],
    queryFn,
    enabled: options?.enabled ?? true,
  });
