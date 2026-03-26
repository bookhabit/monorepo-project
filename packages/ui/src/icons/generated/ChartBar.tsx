/** @jsxImportSource @emotion/react */
// ⚠️ 자동 생성된 파일입니다. 수동으로 수정하지 마세요!
// 재생성: yarn workspace @mono/ui icons
'use client';

import type { IconProps } from '../types';

export function ChartBarIcon({
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
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  );
}
