import styles from './CategoryChip.module.css';

interface CategoryChipProps {
  label: string;
  emoji?: string;
  color?: string;
  isActive: boolean;
  layout?: 'horizontal' | 'vertical';
  onClick: () => void;
}

export function CategoryChip({ label, emoji, color, isActive, layout = 'horizontal', onClick }: CategoryChipProps) {
  const style = color
    ? isActive
      ? { backgroundColor: color, borderColor: color, color: '#fff' }
      : { borderColor: color, color }
    : undefined;

  return (
    <button
      type="button"
      className={`${styles.chip} ${isActive ? styles.active : ''} ${layout === 'vertical' ? styles.vertical : ''}`}
      aria-pressed={isActive}
      onClick={onClick}
      style={style}
    >
      {emoji && <span className={styles.emoji} aria-hidden="true">{emoji}</span>}
      <span className={styles.label}>{label}</span>
    </button>
  );
}
