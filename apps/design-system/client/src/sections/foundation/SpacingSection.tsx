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
`;

const thStyle = css`
  ${typography.body2Bold};
  color: ${colors.grey500};
  text-align: left;
  padding: ${spacing[3]} ${spacing[4]};
  border-bottom: 2px solid ${colors.grey200};
`;

const trStyle = css`
  border-bottom: 1px solid ${colors.grey100};

  &:last-child {
    border-bottom: none;
  }
`;

const tdStyle = css`
  padding: ${spacing[3]} ${spacing[4]};
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

const barWrapperStyle = css`
  display: flex;
  align-items: center;
`;

const barStyle = css`
  height: 16px;
  background-color: ${colors.blue400};
  border-radius: 3px;
  min-width: 4px;
`;

const spacingEntries = Object.entries(spacing).map(([key, value]) => ({
  token: `spacing[${key}]`,
  rem: value,
  px: `${parseFloat(value) * 16}px`,
  widthPx: parseFloat(value) * 16,
}));

export function SpacingSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Spacing</h1>
      <p css={subheadingStyle}>
        Spacing tokens based on 4px grid. Use <code>spacing[4]</code> = 16px as the base unit.
      </p>

      <table css={tableStyle}>
        <thead>
          <tr>
            <th css={thStyle}>Token</th>
            <th css={thStyle}>Rem</th>
            <th css={thStyle}>PX</th>
            <th css={thStyle}>Visual</th>
          </tr>
        </thead>
        <tbody>
          {spacingEntries.map((entry) => (
            <tr key={entry.token} css={trStyle}>
              <td css={tdStyle}>
                <code css={tokenStyle}>{entry.token}</code>
              </td>
              <td css={tdStyle}>
                <span css={metaStyle}>{entry.rem}</span>
              </td>
              <td css={tdStyle}>
                <span css={metaStyle}>{entry.px}</span>
              </td>
              <td css={tdStyle}>
                <div css={barWrapperStyle}>
                  <div
                    css={[
                      barStyle,
                      css`
                        width: ${Math.min(entry.widthPx, 320)}px;
                      `,
                    ]}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
