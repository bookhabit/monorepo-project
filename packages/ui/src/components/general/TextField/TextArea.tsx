/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef, useEffect, ChangeEvent } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import { spacing } from '../../../foundation/spacing';
import type { TextAreaProps } from './TextField.types';

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

const titleStyle = css`
  ${typography.body2Bold};
  color: ${colors.grey700};
`;

const textareaStyle = css`
  ${typography.body1};
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid ${colors.grey200};
  border-radius: 10px;
  background-color: ${colors.background};
  color: ${colors.grey900};
  outline: none;
  resize: vertical;
  transition: border-color 0.15s ease;
  font-family: inherit;
  min-height: 100px;
  line-height: 1.6;

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
    resize: none;
  }
`;

const autoResizeStyle = css`
  resize: none;
  overflow: hidden;
`;

const errorTextareaStyle = css`
  border-color: ${colors.error};
  &:focus {
    border-color: ${colors.error};
  }
`;

const footerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const descriptionStyle = css`
  ${typography.caption};
  color: ${colors.grey500};
`;

const errorMessageStyle = css`
  ${typography.caption};
  color: ${colors.error};
`;

const lengthCounterStyle = css`
  ${typography.caption};
  color: ${colors.grey400};
  margin-left: auto;
`;

export function TextArea({
  title,
  description,
  errorMessage,
  maxLength,
  fullWidth = true,
  autoResize = false,
  value,
  onChange,
  ...rest
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentLength = typeof value === 'string' ? value.length : 0;

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el && autoResize) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value, autoResize]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    if (autoResize) {
      adjustHeight();
    }
  };

  const hasFooter = description !== undefined || errorMessage !== undefined || maxLength !== undefined;

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
      <textarea
        ref={textareaRef}
        css={[
          textareaStyle,
          autoResize && autoResizeStyle,
          errorMessage !== undefined && errorTextareaStyle,
        ]}
        value={value}
        maxLength={maxLength}
        onChange={handleChange}
        {...rest}
      />
      {hasFooter && (
        <div css={footerStyle}>
          {errorMessage !== undefined ? (
            <span css={errorMessageStyle}>{errorMessage}</span>
          ) : description !== undefined ? (
            <span css={descriptionStyle}>{description}</span>
          ) : (
            <span />
          )}
          {maxLength !== undefined && (
            <span css={lengthCounterStyle}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
