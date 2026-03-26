/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { Flex, colors, typography, spacing } from '@mono/ui';
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

const demoBoxStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${colors.blue400};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
`;

const demoBoxSmallStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background-color: ${colors.blue400};
`;

export function FlexSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Flex</h1>
      <p css={subheadingStyle}>
        A flexible layout component wrapping CSS Flexbox. gap accepts a number (multiplied by 4px) or a string.
      </p>

      <PreviewBox title="Row (default)" description="Items arranged horizontally">
        <Flex gap={3}>
          {[1, 2, 3].map((n) => (
            <div key={n} css={demoBoxStyle}>{n}</div>
          ))}
        </Flex>
      </PreviewBox>

      <CodeBlock code={`<Flex gap={3}>\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</Flex>`} />

      <PreviewBox title="Column" description="Items arranged vertically">
        <Flex direction="column" gap={2}>
          {[1, 2, 3].map((n) => (
            <div key={n} css={[demoBoxStyle, css`width: 100px; height: 36px;`]}>{n}</div>
          ))}
        </Flex>
      </PreviewBox>

      <CodeBlock code={`<Flex direction="column" gap={2}>\n  ...\n</Flex>`} />

      <PreviewBox title="Justify & Align" description="space-between with centered items">
        <Flex justify="space-between" align="center" style={{ width: '100%' }}>
          <div css={demoBoxSmallStyle} />
          <div css={[demoBoxSmallStyle, css`height: 48px;`]} />
          <div css={demoBoxSmallStyle} />
        </Flex>
      </PreviewBox>

      <CodeBlock code={`<Flex justify="space-between" align="center">\n  ...\n</Flex>`} />

      <PreviewBox title="Wrap" description="Items wrap to next line">
        <Flex wrap="wrap" gap={2} style={{ maxWidth: '200px' }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} css={[demoBoxSmallStyle, css`width: 56px; height: 40px;`]} />
          ))}
        </Flex>
      </PreviewBox>

      <CodeBlock code={`<Flex wrap="wrap" gap={2}>\n  ...\n</Flex>`} />
    </div>
  );
}
