/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { Button, ToastContainer, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';
import { useState } from 'react';
import type { ToastItem, ToastType } from '@mono/ui';

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

export function ToastSection() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Toast</h1>
      <p css={subheadingStyle}>
        Non-blocking notification messages. Appears and disappears automatically after 3 seconds.
      </p>

      <PreviewBox title="Toast Types" description="Click to trigger each toast type">
        <Button variant="primary" size="small" onClick={() => addToast('success', '저장되었습니다!')}>
          Success
        </Button>
        <Button variant="danger" size="small" onClick={() => addToast('error', '오류가 발생했습니다')}>
          Error
        </Button>
        <Button variant="secondary" size="small" onClick={() => addToast('warning', '주의가 필요합니다')}>
          Warning
        </Button>
        <Button variant="ghost" size="small" onClick={() => addToast('info', '새로운 업데이트가 있습니다')}>
          Info
        </Button>
      </PreviewBox>

      <CodeBlock
        code={`import { ToastContainer } from '@mono/ui';\nimport type { ToastItem } from '@mono/ui';\n\nconst [toasts, setToasts] = useState<ToastItem[]>([]);\n\nconst addToast = (type: ToastType, message: string) => {\n  const id = Date.now().toString();\n  setToasts(prev => [...prev, { id, type, message }]);\n  setTimeout(() => {\n    setToasts(prev => prev.filter(t => t.id !== id));\n  }, 3000);\n};\n\n// In JSX\n<ToastContainer toasts={toasts} />`}
      />

      <ToastContainer toasts={toasts} />
    </div>
  );
}
