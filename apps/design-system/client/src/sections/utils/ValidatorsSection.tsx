/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import {
  isValidPhone,
  formatPhone,
  isValidAccountNumber,
  maskAccountNumber,
  isValidRRN,
  maskRRN,
  isValidEmail,
  isValidBusinessNumber,
} from '@mono/shared';
import { colors, typography, spacing, Input } from '@mono/ui';
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

const validatorRowStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  max-width: 400px;
`;

const resultStyle = (valid: boolean | null) => css`
  ${typography.body2};
  color: ${valid === null ? colors.grey400 : valid ? colors.success : colors.error};
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: 8px;
  background-color: ${valid === null
    ? colors.grey50
    : valid
    ? 'rgba(0, 188, 126, 0.08)'
    : 'rgba(255, 82, 82, 0.08)'};
`;

function ValidatorDemo({
  label,
  placeholder,
  validate,
  format,
}: {
  label: string;
  placeholder: string;
  validate: (v: string) => boolean;
  format?: (v: string) => string;
}) {
  const [value, setValue] = useState('');
  const trimmed = value.trim();
  const valid = trimmed.length > 0 ? validate(trimmed) : null;
  const formatted = trimmed.length > 0 && format ? format(trimmed) : null;

  return (
    <div css={validatorRowStyle}>
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div css={resultStyle(valid)}>
        {valid === null && '입력하면 검증 결과가 표시됩니다'}
        {valid === true && `✓ 유효 ${formatted ? `→ ${formatted}` : ''}`}
        {valid === false && '✗ 유효하지 않은 형식'}
      </div>
    </div>
  );
}

export function ValidatorsSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Validators</h1>
      <p css={subheadingStyle}>
        <code>@mono/shared</code>에서 제공하는 순수 유효성 검사 함수. Zod schema와 함께 또는 단독으로 사용합니다.
      </p>

      <PreviewBox title="전화번호" description="010-1234-5678 / 01012345678 / 010.1234.5678 허용">
        <ValidatorDemo
          label="전화번호"
          placeholder="010-1234-5678"
          validate={isValidPhone}
          format={formatPhone}
        />
      </PreviewBox>

      <PreviewBox title="계좌번호" description="10~14자리 숫자 (하이픈 혼용 가능)">
        <ValidatorDemo
          label="계좌번호"
          placeholder="110-123-456789"
          validate={isValidAccountNumber}
          format={maskAccountNumber}
        />
      </PreviewBox>

      <PreviewBox title="주민등록번호" description="체크섬 포함 완전 검증">
        <ValidatorDemo
          label="주민등록번호"
          placeholder="901225-1234567"
          validate={isValidRRN}
          format={maskRRN}
        />
      </PreviewBox>

      <PreviewBox title="이메일" description="">
        <ValidatorDemo
          label="이메일"
          placeholder="user@example.com"
          validate={isValidEmail}
        />
      </PreviewBox>

      <PreviewBox title="사업자등록번호" description="체크섬 포함 10자리 검증">
        <ValidatorDemo
          label="사업자등록번호"
          placeholder="123-45-67890"
          validate={isValidBusinessNumber}
        />
      </PreviewBox>

      <CodeBlock code={`import {
  isValidPhone, formatPhone,
  isValidAccountNumber, maskAccountNumber,
  isValidRRN, maskRRN,
  isValidEmail,
  isValidBusinessNumber,
} from '@mono/shared';

isValidPhone('01012345678')        // true
formatPhone('01012345678')         // "010-1234-5678"

isValidAccountNumber('11012345678') // true
maskAccountNumber('110123456789')   // "110123****89"

isValidRRN('9012251234567')        // 체크섬 검증
maskRRN('901225-1234567')          // "901225-1******"

// NestJS DTO에서도 동일하게 사용 가능
@IsCustom()
accountNumber: string;`} />
    </div>
  );
}
