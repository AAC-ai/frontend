import type { Category } from './category.types';

export const categories: Category[] = [
  { id: 'food',    label: '음식', emoji: '🍚', color: '#F97316', image: '/aac/food/rice.png' },
  { id: 'emotion', label: '감정', emoji: '❤️', color: '#EF4444', image: '/aac/emotion/happy.png' },
  { id: 'action',  label: '행동', emoji: '🏃', color: '#3B82F6', image: '/aac/action/play.png' },
  { id: 'place',   label: '장소', emoji: '🏠', color: '#22C55E', image: '/aac/place/home.png' },
  { id: 'person',  label: '사람', emoji: '👤', color: '#A855F7', image: '/aac/people/mom.png' },
  { id: 'number',  label: '숫자', emoji: '🔢', color: '#EC4899', image: '/aac/number/1.png' },
  { id: 'time',    label: '시간', emoji: '⏰', color: '#EAB308', image: '/aac/etc/today.png' },
  { id: 'body',    label: '몸',   emoji: '💪', color: '#0891B2', image: '/aac/body/head.png' },
  { id: 'object',  label: '물건', emoji: '📦', color: '#14B8A6', image: '/aac/etc/smartphone.png' },
];
