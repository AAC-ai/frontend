import styles from './WordCard.module.css';

interface WordCardProps {
  label: string;
  emoji?: string;
  isSelected: boolean;
  onToggle: () => void;
}

export function WordCard({ label, emoji, isSelected, onToggle }: WordCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      aria-pressed={isSelected}
      onClick={onToggle}
    >
      {emoji && <span className={styles.emoji} aria-hidden="true">{emoji}</span>}
      <span className={styles.label}>{label}</span>
    </button>
  );
}
