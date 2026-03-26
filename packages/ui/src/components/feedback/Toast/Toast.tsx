/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import type { ToastItem, ToastType } from './Toast.types';

const slideIn = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const toastColors: Record<ToastType, string> = {
  success: colors.success,
  error: colors.error,
  warning: colors.warning,
  info: colors.blue500,
};

const containerStyle = css`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999;
  pointer-events: none;
  width: calc(100% - 48px);
  max-width: 400px;
`;

const toastItemStyle = (type: ToastType) => css`
  ${typography.body2Bold};
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 12px;
  background-color: ${colors.grey900};
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.25s ease;
  pointer-events: auto;

  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${toastColors[type]};
    flex-shrink: 0;
  }
`;

type ToastContainerProps = {
  toasts: ToastItem[];
};

export function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div css={containerStyle}>
      {toasts.map((toast) => (
        <div key={toast.id} css={toastItemStyle(toast.type)}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
