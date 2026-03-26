/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import type { SwitchProps } from './Switch.types';

const wrapperStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
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

const trackStyle = css`
  position: relative;
  width: 48px;
  height: 28px;
  border-radius: 14px;
  background-color: ${colors.grey300};
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
  }
`;

const checkedTrackStyle = css`
  background-color: ${colors.blue500};

  &::after {
    transform: translateX(20px);
  }
`;

const labelTextStyle = css`
  ${typography.body2};
  color: ${colors.grey800};
`;

export function Switch({ label, checked, id, ...rest }: SwitchProps) {
  const isChecked = checked ?? false;

  return (
    <label css={wrapperStyle} htmlFor={id}>
      <input
        type="checkbox"
        role="switch"
        id={id}
        checked={checked}
        css={hiddenInputStyle}
        {...rest}
      />
      <span css={[trackStyle, isChecked && checkedTrackStyle]} aria-hidden="true" />
      {label !== undefined && <span css={labelTextStyle}>{label}</span>}
    </label>
  );
}
