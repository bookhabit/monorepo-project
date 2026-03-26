/** @jsxImportSource @emotion/react */
// ⚠️ 자동 생성된 파일입니다. 수동으로 수정하지 마세요!
// 재생성: yarn workspace @mono/ui icons
'use client';

import type { IconProps } from '../types';

export function CardIcon({
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.8,
  className,
  'aria-label': ariaLabel,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color }}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  );
}
