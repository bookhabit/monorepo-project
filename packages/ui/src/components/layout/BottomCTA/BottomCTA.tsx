/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '../../general/Button/Button';
import { colors } from '../../../foundation/colors';
import { spacing } from '../../../foundation/spacing';
import type { BottomCTASingleProps, BottomCTADoubleProps, FixedBottomCTAProps } from './BottomCTA.types';

const ctaWrapperStyle = css`
  padding: ${spacing[4]};
  background-color: ${colors.background};
  border-top: 1px solid ${colors.grey100};
`;

const safeAreaStyle = css`
  padding-bottom: calc(${spacing[4]} + env(safe-area-inset-bottom, 0px));
`;

const doubleRowStyle = css`
  display: flex;
  gap: ${spacing[3]};
`;

const fixedWrapperStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid ${colors.grey100};
  z-index: 100;
`;

export function BottomCTASingle({
  label,
  onClick,
  disabled = false,
  loading = false,
  safeArea = false,
}: BottomCTASingleProps) {
  return (
    <div css={[ctaWrapperStyle, safeArea && safeAreaStyle]}>
      <Button variant="primary" size="large" fullWidth onClick={onClick} disabled={disabled} loading={loading}>
        {label}
      </Button>
    </div>
  );
}

export function BottomCTADouble({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  primaryDisabled = false,
  secondaryDisabled = false,
}: BottomCTADoubleProps) {
  return (
    <div css={ctaWrapperStyle}>
      <div css={doubleRowStyle}>
        <Button
          variant="secondary"
          size="large"
          fullWidth
          onClick={onSecondary}
          disabled={secondaryDisabled}
        >
          {secondaryLabel}
        </Button>
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={onPrimary}
          disabled={primaryDisabled}
        >
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}

export function FixedBottomCTA({ children, safeArea = false }: FixedBottomCTAProps) {
  return (
    <div
      css={[
        fixedWrapperStyle,
        css`
          padding: ${spacing[4]};
          ${safeArea ? `padding-bottom: calc(${spacing[4]} + env(safe-area-inset-bottom, 0px));` : ''}
        `,
      ]}
    >
      {children}
    </div>
  );
}
