/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { colors } from '@mono/ui';
import { typography } from '@mono/ui';
import { spacing } from '@mono/ui';

type CodeBlockProps = {
  code: string;
  language?: string;
};

const wrapperStyle = css`
  position: relative;
  margin-bottom: ${spacing[5]};
`;

const preStyle = css`
  background-color: ${colors.grey900};
  border-radius: 10px;
  padding: ${spacing[4]};
  overflow-x: auto;
  margin: 0;
`;

const codeStyle = css`
  ${typography.label};
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
  color: ${colors.grey100};
  white-space: pre;
  tab-size: 2;
`;

const langBadgeStyle = css`
  ${typography.caption};
  color: ${colors.grey500};
  position: absolute;
  top: ${spacing[3]};
  right: ${spacing[4]};
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  return (
    <div css={wrapperStyle}>
      <pre css={preStyle}>
        <code css={codeStyle}>{code.trim()}</code>
      </pre>
      <span css={langBadgeStyle}>{language}</span>
    </div>
  );
}
