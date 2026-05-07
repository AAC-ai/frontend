import { useLogout } from '../model/useLogout';

export function LogoutButton() {
  const { mutate, isPending } = useLogout();

  return (
    <button
      type="button"
      onClick={() => mutate()}
      disabled={isPending}
      aria-busy={isPending}
      aria-label="로그아웃"
    >
      {isPending ? '로그아웃 중…' : '로그아웃'}
    </button>
  );
}
