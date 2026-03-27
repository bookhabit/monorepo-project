/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { Stepper, StepperRow, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;

export function StepperSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Stepper</h1>
      <p css={subheadingStyle}>
        여러 단계를 시각적으로 보여줄 때 사용하는 컴포넌트예요. 각 단계는 제목, 설명, 아이콘, 버튼을 가질 수 있어요.
      </p>

      <PreviewBox title="Basic — NumberIcon + Texts" description="기본 스테퍼">
        <>
          <StepperRow
            left={<StepperRow.NumberIcon number={1} />}
            center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={2} />}
            center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={3} />}
            center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
            hideLine
          />
        </>
      </PreviewBox>

      <CodeBlock
        code={`<StepperRow
  left={<StepperRow.NumberIcon number={1} />}
  center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
/>
<StepperRow
  left={<StepperRow.NumberIcon number={2} />}
  center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
  hideLine
/>`}
      />

      <PreviewBox title="Text types" description="A: t5+t6, B: t4+t6, C: t5+t7">
        <>
          <StepperRow
            left={<StepperRow.NumberIcon number={1} />}
            center={<StepperRow.Texts type="A" title="일반 크기의 제목" description="일반 크기의 설명" />}
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={2} />}
            center={<StepperRow.Texts type="B" title="큰 크기의 제목" description="일반 크기의 설명" />}
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={3} />}
            center={<StepperRow.Texts type="C" title="일반 크기의 제목" description="작은 크기의 설명" />}
            hideLine
          />
        </>
      </PreviewBox>

      <CodeBlock
        code={`<StepperRow.Texts type="A" title="..." description="..." />  {/* t5 + t6 */}
<StepperRow.Texts type="B" title="..." description="..." />  {/* t4 + t6 */}
<StepperRow.Texts type="C" title="..." description="..." />  {/* t5 + t7 */}`}
      />

      <PreviewBox title="RightArrow + RightButton" description="오른쪽 요소">
        <>
          <StepperRow
            left={<StepperRow.NumberIcon number={1} />}
            center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
            right={<StepperRow.RightArrow />}
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={2} />}
            center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
            right={<StepperRow.RightButton>버튼</StepperRow.RightButton>}
            hideLine
          />
        </>
      </PreviewBox>

      <CodeBlock
        code={`<StepperRow right={<StepperRow.RightArrow />} ... />
<StepperRow right={<StepperRow.RightButton>버튼</StepperRow.RightButton>} ... />`}
      />

      <PreviewBox title="Stepper — 등장 모션" description="순차 애니메이션">
        <Stepper>
          <StepperRow
            left={<StepperRow.NumberIcon number={1} />}
            center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
            right={<StepperRow.RightArrow />}
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={2} />}
            center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
            right={<StepperRow.RightArrow />}
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={3} />}
            center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
            right={<StepperRow.RightArrow />}
            hideLine
          />
        </Stepper>
      </PreviewBox>

      <CodeBlock
        code={`<Stepper staggerDelay={0.1}>
  <StepperRow left={<StepperRow.NumberIcon number={1} />} center={<StepperRow.Texts type="A" title="..." description="..." />} right={<StepperRow.RightArrow />} />
  <StepperRow left={<StepperRow.NumberIcon number={2} />} center={<StepperRow.Texts type="A" title="..." description="..." />} right={<StepperRow.RightArrow />} />
  <StepperRow left={<StepperRow.NumberIcon number={3} />} center={<StepperRow.Texts type="A" title="..." description="..." />} right={<StepperRow.RightArrow />} hideLine />
</Stepper>`}
      />

      <PreviewBox title="play=false — 모션 비활성화">
        <Stepper play={false}>
          <StepperRow
            left={<StepperRow.NumberIcon number={1} />}
            center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={2} />}
            center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
            hideLine
          />
        </Stepper>
      </PreviewBox>

      <CodeBlock code={`<Stepper play={false}>...</Stepper>`} />
    </div>
  );
}
