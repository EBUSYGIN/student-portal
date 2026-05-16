import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import cn from 'classnames';

import { Icon } from '@/shared';

import { IOptionFilterProps } from './OptionFilter.types';
import styles from './OptionFilter.module.css';

export function OptionFilter({
  label,
  options,
  selectedId,
  onSelect,
  placeholder,
  disabled = false,
}: IOptionFilterProps) {
  const selectedOption = options.find((option) => option.id === selectedId);
  const buttonLabel = selectedOption?.name ?? placeholder ?? label;

  return (
    <Menu>
      <MenuButton
        disabled={disabled}
        className={cn(styles.dropDownButton, disabled && styles.disabled)}
      >
        {buttonLabel}
        <Icon.Selectors />
      </MenuButton>
      <MenuItems transition anchor='bottom start' className={styles.menu}>
        {options.map((option) => (
          <MenuItem
            key={option.id}
            as='button'
            className={styles.menuButton}
            onClick={() => onSelect(option.id)}
          >
            <span
              className={`${styles.square} ${selectedId === option.id ? styles.squareActive : ''}`}
            />
            {option.name}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
