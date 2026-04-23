'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { INavigationTypes } from './Navigation.types';
import styles from './Navigation.module.css';

export function Navigation({ navigationItems }: INavigationTypes) {
  const path = usePathname();

  return (
    <nav className={styles.navigation}>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(styles.link, { [styles.active]: path === item.href })}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
