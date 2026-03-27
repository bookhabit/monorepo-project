/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { Children, useRef, type ReactNode } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export type TabSize = 'small' | 'large';

export type TabProps = {
  children: ReactNode;
  onChange: (index: number, key?: string | number) => void;
  size?: TabSize;
  fluid?: boolean;
  itemGap?: number;
  ariaLabel?: string;
};

export type TabItemProps = {
  selected: boolean;
  redBean?: boolean;
  children: ReactNode;
  /** injected by Tab */
  _onClick?: () => void;
  _size?: TabSize;
  _gap?: number | undefined;
};

// ─── Size Config ─────────────────────────────────────────────────────────────

const sizeConfig: Record<TabSize, { height: number; typography: string; indicatorH: number }> = {
  small: { height: 40, typography: typography.body2Bold, indicatorH: 2 },
  large: { height: 48, typography: typography.body1Bold, indicatorH: 2 },
};

// ─── Tab.Item ─────────────────────────────────────────────────────────────────

function TabItem({
  selected,
  redBean = false,
  children,
  _onClick,
  _size = 'large',
  _gap,
}: TabItemProps) {
  const cfg = sizeConfig[_size];

  const itemStyle = css`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: ${cfg.height}px;
    padding: 0 ${_gap != null ? '0' : '0'};
    background: none;
    border: none;
    cursor: pointer;
    ${cfg.typography};
    color: ${selected ? colors.grey900 : colors.grey400};
    white-space: nowrap;
    flex-shrink: 0;
    font-family: inherit;
    transition: color 0.15s;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: ${cfg.indicatorH}px;
      background: ${selected ? colors.grey900 : 'transparent'};
      border-radius: ${cfg.indicatorH}px ${cfg.indicatorH}px 0 0;
      transition: background 0.15s;
    }

    &:hover {
      color: ${selected ? colors.grey900 : colors.grey600};
    }
  `;

  const redBeanStyle = css`
    position: absolute;
    top: 10px;
    right: -6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.red500};
    flex-shrink: 0;
  `;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      css={itemStyle}
      onClick={_onClick}
    >
      {children}
      {redBean && <span css={redBeanStyle} title="(업데이트 있음)" aria-hidden="true" />}
    </button>
  );
}

TabItem.displayName = 'Tab.Item';

// ─── Tab ─────────────────────────────────────────────────────────────────────

function TabRoot({
  children,
  onChange,
  size = 'large',
  fluid = false,
  itemGap,
  ariaLabel,
}: TabProps) {
  const items = Children.toArray(children);

  const trackStyle = css`
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid ${colors.grey200};
    overflow-x: ${fluid ? 'auto' : 'visible'};
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
    gap: ${itemGap != null ? `${itemGap}px` : fluid ? '0' : '0'};
    ${!fluid ? 'width: 100%;' : ''}
  `;

  const itemWrapStyle = (isFixed: boolean) => css`
    ${isFixed ? 'flex: 1;' : 'flex-shrink: 0;'}
    display: flex;
    justify-content: center;
    ${itemGap != null ? `padding: 0 ${itemGap / 2}px;` : ''}
  `;

  return (
    <div role="tablist" aria-label={ariaLabel} css={trackStyle}>
      {items.map((item, i) => {
        if (!item || typeof item !== 'object' || !('props' in item)) return item;
        const el = item as React.ReactElement<TabItemProps>;
        return (
          <div key={i} css={itemWrapStyle(!fluid)}>
            <el.type
              {...el.props}
              _size={size}
              _gap={itemGap}
              _onClick={() => onChange(i)}
            />
          </div>
        );
      })}
    </div>
  );
}

export const Tab = Object.assign(TabRoot, { Item: TabItem });
