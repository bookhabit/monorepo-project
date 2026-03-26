/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import type { ButtonProps } from './Button.types';

const baseStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.1s ease;
  white-space: nowrap;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const variantStyles = {
  primary: css`
    background-color: ${colors.blue500};
    color: ${colors.grey0};
    &:hover:not(:disabled) {
      background-color: ${colors.blue600};
    }
    &:active:not(:disabled) {
      background-color: ${colors.blue700};
    }
  `,
  secondary: css`
    background-color: ${colors.grey100};
    color: ${colors.grey900};
    &:hover:not(:disabled) {
      background-color: ${colors.grey200};
    }
    &:active:not(:disabled) {
      background-color: ${colors.grey300};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${colors.blue500};
    &:hover:not(:disabled) {
      background-color: ${colors.blue50};
    }
  `,
  danger: css`
    background-color: ${colors.error};
    color: ${colors.grey0};
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
} as const;

const sizeStyles = {
  small: css`
    ${typography.Body2Bold};
    padding: 8px 14px;
    height: 36px;
  `,
  medium: css`
    ${typography.Body1Bold};
    padding: 12px 20px;
    height: 48px;
  `,
  large: css`
    ${typography.Body1Bold};
    padding: 16px 28px;
    height: 56px;
  `,
} as const;

export function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      css={[
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth &&
          css`
            width: 100%;
          `,
      ]}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? '로딩 중...' : children}
    </button>
  );
}
