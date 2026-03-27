/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useRef, useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  fixed?: boolean;
  takeSpace?: boolean;
  onDeleteClick?: () => void;
};

// ─── Component ───────────────────────────────────────────────────────────────

const FIELD_HEIGHT = 48;

const wrapperBaseStyle = css`
  width: 100%;
  background: #ffffff;
  padding: 8px 16px;
  border-bottom: 1px solid ${colors.grey100};
  box-sizing: border-box;
`;

const wrapperFixedStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const innerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  height: ${FIELD_HEIGHT}px;
  background: ${colors.grey100};
  border-radius: 12px;
  padding: 0 14px;
`;

const inputStyle = css`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  ${typography.body2};
  color: ${colors.grey900};
  font-family: inherit;

  &::placeholder {
    color: ${colors.grey400};
  }
`;

const clearBtnStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  background: ${colors.grey400};
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  color: #ffffff;
  font-size: 10px;
  font-family: inherit;
  transition: background 0.1s;

  &:hover { background: ${colors.grey500}; }
`;

export function SearchField({
  fixed = false,
  takeSpace = true,
  onDeleteClick,
  onChange,
  value: controlledValue,
  defaultValue,
  ...rest
}: SearchFieldProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const value = isControlled ? controlledValue : internalValue;
  const hasValue = String(value).length > 0;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onDeleteClick?.();
    inputRef.current?.focus();
  };

  const fieldEl = (
    <div css={[wrapperBaseStyle, fixed && wrapperFixedStyle]}>
      <div css={innerStyle}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" stroke={colors.grey400} strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke={colors.grey400} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          css={inputStyle}
          type="search"
          value={value}
          onChange={handleChange}
          {...rest}
        />
        {hasValue && (
          <button css={clearBtnStyle} type="button" aria-label="검색어 삭제" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
    </div>
  );

  if (fixed && takeSpace) {
    return (
      <>
        {fieldEl}
        <div style={{ height: FIELD_HEIGHT + 16 }} aria-hidden="true" />
      </>
    );
  }

  return fieldEl;
}
