/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import type { SafeAreaWrapperProps } from './MobileLayout.types';

export function SafeAreaWrapper({
  children,
  edges = ['top', 'bottom'],
}: SafeAreaWrapperProps) {
  const safeStyle = css`
    padding-top: ${edges.includes('top') ? 'env(safe-area-inset-top, 0px)' : '0'};
    padding-bottom: ${edges.includes('bottom') ? 'env(safe-area-inset-bottom, 0px)' : '0'};
    padding-left: ${edges.includes('left') ? 'env(safe-area-inset-left, 0px)' : '0'};
    padding-right: ${edges.includes('right') ? 'env(safe-area-inset-right, 0px)' : '0'};
  `;

  return <div css={safeStyle}>{children}</div>;
}
