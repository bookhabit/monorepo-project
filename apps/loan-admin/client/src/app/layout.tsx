import type { Metadata } from 'next';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { EmotionProvider } from '@/components/providers/EmotionProvider';

export const metadata: Metadata = {
  title: '대출 심사 대시보드',
  description: '대출 신청 심사 및 승인 관리',
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
