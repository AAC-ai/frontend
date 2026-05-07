import { getAccessToken } from '@/shared/model';
import type { User } from '../model/user.types';

const BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function fetchCurrentUser(): Promise<User> {
  const token = getAccessToken();
  const res = await fetch(`${BASE}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) throw new Error('사용자 정보를 불러오지 못했어요');

  const json = await res.json() as { status: number; message: string; data: User };
  return json.data;
}
