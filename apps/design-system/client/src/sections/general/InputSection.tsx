/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Input, colors, typography, spacing } from '@mono/ui';
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

export function InputSection() {
  const [value, setValue] = useState('');

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Input</h1>
      <p css={subheadingStyle}>
        Native input element with label, hint, and error message support.
      </p>

      <PreviewBox title="Basic Input" description="Simple input with label">
        <div css={{ width: '320px' }}>
          <Input label="이름" placeholder="이름을 입력하세요" />
        </div>
      </PreviewBox>

      <CodeBlock code={`<Input label="이름" placeholder="이름을 입력하세요" />`} />

      <PreviewBox title="With Hint" description="Input with helper text">
        <div css={{ width: '320px' }}>
          <Input label="이메일" placeholder="example@email.com" hint="이메일 형식으로 입력하세요" />
        </div>
      </PreviewBox>

      <CodeBlock code={`<Input label="이메일" hint="이메일 형식으로 입력하세요" />`} />

      <PreviewBox title="Error State" description="Input with validation error">
        <div css={{ width: '320px' }}>
          <Input
            label="비밀번호"
            type="password"
            value="123"
            errorMessage="비밀번호는 8자 이상이어야 합니다"
            readOnly
          />
        </div>
      </PreviewBox>

      <CodeBlock code={`<Input label="비밀번호" errorMessage="비밀번호는 8자 이상이어야 합니다" />`} />

      <PreviewBox title="Disabled State">
        <div css={{ width: '320px' }}>
          <Input label="읽기 전용" value="수정 불가능한 값" disabled />
        </div>
      </PreviewBox>

      <CodeBlock code={`<Input label="읽기 전용" disabled />`} />

      <PreviewBox title="Controlled Input" description="Type to see the value update">
        <div css={{ width: '320px' }}>
          <Input
            label="Controlled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something..."
          />
        </div>
      </PreviewBox>
    </div>
  );
}
