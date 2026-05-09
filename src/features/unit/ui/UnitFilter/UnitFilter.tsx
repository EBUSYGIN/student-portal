import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { Icon } from '@/shared';

import styles from './UnitFilter.module.css';

export type UnitStatusFilter = 'all' | 'deleted';

interface IUnitFilterProps {
  value: UnitStatusFilter;
  onChange: (value: UnitStatusFilter) => void;
}

export function UnitFilter({ value, onChange }: IUnitFilterProps) {
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
          onClick={() => onChange('all')}
        >
          <span
            className={`${styles.square} ${value === 'all' ? styles.squareActive : ''}`}
          />
          Активные
        </MenuItem>
        <MenuItem
          as='button'
          className={styles.menuButton}
          onClick={() => onChange('deleted')}
        >
          <span
            className={`${styles.square} ${value === 'deleted' ? styles.squareActive : ''}`}
          />
          Удалено
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
