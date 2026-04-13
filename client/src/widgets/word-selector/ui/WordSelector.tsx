import { categories } from '@/entities/category';
import { getWordsByCategory } from '@/entities/word';
import { useSelectedWordsStore } from '@/features/select-word';
import { CategoryChip, WordCard } from '@/shared/ui';
import styles from './WordSelector.module.css';

export function WordSelector() {
  const { selectedWords, activeCategoryId, toggleWord, setActiveCategory, clearWords } =
    useSelectedWordsStore();

  const activeCategory = categories.find((c) => c.id === activeCategoryId);
  const words = getWordsByCategory(activeCategoryId);

  return (
    <div className={styles.container}>
      {/* 선택된 단어 표시 바 (모바일 전용) */}
      <div className={styles.selectedBar} aria-label="선택된 단어 목록">
        {selectedWords.length === 0 ? (
          <span className={styles.selectedLabel}>단어를 선택해 주세요</span>
        ) : (
          <>
            {selectedWords.map((w) => {
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
            })}
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearWords}
              aria-label="선택 초기화"
            >
              초기화
            </button>
          </>
        )}
      </div>

      {/* 카테고리(좌측) + 단어 그리드(우측) */}
      <div className={styles.mainArea}>
        <nav aria-label="카테고리 선택" className={styles.categoryBar}>
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.label}
              emoji={category.emoji}
              color={category.color}
              layout="vertical"
              isActive={activeCategoryId === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </nav>

        <section
          aria-label={`${activeCategory?.label ?? ''} 단어 목록`}
          className={styles.wordGridWrapper}
        >
          <div className={styles.wordGrid} role="list">
            {words.map((word) => {
              const isSelected = selectedWords.some(
                (w) => w.label === word.label && w.category === activeCategory?.label,
              );
              return (
                <div key={word.id} role="listitem">
                  <WordCard
                    label={word.label}
                    emoji={word.emoji}
                    isSelected={isSelected}
                    onToggle={() =>
                      toggleWord({
                        label: word.label,
                        category: activeCategory?.label ?? '',
                        emoji: word.emoji,
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
