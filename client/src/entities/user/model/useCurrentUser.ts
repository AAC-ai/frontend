import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../api/userApi';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
