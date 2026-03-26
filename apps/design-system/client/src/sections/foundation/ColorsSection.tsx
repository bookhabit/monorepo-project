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

const sectionTitleStyle = css`
  ${typography.heading3};
  color: ${colors.grey800};
  margin: 0 0 ${spacing[4]};
  padding-bottom: ${spacing[2]};
  border-bottom: 1px solid ${colors.grey200};
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: ${spacing[3]};
  margin-bottom: ${spacing[8]};
`;

const swatchWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

const swatchStyle = css`
  width: 100%;
  height: 60px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const swatchNameStyle = css`
  ${typography.caption};
  color: ${colors.grey700};
  font-weight: 500;
`;

const swatchValueStyle = css`
  ${typography.caption};
  color: ${colors.grey400};
  font-family: monospace;
`;

type ColorEntry = { name: string; value: string };

function getColorGroups() {
  const grey: ColorEntry[] = [];
  const blue: ColorEntry[] = [];
  const red: ColorEntry[] = [];
  const green: ColorEntry[] = [];
  const orange: ColorEntry[] = [];
  const yellow: ColorEntry[] = [];
  const teal: ColorEntry[] = [];
  const purple: ColorEntry[] = [];
  const semantic: ColorEntry[] = [];

  for (const [key, value] of Object.entries(colors)) {
    if (key.startsWith('grey') && !key.startsWith('greyO') && !key.startsWith('greyB')) grey.push({ name: key, value: value as string });
    else if (key.startsWith('blue')) blue.push({ name: key, value: value as string });
    else if (key.startsWith('red')) red.push({ name: key, value: value as string });
    else if (key.startsWith('green')) green.push({ name: key, value: value as string });
    else if (key.startsWith('orange')) orange.push({ name: key, value: value as string });
    else if (key.startsWith('yellow')) yellow.push({ name: key, value: value as string });
    else if (key.startsWith('teal')) teal.push({ name: key, value: value as string });
    else if (key.startsWith('purple')) purple.push({ name: key, value: value as string });
    else if (['primary', 'success', 'warning', 'error', 'info'].includes(key)) semantic.push({ name: key, value: value as string });
  }

  return [
    { title: 'Grey', entries: grey },
    { title: 'Blue', entries: blue },
    { title: 'Red', entries: red },
    { title: 'Green', entries: green },
    { title: 'Orange', entries: orange },
    { title: 'Yellow', entries: yellow },
    { title: 'Teal', entries: teal },
    { title: 'Purple', entries: purple },
    { title: 'Semantic', entries: semantic },
  ];
}

function ColorSwatch({ name, value }: ColorEntry) {
  return (
    <div css={swatchWrapperStyle}>
      <div css={[swatchStyle, css`background-color: ${value};`]} />
      <span css={swatchNameStyle}>{name}</span>
      <span css={swatchValueStyle}>{value}</span>
    </div>
  );
}

export function ColorsSection() {
  const groups = getColorGroups();

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Colors</h1>
      <p css={subheadingStyle}>The color palette used throughout the design system.</p>

      {groups.map((group) => (
        <div key={group.title}>
          <h2 css={sectionTitleStyle}>{group.title}</h2>
          <div css={gridStyle}>
            {group.entries.map((entry) => (
              <ColorSwatch key={entry.name} {...entry} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
