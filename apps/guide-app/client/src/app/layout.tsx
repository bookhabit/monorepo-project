import type { Metadata, Viewport } from 'next';
import { Providers } from '@/shared/components/providers/Providers';
import { AuthInitializer } from '@/shared/components/providers/AuthInitializer';
import { GlobalStyle } from '@/shared/components/GlobalStyle';

export const viewport: Viewport = {
  viewportFit: 'cover', // CSS env(safe-area-inset-*) 활성화
};

export const metadata: Metadata = {
  title: {
    template: '%s | 풋살 가이드앱',
    default: '풋살 가이드앱',
  },
  description: '팀을 만들고 경기를 찾아보세요. @mono 공통 모듈 활용 가이드 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'inherit', backgroundColor: '#f9fafb' }}>
        <Providers>
          <GlobalStyle />
          <AuthInitializer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
