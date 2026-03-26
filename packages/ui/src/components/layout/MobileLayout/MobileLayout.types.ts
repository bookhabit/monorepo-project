import type { ReactNode } from 'react';

// ─── AppHeader ──────────────────────────────────────────────────────────────
export type AppHeaderProps = {
  title?: string;
  /** 뒤로가기 버튼 클릭 핸들러. 제공하면 버튼 표시 */
  onBack?: () => void;
  /** 우측 액션 슬롯 (아이콘 버튼 등) */
  rightSlot?: ReactNode;
};

// ─── BottomTabBar ────────────────────────────────────────────────────────────
export type TabItem = {
  key: string;
  label: string;
  /** SVG 문자열 or 이모지 등 아이콘 노드 */
  icon: ReactNode;
  /** 활성 상태 아이콘 (미제공 시 icon 그대로) */
  activeIcon?: ReactNode;
};

export type BottomTabBarProps = {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
};

// ─── SafeAreaWrapper ─────────────────────────────────────────────────────────
export type SafeAreaWrapperProps = {
  children: ReactNode;
  /** 적용할 safe-area 방향 (기본: top + bottom) */
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
};

// ─── MobileLayout ────────────────────────────────────────────────────────────
export type MobileLayoutProps = {
  children: ReactNode;
  header?: AppHeaderProps;
  tabs?: BottomTabBarProps;
  /** false 면 safe-area 패딩 비활성 */
  safeArea?: boolean;
};
