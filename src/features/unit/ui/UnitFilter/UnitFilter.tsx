import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { Icon } from '@/shared';

import styles from './UnitFilter.module.css';

export function UnitFilter() {
  return (
    <Menu>
      <MenuButton className={styles.dropDownButton}>
        Статус
        <Icon.Selectors />
      </MenuButton>
      <MenuItems transition anchor='bottom end' className={styles.menu}>
        <MenuItem as='button' className={styles.menuButton}>
          <span className={styles.square} />
          Все
        </MenuItem>
        <MenuItem as='button' className={styles.menuButton}>
          <span className={`${styles.square} ${styles.squareActive}`} />
          Активно
        </MenuItem>
        <MenuItem as='button' className={styles.menuButton}>
          <span className={styles.square} />
          Удалено
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
