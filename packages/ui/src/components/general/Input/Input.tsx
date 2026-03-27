/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import type { InputProps } from './Input.types';

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const labelStyle = css`
  ${typography.body2Bold};
  color: ${colors.grey700};
`;

const inputStyle = css`
  ${typography.body1};
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid ${colors.grey200};
  border-radius: 10px;
  background-color: ${colors.background};
  color: ${colors.grey900};
  outline: none;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${colors.grey400};
  }

  &:focus {
    border-color: ${colors.blue500};
  }

  &:disabled {
    background-color: ${colors.grey100};
    color: ${colors.grey400};
    cursor: not-allowed;
  }
`;

const errorInputStyle = css`
  border-color: ${colors.error};
  &:focus {
    border-color: ${colors.error};
  }
`;

const errorMessageStyle = css`
  ${typography.caption};
  color: ${colors.error};
`;

const hintStyle = css`
  ${typography.caption};
  color: ${colors.grey500};
`;

export function Input({ label, errorMessage, hint, fullWidth = true, ...rest }: InputProps) {
  const hasLabel = label !== undefined;
  const hasError = errorMessage !== undefined;
  const shouldShowHint = !hasError && hint !== undefined;

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
      {hasLabel && (
        <label css={labelStyle} htmlFor={rest.id}>
          {label}
        </label>
      )}
      <input css={[inputStyle, hasError && errorInputStyle]} {...rest} />
      {hasError && <span css={errorMessageStyle}>{errorMessage}</span>}
      {shouldShowHint && <span css={hintStyle}>{hint}</span>}
    </div>
  );
}
