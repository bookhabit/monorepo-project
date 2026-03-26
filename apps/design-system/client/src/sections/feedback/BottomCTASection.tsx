/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { BottomCTASingle, BottomCTADouble, FixedBottomCTA, Button, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';
import { useState } from 'react';

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

const demoContainerStyle = css`
  width: 375px;
  border: 1px solid ${colors.grey200};
  border-radius: 12px;
  overflow: hidden;
  background-color: ${colors.grey50};
`;

const demoContentStyle = css`
  padding: ${spacing[5]};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography.body2};
  color: ${colors.grey500};
`;

export function BottomCTASection() {
  const [fixedVisible, setFixedVisible] = useState(false);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>BottomCTA</h1>
      <p css={subheadingStyle}>
        Bottom call-to-action components: single button, double button, and fixed viewport variant.
      </p>

      <h2 css={sectionTitleStyle}>BottomCTASingle</h2>

      <PreviewBox title="Single CTA" description="Full-width primary action button">
        <div css={demoContainerStyle}>
          <div css={demoContentStyle}>Page Content</div>
          <BottomCTASingle
            label="다음 단계로"
            onClick={() => alert('클릭!')}
          />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<BottomCTASingle\n  label="다음 단계로"\n  onClick={handleNext}\n/>`}
      />

      <PreviewBox title="Disabled / Loading States">
        <div css={{ display: 'flex', gap: '16px' }}>
          <div css={demoContainerStyle}>
            <div css={demoContentStyle}>Disabled</div>
            <BottomCTASingle label="비활성화" onClick={() => {}} disabled />
          </div>
          <div css={demoContainerStyle}>
            <div css={demoContentStyle}>Loading</div>
            <BottomCTASingle label="제출" onClick={() => {}} loading />
          </div>
        </div>
      </PreviewBox>

      <h2 css={[sectionTitleStyle, css`margin-top: ${spacing[8]};`]}>BottomCTADouble</h2>

      <PreviewBox title="Double CTA" description="Secondary + Primary buttons side by side">
        <div css={demoContainerStyle}>
          <div css={demoContentStyle}>Page Content</div>
          <BottomCTADouble
            primaryLabel="확인"
            secondaryLabel="취소"
            onPrimary={() => alert('확인')}
            onSecondary={() => alert('취소')}
          />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<BottomCTADouble\n  primaryLabel="확인"\n  secondaryLabel="취소"\n  onPrimary={handleConfirm}\n  onSecondary={handleCancel}\n/>`}
      />

      <h2 css={[sectionTitleStyle, css`margin-top: ${spacing[8]};`]}>FixedBottomCTA</h2>

      <PreviewBox title="Fixed Bottom CTA" description="Sticks to bottom of viewport with blur">
        <Button onClick={() => setFixedVisible((v) => !v)}>
          {fixedVisible ? 'Hide Fixed CTA' : 'Show Fixed CTA'}
        </Button>
      </PreviewBox>

      <CodeBlock
        code={`<FixedBottomCTA>\n  <Button fullWidth>구매하기</Button>\n</FixedBottomCTA>`}
      />

      {fixedVisible && (
        <FixedBottomCTA>
          <Button fullWidth onClick={() => setFixedVisible(false)}>
            Fixed CTA — 닫으려면 클릭
          </Button>
        </FixedBottomCTA>
      )}
    </div>
  );
}
