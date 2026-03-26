import type { Metadata } from 'next';
import { Providers } from '@/shared/components/providers/Providers';
import { AuthInitializer } from '@/shared/components/providers/AuthInitializer';

export const metadata: Metadata = {
  title: 'Guide App — 축구 팀 매니저',
  description: '@mono 공통 모듈 올바른 사용법을 시연하는 가이드 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'inherit', backgroundColor: '#f9fafb' }}>
        <Providers>
          <AuthInitializer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
