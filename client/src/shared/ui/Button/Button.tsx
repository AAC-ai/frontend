import styles from './Button.module.css';

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  'aria-label'?: string;
}

export function Button({
  size = 'md',
  variant = 'primary',
  children,
  disabled,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[size]} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
