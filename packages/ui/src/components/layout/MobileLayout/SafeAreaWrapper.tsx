/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import type { SafeAreaWrapperProps } from './MobileLayout.types';

export function SafeAreaWrapper({
  children,
  edges = ['top', 'bottom'],
}: SafeAreaWrapperProps) {
  const hasTopEdge = edges.includes('top');
  const hasBottomEdge = edges.includes('bottom');
  const hasLeftEdge = edges.includes('left');
  const hasRightEdge = edges.includes('right');

  const safeStyle = css`
    padding-top: ${hasTopEdge ? 'env(safe-area-inset-top, 0px)' : '0'};
    padding-bottom: ${hasBottomEdge ? 'env(safe-area-inset-bottom, 0px)' : '0'};
    padding-left: ${hasLeftEdge ? 'env(safe-area-inset-left, 0px)' : '0'};
    padding-right: ${hasRightEdge ? 'env(safe-area-inset-right, 0px)' : '0'};
  `;

  return <div css={safeStyle}>{children}</div>;
}
