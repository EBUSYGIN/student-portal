import { Icon } from '@/shared';

import { IHeaderProps } from './Header.types';
import styles from './Header.module.css';
import Link from 'next/link';

export function Header({ navigationConfig }: IHeaderProps) {
  return (
    <header className={styles.header}>
      <Icon.CollegeLogo />
      <h1 className={styles.headText}>Личный кабинет студента</h1>
      {navigationConfig && (
        <nav className={styles.navigation}>
          {navigationConfig.map((navigationItem) => (
            <Link href={navigationItem.href} key={navigationItem.href}>
              {navigationItem.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
