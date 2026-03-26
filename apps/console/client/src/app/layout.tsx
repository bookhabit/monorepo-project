import type { Metadata } from 'next';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { EmotionProvider } from '@/components/providers/EmotionProvider';

export const metadata: Metadata = {
  title: '고객 상담 콘솔',
  description: '고객 상담 통합 관리 시스템',
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
