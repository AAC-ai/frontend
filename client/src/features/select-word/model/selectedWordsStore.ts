import { create } from 'zustand';
import type { SelectedWord } from '@/entities/sentence';

interface SelectedWordsState {
  selectedWords: SelectedWord[];
  activeCategoryId: string;
  toggleWord: (word: SelectedWord) => void;
  setActiveCategory: (categoryId: string) => void;
  clearWords: () => void;
}

export const useSelectedWordsStore = create<SelectedWordsState>((set, get) => ({
  selectedWords: [],
  activeCategoryId: 'food',

  toggleWord: (word) => {
    const { selectedWords } = get();
    const exists = selectedWords.some(
      (w) => w.label === word.label && w.category === word.category,
    );
    set({
      selectedWords: exists
        ? selectedWords.filter((w) => !(w.label === word.label && w.category === word.category))
        : [...selectedWords, word],
    });
  },

  setActiveCategory: (categoryId) => set({ activeCategoryId: categoryId }),

  clearWords: () => set({ selectedWords: [] }),
}));
