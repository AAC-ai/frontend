import { useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import styles from './SentenceDisplay.module.css';

interface SentenceDisplayProps {
  sentence?: string;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

function speakSentence(text: string, onEnd: () => void) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.9;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
}

export function SentenceDisplay({ sentence, isLoading, isError, onRetry }: SentenceDisplayProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  function handleSpeak() {
    if (!sentence) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakSentence(sentence, () => setIsSpeaking(false));
  }

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
            onClick={handleSpeak}
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
