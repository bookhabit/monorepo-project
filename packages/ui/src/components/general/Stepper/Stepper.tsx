/** @jsxImportSource @emotion/react */
'use client';

import { css, keyframes } from '@emotion/react';
import { Children, type ReactNode } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export type StepperProps = {
  play?: boolean;
  delay?: number;
  staggerDelay?: number;
  children: ReactNode;
};

export type StepperRowProps = {
  left: ReactNode;
  center: ReactNode;
  right?: ReactNode;
  hideLine?: boolean;
  /** injected by Stepper */
  _animationDelay?: number;
  _play?: boolean;
};

export type StepperRowNumberIconProps = {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  color?: string;
  frameShape?: string;
};

export type StepperRowTextsProps = {
  type: 'A' | 'B' | 'C';
  title: ReactNode;
  description?: ReactNode;
};

export type StepperRowRightArrowProps = {
  name?: string;
  color?: string;
};

export type StepperRowRightButtonProps = {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'primary' | 'danger' | 'light' | 'dark';
  onClick?: () => void;
};

export type StepperRowAssetFrameProps = {
  shape?: string;
  content: ReactNode;
  backgroundColor?: string;
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const rowStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative;
`;

const leftColStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const lineStyle = css`
  width: 2px;
  flex: 1;
  min-height: 16px;
  background: ${colors.grey200};
  margin: 4px 0;
`;

const centerStyle = css`
  flex: 1;
  padding-bottom: 20px;
`;

const rightStyle = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding-top: 2px;
`;

// ─── StepperRow.NumberIcon ────────────────────────────────────────────────────

function StepperRowNumberIcon({ number }: StepperRowNumberIconProps) {
  return (
    <div
      css={css`
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${colors.blue50};
        color: ${colors.blue500};
        display: flex;
        align-items: center;
        justify-content: center;
        ${typography.body2Bold};
        flex-shrink: 0;
      `}
    >
      {number}
    </div>
  );
}

// ─── StepperRow.AssetFrame ────────────────────────────────────────────────────

function StepperRowAssetFrame({ content, backgroundColor = colors.grey100 }: StepperRowAssetFrameProps) {
  return (
    <div
      css={css`
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${backgroundColor};
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-shrink: 0;
      `}
    >
      {content}
    </div>
  );
}

// ─── StepperRow.Texts ─────────────────────────────────────────────────────────

const titleSizeMap = {
  A: css`${typography.body2Bold};`,    // t5 bold
  B: css`font-size: 1.125rem; font-weight: 700; line-height: 1.5;`, // t4 bold
  C: css`${typography.body2Bold};`,
};

const descSizeMap = {
  A: css`${typography.body2}; color: ${colors.grey600};`,
  B: css`${typography.body2}; color: ${colors.grey600};`,
  C: css`${typography.caption}; color: ${colors.grey500};`,
};

function StepperRowTexts({ type, title, description }: StepperRowTextsProps) {
  return (
    <div>
      <p css={css`${titleSizeMap[type]}; color: ${colors.grey900}; margin: 0 0 2px;`}>{title}</p>
      {description != null && <p css={css`${descSizeMap[type]}; margin: 0;`}>{description}</p>}
    </div>
  );
}

// ─── StepperRow.RightArrow ────────────────────────────────────────────────────

function StepperRowRightArrow({ color = colors.grey400 }: StepperRowRightArrowProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── StepperRow.RightButton ───────────────────────────────────────────────────

const rightBtnColorMap = {
  primary: css`background: ${colors.blue500}; color: #fff;`,
  danger:  css`background: ${colors.red500}; color: #fff;`,
  light:   css`background: ${colors.grey100}; color: ${colors.grey800};`,
  dark:    css`background: ${colors.grey800}; color: #fff;`,
};

function StepperRowRightButton({ children, size = 'small', color = 'light', onClick }: StepperRowRightButtonProps) {
  return (
    <button
      type="button"
      css={css`
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
        ${typography.captionBold};
        padding: ${size === 'small' ? '6px 12px' : '8px 16px'};
        ${rightBtnColorMap[color]};
        &:hover { opacity: 0.85; }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ─── StepperRow ──────────────────────────────────────────────────────────────

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

function StepperRow({
  left,
  center,
  right,
  hideLine = false,
  _animationDelay,
  _play = true,
}: StepperRowProps) {
  const animStyle =
    _play && _animationDelay !== undefined
      ? css`
          animation: ${fadeInUp} 0.35s ease both;
          animation-delay: ${_animationDelay}s;
        `
      : undefined;

  return (
    <div css={[rowStyle, animStyle]}>
      <div css={leftColStyle}>
        {left}
        {!hideLine && <div css={lineStyle} />}
      </div>
      <div css={centerStyle}>{center}</div>
      {right != null && <div css={rightStyle}>{right}</div>}
    </div>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

function StepperRoot({ play = true, delay = 0, staggerDelay = 0.1, children }: StepperProps) {
  const rows = Children.toArray(children);
  return (
    <div>
      {rows.map((row, i) => {
        if (!row || typeof row !== 'object' || !('props' in row)) return row;
        const el = row as React.ReactElement<StepperRowProps>;
        return (
          <el.type
            key={i}
            {...el.props}
            _play={play}
            _animationDelay={delay + staggerDelay * i}
          />
        );
      })}
    </div>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export const Stepper = StepperRoot;

StepperRow.NumberIcon = StepperRowNumberIcon;
StepperRow.AssetFrame = StepperRowAssetFrame;
StepperRow.Texts = StepperRowTexts;
StepperRow.RightArrow = StepperRowRightArrow;
StepperRow.RightButton = StepperRowRightButton;

export { StepperRow };
