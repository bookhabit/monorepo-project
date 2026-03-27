/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState, useRef, useId, type ReactNode, Children } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SegmentedControlSize = 'small' | 'large';
export type SegmentedControlAlignment = 'fixed' | 'fluid';

export type SegmentedControlProps = {
  children: ReactNode;
  size?: SegmentedControlSize;
  alignment?: SegmentedControlAlignment;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export type SegmentedControlItemProps = {
  value: string;
  children: ReactNode;
  size?: SegmentedControlSize;
  /** injected by SegmentedControl */
  _selected?: boolean;
  _onSelect?: (v: string) => void;
  _labelId?: string;
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const trackStyle = (alignment: SegmentedControlAlignment) => css`
  display: ${alignment === 'fluid' ? 'flex' : 'inline-flex'};
  width: ${alignment === 'fluid' ? '100%' : 'auto'};
  background: ${colors.grey100};
  border-radius: 10px;
  padding: 3px;
  overflow-x: ${alignment === 'fluid' ? 'auto' : 'visible'};
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const itemStyle = (selected: boolean, size: SegmentedControlSize, alignment: SegmentedControlAlignment) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: ${alignment === 'fixed' ? '1' : '0 0 auto'};
  padding: ${size === 'large' ? '10px 16px' : '6px 12px'};
  border-radius: 8px;
  border: none;
  background: ${selected ? '#ffffff' : 'transparent'};
  box-shadow: ${selected ? '0 1px 4px rgba(0,0,0,0.12)' : 'none'};
  ${size === 'large' ? typography.body2Bold : typography.caption};
  color: ${selected ? colors.grey900 : colors.grey500};
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  font-family: inherit;

  &:hover:not([aria-checked='true']) {
    color: ${colors.grey700};
  }
`;

// ─── SegmentedControlItem ─────────────────────────────────────────────────────

function SegmentedControlItem({
  value,
  children,
  size = 'small',
  _selected = false,
  _onSelect,
  _labelId,
}: SegmentedControlItemProps) {
  const labelId = useId();
  return (
    <>
      <span id={_labelId ?? labelId} style={{ display: 'none' }}>{children}</span>
      <button
        type="button"
        role="radio"
        aria-checked={_selected}
        aria-labelledby={_labelId ?? labelId}
        tabIndex={_selected ? 0 : -1}
        css={itemStyle(_selected, size, 'fixed')}
        onClick={() => _onSelect?.(value)}
      >
        {children}
      </button>
    </>
  );
}

SegmentedControlItem.displayName = 'SegmentedControlItem';

// ─── SegmentedControl ────────────────────────────────────────────────────────

function SegmentedControlRoot({
  children,
  size = 'small',
  alignment = 'fixed',
  value: controlledValue,
  defaultValue,
  onChange,
}: SegmentedControlProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = controlledValue !== undefined;
  const selected = isControlled ? controlledValue : internalValue;

  const handleSelect = (v: string) => {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  };

  return (
    <div css={trackStyle(alignment)} role="radiogroup">
      {Children.map(children, (child) => {
        if (!child || typeof child !== 'object' || !('props' in child)) return child;
        const el = child as React.ReactElement<SegmentedControlItemProps>;
        return (
          <el.type
            {...el.props}
            size={size}
            _selected={el.props.value === selected}
            _onSelect={handleSelect}
          />
        );
      })}
    </div>
  );
}

export const SegmentedControl = Object.assign(SegmentedControlRoot, {
  Item: SegmentedControlItem,
});
