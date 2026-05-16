import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

export interface ISelectTypes extends DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> {
  error?: string;
  label?: string;
}
