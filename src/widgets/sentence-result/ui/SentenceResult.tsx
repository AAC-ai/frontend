import { useSelectedWordsStore } from '@/features/select-word';
import { SentenceDisplay } from '@/shared/ui';
import styles from './SentenceResult.module.css';

interface SentenceResultProps {
  sentence?: string;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export function SentenceResult({ sentence, isLoading, isError, onRetry }: SentenceResultProps) {
  const { selectedWords, clearWords } = useSelectedWordsStore();

  return (
    <div className={styles.container}>
      {/* 데스크탑 전용: 우측 상단 선택된 단어 표시 */}
      <div className={styles.selectedSection} aria-label="선택된 단어 목록">
        <p className={styles.selectedTitle}>선택한 단어</p>
        {selectedWords.length === 0 ? (
          <p className={styles.selectedEmpty}>단어를 선택해 주세요</p>
        ) : (
          <div className={styles.selectedChips}>
            {selectedWords.map((w) => (
              <span key={`${w.category}-${w.label}`} className={styles.chip}>
                {w.emoji && <span aria-hidden="true">{w.emoji}</span>}
                {w.label}
              </span>
            ))}
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearWords}
              aria-label="선택 초기화"
            >
              초기화
            </button>
          </div>
        )}
      </div>

      {/* 문장 결과 */}
      <div className={styles.resultSection}>
        <SentenceDisplay
          sentence={sentence}
          isLoading={isLoading}
          isError={isError}
          onRetry={onRetry}
        />
      </div>
    </div>
  );
}
