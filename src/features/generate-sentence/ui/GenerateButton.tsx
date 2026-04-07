import { LoadingSpinner } from '@/shared/ui';
import styles from './GenerateButton.module.css';

interface GenerateButtonProps {
  onClick: () => void;
  isPending: boolean;
  disabled: boolean;
}

export function GenerateButton({ onClick, isPending, disabled }: GenerateButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled || isPending}
      aria-busy={isPending}
    >
      {isPending ? (
        <>
          <LoadingSpinner />
          문장 만드는 중...
        </>
      ) : (
        '문장 만들기'
      )}
    </button>
  );
}
