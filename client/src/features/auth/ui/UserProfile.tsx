import { useLogout } from '../model/useLogout';
import type { User } from '@/entities/user';
import styles from './UserProfile.module.css';

const AVATAR_GRADIENTS: [string, string][] = [
  ['#4CBBA0', '#2DA884'],
  ['#818CF8', '#6366F1'],
  ['#FB923C', '#EA580C'],
  ['#F472B6', '#EC4899'],
  ['#A78BFA', '#7C3AED'],
  ['#38BDF8', '#0891B2'],
  ['#34D399', '#059669'],
  ['#FCD34D', '#D97706'],
];

function getAvatarGradient(name: string): [string, string] {
  return AVATAR_GRADIENTS[name.charCodeAt(0) % AVATAR_GRADIENTS.length];
}

interface Props {
  user: User;
}

export function UserProfile({ user }: Props) {
  const { mutate, isPending } = useLogout();
  const initial = user.name.charAt(0).toUpperCase();
  const [from, to] = getAvatarGradient(user.name);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div
          className={styles.avatar}
          aria-hidden="true"
          style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
        >
          {initial}
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.email}>{user.email}</span>
        </div>
      </div>
      <button
        type="button"
        className={styles.logoutBtn}
        onClick={() => mutate()}
        disabled={isPending}
        aria-busy={isPending}
        aria-label="로그아웃"
      >
        {isPending ? '로그아웃 중…' : '로그아웃'}
      </button>
    </div>
  );
}
