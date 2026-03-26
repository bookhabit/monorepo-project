/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import { spacing } from '../../../foundation/spacing';
import type { TextFieldProps } from './TextField.types';

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

const titleStyle = css`
  ${typography.body2Bold};
  color: ${colors.grey700};
`;

const inputWrapperStyle = css`
  position: relative;
  display: flex;
  align-items: center;
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

const inputWithClearStyle = css`
  padding-right: 44px;
`;

const inputWithLengthStyle = css`
  padding-right: 56px;
`;

const inputWithBothStyle = css`
  padding-right: 96px;
`;

const errorInputStyle = css`
  border-color: ${colors.error};
  &:focus {
    border-color: ${colors.error};
  }
`;

const clearButtonStyle = css`
  position: absolute;
  right: 12px;
  width: 22px;
  height: 22px;
  border: none;
  background: ${colors.grey300};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  padding: 0;
  transition: background-color 0.1s ease;

  &:hover {
    background: ${colors.grey400};
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: currentColor;
    border-radius: 1px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const lengthCounterStyle = css`
  position: absolute;
  right: 12px;
  ${typography.caption};
  color: ${colors.grey400};
  white-space: nowrap;
  pointer-events: none;
`;

const lengthCounterWithClearStyle = css`
  right: 44px;
`;

const descriptionStyle = css`
  ${typography.caption};
  color: ${colors.grey500};
`;

const errorMessageStyle = css`
  ${typography.caption};
  color: ${colors.error};
`;

export function TextField({
  title,
  description,
  errorMessage,
  clearButton = false,
  onClear,
  fullWidth = true,
  maxLength,
  value,
  ...rest
}: TextFieldProps) {
  const currentLength = typeof value === 'string' ? value.length : 0;
  const showClear = clearButton && currentLength > 0;
  const showLength = maxLength !== undefined;

  let rightPaddingStyle = null;
  if (showClear && showLength) rightPaddingStyle = inputWithBothStyle;
  else if (showClear) rightPaddingStyle = inputWithClearStyle;
  else if (showLength) rightPaddingStyle = inputWithLengthStyle;

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
      {title !== undefined && <label css={titleStyle}>{title}</label>}
      <div css={inputWrapperStyle}>
        <input
          css={[inputStyle, rightPaddingStyle, errorMessage !== undefined && errorInputStyle]}
          value={value}
          maxLength={maxLength}
          {...rest}
        />
        {showClear && (
          <button
            type="button"
            css={[clearButtonStyle, showLength && css`right: 60px;`]}
            onClick={onClear}
            aria-label="입력 지우기"
          />
        )}
        {showLength && (
          <span css={[lengthCounterStyle, showClear && lengthCounterWithClearStyle]}>
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      {errorMessage !== undefined && <span css={errorMessageStyle}>{errorMessage}</span>}
      {errorMessage === undefined && description !== undefined && (
        <span css={descriptionStyle}>{description}</span>
      )}
    </div>
  );
}
