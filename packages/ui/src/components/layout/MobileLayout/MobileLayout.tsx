/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { colors } from '../../../foundation/colors';
import { AppHeader } from './AppHeader';
import { BottomTabBar } from './BottomTabBar';
import type { MobileLayoutProps } from './MobileLayout.types';

const rootStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.background};
  /* 모바일 뷰포트 최대 너비 */
  max-width: 480px;
  margin: 0 auto;
  position: relative;
`;

const mainStyle = (hasBottomTab: boolean) => css`
  flex: 1;
  overflow-y: auto;
  /* BottomTabBar 높이(56px) + safe-area 여백 */
  padding-bottom: ${hasBottomTab
    ? 'calc(56px + env(safe-area-inset-bottom, 0px))'
    : '0'};
`;

export function MobileLayout({
  children,
  header,
  tabs,
  safeArea = true,
}: MobileLayoutProps) {
  return (
    <div
      css={[
        rootStyle,
        safeArea &&
          css`
            padding-top: env(safe-area-inset-top, 0px);
          `,
      ]}
    >
      {header && <AppHeader {...header} />}
      <main css={mainStyle(!!tabs)}>{children}</main>
      {tabs && <BottomTabBar {...tabs} />}
    </div>
  );
}
