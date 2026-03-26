/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { Skeleton, colors, typography, spacing } from '@mono/ui';
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

const cardSkeletonStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: ${colors.background};
  border-radius: 12px;
  border: 1px solid ${colors.grey100};
  width: 280px;
`;

const listItemStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${colors.grey100};

  &:last-child {
    border-bottom: none;
  }
`;

const listTextsStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export function SkeletonSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Skeleton</h1>
      <p css={subheadingStyle}>
        Loading placeholder with shimmer animation. Use while content is loading.
      </p>

      <PreviewBox title="Basic shapes" description="Rectangle and circle variants">
        <Skeleton width="200px" height="20px" />
        <Skeleton width="150px" height="20px" />
        <Skeleton width="60px" height="60px" borderRadius="50%" />
        <Skeleton width="80px" height="80px" borderRadius="12px" />
      </PreviewBox>

      <CodeBlock
        code={`<Skeleton width="200px" height="20px" />\n<Skeleton width="60px" height="60px" borderRadius="50%" />`}
      />

      <PreviewBox title="Card skeleton" description="Simulated card loading state">
        <div css={cardSkeletonStyle}>
          <Skeleton width="100%" height="140px" borderRadius="8px" />
          <Skeleton width="80%" height="18px" />
          <Skeleton width="60%" height="14px" />
          <Skeleton width="90%" height="14px" />
          <Skeleton width="40%" height="14px" />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`// Card loading skeleton\n<div>\n  <Skeleton width="100%" height="140px" borderRadius="8px" />\n  <Skeleton width="80%" height="18px" />\n  <Skeleton width="60%" height="14px" />\n</div>`}
      />

      <PreviewBox title="List skeleton" description="Multiple row loading state">
        <div css={{ width: '360px' }}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} css={listItemStyle}>
              <Skeleton width="44px" height="44px" borderRadius="50%" />
              <div css={listTextsStyle}>
                <Skeleton width="140px" height="16px" />
                <Skeleton width="200px" height="13px" />
              </div>
            </div>
          ))}
        </div>
      </PreviewBox>
    </div>
  );
}
