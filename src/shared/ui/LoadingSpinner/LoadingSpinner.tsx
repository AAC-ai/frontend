import styles from './LoadingSpinner.module.css';

export function LoadingSpinner() {
  return (
    <div role="status" aria-label="로딩 중">
      <div className={styles.spinner} aria-hidden="true" />
    </div>
  );
}
