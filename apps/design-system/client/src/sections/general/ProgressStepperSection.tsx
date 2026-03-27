/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { ProgressStepper, ProgressStep, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;
const colStyle = css`display: flex; flex-direction: column; gap: ${spacing[4]}; width: 100%;`;

export function ProgressStepperSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>ProgressStepper</h1>
      <p css={subheadingStyle}>
        프로그레스바와 스테퍼가 결합된 형태로 작업의 진행 상태를 단계별로 표시해요.
      </p>

      <PreviewBox title="Variants" description="compact, icon">
        <div css={colStyle}>
          <ProgressStepper variant="compact" activeStepIndex={1}>
            <ProgressStep title="유심 신청" />
            <ProgressStep title="배송 완료" />
            <ProgressStep title="개통 완료" />
          </ProgressStepper>
          <ProgressStepper variant="icon" activeStepIndex={1} paddingTop="wide">
            <ProgressStep title="유심 신청" />
            <ProgressStep title="배송 완료" />
            <ProgressStep title="개통 완료" />
          </ProgressStepper>
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<ProgressStepper variant="compact" activeStepIndex={1}>
  <ProgressStep title="유심 신청" />
  <ProgressStep title="배송 완료" />
  <ProgressStep title="개통 완료" />
</ProgressStepper>

<ProgressStepper variant="icon" activeStepIndex={1} paddingTop="wide">
  <ProgressStep title="유심 신청" />
  <ProgressStep title="배송 완료" />
  <ProgressStep title="개통 완료" />
</ProgressStepper>`}
      />

      <PreviewBox title="checkForFinish" description="완료된 단계 체크 표시 (icon variant)">
        <ProgressStepper variant="icon" activeStepIndex={2} checkForFinish>
          <ProgressStep title="첫 번째" />
          <ProgressStep title="두 번째" />
          <ProgressStep title="세 번째" />
          <ProgressStep title="네 번째" />
          <ProgressStep title="마지막" />
        </ProgressStepper>
      </PreviewBox>

      <CodeBlock
        code={`<ProgressStepper variant="icon" activeStepIndex={2} checkForFinish>
  <ProgressStep title="첫 번째" />
  <ProgressStep title="두 번째" />
  <ProgressStep title="세 번째" />
  <ProgressStep title="네 번째" />
  <ProgressStep title="마지막" />
</ProgressStepper>`}
      />

      <PreviewBox title="Title 없는 단순 스텝퍼">
        <div css={colStyle}>
          <ProgressStepper variant="compact" activeStepIndex={1}>
            <ProgressStep />
            <ProgressStep />
            <ProgressStep />
            <ProgressStep />
          </ProgressStepper>
          <ProgressStepper variant="icon" activeStepIndex={1} paddingTop="wide">
            <ProgressStep />
            <ProgressStep />
            <ProgressStep />
          </ProgressStepper>
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<ProgressStepper variant="compact" activeStepIndex={1}>
  <ProgressStep />
  <ProgressStep />
  <ProgressStep />
</ProgressStepper>`}
      />
    </div>
  );
}
