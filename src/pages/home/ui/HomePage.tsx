import { WordSelector } from '@/widgets/word-selector';
import { SentenceResult } from '@/widgets/sentence-result';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <main className={styles.page} aria-label="AAC 홈">
      <header className={styles.header}>
        <span aria-hidden="true">💬</span>
        <h1 className={styles.title}>무엇을 말하고 싶나요?</h1>
      </header>

      <SentenceResult />
      <WordSelector />
    </main>
  );
}
