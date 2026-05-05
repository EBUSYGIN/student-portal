import { Icon } from '@/shared';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Icon.CollegeLogo />
      <h1 className={styles.headText}>Личный кабинет студента</h1>
    </header>
  );
}
