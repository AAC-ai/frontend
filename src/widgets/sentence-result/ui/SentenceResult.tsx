import { useSelectedWordsStore } from '@/features/select-word';
import { useSentenceMutation, GenerateButton } from '@/features/generate-sentence';
import { SentenceDisplay } from '@/shared/ui';
import styles from './SentenceResult.module.css';

export function SentenceResult() {
  const { selectedWords, clearWords } = useSelectedWordsStore();
  const { mutate, isPending, isError, reset, data } = useSentenceMutation();

  const handleGenerate = () => {
    if (selectedWords.length === 0) return;
    mutate({ words: selectedWords });
  };

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

      {/* 문장 결과 + 생성 버튼 */}
      <div className={styles.resultSection}>
        <SentenceDisplay
          sentence={data?.sentence}
          isLoading={isPending}
          isError={isError}
          onRetry={() => {
            reset();
            handleGenerate();
          }}
        />
        <GenerateButton
          onClick={handleGenerate}
          isPending={isPending}
          disabled={selectedWords.length === 0}
        />
      </div>
    </div>
  );
}
