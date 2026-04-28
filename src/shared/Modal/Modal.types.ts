import { ReactNode } from 'react';

export interface IModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  children: ReactNode;
  className?: string;
  title?: string;
}
