/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { ProgressBar, Button, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;
const colStyle = css`display: flex; flex-direction: column; gap: ${spacing[3]}; width: 100%;`;

export function ProgressBarSection() {
  const [progress, setProgress] = useState(0);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>ProgressBar</h1>
      <p css={subheadingStyle}>작업의 진행 상태를 시각적으로 표시해요.</p>

      <PreviewBox title="Basic" description="progress 0.0 ~ 1.0">
        <div css={css`width: 100%;`}>
          <ProgressBar progress={0.5} size="normal" />
        </div>
      </PreviewBox>
      <CodeBlock code={`<ProgressBar progress={0.5} size="normal" />`} />

      <PreviewBox title="Sizes" description="light (2px), normal (4px), bold (8px)">
        <div css={colStyle}>
          <ProgressBar progress={0.7} size="light" />
          <ProgressBar progress={0.7} size="normal" />
          <ProgressBar progress={0.7} size="bold" />
        </div>
      </PreviewBox>
      <CodeBlock
        code={`<ProgressBar progress={0.7} size="light" />
<ProgressBar progress={0.7} size="normal" />
<ProgressBar progress={0.7} size="bold" />`}
      />

      <PreviewBox title="Colors" description="color prop으로 색상 변경">
        <div css={colStyle}>
          <ProgressBar size="normal" progress={0.7} color={colors.blue400} />
          <ProgressBar size="normal" progress={0.7} color={colors.green400} />
          <ProgressBar size="normal" progress={0.7} color={colors.red400} />
        </div>
      </PreviewBox>
      <CodeBlock
        code={`<ProgressBar size="normal" progress={0.7} color={colors.blue400} />
<ProgressBar size="normal" progress={0.7} color={colors.green400} />
<ProgressBar size="normal" progress={0.7} color={colors.red400} />`}
      />

      <PreviewBox title="Animated" description="animate prop — 값 변경 시 트랜지션">
        <div css={colStyle}>
          <ProgressBar size="bold" progress={progress} animate />
          <Button size="small" variant="secondary" onClick={() => setProgress(p => p === 0 ? 1 : 0)}>
            {progress === 0 ? '애니메이션 시작' : '애니메이션 리셋'}
          </Button>
        </div>
      </PreviewBox>
      <CodeBlock
        code={`<ProgressBar size="bold" progress={progress} animate />
// progress 값을 0 ↔ 1로 토글하면 부드럽게 전환돼요`}
      />
    </div>
  );
}
