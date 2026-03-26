/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { TextField, SplitTextField, TextArea, colors, typography, spacing } from '@mono/ui';
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

const sectionTitleStyle = css`
  ${typography.heading3};
  color: ${colors.grey800};
  margin: 0 0 ${spacing[4]};
`;

export function TextFieldSection() {
  const [text, setText] = useState('');
  const [otp, setOtp] = useState('');
  const [bio, setBio] = useState('');

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>TextField</h1>
      <p css={subheadingStyle}>
        Enhanced input fields: TextField, SplitTextField (OTP), and TextArea.
      </p>

      <h2 css={sectionTitleStyle}>TextField</h2>

      <PreviewBox title="With title and description">
        <div css={{ width: '360px' }}>
          <TextField
            title="사용자 이름"
            description="영문, 숫자 조합 4-20자"
            placeholder="username"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </PreviewBox>

      <CodeBlock code={`<TextField\n  title="사용자 이름"\n  description="영문, 숫자 조합 4-20자"\n  placeholder="username"\n/>`} />

      <PreviewBox title="With clear button and max length" description="Type to see controls">
        <div css={{ width: '360px' }}>
          <TextField
            title="검색"
            placeholder="검색어를 입력하세요"
            clearButton
            maxLength={50}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClear={() => setText('')}
          />
        </div>
      </PreviewBox>

      <CodeBlock code={`<TextField\n  title="검색"\n  clearButton\n  maxLength={50}\n  onClear={() => setValue('')}\n/>`} />

      <PreviewBox title="Error state">
        <div css={{ width: '360px' }}>
          <TextField
            title="이메일"
            value="invalid-email"
            errorMessage="올바른 이메일 형식을 입력하세요"
            readOnly
          />
        </div>
      </PreviewBox>

      <h2 css={[sectionTitleStyle, css`margin-top: ${spacing[8]};`]}>SplitTextField (OTP)</h2>

      <PreviewBox title="6-digit OTP Input" description="Auto-focuses next cell on input">
        <SplitTextField
          length={6}
          value={otp}
          onChange={setOtp}
        />
      </PreviewBox>

      <CodeBlock code={`<SplitTextField length={6} value={otp} onChange={setOtp} />`} />

      <PreviewBox title="4-digit PIN" description="Shorter variant">
        <SplitTextField length={4} />
      </PreviewBox>

      <PreviewBox title="Error state">
        <SplitTextField length={6} value="123" onChange={() => {}} errorMessage="인증번호가 일치하지 않습니다" />
      </PreviewBox>

      <h2 css={[sectionTitleStyle, css`margin-top: ${spacing[8]};`]}>TextArea</h2>

      <PreviewBox title="Basic TextArea" description="With title and max length counter">
        <div css={{ width: '400px' }}>
          <TextArea
            title="자기소개"
            description="최대 200자까지 입력 가능합니다"
            placeholder="자신을 소개해주세요..."
            maxLength={200}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </PreviewBox>

      <CodeBlock code={`<TextArea\n  title="자기소개"\n  maxLength={200}\n  autoResize\n/>`} />

      <PreviewBox title="Auto-resize TextArea" description="Height grows with content">
        <div css={{ width: '400px' }}>
          <TextArea
            title="메모"
            placeholder="내용을 입력하면 자동으로 높이가 늘어납니다..."
            autoResize
          />
        </div>
      </PreviewBox>
    </div>
  );
}
