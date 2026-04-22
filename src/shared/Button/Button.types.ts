import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { IconType } from '../Icon/Icon';

export interface IButtonTypes extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  appearance: 'default' | 'ghost';
  size: 'l' | 's';
  icon?: IconType;
}
