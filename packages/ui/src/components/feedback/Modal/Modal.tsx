/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import { spacing } from '../../../foundation/spacing';
import type { ModalProps } from './Modal.types';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const backdropStyle = css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing[4]};
  animation: ${fadeIn} 0.15s ease;
`;

const modalStyle = css`
  background-color: ${colors.background};
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  overflow-y: auto;
  animation: ${scaleIn} 0.2s ease;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[5]} ${spacing[6]} ${spacing[4]};
  border-bottom: 1px solid ${colors.grey100};
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
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: ${colors.grey100};
    color: ${colors.grey700};
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 14px;
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

const bodyStyle = css`
  padding: ${spacing[5]} ${spacing[6]};
`;

export function Modal({ isOpen, onClose, title, children, width = '480px' }: ModalProps) {
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
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      css={backdropStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        css={[
          modalStyle,
          css`
            width: 100%;
            max-width: ${width};
          `,
        ]}
        onClick={(e) => e.stopPropagation()}
      >
        {title !== undefined && (
          <div css={headerStyle}>
            <h2 id="modal-title" css={titleStyle}>
              {title}
            </h2>
            <button
              css={closeButtonStyle}
              onClick={onClose}
              aria-label="닫기"
              type="button"
            />
          </div>
        )}
        <div css={bodyStyle}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
