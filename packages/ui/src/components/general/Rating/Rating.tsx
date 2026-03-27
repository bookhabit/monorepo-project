/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export type RatingSize = 'tiny' | 'small' | 'medium' | 'large' | 'big';
export type RatingVariant = 'full' | 'compact' | 'iconOnly';

export type RatingProps = {
  readOnly: boolean;
  value: number;
  size: RatingSize;
  variant?: RatingVariant;
  max?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-valuetext'?: string;
};

// ─── Size Config ─────────────────────────────────────────────────────────────

const starSize: Record<RatingSize, number> = {
  tiny:   12,
  small:  16,
  medium: 20,
  large:  24,
  big:    32,
};

const labelSize: Record<RatingSize, string> = {
  tiny:   typography.caption,
  small:  typography.caption,
  medium: typography.body2,
  large:  typography.body2,
  big:    typography.body1,
};

// ─── Star SVG ────────────────────────────────────────────────────────────────

function Star({ size, filled, color }: { size: number; filled: boolean; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Rating({
  readOnly,
  value,
  size,
  variant = 'full',
  max = 5,
  onValueChange,
  disabled = false,
  'aria-label': ariaLabel = '별점 평가',
  'aria-valuetext': ariaValueText,
}: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const starColor = disabled ? colors.grey300 : colors.yellow500;
  const sz = starSize[size];
  const displayValue = hovered ?? value;
  const defaultValueText = `${max}점 만점 중 ${value}점`;

  if (readOnly) {
    if (variant === 'iconOnly') {
      return (
        <div
          css={css`display: inline-flex; gap: 2px;`}
          aria-label={ariaLabel}
          aria-valuetext={ariaValueText ?? defaultValueText}
          role="img"
        >
          {Array.from({ length: max }, (_, i) => (
            <Star key={i} size={sz} filled={i < value} color={starColor} />
          ))}
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div
          css={css`display: inline-flex; align-items: center; gap: 4px;`}
          aria-label={ariaLabel}
          aria-valuetext={ariaValueText ?? defaultValueText}
          role="img"
        >
          <Star size={sz} filled color={starColor} />
          <span css={css`${labelSize[size]}; color: ${colors.grey700}; font-weight: 600;`}>{value}</span>
        </div>
      );
    }

    // full
    return (
      <div
        css={css`display: inline-flex; align-items: center; gap: 6px;`}
        aria-label={ariaLabel}
        aria-valuetext={ariaValueText ?? defaultValueText}
        role="img"
      >
        <div css={css`display: inline-flex; gap: 2px;`}>
          {Array.from({ length: max }, (_, i) => (
            <Star key={i} size={sz} filled={i < value} color={starColor} />
          ))}
        </div>
        <span css={css`${labelSize[size]}; color: ${colors.grey700}; font-weight: 600;`}>{value}</span>
      </div>
    );
  }

  // Interactive
  return (
    <div
      css={css`
        display: inline-flex;
        gap: 4px;
        opacity: ${disabled ? 0.4 : 1};
        pointer-events: ${disabled ? 'none' : 'auto'};
      `}
      role="group"
      aria-label={ariaLabel}
      aria-valuetext={ariaValueText ?? defaultValueText}
    >
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          css={css`
            background: none;
            border: none;
            cursor: pointer;
            padding: 2px;
            display: flex;
            transition: transform 0.1s;
            &:hover { transform: scale(1.15); }
            &:active { transform: scale(0.95); }
          `}
          aria-label={`${i + 1}점`}
          aria-pressed={value === i + 1}
          onClick={() => onValueChange?.(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(null)}
        >
          <Star size={sz} filled={i < displayValue} color={starColor} />
        </button>
      ))}
    </div>
  );
}
