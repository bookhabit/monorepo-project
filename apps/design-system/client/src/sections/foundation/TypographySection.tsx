/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { colors } from '@mono/ui';
import { typography } from '@mono/ui';
import { spacing } from '@mono/ui';

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

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: ${spacing[8]};
`;

const thStyle = css`
  ${typography.body2Bold};
  color: ${colors.grey500};
  text-align: left;
  padding: ${spacing[3]} ${spacing[4]};
  border-bottom: 2px solid ${colors.grey200};
  white-space: nowrap;
`;

const trStyle = css`
  border-bottom: 1px solid ${colors.grey100};

  &:last-child {
    border-bottom: none;
  }
`;

const tdStyle = css`
  padding: ${spacing[4]};
  vertical-align: middle;
`;

const tokenStyle = css`
  ${typography.label};
  font-family: monospace;
  color: ${colors.blue600};
  background-color: ${colors.blue50};
  padding: 2px 8px;
  border-radius: 4px;
`;

const metaStyle = css`
  ${typography.caption};
  color: ${colors.grey400};
  font-family: monospace;
`;

const sampleTextStyle = css`
  color: ${colors.grey900};
`;

const typographyEntries = [
  { token: 'heading1', label: 'Heading 1', meta: '22px / Bold', style: typography.heading1 },
  { token: 'heading2', label: 'Heading 2', meta: '20px / Bold', style: typography.heading2 },
  { token: 'heading3', label: 'Heading 3', meta: '18px / Bold', style: typography.heading3 },
  { token: 'body1', label: 'Body 1', meta: '16px / Regular', style: typography.body1 },
  { token: 'body1Bold', label: 'Body 1 Bold', meta: '16px / SemiBold', style: typography.body1Bold },
  { token: 'body2', label: 'Body 2', meta: '14px / Regular', style: typography.body2 },
  { token: 'body2Bold', label: 'Body 2 Bold', meta: '14px / SemiBold', style: typography.body2Bold },
  { token: 'caption', label: 'Caption', meta: '12px / Regular', style: typography.caption },
  { token: 'captionBold', label: 'Caption Bold', meta: '12px / SemiBold', style: typography.captionBold },
  { token: 'label', label: 'Label', meta: '13px / Medium', style: typography.label },
];

export function TypographySection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Typography</h1>
      <p css={subheadingStyle}>Semantic typography tokens for consistent text styling.</p>

      <table css={tableStyle}>
        <thead>
          <tr>
            <th css={thStyle}>Token</th>
            <th css={thStyle}>Meta</th>
            <th css={thStyle}>Sample</th>
          </tr>
        </thead>
        <tbody>
          {typographyEntries.map((entry) => (
            <tr key={entry.token} css={trStyle}>
              <td css={tdStyle}>
                <code css={tokenStyle}>typography.{entry.token}</code>
              </td>
              <td css={tdStyle}>
                <span css={metaStyle}>{entry.meta}</span>
              </td>
              <td css={tdStyle}>
                <span css={[sampleTextStyle, entry.style]}>
                  The quick brown fox jumps over the lazy dog
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
