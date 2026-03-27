/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { SegmentedControl, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;
const colStyle = css`display: flex; flex-direction: column; gap: ${spacing[3]}; width: 100%;`;

export function SegmentedControlSection() {
  const [value, setValue] = useState('1');

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>SegmentedControl</h1>
      <p css={subheadingStyle}>
        여러 선택지 중 하나를 선택할 수 있는 UI 요소예요. Radio와 같은 역할을 해요.
      </p>

      <PreviewBox title="Controlled" description="value + onChange로 외부 상태 관리">
        <SegmentedControl value={value} onChange={setValue}>
          <SegmentedControl.Item value="1">아이템1</SegmentedControl.Item>
          <SegmentedControl.Item value="2">아이템2</SegmentedControl.Item>
          <SegmentedControl.Item value="3">아이템3</SegmentedControl.Item>
        </SegmentedControl>
      </PreviewBox>

      <CodeBlock
        code={`const [value, setValue] = useState('1');
<SegmentedControl value={value} onChange={setValue}>
  <SegmentedControl.Item value="1">아이템1</SegmentedControl.Item>
  <SegmentedControl.Item value="2">아이템2</SegmentedControl.Item>
  <SegmentedControl.Item value="3">아이템3</SegmentedControl.Item>
</SegmentedControl>`}
      />

      <PreviewBox title="Uncontrolled" description="defaultValue로 내부 상태 관리">
        <SegmentedControl defaultValue="1">
          <SegmentedControl.Item value="1">아이템1</SegmentedControl.Item>
          <SegmentedControl.Item value="2">아이템2</SegmentedControl.Item>
          <SegmentedControl.Item value="3">아이템3</SegmentedControl.Item>
        </SegmentedControl>
      </PreviewBox>

      <CodeBlock
        code={`<SegmentedControl defaultValue="1">
  <SegmentedControl.Item value="1">아이템1</SegmentedControl.Item>
  <SegmentedControl.Item value="2">아이템2</SegmentedControl.Item>
  <SegmentedControl.Item value="3">아이템3</SegmentedControl.Item>
</SegmentedControl>`}
      />

      <PreviewBox title="Sizes" description="small (default), large">
        <div css={colStyle}>
          <SegmentedControl size="small" defaultValue="1">
            <SegmentedControl.Item value="1">아이템1</SegmentedControl.Item>
            <SegmentedControl.Item value="2">아이템2</SegmentedControl.Item>
            <SegmentedControl.Item value="3">아이템3</SegmentedControl.Item>
          </SegmentedControl>
          <SegmentedControl size="large" defaultValue="1">
            <SegmentedControl.Item value="1">아이템1</SegmentedControl.Item>
            <SegmentedControl.Item value="2">아이템2</SegmentedControl.Item>
            <SegmentedControl.Item value="3">아이템3</SegmentedControl.Item>
          </SegmentedControl>
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<SegmentedControl size="small" defaultValue="1">...</SegmentedControl>
<SegmentedControl size="large" defaultValue="1">...</SegmentedControl>`}
      />

      <PreviewBox title="Fluid (스크롤)" description="alignment='fluid' — 아이템이 많을 때 가로 스크롤">
        <SegmentedControl defaultValue="1" alignment="fluid">
          {Array.from({ length: 10 }, (_, i) => (
            <SegmentedControl.Item key={i} value={String(i + 1)}>아이템{i + 1}</SegmentedControl.Item>
          ))}
        </SegmentedControl>
      </PreviewBox>

      <CodeBlock
        code={`<SegmentedControl defaultValue="1" alignment="fluid">
  {Array.from({ length: 10 }, (_, i) => (
    <SegmentedControl.Item key={i} value={String(i + 1)}>아이템{i + 1}</SegmentedControl.Item>
  ))}
</SegmentedControl>`}
      />
    </div>
  );
}
