'use client';

import { useRouter } from 'next/navigation';
import { MobileLayout, Button, Flex, Spacing, colors } from '@mono/ui';
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
    <MobileLayout header={{ title: '대시보드' }}>
      <Flex direction="column" style={{ padding: '24px 20px' }}>
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
            대시보드
          </h1>
          <Spacing size={2} />
          <p style={{ fontSize: 14, color: colors.grey500, margin: 0, lineHeight: '21px' }}>
            로그인에 성공했습니다.
            <br />
            인증/인가, 프로텍트 라우트가 정상 동작하고 있습니다.
          </p>
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
      </Flex>
    </MobileLayout>
  );
}
