import type { Metadata } from 'next';
import { EmotionProvider } from '@/components/providers/EmotionProvider';
import { GlobalStylesProvider } from '@/components/providers/GlobalStylesProvider';
import { Sidebar } from '@/components/Sidebar';
import { AppProviders } from '@/components/providers/AppProviders';

export const metadata: Metadata = {
  title: 'Design System | @mono/ui',
  description: 'Component design system documentation and showcase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, display: 'flex', minHeight: '100vh' }}>
        <EmotionProvider>
          <AppProviders>
            <GlobalStylesProvider />
            <Sidebar />
            <main style={{ flex: 1, minWidth: 0, backgroundColor: '#ffffff' }}>
              {children}
            </main>
          </AppProviders>
        </EmotionProvider>
      </body>
    </html>
  );
}
