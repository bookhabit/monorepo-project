/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { HTMLAttributes } from 'react';

type GridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: number | string;
  rows?: number | string;
  gap?: string;
  columnGap?: string;
  rowGap?: string;
};

export function Grid({ columns, rows, gap, columnGap, rowGap, children, ...rest }: GridProps) {
  return (
    <div
      css={css`
        display: grid;
        ${columns !== undefined ? `grid-template-columns: ${typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns};` : ''}
        ${rows !== undefined ? `grid-template-rows: ${typeof rows === 'number' ? `repeat(${rows}, auto)` : rows};` : ''}
        ${gap !== undefined ? `gap: ${gap};` : ''}
        ${columnGap !== undefined ? `column-gap: ${columnGap};` : ''}
        ${rowGap !== undefined ? `row-gap: ${rowGap};` : ''}
      `}
      {...rest}
    >
      {children}
    </div>
  );
}
