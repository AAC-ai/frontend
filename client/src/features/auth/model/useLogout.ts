import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/model';
import { logout } from '../api/authApi';

export function useLogout() {
  const clearAccessToken = useAuthStore((s) => s.clearAccessToken);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => clearAccessToken(),
  });
}
