import { categories } from '@/entities/category';
import { useSelectedWordsStore } from '@/features/select-word';
import { useSentenceMutation } from '@/features/generate-sentence';
import { GoogleLoginButton, LogoutButton } from '@/features/auth';
import { useCurrentUser } from '@/entities/user';
import { WordSelector } from '@/widgets/word-selector';
import { CategoryChip, SentenceDisplay } from '@/shared/ui';
import styles from './HomePage.module.css';

export function HomePage() {
  const { selectedWords, clearWords, activeCategoryId, setActiveCategory } = useSelectedWordsStore();
  const { mutate, isPending, isError, reset, data } = useSentenceMutation();
  const { data: user } = useCurrentUser();

  const handleGenerate = () => {
    if (selectedWords.length === 0) return;
    mutate({ words: selectedWords });
  };

  return (
    <main className={styles.page} aria-label="아코 AAC 홈">
      {/* ─── 좌측 사이드바 ─── */}
      <aside className={styles.sidebar}>
        <span className={styles.logo}>AACO</span>

        <div className={styles.authArea}>
          {user ? (
            <>
              <span className={styles.userName}>{user.name}</span>
              <LogoutButton />
            </>
          ) : (
            <GoogleLoginButton />
          )}
        </div>

        <nav aria-label="카테고리 선택" className={styles.categoryNav}>
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.label}
              emoji={category.emoji}
              image={category.image}
              color={category.color}
              layout="vertical"
              isActive={activeCategoryId === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </nav>
      </aside>

      {/* ─── 우측 메인 콘텐츠 ─── */}
      <div className={styles.mainContent}>
        {/* 1. 단어 버튼들 */}
        <div className={styles.wordArea}>
          <WordSelector />
        </div>

        {/* 2. 선택한 단어 + AI 문장 만들기 */}
        <div className={styles.selectedArea}>
          <div className={styles.selectedBar} aria-label="선택된 단어 목록">
            {selectedWords.length === 0 ? (
              <span className={styles.selectedLabel}>단어를 선택해 주세요</span>
            ) : (
              selectedWords.map((w) => {
                const color = categories.find((c) => c.label === w.category)?.color;
                return (
                  <span
                    key={`${w.category}-${w.label}`}
                    className={styles.selectedChip}
                    style={color ? { borderColor: color, color, backgroundColor: `${color}18` } : undefined}
                  >
                    {w.emoji && <span aria-hidden="true">{w.emoji}</span>}
                    {w.label}
                  </span>
                );
              })
            )}
          </div>
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
              {isPending ? '생성 중…' : '✨ AI 문장 만들기'}
            </button>
          </div>
        </div>

        {/* 3. 생성된 AI 문장 */}
        <div className={styles.sentenceArea}>
          <SentenceDisplay
            sentence={data?.sentence}
            isLoading={isPending}
            isError={isError}
            onRetry={() => { reset(); handleGenerate(); }}
          />
        </div>
      </div>
    </main>
  );
}
