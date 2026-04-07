import styles from './CategoryChip.module.css';

interface CategoryChipProps {
  label: string;
  emoji?: string;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryChip({ label, emoji, isActive, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${isActive ? styles.active : ''}`}
      aria-pressed={isActive}
      onClick={onClick}
    >
      {emoji && <span aria-hidden="true">{emoji}</span>}
      {label}
    </button>
  );
}
