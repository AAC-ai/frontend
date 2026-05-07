import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/model';
import { fetchCurrentUser } from '../api/userApi';

export function useCurrentUser() {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: fetchCurrentUser,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
}
