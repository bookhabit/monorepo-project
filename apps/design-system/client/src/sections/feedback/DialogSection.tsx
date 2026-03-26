/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { AlertDialog, ConfirmDialog, Button, colors, typography, spacing } from '@mono/ui';
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

const sectionTitleStyle = css`
  ${typography.heading3};
  color: ${colors.grey800};
  margin: 0 0 ${spacing[4]};
`;

const resultTextStyle = css`
  ${typography.body2};
  color: ${colors.grey600};
  margin-top: ${spacing[3]};
`;

export function DialogSection() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Dialog</h1>
      <p css={subheadingStyle}>
        AlertDialog and ConfirmDialog built on top of Modal. Use for user decisions and alerts.
      </p>

      <h2 css={sectionTitleStyle}>AlertDialog</h2>

      <PreviewBox title="Alert Dialog" description="Single confirm button for informational alerts">
        <Button onClick={() => setAlertOpen(true)}>Show Alert</Button>
      </PreviewBox>

      <CodeBlock
        code={`<AlertDialog\n  isOpen={open}\n  onClose={() => setOpen(false)}\n  title="안내"\n  description="작업이 완료되었습니다."\n  confirmLabel="확인"\n/>`}
      />

      <h2 css={[sectionTitleStyle, css`margin-top: ${spacing[8]};`]}>ConfirmDialog</h2>

      <PreviewBox title="Confirm Dialog" description="Two buttons for user confirmation">
        <Button onClick={() => setConfirmOpen(true)}>Show Confirm</Button>
        {result !== null && <p css={resultTextStyle}>결과: {result}</p>}
      </PreviewBox>

      <CodeBlock
        code={`<ConfirmDialog\n  isOpen={open}\n  onConfirm={handleConfirm}\n  onCancel={handleCancel}\n  title="변경사항 저장"\n  description="저장하지 않으면 변경사항이 사라집니다."\n  confirmLabel="저장"\n  cancelLabel="취소"\n/>`}
      />

      <PreviewBox title="Destructive Confirm Dialog" description="For dangerous/irreversible actions">
        <Button variant="danger" onClick={() => setDestructiveOpen(true)}>
          Delete Account
        </Button>
      </PreviewBox>

      <CodeBlock
        code={`<ConfirmDialog\n  isOpen={open}\n  onConfirm={handleDelete}\n  onCancel={handleCancel}\n  title="계정 삭제"\n  description="계정을 삭제하면 되돌릴 수 없습니다."\n  confirmLabel="삭제"\n  destructive\n/>`}
      />

      {/* Dialogs */}
      <AlertDialog
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="저장 완료"
        description="변경사항이 성공적으로 저장되었습니다."
        confirmLabel="확인"
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        onConfirm={() => {
          setResult('확인을 선택했습니다');
          setConfirmOpen(false);
        }}
        onCancel={() => {
          setResult('취소를 선택했습니다');
          setConfirmOpen(false);
        }}
        title="변경사항 저장"
        description="현재 변경사항을 저장하시겠습니까? 저장하지 않으면 변경사항이 사라집니다."
        confirmLabel="저장"
        cancelLabel="취소"
      />

      <ConfirmDialog
        isOpen={destructiveOpen}
        onConfirm={() => {
          setResult('계정 삭제를 선택했습니다');
          setDestructiveOpen(false);
        }}
        onCancel={() => setDestructiveOpen(false)}
        title="계정을 삭제하시겠습니까?"
        description="계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        destructive
      />
    </div>
  );
}
