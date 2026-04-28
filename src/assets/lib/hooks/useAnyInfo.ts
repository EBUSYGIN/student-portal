import { useQuery } from '@tanstack/react-query';

type QueryFunction<T> = () => Promise<T>;

export const useAnyInfo = <T>(key: string, queryFn: QueryFunction<T>) =>
  useQuery<T>({
    queryKey: [`${key}`],
    queryFn: queryFn,
  });
