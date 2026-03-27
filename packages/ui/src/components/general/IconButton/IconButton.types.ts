import type { ButtonHTMLAttributes } from 'react';

export type IconButtonVariant = 'clear' | 'fill' | 'border';

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
  /** 접근성 필수값 — 아이콘만으로는 역할을 알 수 없으므로 반드시 지정 */
  'aria-label': string;
  /**
   * 버튼 형태.
   * - clear: 배경 없이 아이콘만, 클릭 시 배경 노출
   * - fill: 배경색 항상 표시, 클릭 시 배경 제거
   * - border: 테두리 표시, 클릭 시 배경 노출
   * @default 'clear'
   */
  variant?: IconButtonVariant;
  /**
   * 아이콘 URL. `name`과 함께 사용할 수 없음.
   * SVG URL일 때 `color` 속성으로 색상 변경 가능.
   */
  src?: string;
  /**
   * @mono/ui 아이콘 이름 (예: 'Search', 'Home', 'Plus').
   * `src`와 함께 사용할 수 없음.
   */
  name?: string;
  /** 아이콘 색상. `src` 사용 시 CSS mask로 적용됨. */
  color?: string;
  /**
   * 버튼 배경색.
   * - fill: 항상 적용
   * - clear/border: 클릭(active) 시 적용
   * @default colors.grey100
   */
  bgColor?: string;
  /**
   * 아이콘 크기(px).
   * @default 24
   */
  iconSize?: number;
};
