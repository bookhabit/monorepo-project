/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { colors } from '@mono/ui';
import { typography } from '@mono/ui';
import { spacing } from '@mono/ui';
import type { ReactNode } from 'react';

type PreviewBoxProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  background?: 'white' | 'grey' | 'dark';
  padding?: string;
};

const wrapperStyle = css`
  border: 1px solid ${colors.grey200};
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: ${spacing[5]};
`;

const headerStyle = css`
  padding: ${spacing[3]} ${spacing[4]};
  border-bottom: 1px solid ${colors.grey200};
  background-color: ${colors.grey50};
`;

const titleStyle = css`
  ${typography.body2Bold};
  color: ${colors.grey800};
  margin: 0;
`;

const descStyle = css`
  ${typography.caption};
  color: ${colors.grey500};
  margin: 4px 0 0;
`;

const contentStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[3]};
  align-items: flex-start;
`;

export function PreviewBox({
  title,
  description,
  children,
  background = 'grey',
  padding = spacing[5],
}: PreviewBoxProps) {
  const bgColor =
    background === 'white'
      ? colors.background
      : background === 'dark'
        ? colors.grey900
        : colors.grey100;

  return (
    <div css={wrapperStyle}>
      {(title !== undefined || description !== undefined) && (
        <div css={headerStyle}>
          {title !== undefined && <p css={titleStyle}>{title}</p>}
          {description !== undefined && <p css={descStyle}>{description}</p>}
        </div>
      )}
      <div
        css={[
          css`
            background-color: ${bgColor};
            padding: ${padding};
          `,
          contentStyle,
        ]}
      >
        {children}
      </div>
    </div>
  );
}
