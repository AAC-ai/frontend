import styles from './CategoryChip.module.css';

interface CategoryChipProps {
  label: string;
  emoji?: string;
  color?: string;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryChip({ label, emoji, color, isActive, onClick }: CategoryChipProps) {
  const style = color
    ? isActive
      ? { backgroundColor: color, borderColor: color, color: '#fff' }
      : { borderColor: color, color }
    : undefined;

  return (
    <button
      type="button"
      className={`${styles.chip} ${isActive ? styles.active : ''}`}
      aria-pressed={isActive}
      onClick={onClick}
      style={style}
    >
      {emoji && <span aria-hidden="true">{emoji}</span>}
      {label}
    </button>
  );
}
