/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import { spacing } from '../../../foundation/spacing';
import type { SelectProps } from './Select.types';

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

const labelStyle = css`
  ${typography.body2Bold};
  color: ${colors.grey700};
`;

const selectWrapperStyle = css`
  position: relative;
  display: flex;
  align-items: center;
`;

const selectStyle = css`
  ${typography.body1};
  width: 100%;
  padding: 14px 40px 14px 16px;
  border: 1.5px solid ${colors.grey200};
  border-radius: 10px;
  background-color: ${colors.background};
  color: ${colors.grey900};
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: ${colors.blue500};
  }

  &:disabled {
    background-color: ${colors.grey100};
    color: ${colors.grey400};
    cursor: not-allowed;
  }
`;

const errorSelectStyle = css`
  border-color: ${colors.error};
  &:focus {
    border-color: ${colors.error};
  }
`;

const chevronStyle = css`
  position: absolute;
  right: 14px;
  pointer-events: none;
  width: 18px;
  height: 18px;
  color: ${colors.grey500};

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg) translateY(-3px);
    margin: 4px auto 0;
  }
`;

const errorMessageStyle = css`
  ${typography.caption};
  color: ${colors.error};
`;

const placeholderStyle = css`
  color: ${colors.grey400};
`;

export function Select({
  label,
  options,
  placeholder,
  errorMessage,
  fullWidth = true,
  value,
  ...rest
}: SelectProps) {
  const isPlaceholderShown = value === '' || value === undefined;

  return (
    <div
      css={[
        wrapperStyle,
        fullWidth &&
          css`
            width: 100%;
          `,
      ]}
    >
      {label !== undefined && (
        <label css={labelStyle} htmlFor={rest.id}>
          {label}
        </label>
      )}
      <div css={selectWrapperStyle}>
        <select
          css={[
            selectStyle,
            errorMessage !== undefined && errorSelectStyle,
            isPlaceholderShown && placeholderStyle,
          ]}
          value={value}
          {...rest}
        >
          {placeholder !== undefined && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span css={chevronStyle} aria-hidden="true" />
      </div>
      {errorMessage !== undefined && <span css={errorMessageStyle}>{errorMessage}</span>}
    </div>
  );
}
