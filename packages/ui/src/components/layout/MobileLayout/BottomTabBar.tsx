/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import type { BottomTabBarProps } from './MobileLayout.types';

const navStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  background-color: ${colors.background};
  border-top: 1px solid ${colors.grey100};
  padding-bottom: env(safe-area-inset-bottom, 0px);
`;

const tabButtonStyle = (active: boolean) => css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 4px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${active ? colors.blue500 : colors.grey400};
  transition: color 0.15s ease;

  &:active {
    background-color: ${colors.grey50};
  }
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const labelStyle = css`
  ${typography.caption};
  font-weight: 500;
`;

export function BottomTabBar({ tabs, activeKey, onChange }: BottomTabBarProps) {
  return (
    <nav css={navStyle} aria-label="탭 네비게이션">
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            css={tabButtonStyle(isActive)}
            onClick={() => onChange(tab.key)}
            aria-current={isActive ? 'page' : undefined}
            type="button"
          >
            <span css={iconStyle}>
              {isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
            </span>
            <span css={labelStyle}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
