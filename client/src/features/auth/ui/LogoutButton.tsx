import { useLogout } from '../model/useLogout';
import styles from './LogoutButton.module.css';

export function LogoutButton() {
  const { mutate, isPending } = useLogout();

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={() => mutate()}
      disabled={isPending}
      aria-busy={isPending}
      aria-label="로그아웃"
    >
      {isPending ? '로그아웃 중…' : '로그아웃'}
    </button>
  );
}
