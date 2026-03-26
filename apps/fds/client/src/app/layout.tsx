import type { Metadata } from 'next';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { EmotionProvider } from '@/components/providers/EmotionProvider';

export const metadata: Metadata = {
  title: 'FDS 리포트',
  description: '실시간 이상 거래 탐지 시스템',
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
