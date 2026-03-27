/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState, useRef, useEffect, type ReactNode, type CSSProperties } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';

// ─── Styles ─────────────────────────────────────────────────────────────────

const dropdownStyle = css`
  background: #ffffff;
  border: 1px solid ${colors.grey200};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  overflow: hidden;
`;

const headerStyle = css`
  padding: 12px 16px 8px;
  border-bottom: 1px solid ${colors.grey100};
`;

const headerTextStyle = css`
  ${typography.body2Bold};
  color: ${colors.grey700};
  margin: 0;
`;

const itemStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 16px;
  ${typography.body2};
  color: ${colors.grey800};
  cursor: pointer;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  font-family: inherit;

  &:hover {
    background: ${colors.grey50};
  }
  &:active {
    background: ${colors.grey100};
  }
`;

const itemCenterStyle = css`
  flex: 1;
`;

const checkCircleStyle = css`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${colors.grey300};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 10px;
  color: transparent;
`;

const checkCircleActiveStyle = css`
  background: ${colors.blue500};
  border-color: ${colors.blue500};
  color: #ffffff;
`;

// ─── Sub-components ──────────────────────────────────────────────────────────

function MenuHeader({ children }: { children: ReactNode }) {
  return (
    <div css={headerStyle}>
      <p css={headerTextStyle}>{children}</p>
    </div>
  );
}

function MenuDropdown({ header, children }: { header?: ReactNode; children: ReactNode }) {
  return (
    <div css={dropdownStyle}>
      {header}
      <div>{children}</div>
    </div>
  );
}

function MenuDropdownItem({
  left,
  right,
  children,
  onClick,
}: {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button css={itemStyle} onClick={onClick} type="button">
      {left != null && <span>{left}</span>}
      <span css={itemCenterStyle}>{children}</span>
      {right != null && <span>{right}</span>}
    </button>
  );
}

function MenuDropdownIcon({ name }: { name: string }) {
  return (
    <span style={{ fontSize: 13, color: colors.grey500, fontFamily: 'monospace' }}>{name}</span>
  );
}

function MenuDropdownCheckItem({
  checked,
  onCheckedChange,
  children,
}: {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children: ReactNode;
}) {
  return (
    <button css={itemStyle} onClick={() => onCheckedChange?.(!checked)} type="button">
      <span css={[checkCircleStyle, checked && checkCircleActiveStyle]}>✓</span>
      <span css={itemCenterStyle}>{children}</span>
    </button>
  );
}

// ─── Placement ───────────────────────────────────────────────────────────────

type MenuPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

function getPositionStyle(placement: MenuPlacement): CSSProperties {
  const [dir, align] = placement.split('-') as [string, string | undefined];
  const base: CSSProperties = { position: 'absolute', zIndex: 1000 };

  if (dir === 'bottom') {
    base.top = '100%';
    base.marginTop = 4;
    if (align === 'start') base.left = 0;
    else if (align === 'end') base.right = 0;
    else { base.left = '50%'; base.transform = 'translateX(-50%)'; }
  } else if (dir === 'top') {
    base.bottom = '100%';
    base.marginBottom = 4;
    if (align === 'start') base.left = 0;
    else if (align === 'end') base.right = 0;
    else { base.left = '50%'; base.transform = 'translateX(-50%)'; }
  } else if (dir === 'left') {
    base.right = '100%';
    base.marginRight = 4;
    if (align === 'start') base.top = 0;
    else if (align === 'end') base.bottom = 0;
    else { base.top = '50%'; base.transform = 'translateY(-50%)'; }
  } else if (dir === 'right') {
    base.left = '100%';
    base.marginLeft = 4;
    if (align === 'start') base.top = 0;
    else if (align === 'end') base.bottom = 0;
    else { base.top = '50%'; base.transform = 'translateY(-50%)'; }
  }
  return base;
}

// ─── Trigger ─────────────────────────────────────────────────────────────────

export type MenuTriggerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  placement?: MenuPlacement;
  dropdown: ReactNode;
  children: ReactNode;
};

function MenuTrigger({
  open: controlledOpen,
  defaultOpen = false,
  onOpen,
  onClose,
  placement = 'bottom-start',
  dropdown,
  children,
}: MenuTriggerProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const containerRef = useRef<HTMLDivElement>(null);

  const open = () => { if (!isControlled) setInternalOpen(true); onOpen?.(); };
  const close = () => { if (!isControlled) setInternalOpen(false); onClose?.(); };
  const toggle = () => (isOpen ? close() : open());

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={toggle}>{children}</div>
      {isOpen && <div style={getPositionStyle(placement)}>{dropdown}</div>}
    </div>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export const Menu = {
  Dropdown: MenuDropdown,
  Header: MenuHeader,
  DropdownItem: MenuDropdownItem,
  DropdownIcon: MenuDropdownIcon,
  DropdownCheckItem: MenuDropdownCheckItem,
  Trigger: MenuTrigger,
};

export type { MenuPlacement };
