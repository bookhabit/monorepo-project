/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Rating, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;
const rowStyle = css`display: flex; align-items: center; gap: ${spacing[4]}; flex-wrap: wrap;`;

export function RatingSection() {
  const [valueMd, setValueMd] = useState(3);
  const [valueLg, setValueLg] = useState(4);
  const [valueBig, setValueBig] = useState(5);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Rating</h1>
      <p css={subheadingStyle}>
        사용자가 평가를 제공할 수 있는 UI 요소예요. 읽기 전용 또는 상호작용 가능한 형태로 제공돼요.
      </p>

      <PreviewBox title="Interactive — Sizes" description="medium, large, big">
        <div css={rowStyle}>
          <Rating readOnly={false} value={valueMd} max={5} size="medium" aria-label="별점 평가" onValueChange={setValueMd} />
          <Rating readOnly={false} value={valueLg} max={5} size="large" aria-label="별점 평가" onValueChange={setValueLg} />
          <Rating readOnly={false} value={valueBig} max={5} size="big" aria-label="별점 평가" onValueChange={setValueBig} />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<Rating readOnly={false} value={value} max={5} size="medium" aria-label="별점 평가" onValueChange={setValue} />
<Rating readOnly={false} value={value} max={5} size="large" aria-label="별점 평가" onValueChange={setValue} />
<Rating readOnly={false} value={value} max={5} size="big"   aria-label="별점 평가" onValueChange={setValue} />`}
      />

      <PreviewBox title="ReadOnly — Variants" description="full, compact, iconOnly">
        <div css={rowStyle}>
          <Rating readOnly value={5} max={5} size="medium" variant="full" aria-label="별점 평가" />
          <Rating readOnly value={5} max={5} size="medium" variant="compact" aria-label="별점 평가" />
          <Rating readOnly value={5} max={5} size="medium" variant="iconOnly" aria-label="별점 평가" />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<Rating readOnly={true} value={5} max={5} size="medium" variant="full"     aria-label="별점 평가" />
<Rating readOnly={true} value={5} max={5} size="medium" variant="compact"  aria-label="별점 평가" />
<Rating readOnly={true} value={5} max={5} size="medium" variant="iconOnly" aria-label="별점 평가" />`}
      />

      <PreviewBox title="ReadOnly — Sizes" description="tiny, small, medium, large, big">
        <div css={rowStyle}>
          {(['tiny', 'small', 'medium', 'large', 'big'] as const).map((s) => (
            <Rating key={s} readOnly value={5} max={5} size={s} variant="full" aria-label="별점 평가" />
          ))}
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<Rating readOnly={true} value={5} max={5} size="tiny"   variant="full" aria-label="별점 평가" />
<Rating readOnly={true} value={5} max={5} size="small"  variant="full" aria-label="별점 평가" />
<Rating readOnly={true} value={5} max={5} size="medium" variant="full" aria-label="별점 평가" />
<Rating readOnly={true} value={5} max={5} size="large"  variant="full" aria-label="별점 평가" />
<Rating readOnly={true} value={5} max={5} size="big"    variant="full" aria-label="별점 평가" />`}
      />

      <PreviewBox title="Disabled">
        <div css={rowStyle}>
          <Rating readOnly={false} value={3} max={5} size="medium" disabled aria-label="별점 평가" onValueChange={() => {}} />
          <Rating readOnly={false} value={3} max={5} size="large" disabled aria-label="별점 평가" onValueChange={() => {}} />
        </div>
      </PreviewBox>

      <CodeBlock code={`<Rating readOnly={false} value={3} max={5} size="medium" disabled aria-label="별점 평가" onValueChange={() => {}} />`} />
    </div>
  );
}
