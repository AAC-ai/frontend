import { categories } from '@/entities/category';
import { getWordsByCategory } from '@/entities/word';
import { useSelectedWordsStore } from '@/features/select-word';
import { WordCard } from '@/shared/ui';
import styles from './WordSelector.module.css';

export function WordSelector() {
  const { selectedWords, activeCategoryId, toggleWord } = useSelectedWordsStore();

  const activeCategory = categories.find((c) => c.id === activeCategoryId);
  const words = getWordsByCategory(activeCategoryId);

  return (
    <section
      aria-label={`${activeCategory?.label ?? ''} 단어 목록`}
      className={styles.wrapper}
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
                image={word.image}
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
  );
}
