/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import { spacing } from '../../../foundation/spacing';
import type { SplitTextFieldProps } from './TextField.types';

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const inputsRowStyle = css`
  display: flex;
  gap: ${spacing[2]};
`;

const cellStyle = css`
  ${typography.heading2};
  width: 48px;
  height: 56px;
  text-align: center;
  border: 1.5px solid ${colors.grey200};
  border-radius: 10px;
  background-color: ${colors.background};
  color: ${colors.grey900};
  outline: none;
  transition: border-color 0.15s ease;
  caret-color: ${colors.blue500};

  &:focus {
    border-color: ${colors.blue500};
    background-color: ${colors.blue50};
  }

  &:disabled {
    background-color: ${colors.grey100};
    color: ${colors.grey400};
    cursor: not-allowed;
  }
`;

const errorCellStyle = css`
  border-color: ${colors.error};
  &:focus {
    border-color: ${colors.error};
    background-color: ${colors.red50};
  }
`;

const errorMessageStyle = css`
  ${typography.caption};
  color: ${colors.error};
`;

export function SplitTextField({
  length = 6,
  value = '',
  onChange,
  disabled = false,
  errorMessage,
  autoFocus = false,
}: SplitTextFieldProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const inputChar = e.target.value.replace(/[^0-9a-zA-Z]/g, '');
    if (inputChar.length === 0) return;

    const lastChar = inputChar[inputChar.length - 1] ?? '';
    const newChars = [...chars];
    newChars[index] = lastChar;
    onChange?.(newChars.join(''));

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (chars[index] !== '') {
        const newChars = [...chars];
        newChars[index] = '';
        onChange?.(newChars.join(''));
      } else if (index > 0) {
        const newChars = [...chars];
        newChars[index - 1] = '';
        onChange?.(newChars.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9a-zA-Z]/g, '').slice(0, length);
    const newChars = [...chars];
    for (let i = 0; i < pasted.length; i++) {
      newChars[i] = pasted[i] ?? '';
    }
    onChange?.(newChars.join(''));
    const nextFocusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  return (
    <div css={wrapperStyle}>
      <div css={inputsRowStyle}>
        {chars.map((char, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={char}
            disabled={disabled}
            css={[cellStyle, errorMessage !== undefined && errorCellStyle]}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            aria-label={`${index + 1}번째 입력`}
          />
        ))}
      </div>
      {errorMessage !== undefined && <span css={errorMessageStyle}>{errorMessage}</span>}
    </div>
  );
}
