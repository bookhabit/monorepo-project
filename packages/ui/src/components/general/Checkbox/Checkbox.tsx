/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef, useEffect } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import type { CheckboxProps } from './Checkbox.types';

const wrapperStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  &:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const hiddenInputStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const customBoxStyle = css`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.grey300};
  border-radius: 5px;
  background-color: ${colors.background};
  transition: background-color 0.15s ease, border-color 0.15s ease;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 5px;
    top: 2px;
    width: 5px;
    height: 9px;
    border: 2px solid #ffffff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
  }
`;

const checkedBoxStyle = css`
  background-color: ${colors.blue500};
  border-color: ${colors.blue500};

  &::after {
    display: block;
  }
`;

const indeterminateBoxStyle = css`
  background-color: ${colors.blue500};
  border-color: ${colors.blue500};

  &::after {
    display: block;
    left: 4px;
    top: 7px;
    width: 8px;
    height: 0px;
    border: 1.5px solid #ffffff;
    border-top: none;
    border-left: none;
    transform: none;
  }
`;

const labelTextStyle = css`
  ${typography.body2};
  color: ${colors.grey800};
`;

export function Checkbox({ label, indeterminate = false, checked, id, ...rest }: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isChecked = checked ?? false;

  return (
    <label css={wrapperStyle} htmlFor={id}>
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        checked={checked}
        css={hiddenInputStyle}
        {...rest}
      />
      <span
        css={[
          customBoxStyle,
          indeterminate ? indeterminateBoxStyle : isChecked && checkedBoxStyle,
        ]}
        aria-hidden="true"
      />
      {label !== undefined && <span css={labelTextStyle}>{label}</span>}
    </label>
  );
}
