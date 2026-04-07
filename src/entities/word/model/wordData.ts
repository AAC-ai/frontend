import type { Word } from './word.types';

export const words: Word[] = [
  // 음식
  { id: 'food-rice', label: '밥', categoryId: 'food', emoji: '🍚' },
  { id: 'food-noodle', label: '라면', categoryId: 'food', emoji: '🍜' },
  { id: 'food-bread', label: '빵', categoryId: 'food', emoji: '🍞' },
  { id: 'food-water', label: '물', categoryId: 'food', emoji: '💧' },
  { id: 'food-milk', label: '우유', categoryId: 'food', emoji: '🥛' },
  { id: 'food-fruit', label: '과일', categoryId: 'food', emoji: '🍎' },
  { id: 'food-snack', label: '과자', categoryId: 'food', emoji: '🍪' },
  { id: 'food-soup', label: '국', categoryId: 'food', emoji: '🍲' },

  // 감정
  { id: 'emotion-happy', label: '좋아', categoryId: 'emotion', emoji: '😊' },
  { id: 'emotion-sad', label: '싫어', categoryId: 'emotion', emoji: '😞' },
  { id: 'emotion-hungry', label: '배고파', categoryId: 'emotion', emoji: '😋' },
  { id: 'emotion-tired', label: '피곤해', categoryId: 'emotion', emoji: '😴' },
  { id: 'emotion-hurt', label: '아파', categoryId: 'emotion', emoji: '🤕' },
  { id: 'emotion-scared', label: '무서워', categoryId: 'emotion', emoji: '😨' },
  { id: 'emotion-bored', label: '심심해', categoryId: 'emotion', emoji: '😑' },
  { id: 'emotion-excited', label: '신나', categoryId: 'emotion', emoji: '🥳' },

  // 행동
  { id: 'action-eat', label: '먹고싶어', categoryId: 'action', emoji: '🍽️' },
  { id: 'action-drink', label: '마시고싶어', categoryId: 'action', emoji: '🥤' },
  { id: 'action-sleep', label: '자고싶어', categoryId: 'action', emoji: '😴' },
  { id: 'action-play', label: '놀고싶어', categoryId: 'action', emoji: '🎮' },
  { id: 'action-go', label: '가고싶어', categoryId: 'action', emoji: '🚶' },
  { id: 'action-stop', label: '그만해', categoryId: 'action', emoji: '✋' },
  { id: 'action-help', label: '도와줘', categoryId: 'action', emoji: '🙏' },
  { id: 'action-watch', label: '보고싶어', categoryId: 'action', emoji: '👀' },

  // 장소
  { id: 'place-home', label: '집', categoryId: 'place', emoji: '🏠' },
  { id: 'place-school', label: '학교', categoryId: 'place', emoji: '🏫' },
  { id: 'place-hospital', label: '병원', categoryId: 'place', emoji: '🏥' },
  { id: 'place-park', label: '공원', categoryId: 'place', emoji: '🌳' },
  { id: 'place-store', label: '가게', categoryId: 'place', emoji: '🏪' },
  { id: 'place-toilet', label: '화장실', categoryId: 'place', emoji: '🚻' },
  { id: 'place-room', label: '방', categoryId: 'place', emoji: '🛏️' },
  { id: 'place-outside', label: '밖', categoryId: 'place', emoji: '🌤️' },

  // 사람
  { id: 'person-mom', label: '엄마', categoryId: 'person', emoji: '👩' },
  { id: 'person-dad', label: '아빠', categoryId: 'person', emoji: '👨' },
  { id: 'person-teacher', label: '선생님', categoryId: 'person', emoji: '👩‍🏫' },
  { id: 'person-friend', label: '친구', categoryId: 'person', emoji: '👫' },
  { id: 'person-me', label: '나', categoryId: 'person', emoji: '🙋' },
  { id: 'person-doctor', label: '의사', categoryId: 'person', emoji: '👨‍⚕️' },
  { id: 'person-sibling', label: '형/언니', categoryId: 'person', emoji: '👧' },
  { id: 'person-grandma', label: '할머니', categoryId: 'person', emoji: '👵' },

  // 시간
  { id: 'time-now', label: '지금', categoryId: 'time', emoji: '⏰' },
  { id: 'time-today', label: '오늘', categoryId: 'time', emoji: '📅' },
  { id: 'time-morning', label: '아침', categoryId: 'time', emoji: '🌅' },
  { id: 'time-afternoon', label: '오후', categoryId: 'time', emoji: '☀️' },
  { id: 'time-night', label: '밤', categoryId: 'time', emoji: '🌙' },
  { id: 'time-later', label: '나중에', categoryId: 'time', emoji: '⏳' },
  { id: 'time-always', label: '항상', categoryId: 'time', emoji: '♾️' },
  { id: 'time-tomorrow', label: '내일', categoryId: 'time', emoji: '📆' },

  // 몸
  { id: 'body-head', label: '머리', categoryId: 'body', emoji: '🤯' },
  { id: 'body-stomach', label: '배', categoryId: 'body', emoji: '🫃' },
  { id: 'body-hand', label: '손', categoryId: 'body', emoji: '✋' },
  { id: 'body-foot', label: '발', categoryId: 'body', emoji: '🦶' },
  { id: 'body-eye', label: '눈', categoryId: 'body', emoji: '👁️' },
  { id: 'body-ear', label: '귀', categoryId: 'body', emoji: '👂' },
  { id: 'body-mouth', label: '입', categoryId: 'body', emoji: '👄' },

  // 물건
  { id: 'object-phone', label: '핸드폰', categoryId: 'object', emoji: '📱' },
  { id: 'object-book', label: '책', categoryId: 'object', emoji: '📚' },
  { id: 'object-pen', label: '연필', categoryId: 'object', emoji: '✏️' },
  { id: 'object-bag', label: '가방', categoryId: 'object', emoji: '🎒' },
  { id: 'object-tv', label: 'TV', categoryId: 'object', emoji: '📺' },
  { id: 'object-toy', label: '장난감', categoryId: 'object', emoji: '🧸' },
  { id: 'object-clothes', label: '옷', categoryId: 'object', emoji: '👕' },
  { id: 'object-medicine', label: '약', categoryId: 'object', emoji: '💊' },
];

export function getWordsByCategory(categoryId: string): Word[] {
  return words.filter((w) => w.categoryId === categoryId);
}
