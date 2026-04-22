import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { IconType } from '../Icon/Icon';

export interface IInputTypes extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  error?: string;
  label?: string;
  icon?: IconType;
}
