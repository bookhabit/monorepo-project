/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Select, colors, typography, spacing } from '@mono/ui';
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

const fruitOptions = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'cherry', label: '체리' },
  { value: 'grape', label: '포도', disabled: true },
];

export function SelectSection() {
  const [selected, setSelected] = useState('');

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Select</h1>
      <p css={subheadingStyle}>
        Styled native select element with label, placeholder, and error support.
      </p>

      <PreviewBox title="Basic Select" description="With label and placeholder">
        <div css={{ width: '320px' }}>
          <Select
            label="과일 선택"
            placeholder="선택하세요"
            options={fruitOptions}
            value=""
            onChange={() => {}}
          />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<Select\n  label="과일 선택"\n  placeholder="선택하세요"\n  options={[\n    { value: 'apple', label: '사과' },\n    { value: 'banana', label: '바나나' },\n  ]}\n/>`}
      />

      <PreviewBox title="Controlled Select" description="With state binding">
        <div css={{ width: '320px' }}>
          <Select
            label="과일 선택"
            placeholder="선택하세요"
            options={fruitOptions}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          />
          {selected && (
            <p css={css`${typography.body2}; color: ${colors.grey600}; margin-top: ${spacing[2]};`}>
              선택됨: {selected}
            </p>
          )}
        </div>
      </PreviewBox>

      <PreviewBox title="Error State" description="With validation error message">
        <div css={{ width: '320px' }}>
          <Select
            label="카테고리"
            placeholder="선택하세요"
            options={fruitOptions}
            value=""
            onChange={() => {}}
            errorMessage="카테고리를 선택해주세요"
          />
        </div>
      </PreviewBox>

      <CodeBlock code={`<Select\n  label="카테고리"\n  errorMessage="카테고리를 선택해주세요"\n  options={options}\n/>`} />

      <PreviewBox title="Disabled State">
        <div css={{ width: '320px' }}>
          <Select
            label="비활성화"
            options={fruitOptions}
            value="apple"
            onChange={() => {}}
            disabled
          />
        </div>
      </PreviewBox>
    </div>
  );
}
