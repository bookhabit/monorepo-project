/** @jsxImportSource @emotion/react */
'use client';

import { ToastProvider } from '@mono/ui';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
