/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Checkbox, colors, typography, spacing } from '@mono/ui';
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

export function CheckboxSection() {
  const [checked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false]);

  const allChecked = checkedItems.every(Boolean);
  const someChecked = checkedItems.some(Boolean) && !allChecked;

  const handleParentChange = () => {
    const newVal = !allChecked;
    setCheckedItems([newVal, newVal, newVal]);
  };

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Checkbox</h1>
      <p css={subheadingStyle}>
        Custom-styled checkbox with label, indeterminate state, and controlled/uncontrolled modes.
      </p>

      <PreviewBox title="Basic Checkbox" description="Uncontrolled">
        <Checkbox label="이용약관에 동의합니다" />
        <Checkbox label="마케팅 수신 동의" defaultChecked />
      </PreviewBox>

      <CodeBlock code={`<Checkbox label="이용약관에 동의합니다" />\n<Checkbox label="마케팅 수신 동의" defaultChecked />`} />

      <PreviewBox title="Controlled Checkbox" description="Click to toggle">
        <Checkbox
          label={checked ? '선택됨' : '선택 안됨'}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </PreviewBox>

      <CodeBlock code={`const [checked, setChecked] = useState(false);\n\n<Checkbox\n  checked={checked}\n  onChange={(e) => setChecked(e.target.checked)}\n/>`} />

      <PreviewBox title="Indeterminate" description="Used for select-all parent checkbox">
        <div css={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox
            label="전체 선택"
            checked={allChecked}
            indeterminate={someChecked}
            onChange={handleParentChange}
          />
          <div css={{ paddingLeft: '28px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['항목 1', '항목 2', '항목 3'].map((label, i) => (
              <Checkbox
                key={label}
                label={label}
                checked={checkedItems[i]}
                onChange={(e) => {
                  const next = [...checkedItems];
                  next[i] = e.target.checked;
                  setCheckedItems(next);
                }}
              />
            ))}
          </div>
        </div>
      </PreviewBox>

      <CodeBlock code={`<Checkbox indeterminate={someChecked} checked={allChecked} />`} />

      <PreviewBox title="Disabled State">
        <Checkbox label="비활성화 (미선택)" disabled />
        <Checkbox label="비활성화 (선택됨)" checked disabled onChange={() => {}} />
      </PreviewBox>
    </div>
  );
}
