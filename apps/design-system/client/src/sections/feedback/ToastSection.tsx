/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { Button, useToast, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`
  padding: ${spacing[8]};
`;

const headingStyle = css`
  ${typography.heading1};
  color: ${colors.grey900};
  margin: 0 0 ${spacing[2]};
`;

const subheadingStyle = css`
  ${typography.body1};
  color: ${colors.grey500};
  margin: 0 0 ${spacing[8]};
`;

const rowStyle = css`
  display: flex;
  gap: ${spacing[3]};
  flex-wrap: wrap;
`;

export function ToastSection() {
  const { toast } = useToast();

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Toast</h1>
      <p css={subheadingStyle}>
        Non-blocking 알림 메시지. 3초 후 자동으로 사라집니다. <code>useToast()</code>로 어디서든 한 줄 호출.
      </p>

      <PreviewBox title="Toast 타입" description="클릭해서 각 타입을 확인해보세요">
        <div css={rowStyle}>
          <Button size="small" onClick={() => toast.success('저장되었습니다!')}>
            Success
          </Button>
          <Button variant="danger" size="small" onClick={() => toast.error('오류가 발생했습니다')}>
            Error
          </Button>
          <Button variant="secondary" size="small" onClick={() => toast.warning('주의가 필요합니다')}>
            Warning
          </Button>
          <Button variant="ghost" size="small" onClick={() => toast.info('새로운 업데이트가 있습니다')}>
            Info
          </Button>
        </div>
      </PreviewBox>

      <CodeBlock code={`// layout.tsx (또는 main.tsx) 에 한 번만 설정
import { ToastProvider } from '@mono/ui';

<ToastProvider>
  {children}
</ToastProvider>`} />

      <CodeBlock code={`// 어느 컴포넌트에서든
import { useToast } from '@mono/ui';

const { toast } = useToast();

toast.success('저장되었습니다!');
toast.error('오류가 발생했습니다');
toast.warning('주의가 필요합니다');
toast.info('새로운 업데이트가 있습니다');

// 지속 시간 커스텀 (ms)
toast.success('완료!', 5000);`} />
    </div>
  );
}
