import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import styles from './SentenceDisplay.module.css';

interface SentenceDisplayProps {
  sentence?: string;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

export function SentenceDisplay({ sentence, isLoading, isError, onRetry }: SentenceDisplayProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      aria-busy={isLoading}
      className={styles.wrapper}
    >
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorMessage onRetry={onRetry} />}
      {!isLoading && !isError && sentence && (
        <p className={styles.sentence}>{sentence}</p>
      )}
      {!isLoading && !isError && !sentence && (
        <p className={styles.placeholder}>단어를 선택하면 문장이 만들어져요</p>
      )}
    </div>
  );
}
