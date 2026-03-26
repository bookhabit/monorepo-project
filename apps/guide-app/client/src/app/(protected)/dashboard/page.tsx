/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useRouter } from 'next/navigation';
import { colors, typography, spacing } from '@mono/ui';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { useLogoutMutation } from '@/features/auth/hooks/queries/useAuthMutation';

const pageStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing[6]};
  padding: ${spacing[8]};
`;

const cardStyle = css`
  width: 100%;
  max-width: 480px;
  background: ${colors.background};
  border: 1px solid ${colors.grey100};
  border-radius: 16px;
  padding: ${spacing[8]};
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
`;

const titleStyle = css`
  ${typography.heading2};
  color: ${colors.grey900};
  margin: 0 0 ${spacing[2]};
`;

const descStyle = css`
  ${typography.body2};
  color: ${colors.grey500};
  margin: 0 0 ${spacing[6]};
`;

const logoutButtonStyle = css`
  height: 44px;
  padding: 0 ${spacing[5]};
  background: ${colors.grey100};
  color: ${colors.grey700};
  border: none;
  border-radius: 10px;
  ${typography.body2};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${colors.grey200};
  }
`;

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
    <main css={pageStyle}>
      <div css={cardStyle}>
        <h1 css={titleStyle}>대시보드</h1>
        <p css={descStyle}>
          로그인에 성공했습니다.<br />
          인증/인가, 프로텍트 라우트가 정상 동작하고 있습니다.
        </p>
        <button css={logoutButtonStyle} onClick={handleLogout} disabled={isPending}>
          {isPending ? '로그아웃 중...' : '로그아웃'}
        </button>
      </div>
    </main>
  );
}
