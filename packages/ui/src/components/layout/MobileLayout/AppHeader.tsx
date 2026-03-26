/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import type { AppHeaderProps } from './MobileLayout.types';

const headerStyle = css`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 4px;
  background-color: ${colors.background};
  border-bottom: 1px solid ${colors.grey100};
  padding-top: env(safe-area-inset-top, 0px);
`;

const backButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 10px;
  color: ${colors.grey700};
  flex-shrink: 0;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${colors.grey100};
  }

  /* 왼쪽 화살표 (<) */
  &::before {
    content: '';
    display: block;
    width: 9px;
    height: 9px;
    border-left: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg) translateX(2px);
    border-radius: 1px;
  }
`;

const titleStyle = css`
  ${typography.heading3};
  color: ${colors.grey900};
  flex: 1;
  text-align: center;
  margin: 0;
  /* 좌우 버튼 영역 44px 보정 */
  padding: 0 44px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const rightSlotStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 44px;
  flex-shrink: 0;
`;

const placeholderStyle = css`
  width: 44px;
  flex-shrink: 0;
`;

export function AppHeader({ title, onBack, rightSlot }: AppHeaderProps) {
  return (
    <header css={headerStyle}>
      {onBack ? (
        <button
          css={backButtonStyle}
          onClick={onBack}
          aria-label="뒤로가기"
          type="button"
        />
      ) : (
        <div css={placeholderStyle} />
      )}

      {title && <h1 css={titleStyle}>{title}</h1>}

      {rightSlot ? (
        <div css={rightSlotStyle}>{rightSlot}</div>
      ) : (
        <div css={placeholderStyle} />
      )}
    </header>
  );
}
