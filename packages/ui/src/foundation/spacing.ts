// 4px 베이스, 8의 배수 권장
// 키: spacing 단위 숫자, 값: rem
export const spacing = {
  1:  '0.25rem',  // 4px
  2:  '0.5rem',   // 8px
  3:  '0.75rem',  // 12px
  4:  '1rem',     // 16px
  5:  '1.25rem',  // 20px
  6:  '1.5rem',   // 24px
  7:  '1.75rem',  // 28px
  8:  '2rem',     // 32px
  9:  '2.25rem',  // 36px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

export type SpacingToken = keyof typeof spacing;

// px 값으로 직접 접근할 때 사용
export const spacingPx = Object.fromEntries(
  Object.entries(spacing).map(([k, v]) => [k, `${parseFloat(v) * 16}px`]),
) as Record<SpacingToken, string>;
