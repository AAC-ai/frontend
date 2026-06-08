import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import styles from './SentenceDisplay.module.css';

interface SentenceDisplayProps {
  sentence?: string;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
  onSpeak?: () => void;
  isSpeaking?: boolean;
}

export function SentenceDisplay({
  sentence,
  isLoading,
  isError,
  onRetry,
  onSpeak,
  isSpeaking = false,
}: SentenceDisplayProps) {
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
        <div className={styles.sentenceRow}>
          <p className={styles.sentence}>{sentence}</p>
          <button
            type="button"
            className={styles.speakButton}
            onClick={onSpeak}
            aria-label={isSpeaking ? '읽기 중지' : '문장 읽어주기'}
            aria-pressed={isSpeaking}
          >
            {isSpeaking ? '⏹' : '🔊'}
          </button>
        </div>
      )}
      {!isLoading && !isError && !sentence && (
        <p className={styles.placeholder}>단어를 선택하면 문장이 만들어져요</p>
      )}
    </div>
  );
}
