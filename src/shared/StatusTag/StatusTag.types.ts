import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IStatusTagTypes extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  status: 'success' | 'error' | 'warning' | 'info';
}
