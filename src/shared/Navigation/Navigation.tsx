'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { INavigationTypes } from './Navigation.types';
import styles from './Navigation.module.css';

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
}

function isActivePath(currentPath: string, href: string) {
  const normalizedCurrentPath = normalizePath(currentPath);
  const normalizedHref = normalizePath(href);

  return (
    normalizedCurrentPath === normalizedHref ||
    normalizedCurrentPath.startsWith(`${normalizedHref}/`)
  );
}

export function Navigation({ navigationItems }: INavigationTypes) {
  const path = usePathname();

  return (
    <nav className={styles.navigation}>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(styles.link, {
            [styles.active]: isActivePath(path, item.href),
          })}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
