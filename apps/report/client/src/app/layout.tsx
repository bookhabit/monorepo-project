import type { Metadata } from 'next';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { EmotionProvider } from '@/components/providers/EmotionProvider';

export const metadata: Metadata = {
  title: '운영 리포트',
  description: '은행 상품 운영 통합 리포트 및 성능 관제 대시보드',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <EmotionProvider>
          <QueryProvider>{children}</QueryProvider>
        </EmotionProvider>
      </body>
    </html>
  );
}
