import { useSelectedWordsStore } from '@/features/select-word';
import { useSentenceMutation } from '@/features/generate-sentence';
import { WordSelector } from '@/widgets/word-selector';
import { SentenceDisplay } from '@/shared/ui';
import styles from './HomePage.module.css';

export function HomePage() {
  const { selectedWords, clearWords } = useSelectedWordsStore();
  const { mutate, isPending, isError, reset, data } = useSentenceMutation();

  const handleGenerate = () => {
    if (selectedWords.length === 0) return;
    mutate({ words: selectedWords });
  };

  return (
    <main className={styles.page} aria-label="아코 AAC 홈">
      <header className={styles.header}>
        <span className={styles.logo}>아코 AAC</span>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={clearWords}
            aria-label="선택 초기화"
            disabled={selectedWords.length === 0}
          >
            🗑
          </button>
          <button
            type="button"
            className={styles.generateBtn}
            onClick={handleGenerate}
            disabled={selectedWords.length === 0 || isPending}
            aria-busy={isPending}
          >
            {isPending ? '생성 중…' : '✨ AI 문장'}
          </button>
        </div>
      </header>

      <div className={styles.sentenceArea}>
        <SentenceDisplay
          sentence={data?.sentence}
          isLoading={isPending}
          isError={isError}
          onRetry={() => { reset(); handleGenerate(); }}
        />
      </div>

      <div className={styles.wordArea}>
        <WordSelector />
      </div>
    </main>
  );
}
