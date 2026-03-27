/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Slider, SliderTooltip, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;
const colStyle = css`display: flex; flex-direction: column; gap: ${spacing[3]}; width: 100%;`;

export function SliderSection() {
  const [v1, setV1] = useState(50);
  const [v2, setV2] = useState(50);
  const [v3, setV3] = useState(50);
  const [vTooltip, setVTooltip] = useState(50);
  const MIN = 100;
  const MID = 150;
  const MAX = 200;
  const [vLabel, setVLabel] = useState(MID);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Slider</h1>
      <p css={subheadingStyle}>
        막대를 좌우로 움직여서 원하는 숫자를 선택할 수 있는 컨트롤이에요.
      </p>

      <PreviewBox title="Basic" description="기본 슬라이더">
        <div css={css`width: 100%;`}>
          <Slider value={v1} onValueChange={setV1} />
        </div>
      </PreviewBox>
      <CodeBlock code={`<Slider value={value} onValueChange={setValue} />`} />

      <PreviewBox title="Colors" description="color prop으로 트랙 색상 변경">
        <div css={colStyle}>
          <Slider color={colors.blue500} value={v1} onValueChange={setV1} />
          <Slider color={colors.green500} value={v2} onValueChange={setV2} />
          <Slider color={colors.red500} value={v3} onValueChange={setV3} />
        </div>
      </PreviewBox>
      <CodeBlock
        code={`<Slider color={colors.blue500} value={value} onValueChange={setValue} />
<Slider color={colors.green500} value={value} onValueChange={setValue} />
<Slider color={colors.red500} value={value} onValueChange={setValue} />`}
      />

      <PreviewBox title="Label" description="min, mid, max 레이블">
        <div css={css`width: 100%;`}>
          <Slider
            value={vLabel}
            minValue={MIN}
            maxValue={MAX}
            label={{ min: `${MIN} 만원`, mid: `${MID} 만원`, max: `${MAX} 만원` }}
            onValueChange={setVLabel}
          />
        </div>
      </PreviewBox>
      <CodeBlock
        code={`<Slider
  value={value}
  minValue={100}
  maxValue={200}
  label={{ min: '100 만원', mid: '150 만원', max: '200 만원' }}
  onValueChange={setValue}
/>`}
      />

      <PreviewBox title="Tooltip" description="현재 값을 툴팁으로 표시">
        <div css={css`width: 100%; padding-top: 48px;`}>
          <Slider
            value={vTooltip}
            tooltip={<SliderTooltip message={vTooltip} />}
            onValueChange={setVTooltip}
          />
        </div>
      </PreviewBox>
      <CodeBlock
        code={`<Slider
  value={value}
  tooltip={<SliderTooltip message={value} />}
  onValueChange={setValue}
/>`}
      />
    </div>
  );
}
