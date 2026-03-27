/** @jsxImportSource @emotion/react */
'use client';

import { css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import { spacing } from '../../../foundation/spacing';
import type { DrawerProps } from './Drawer.types';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(100%); }
`;

const backdropStyle = css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
`;

const sheetStyle = (maxHeight: string) => css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.background};
  border-radius: 20px 20px 0 0;
  max-height: ${maxHeight};
  overflow-y: auto;
  z-index: 1001;
  animation: ${slideUp} 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  padding-bottom: env(safe-area-inset-bottom, 0px);
`;

const handleStyle = css`
  display: flex;
  justify-content: center;
  padding: ${spacing[3]} 0 ${spacing[1]};
`;

const handleBarStyle = css`
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background-color: ${colors.grey200};
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[2]} ${spacing[5]} ${spacing[4]};
`;

const titleStyle = css`
  ${typography.heading3};
  color: ${colors.grey900};
  margin: 0;
`;

const closeButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 8px;
  color: ${colors.grey500};
  font-size: 20px;
  line-height: 1;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${colors.grey100};
  }
`;

const bodyStyle = css`
  padding: 0 ${spacing[5]} ${spacing[6]};
`;

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = '90vh',
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const shouldRender = mounted && isOpen;
  const hasTitle = title !== undefined;

  if (!shouldRender) return null;

  return createPortal(
    <>
      <div css={backdropStyle} onClick={onClose} aria-hidden="true" />
      <div
        css={sheetStyle(maxHeight)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasTitle ? 'drawer-title' : undefined}
      >
        <div css={handleStyle}>
          <div css={handleBarStyle} />
        </div>
        {hasTitle && (
          <div css={headerStyle}>
            <h2 id="drawer-title" css={titleStyle}>
              {title}
            </h2>
            <button
              css={closeButtonStyle}
              onClick={onClose}
              aria-label="닫기"
              type="button"
            >
              ✕
            </button>
          </div>
        )}
        <div css={bodyStyle}>{children}</div>
      </div>
    </>,
    document.body,
  );
}
