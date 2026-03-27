'use client';

/**
 * Protected Layout — 이 layout 아래의 모든 페이지는 인증 필요.
 * 실제 인증 체크는 middleware.ts에서 처리.
 */
import { usePathname, useRouter } from 'next/navigation';
import { MobileLayout } from '@mono/ui';

const TABS = [
  { key: '/dashboard', label: '홈', icon: '🏠' },
  { key: '/team', label: '팀', icon: '👥' },
  { key: '/matches', label: '경기', icon: '⚽' },
  { key: '/profile', label: '프로필', icon: '👤' },
];

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const activeKey = TABS.find((t) => pathname.startsWith(t.key))?.key ?? '/dashboard';

  return (
    <MobileLayout
      tabs={{
        tabs: TABS,
        activeKey,
        onChange: (key) => router.push(key),
      }}
    >
      {children}
    </MobileLayout>
  );
}
