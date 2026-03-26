/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { Button, colors, typography, spacing } from '@mono/ui';
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

export function ButtonSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Button</h1>
      <p css={subheadingStyle}>
        Interactive button component with multiple variants, sizes, and states.
      </p>

      <PreviewBox title="Variants" description="primary, secondary, ghost, danger">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </PreviewBox>

      <CodeBlock
        code={`<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="danger">Danger</Button>`}
      />

      <PreviewBox title="Sizes" description="small, medium, large">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </PreviewBox>

      <CodeBlock
        code={`<Button size="small">Small</Button>\n<Button size="medium">Medium</Button>\n<Button size="large">Large</Button>`}
      />

      <PreviewBox title="States" description="disabled, loading">
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </PreviewBox>

      <CodeBlock
        code={`<Button disabled>Disabled</Button>\n<Button loading>Loading</Button>`}
      />

      <PreviewBox title="Full width" description="Stretches to container width">
        <div css={{ width: '100%' }}>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </PreviewBox>

      <CodeBlock code={`<Button fullWidth>Full Width Button</Button>`} />
    </div>
  );
}
