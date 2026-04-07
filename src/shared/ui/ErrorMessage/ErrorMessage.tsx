import { Button } from '../Button/Button';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  message = '문제가 생겼어요. 다시 시도해 주세요.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div role="alert" className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">⚠️</span>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button size="lg" variant="secondary" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  );
}
