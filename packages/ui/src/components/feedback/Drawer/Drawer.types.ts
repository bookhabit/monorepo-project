import type { ReactNode } from 'react';

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** 드로어 최대 높이 (기본: 90vh) */
  maxHeight?: string;
};
