/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export type NumericSpinnerSize = 'tiny' | 'small' | 'medium' | 'large';

export type NumericSpinnerProps = {
  size: NumericSpinnerSize;
  number?: number;
  defaultNumber?: number;
  minNumber?: number;
  maxNumber?: number;
  disable?: boolean;
  onNumberChange?: (number: number) => void;
  decreaseAriaLabel?: string;
  increaseAriaLabel?: string;
};

// ─── Size Config ─────────────────────────────────────────────────────────────

const sizeConfig = {
  tiny:   { height: 28, btnSize: 20, fontSize: 12, iconSize: 10, borderRadius: 6,  padding: '0 6px',  gap: 4  },
  small:  { height: 32, btnSize: 22, fontSize: 13, iconSize: 11, borderRadius: 8,  padding: '0 8px',  gap: 4  },
  medium: { height: 40, btnSize: 28, fontSize: 15, iconSize: 13, borderRadius: 10, padding: '0 10px', gap: 6  },
  large:  { height: 48, btnSize: 32, fontSize: 17, iconSize: 15, borderRadius: 12, padding: '0 12px', gap: 8  },
} as const;

// ─── Component ───────────────────────────────────────────────────────────────

export function NumericSpinner({
  size,
  number: controlledNumber,
  defaultNumber = 0,
  minNumber = 0,
  maxNumber = 999,
  disable = false,
  onNumberChange,
  decreaseAriaLabel = '빼기',
  increaseAriaLabel = '더하기',
}: NumericSpinnerProps) {
  const isControlled = controlledNumber !== undefined;
  const [internalValue, setInternalValue] = useState(defaultNumber);
  const value = isControlled ? controlledNumber : internalValue;

  const update = (next: number) => {
    const clamped = Math.min(maxNumber, Math.max(minNumber, next));
    if (!isControlled) setInternalValue(clamped);
    onNumberChange?.(clamped);
  };

  const cfg = sizeConfig[size];

  const wrapperStyle = css`
    display: inline-flex;
    align-items: center;
    gap: ${cfg.gap}px;
    padding: ${cfg.padding};
    height: ${cfg.height}px;
    border: 1.5px solid ${colors.grey200};
    border-radius: ${cfg.borderRadius}px;
    background: #ffffff;
    opacity: ${disable ? 0.4 : 1};
    pointer-events: ${disable ? 'none' : 'auto'};
  `;

  const btnStyle = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${cfg.btnSize}px;
    height: ${cfg.btnSize}px;
    border: none;
    border-radius: 50%;
    background: ${colors.grey100};
    cursor: pointer;
    flex-shrink: 0;
    font-family: inherit;
    transition: background 0.1s;
    &:hover { background: ${colors.grey200}; }
    &:active { background: ${colors.grey300}; }
  `;

  const valueStyle = css`
    ${typography.body2Bold};
    font-size: ${cfg.fontSize}px;
    color: ${colors.grey900};
    min-width: ${cfg.btnSize}px;
    text-align: center;
  `;

  return (
    <div css={wrapperStyle}>
      <button
        css={btnStyle}
        type="button"
        aria-label={decreaseAriaLabel}
        onClick={() => update(value - 1)}
        disabled={disable || value <= minNumber}
      >
        <svg width={cfg.iconSize} height={cfg.iconSize} viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <span css={valueStyle} aria-live="polite">{value}</span>
      <button
        css={btnStyle}
        type="button"
        aria-label={increaseAriaLabel}
        onClick={() => update(value + 1)}
        disabled={disable || value >= maxNumber}
      >
        <svg width={cfg.iconSize} height={cfg.iconSize} viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
