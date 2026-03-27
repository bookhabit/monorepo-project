/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState, useRef, type ReactElement, type ReactNode } from 'react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SliderProps = {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  color?: string;
  label?: { min: string; max: string; mid?: string };
  tooltip?: ReactElement<SliderTooltipProps>;
};

export type SliderTooltipProps = {
  message: string | number;
  /** injected by Slider */
  _percent?: number;
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const containerStyle = css`
  width: 100%;
  position: relative;
`;

const trackWrapStyle = css`
  position: relative;
  padding: 8px 0;
`;

const trackBgStyle = css`
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: ${colors.grey200};
  position: relative;
  overflow: visible;
`;

const labelRowStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  position: relative;
`;

const labelStyle = css`
  ${typography.caption};
  color: ${colors.grey500};
`;

// ─── Native range input hidden but functional ─────────────────────────────────

const nativeInputStyle = css`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  z-index: 2;
`;

// ─── SliderTooltip ───────────────────────────────────────────────────────────

function SliderTooltip({ message, _percent = 0 }: SliderTooltipProps) {
  const tooltipStyle = css`
    position: absolute;
    bottom: calc(100% + 8px);
    transform: translateX(-50%);
    left: ${_percent}%;
    background: ${colors.grey900};
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 8px;
    ${typography.caption};
    white-space: nowrap;
    pointer-events: none;
    z-index: 10;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: ${colors.grey900};
    }
  `;
  return <div css={tooltipStyle}>{message}</div>;
}

// ─── Slider ──────────────────────────────────────────────────────────────────

function SliderRoot({
  value: controlledValue,
  defaultValue = 50,
  onValueChange,
  minValue = 0,
  maxValue = 100,
  color = colors.blue400,
  label,
  tooltip,
}: SliderProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue! : internalValue;
  const range = maxValue - minValue;
  const percent = range === 0 ? 0 : ((value - minValue) / range) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const thumbStyle = css`
    position: absolute;
    top: 50%;
    left: ${percent}%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${color};
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    z-index: 1;
    pointer-events: none;
    transition: box-shadow 0.1s;
  `;

  const fillStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${percent}%;
    background: ${color};
    border-radius: 4px;
    pointer-events: none;
  `;

  const clonedTooltip = tooltip
    ? (tooltip.type as React.FC<SliderTooltipProps>)({ ...tooltip.props, _percent: percent })
    : null;

  return (
    <div css={containerStyle}>
      <div css={trackWrapStyle}>
        {clonedTooltip}
        <div css={trackBgStyle}>
          <div css={fillStyle} />
          <div css={thumbStyle} />
          <input
            css={nativeInputStyle}
            type="range"
            min={minValue}
            max={maxValue}
            value={value}
            onChange={handleChange}
            aria-valuemin={minValue}
            aria-valuemax={maxValue}
            aria-valuenow={value}
          />
        </div>
      </div>
      {label != null && (
        <div css={labelRowStyle}>
          <span css={labelStyle}>{label.min}</span>
          {label.mid != null && (
            <span css={css`${labelStyle}; position: absolute; left: 50%; transform: translateX(-50%);`}>{label.mid}</span>
          )}
          <span css={labelStyle}>{label.max}</span>
        </div>
      )}
    </div>
  );
}

export const Slider = Object.assign(SliderRoot, { Tooltip: SliderTooltip });
export { SliderTooltip };
