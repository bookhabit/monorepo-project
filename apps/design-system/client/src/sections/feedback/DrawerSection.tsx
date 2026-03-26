/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Drawer, Button, colors, typography, spacing } from '@mono/ui';
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

const drawerContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

const optionItemStyle = css`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[4]};
  border-radius: 12px;
  background-color: ${colors.grey50};
  cursor: pointer;
  ${typography.body2};
  color: ${colors.grey800};
  border: none;
  width: 100%;
  text-align: left;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${colors.grey100};
  }
`;

function BasicDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Drawer 열기</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="옵션 선택">
        <div css={drawerContentStyle}>
          {['계좌 이체', '환전', '투자 내역 조회', '고객센터'].map((label) => (
            <button key={label} css={optionItemStyle} type="button" onClick={() => setOpen(false)}>
              {label}
            </button>
          ))}
        </div>
      </Drawer>
    </>
  );
}

function NoTitleDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>타이틀 없이</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <div css={css`${typography.body2}; color: ${colors.grey700}; line-height: 1.7;`}>
          타이틀 없이 내용만 표시하는 드로어입니다. 핸들 바를 드래그하거나 배경을 클릭하면 닫힙니다.
        </div>
      </Drawer>
    </>
  );
}

function TallDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>높이 60vh</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="송금 상세" maxHeight="60vh">
        <div css={drawerContentStyle}>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              css={css`
                padding: ${spacing[3]} ${spacing[4]};
                border-radius: 8px;
                background-color: ${colors.grey50};
                ${typography.body2};
                color: ${colors.grey700};
              `}
            >
              항목 {i + 1}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
}

export function DrawerSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Drawer</h1>
      <p css={subheadingStyle}>
        모바일 웹뷰에서 하단에서 올라오는 Bottom Sheet. 배경 클릭 또는 Escape로 닫힙니다.
      </p>

      <PreviewBox title="기본 사용" description="타이틀과 옵션 목록">
        <div css={rowStyle}>
          <BasicDrawerDemo />
          <NoTitleDrawerDemo />
          <TallDrawerDemo />
        </div>
      </PreviewBox>

      <CodeBlock code={`const { isOpen, open, close } = useModal();

<Button onClick={open}>Drawer 열기</Button>

<Drawer isOpen={isOpen} onClose={close} title="옵션 선택">
  <div>내용</div>
</Drawer>`} />

      <CodeBlock code={`// 높이 조절
<Drawer maxHeight="60vh" ...>

// 타이틀 없이
<Drawer isOpen={isOpen} onClose={close}>
  <p>내용만 표시</p>
</Drawer>`} />
    </div>
  );
}
