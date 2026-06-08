import styles from './WordCard.module.css';

interface WordCardProps {
  label: string;
  emoji?: string;
  image?: string;
  isSelected: boolean;
  onToggle: () => void;
}

export function WordCard({ label, emoji, image, isSelected, onToggle }: WordCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      aria-pressed={isSelected}
      onClick={onToggle}
    >
      {image ? (
        <img src={image} alt="" aria-hidden="true" className={styles.image} />
      ) : emoji ? (
        <span className={styles.emoji} aria-hidden="true">{emoji}</span>
      ) : null}
      <span className={styles.label}>{label}</span>
    </button>
  );
}
