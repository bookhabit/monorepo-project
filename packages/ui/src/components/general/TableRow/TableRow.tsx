/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import type { ReactNode } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export type TableRowAlign = 'left' | 'space-between';

export type TableRowProps = {
  left: ReactNode;
  right: ReactNode;
  align: TableRowAlign;
  leftRatio?: number;
};

// ─── Component ───────────────────────────────────────────────────────────────

export function TableRow({ left, right, align, leftRatio }: TableRowProps) {
  const rowStyle = css`
    display: flex;
    align-items: center;
    justify-content: ${align === 'space-between' ? 'space-between' : 'flex-start'};
    padding: 10px 0;
    gap: ${align === 'left' ? '12px' : '8px'};
    min-height: 44px;
  `;

  const leftStyle = css`
    ${typography.body2};
    color: ${colors.grey900};
    ${leftRatio != null ? `width: ${leftRatio}%; flex-shrink: 0;` : align === 'left' ? 'flex-shrink: 0;' : ''}
  `;

  const rightStyle = css`
    ${typography.body2};
    color: ${align === 'space-between' ? colors.grey500 : colors.grey900};
    ${align === 'space-between' ? 'text-align: right;' : ''}
    flex: ${align === 'space-between' ? '1' : '0 1 auto'};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;

  return (
    <div css={rowStyle}>
      <span css={leftStyle}>{left}</span>
      <span css={rightStyle}>{right}</span>
    </div>
  );
}
