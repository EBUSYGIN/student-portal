import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ITitleProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  size: 'l' | 'm' | 's';
}
