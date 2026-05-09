import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { Icon } from '@/shared';

import { IStatusFilterProps } from './StatusFilter.types';
import styles from './StatusFilter.module.css';

export function StatusFilter({ isActive, onToggle }: IStatusFilterProps) {
  return (
    <Menu>
      <MenuButton className={styles.dropDownButton}>
        Статус
        <Icon.Selectors />
      </MenuButton>
      <MenuItems transition anchor='bottom end' className={styles.menu}>
        <MenuItem
          as='button'
          className={styles.menuButton}
          onClick={() => onToggle(true)}
        >
          <span
            className={`${styles.square} ${isActive ? styles.squareActive : ''}`}
          />
          Активные
        </MenuItem>
        <MenuItem
          as='button'
          className={styles.menuButton}
          onClick={() => onToggle(false)}
        >
          <span
            className={`${styles.square} ${!isActive ? styles.squareActive : ''}`}
          />
          Удаленные
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
