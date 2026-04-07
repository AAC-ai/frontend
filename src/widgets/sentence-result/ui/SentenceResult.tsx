import { useSelectedWordsStore } from '@/features/select-word';
import { useSentenceMutation, GenerateButton } from '@/features/generate-sentence';
import { SentenceDisplay } from '@/shared/ui';
import styles from './SentenceResult.module.css';

export function SentenceResult() {
  const { selectedWords } = useSelectedWordsStore();
  const { mutate, isPending, isError, reset, data } = useSentenceMutation();

  const handleGenerate = () => {
    if (selectedWords.length === 0) return;
    mutate({ words: selectedWords });
  };

  return (
    <div className={styles.container}>
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
  );
}
