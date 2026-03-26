/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { Box, colors, typography, spacing } from '@mono/ui';
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

export function BoxSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Box</h1>
      <p css={subheadingStyle}>
        A generic layout primitive. padding/margin accept a number (multiplied by 4px) or string.
      </p>

      <PreviewBox title="Basic Box" description="Box with padding and background">
        <Box
          padding={4}
          borderRadius={3}
          backgroundColor={colors.blue50}
          css={css`border: 1px solid ${colors.blue200};`}
        >
          <span css={css`${typography.body2}; color: ${colors.blue700};`}>
            Content inside a Box — padding: 4 (16px)
          </span>
        </Box>
      </PreviewBox>

      <CodeBlock
        code={`<Box padding={4} borderRadius={3} backgroundColor={colors.blue50}>\n  Content\n</Box>`}
      />

      <PreviewBox title="Padding X / Y" description="Asymmetric padding">
        <Box
          paddingX={6}
          paddingY={3}
          borderRadius={2}
          backgroundColor={colors.green50}
          css={css`border: 1px solid ${colors.green100};`}
        >
          <span css={css`${typography.body2}; color: ${colors.grey700};`}>
            paddingX=6 (24px), paddingY=3 (12px)
          </span>
        </Box>
      </PreviewBox>

      <CodeBlock code={`<Box paddingX={6} paddingY={3}>\n  Content\n</Box>`} />

      <PreviewBox title="Nested Boxes" description="Boxes can be nested for complex layouts">
        <Box
          padding={4}
          borderRadius={3}
          backgroundColor={colors.grey100}
          style={{ width: '100%' }}
        >
          <Box
            padding={3}
            borderRadius={2}
            backgroundColor={colors.background}
            style={{ marginBottom: spacing[3] }}
          >
            <span css={css`${typography.body2}; color: ${colors.grey700};`}>Inner box 1</span>
          </Box>
          <Box
            padding={3}
            borderRadius={2}
            backgroundColor={colors.background}
          >
            <span css={css`${typography.body2}; color: ${colors.grey700};`}>Inner box 2</span>
          </Box>
        </Box>
      </PreviewBox>

      <CodeBlock
        code={`<Box padding={4}>\n  <Box padding={3}>Inner box 1</Box>\n  <Box padding={3}>Inner box 2</Box>\n</Box>`}
      />
    </div>
  );
}
