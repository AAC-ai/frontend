import { apiFetch } from '@/shared/api/client';
import type { User } from '../model/user.types';

export function fetchCurrentUser(): Promise<User> {
  return apiFetch<User>('/users/me');
}
