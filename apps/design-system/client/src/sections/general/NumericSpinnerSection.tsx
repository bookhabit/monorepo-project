/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { NumericSpinner, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;
const rowStyle = css`display: flex; align-items: center; gap: ${spacing[4]}; flex-wrap: wrap;`;

export function NumericSpinnerSection() {
  const [value, setValue] = useState(0);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>NumericSpinner</h1>
      <p css={subheadingStyle}>
        정수 입력을 쉽게 처리할 수 있도록 숫자를 증감시키는 버튼을 제공해요.
      </p>

      <PreviewBox title="Controlled" description="외부 상태 관리">
        <NumericSpinner size="large" number={value} onNumberChange={setValue} />
      </PreviewBox>

      <CodeBlock
        code={`const [value, setValue] = useState(0);
<NumericSpinner size="large" number={value} onNumberChange={setValue} />`}
      />

      <PreviewBox title="Sizes" description="tiny, small, medium, large">
        <div css={rowStyle}>
          <NumericSpinner size="tiny" defaultNumber={0} />
          <NumericSpinner size="small" defaultNumber={0} />
          <NumericSpinner size="medium" defaultNumber={0} />
          <NumericSpinner size="large" defaultNumber={0} />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<NumericSpinner size="tiny" defaultNumber={0} />
<NumericSpinner size="small" defaultNumber={0} />
<NumericSpinner size="medium" defaultNumber={0} />
<NumericSpinner size="large" defaultNumber={0} />`}
      />

      <PreviewBox title="Min / Max" description="minNumber=0, maxNumber=5">
        <NumericSpinner size="large" defaultNumber={0} minNumber={0} maxNumber={5} />
      </PreviewBox>

      <CodeBlock code={`<NumericSpinner size="large" defaultNumber={0} minNumber={0} maxNumber={5} />`} />

      <PreviewBox title="Disabled">
        <NumericSpinner size="large" defaultNumber={3} disable />
      </PreviewBox>

      <CodeBlock code={`<NumericSpinner size="large" defaultNumber={3} disable />`} />

      <PreviewBox title="Custom aria-label" description="접근성 레이블 커스텀">
        <NumericSpinner
          size="large"
          defaultNumber={1}
          decreaseAriaLabel="상품 수량 줄이기"
          increaseAriaLabel="상품 수량 늘리기"
        />
      </PreviewBox>

      <CodeBlock
        code={`<NumericSpinner
  size="large"
  defaultNumber={1}
  decreaseAriaLabel="상품 수량 줄이기"
  increaseAriaLabel="상품 수량 늘리기"
/>`}
      />
    </div>
  );
}
