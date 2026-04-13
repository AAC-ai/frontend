import type { Category } from './category.types';

export const categories: Category[] = [
  { id: 'food',    label: '음식', emoji: '🍚', color: '#F97316' },
  { id: 'emotion', label: '감정', emoji: '😊', color: '#7C3AED' },
  { id: 'action',  label: '행동', emoji: '🏃', color: '#3B82F6' },
  { id: 'place',   label: '장소', emoji: '🏠', color: '#22C55E' },
  { id: 'person',  label: '사람', emoji: '👤', color: '#A855F7' },
  { id: 'time',    label: '시간', emoji: '⏰', color: '#EAB308' },
  { id: 'body',    label: '몸',   emoji: '💪', color: '#0891B2' },
  { id: 'object',  label: '물건', emoji: '📦', color: '#14B8A6' },
];
