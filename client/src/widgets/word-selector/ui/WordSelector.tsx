import { useRef, useState, useEffect } from 'react';
import { categories } from '@/entities/category';
import { getWordsByCategory } from '@/entities/word';
import { useSelectedWordsStore } from '@/features/select-word';
import { WordCard } from '@/shared/ui';
import styles from './WordSelector.module.css';

const ITEMS_PER_PAGE = 8;

export function WordSelector() {
  const { selectedWords, activeCategoryId, toggleWord } = useSelectedWordsStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const activeCategory = categories.find((c) => c.id === activeCategoryId);
  const words = getWordsByCategory(activeCategoryId);

  const pages: typeof words[] = [];
  for (let i = 0; i < words.length; i += ITEMS_PER_PAGE) {
    pages.push(words.slice(i, i + ITEMS_PER_PAGE));
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    setCurrentPage(0);
  }, [activeCategoryId]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCurrentPage(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goToPage = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section
      aria-label={`${activeCategory?.label ?? ''} 단어 목록`}
      className={styles.wrapper}
    >
      <div
        ref={scrollRef}
        className={styles.scrollContainer}
        onScroll={handleScroll}
      >
        {pages.map((pageWords, pageIdx) => (
          <div key={pageIdx} className={styles.page} role="list">
            {pageWords.map((word) => {
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
        ))}
      </div>

      {pages.length > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            aria-label="이전 페이지"
          >
            ‹
          </button>

          <div
            className={styles.dots}
            aria-label={`${currentPage + 1} / ${pages.length} 페이지`}
          >
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === currentPage ? styles.dotActive : ''}`}
                onClick={() => goToPage(i)}
                aria-label={`${i + 1} 페이지`}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pages.length - 1}
            aria-label="다음 페이지"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
