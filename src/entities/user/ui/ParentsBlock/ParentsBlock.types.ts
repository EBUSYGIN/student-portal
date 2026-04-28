import { ReactNode } from 'react';

import { IParent } from '../../model';

export interface IParentsBlockProps {
  className?: string;
  actionSlot?: ReactNode;
  parents?: IParent[];
}
