'use client';

import { useRouter } from 'next/navigation';
import { Button, colors, Flex, Spacing } from '@mono/ui';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { useLogoutMutation } from '@/features/auth/hooks/queries/useAuthMutation';

export default function DashboardPage() {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const { mutate: logout, isPending } = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => {
        clearAuth();
        router.replace('/login');
      },
    });
  };

  return (
    <div style={{ padding: '24px 20px' }}>
      <div
        style={{
          background: colors.background,
          border: `1px solid ${colors.grey100}`,
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 700, color: colors.grey900, margin: 0 }}>
          풋살 가이드앱
        </h1>
        <Spacing size={2} />
        <p style={{ fontSize: 14, color: colors.grey500, margin: 0, lineHeight: '21px' }}>
          팀을 만들거나 팀에 가입하고, 경기를 찾아보세요.
        </p>
        <Spacing size={6} />
        <Flex gap={8}>
          <Button variant="primary" size="medium" onClick={() => router.push('/team')}>
            팀 관리
          </Button>
          <Button variant="secondary" size="medium" onClick={() => router.push('/matches')}>
            경기 찾기
          </Button>
        </Flex>
        <Spacing size={6} />
        <Button
          variant="secondary"
          size="medium"
          onClick={handleLogout}
          disabled={isPending}
          loading={isPending}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}
