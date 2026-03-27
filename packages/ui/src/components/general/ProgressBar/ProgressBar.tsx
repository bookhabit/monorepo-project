/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { colors } from '../../../foundation/colors';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProgressBarSize = 'light' | 'normal' | 'bold';

export type ProgressBarProps = {
  progress: number;
  size: ProgressBarSize;
  color?: string;
  animate?: boolean;
  className?: string;
};

// ─── Config ──────────────────────────────────────────────────────────────────

const sizeHeight: Record<ProgressBarSize, number> = {
  light:  2,
  normal: 4,
  bold:   8,
};

// ─── Component ───────────────────────────────────────────────────────────────

export function ProgressBar({
  progress,
  size,
  color = colors.blue400,
  animate = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  const h = sizeHeight[size];

  const trackStyle = css`
    width: 100%;
    height: ${h}px;
    border-radius: ${h}px;
    background: ${colors.grey100};
    overflow: hidden;
  `;

  const fillStyle = css`
    height: 100%;
    border-radius: ${h}px;
    background: ${color};
    width: ${clamped * 100}%;
    transition: ${animate ? 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'};
  `;

  return (
    <div
      css={trackStyle}
      className={className}
      role="progressbar"
      aria-valuenow={Math.round(clamped * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div css={fillStyle} />
    </div>
  );
}
