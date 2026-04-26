import styles from './Loader.module.css';

interface LoaderProps {
  text?: string;
  className?: string;
}

export function Loader({
  text = 'Загружаем данные...',
  className = '',
}: LoaderProps) {
  return (
    <div className={`${styles.root} ${className}`.trim()}>
      <div className={styles.body}>
        <div className={styles.spinner} />
        <div className={styles.text}>{text}</div>
        <div className={styles.rows}>
          <div className={`${styles.bar} ${styles.long}`} />
          <div className={`${styles.bar} ${styles.medium}`} />
          <div className={`${styles.bar} ${styles.short}`} />
        </div>
      </div>
    </div>
  );
}
