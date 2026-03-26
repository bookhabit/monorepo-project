/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { Spacing, colors, typography, spacing } from '@mono/ui';
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

const demoBlockStyle = css`
  background-color: ${colors.blue200};
  border-radius: 6px;
  padding: 12px 20px;
  ${typography.body2Bold};
  color: ${colors.blue700};
`;

const spacerIndicatorStyle = css`
  background-color: rgba(49, 130, 246, 0.2);
  border: 1px dashed ${colors.blue400};
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography.caption};
  color: ${colors.blue500};
`;

export function SpacingSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Spacing Component</h1>
      <p css={subheadingStyle}>
        The Spacing component creates explicit vertical space between elements.
      </p>

      <PreviewBox title="Vertical spacing" description="Using Spacing between elements">
        <div css={{ width: '100%' }}>
          <div css={demoBlockStyle}>Block A</div>
          <div css={[spacerIndicatorStyle, css`height: 24px;`]}>24px</div>
          <div css={demoBlockStyle}>Block B</div>
          <div css={[spacerIndicatorStyle, css`height: 40px;`]}>40px</div>
          <div css={demoBlockStyle}>Block C</div>
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<div>Block A</div>\n<Spacing size={6} />  {/* 24px */}\n<div>Block B</div>\n<Spacing size={10} /> {/* 40px */}\n<div>Block C</div>`}
      />

      <PreviewBox title="Horizontal spacing" description="Using Spacing in a flex row">
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <div css={[demoBlockStyle, css`padding: 12px;`]}>Left</div>
          <div css={[spacerIndicatorStyle, css`width: 32px; height: 48px;`]}>32px</div>
          <div css={[demoBlockStyle, css`padding: 12px;`]}>Right</div>
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<Flex align="center">\n  <div>Left</div>\n  <Spacing size={8} direction="horizontal" />\n  <div>Right</div>\n</Flex>`}
      />
    </div>
  );
}
