/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { Grid, colors, typography, spacing } from '@mono/ui';
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

const cellStyle = css`
  background-color: ${colors.blue100};
  border-radius: 8px;
  padding: ${spacing[4]};
  text-align: center;
  ${typography.body2Bold};
  color: ${colors.blue700};
`;

export function GridSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Grid</h1>
      <p css={subheadingStyle}>
        CSS Grid layout component for building two-dimensional layouts.
      </p>

      <PreviewBox title="3-column grid" description="Equal-width columns">
        <div css={{ width: '100%' }}>
          <Grid columns={3} gap="12px">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} css={cellStyle}>{n}</div>
            ))}
          </Grid>
        </div>
      </PreviewBox>

      <CodeBlock code={`<Grid columns={3} gap="12px">\n  <div>1</div>\n  ...\n</Grid>`} />

      <PreviewBox title="Custom column widths" description="Using string template">
        <div css={{ width: '100%' }}>
          <Grid columns="2fr 1fr" gap="12px">
            <div css={cellStyle}>Main content (2fr)</div>
            <div css={cellStyle}>Sidebar (1fr)</div>
          </Grid>
        </div>
      </PreviewBox>

      <CodeBlock code={`<Grid columns="2fr 1fr" gap="12px">\n  <div>Main</div>\n  <div>Sidebar</div>\n</Grid>`} />

      <PreviewBox title="Row & column gaps" description="Different gaps per axis">
        <div css={{ width: '100%' }}>
          <Grid columns={4} columnGap="8px" rowGap="16px">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} css={cellStyle}>{n}</div>
            ))}
          </Grid>
        </div>
      </PreviewBox>

      <CodeBlock code={`<Grid columns={4} columnGap="8px" rowGap="16px">\n  ...\n</Grid>`} />
    </div>
  );
}
