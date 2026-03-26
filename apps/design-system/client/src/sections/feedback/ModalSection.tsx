/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Modal, Button, colors, typography, spacing } from '@mono/ui';
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

const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const modalTextStyle = css`
  ${typography.body2};
  color: ${colors.grey600};
  line-height: 1.7;
`;

export function ModalSection() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [titleOpen, setTitleOpen] = useState(false);
  const [wideOpen, setWideOpen] = useState(false);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Modal</h1>
      <p css={subheadingStyle}>
        Portal-based modal with backdrop overlay. Click backdrop or press Escape to close.
      </p>

      <PreviewBox title="Basic Modal" description="Without title">
        <Button onClick={() => setBasicOpen(true)}>Open Modal</Button>
      </PreviewBox>

      <CodeBlock
        code={`const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open</Button>\n\n<Modal isOpen={open} onClose={() => setOpen(false)}>\n  Modal content here\n</Modal>`}
      />

      <PreviewBox title="Modal with Title" description="Header with title and close button">
        <Button onClick={() => setTitleOpen(true)}>Open with Title</Button>
      </PreviewBox>

      <CodeBlock
        code={`<Modal\n  isOpen={open}\n  onClose={() => setOpen(false)}\n  title="모달 제목"\n>\n  <p>모달 내용</p>\n</Modal>`}
      />

      <PreviewBox title="Wide Modal" description="Custom width">
        <Button onClick={() => setWideOpen(true)}>Open Wide Modal</Button>
      </PreviewBox>

      <CodeBlock code={`<Modal isOpen={open} onClose={close} title="넓은 모달" width="720px">\n  ...\n</Modal>`} />

      {/* Modals */}
      <Modal isOpen={basicOpen} onClose={() => setBasicOpen(false)}>
        <div css={modalContentStyle}>
          <p css={modalTextStyle}>
            이것은 기본 모달입니다. 백드롭을 클릭하거나 Escape 키를 눌러 닫을 수 있습니다.
          </p>
          <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setBasicOpen(false)}>닫기</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={titleOpen} onClose={() => setTitleOpen(false)} title="계정 설정">
        <div css={modalContentStyle}>
          <p css={modalTextStyle}>
            모달에 타이틀이 있으면 헤더 영역에 제목과 닫기 버튼이 표시됩니다.
          </p>
          <div css={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setTitleOpen(false)}>취소</Button>
            <Button onClick={() => setTitleOpen(false)}>저장</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={wideOpen} onClose={() => setWideOpen(false)} title="넓은 모달" width="640px">
        <div css={modalContentStyle}>
          <p css={modalTextStyle}>
            width prop으로 모달의 너비를 조절할 수 있습니다. 기본값은 480px입니다.
            이 모달은 640px 너비로 설정되어 있습니다.
          </p>
          <Button onClick={() => setWideOpen(false)}>확인</Button>
        </div>
      </Modal>
    </div>
  );
}
