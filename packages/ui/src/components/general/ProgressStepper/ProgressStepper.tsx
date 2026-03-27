/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { type ReactNode, Children } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProgressStepperVariant = 'compact' | 'icon';

export type ProgressStepperProps = {
  variant: ProgressStepperVariant;
  activeStepIndex?: number;
  paddingTop?: 'default' | 'wide';
  checkForFinish?: boolean;
  children: ReactNode;
};

export type ProgressStepProps = {
  title?: string;
  icon?: ReactNode;
  /** injected by ProgressStepper */
  _variant?: ProgressStepperVariant;
  _index?: number;
  _active?: boolean;
  _finished?: boolean;
  _total?: number;
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const stepRowStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
`;

const iconCircleStyle = (active: boolean, finished: boolean) => css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${finished ? colors.blue500 : active ? colors.blue500 : colors.grey100};
  color: ${finished || active ? '#fff' : colors.grey400};
  border: 2px solid ${finished || active ? colors.blue500 : colors.grey200};
  z-index: 1;
  flex-shrink: 0;
  transition: all 0.2s;
`;

const compactDotStyle = (active: boolean, finished: boolean) => css`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${finished || active ? colors.blue500 : colors.grey200};
  flex-shrink: 0;
  z-index: 1;
  transition: background 0.2s;
`;

const lineStyle = (finished: boolean) => css`
  height: 2px;
  background: ${finished ? colors.blue500 : colors.grey200};
  transition: background 0.2s;
`;

const stepLabelStyle = (active: boolean) => css`
  ${typography.caption};
  color: ${active ? colors.blue500 : colors.grey500};
  margin-top: 6px;
  text-align: center;
  white-space: nowrap;
  font-weight: ${active ? 600 : 400};
`;

// ─── ProgressStep ─────────────────────────────────────────────────────────────

export function ProgressStep({
  title,
  icon,
  _variant = 'compact',
  _index = 0,
  _active = false,
  _finished = false,
  _total = 1,
}: ProgressStepProps) {
  const isLast = _index === _total - 1;

  if (_variant === 'compact') {
    return (
      <div css={css`display: flex; align-items: center; flex: 1;`}>
        <div css={css`display: flex; flex-direction: column; align-items: center; gap: 4px;`}>
          <div css={compactDotStyle(_active, _finished)} />
          {title != null && <span css={stepLabelStyle(_active)}>{title}</span>}
        </div>
        {!isLast && (
          <div css={css`flex: 1; margin: 0 4px; padding-bottom: ${title ? '20px' : '0'};`}>
            <div css={lineStyle(_finished)} />
          </div>
        )}
      </div>
    );
  }

  // icon variant
  return (
    <div css={css`display: flex; align-items: flex-start; flex: 1;`}>
      <div css={stepRowStyle}>
        <div css={iconCircleStyle(_active, _finished)}>
          {_finished ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : icon != null ? (
            icon
          ) : (
            <span style={{ fontSize: 12, fontWeight: 700 }}>{_index + 1}</span>
          )}
        </div>
        {title != null && <span css={stepLabelStyle(_active)}>{title}</span>}
      </div>
      {!isLast && (
        <div css={css`flex: 1; margin-top: 15px; padding: 0 4px;`}>
          <div css={lineStyle(_finished)} />
        </div>
      )}
    </div>
  );
}

// ─── ProgressStepper ─────────────────────────────────────────────────────────

export function ProgressStepper({
  variant,
  activeStepIndex = 0,
  paddingTop = 'default',
  checkForFinish = false,
  children,
}: ProgressStepperProps) {
  const steps = Children.toArray(children);
  const total = steps.length;
  const pt = paddingTop === 'wide' ? 24 : 16;

  return (
    <div css={css`display: flex; align-items: flex-start; padding-top: ${pt}px; width: 100%;`}>
      {steps.map((step, i) => {
        const active = i === activeStepIndex;
        const finished = checkForFinish ? i < activeStepIndex : false;
        if (!step || typeof step !== 'object' || !('props' in step)) return null;
        const props = (step as React.ReactElement<ProgressStepProps>).props;
        return (
          <ProgressStep
            key={i}
            {...props}
            _variant={variant}
            _index={i}
            _active={active}
            _finished={finished}
            _total={total}
          />
        );
      })}
    </div>
  );
}
