/** @jsxImportSource @emotion/react */
// ⚠️ 자동 생성된 파일입니다. 수동으로 수정하지 마세요!
// 재생성: yarn workspace @mono/ui icons
'use client';

import type { IconProps } from '../types';

export function CoinIcon({
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
      <circle cx="12" cy="12" r="10"/><path d="M12 6v2M12 16v2M9 9h4a1.5 1.5 0 0 1 0 3H11a1.5 1.5 0 0 0 0 3h4"/>
    </svg>
  );
}
