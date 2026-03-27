/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Tab, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;
const colStyle = css`display: flex; flex-direction: column; gap: ${spacing[3]}; width: 100%;`;

export function TabSection() {
  const [selSm, setSelSm] = useState(0);
  const [selLg, setSelLg] = useState(0);
  const [selGap, setSelGap] = useState(0);
  const [selFluid, setSelFluid] = useState(0);
  const [selRedBean, setSelRedBean] = useState(0);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Tab</h1>
      <p css={subheadingStyle}>
        여러 콘텐츠를 한 화면에서 효율적으로 전환할 수 있도록 도와줘요.
      </p>

      <PreviewBox title="Sizes" description="small, large">
        <div css={colStyle}>
          <Tab size="small" onChange={setSelSm}>
            <Tab.Item selected={selSm === 0}>small</Tab.Item>
            <Tab.Item selected={selSm === 1}>small</Tab.Item>
          </Tab>
          <Tab size="large" onChange={setSelLg}>
            <Tab.Item selected={selLg === 0}>large</Tab.Item>
            <Tab.Item selected={selLg === 1}>large</Tab.Item>
          </Tab>
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<Tab size="small" onChange={(index) => setSelected(index)}>
  <Tab.Item selected={selected === 0}>small</Tab.Item>
  <Tab.Item selected={selected === 1}>small</Tab.Item>
</Tab>
<Tab size="large" onChange={(index) => setSelected(index)}>
  <Tab.Item selected={selected === 0}>large</Tab.Item>
  <Tab.Item selected={selected === 1}>large</Tab.Item>
</Tab>`}
      />

      <PreviewBox title="itemGap" description="탭 간격 조정">
        <Tab itemGap={36} onChange={setSelGap}>
          <Tab.Item selected={selGap === 0}>탭1</Tab.Item>
          <Tab.Item selected={selGap === 1}>탭2</Tab.Item>
          <Tab.Item selected={selGap === 2}>탭3</Tab.Item>
          <Tab.Item selected={selGap === 3}>탭4</Tab.Item>
          <Tab.Item selected={selGap === 4}>탭5</Tab.Item>
        </Tab>
      </PreviewBox>

      <CodeBlock
        code={`<Tab itemGap={36} onChange={(index) => setSelected(index)}>
  <Tab.Item selected={selected === 0}>탭1</Tab.Item>
  <Tab.Item selected={selected === 1}>탭2</Tab.Item>
  ...
</Tab>`}
      />

      <PreviewBox title="fluid" description="아이템이 많을 때 가로 스크롤">
        <Tab fluid onChange={setSelFluid}>
          {Array.from({ length: 12 }, (_, i) => (
            <Tab.Item key={i} selected={selFluid === i}>
              {i === 0 ? '탭1' : `긴텍스트${i}`}
            </Tab.Item>
          ))}
        </Tab>
      </PreviewBox>

      <CodeBlock
        code={`<Tab fluid onChange={(index) => setSelected(index)}>
  {Array.from({ length: 20 }, (_, i) => (
    <Tab.Item key={i} selected={selected === i}>
      {i === 0 ? '탭1' : '긴텍스트'}
    </Tab.Item>
  ))}
</Tab>`}
      />

      <PreviewBox title="redBean" description="업데이트 알림 도트 표시">
        <Tab onChange={setSelRedBean}>
          <Tab.Item selected={selRedBean === 0} redBean>홈</Tab.Item>
          <Tab.Item selected={selRedBean === 1}>팀</Tab.Item>
          <Tab.Item selected={selRedBean === 2} redBean>알림</Tab.Item>
          <Tab.Item selected={selRedBean === 3}>프로필</Tab.Item>
        </Tab>
      </PreviewBox>

      <CodeBlock
        code={`<Tab onChange={(index) => setSelected(index)}>
  <Tab.Item selected={selected === 0} redBean>홈</Tab.Item>
  <Tab.Item selected={selected === 1}>팀</Tab.Item>
  <Tab.Item selected={selected === 2} redBean>알림</Tab.Item>
  <Tab.Item selected={selected === 3}>프로필</Tab.Item>
</Tab>`}
      />
    </div>
  );
}
