/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import {
  formatMoney,
  formatMoneyShort,
  formatRelativeTime,
  formatDate,
  formatDateTime,
} from '@mono/shared';
import { colors, typography, spacing } from '@mono/ui';
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

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  ${typography.body2};
`;

const thStyle = css`
  text-align: left;
  padding: ${spacing[2]} ${spacing[4]};
  background-color: ${colors.grey50};
  color: ${colors.grey600};
  ${typography.captionBold};
  border-bottom: 1px solid ${colors.grey100};
`;

const tdStyle = css`
  padding: ${spacing[3]} ${spacing[4]};
  color: ${colors.grey800};
  border-bottom: 1px solid ${colors.grey100};
`;

const codeStyle = css`
  font-family: 'Fira Code', monospace;
  background-color: ${colors.grey100};
  padding: 2px 6px;
  border-radius: 4px;
  color: ${colors.blue700};
  font-size: 0.85em;
`;

const MONEY_CASES = [
  { input: 10000,           call: 'formatMoney(10000)',                         result: formatMoney(10000) },
  { input: -50000,          call: 'formatMoney(-50000)',                        result: formatMoney(-50000) },
  { input: 1234567,         call: "formatMoney(1234567, { symbol: false })",    result: formatMoney(1234567, { symbol: false }) },
  { input: 100,             call: "formatMoney(100, { unit: '달러' })",         result: formatMoney(100, { unit: '달러' }) },
  { input: 150_000_000,     call: 'formatMoneyShort(150000000)',                result: formatMoneyShort(150_000_000) },
  { input: 35000,           call: 'formatMoneyShort(35000)',                    result: formatMoneyShort(35000) },
  { input: 500,             call: 'formatMoneyShort(500)',                      result: formatMoneyShort(500) },
];

const now = new Date();
const DATE_CASES = [
  { call: 'formatDate(new Date())',                       result: formatDate(now) },
  { call: "formatDate(new Date(), '-')",                  result: formatDate(now, '-') },
  { call: 'formatDateTime(new Date())',                   result: formatDateTime(now) },
  { call: 'formatRelativeTime(방금 전)',                   result: formatRelativeTime(new Date(Date.now() - 30_000)) },
  { call: 'formatRelativeTime(5분 전)',                    result: formatRelativeTime(new Date(Date.now() - 5 * 60_000)) },
  { call: 'formatRelativeTime(3시간 전)',                  result: formatRelativeTime(new Date(Date.now() - 3 * 3600_000)) },
  { call: 'formatRelativeTime(3일 전)',                    result: formatRelativeTime(new Date(Date.now() - 3 * 86400_000)) },
  { call: 'formatRelativeTime(10일 전)',                   result: formatRelativeTime(new Date(Date.now() - 10 * 86400_000)) },
];

export function FormattersSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Formatters</h1>
      <p css={subheadingStyle}>
        <code>@mono/shared</code>에서 제공하는 순수 함수 포맷터. 프론트엔드와 NestJS 서버 양쪽에서 사용 가능합니다.
      </p>

      <PreviewBox title="Money Formatter" description="금액 → 한국어 표기, 만/억 단위 축약">
        <table css={tableStyle}>
          <thead>
            <tr>
              <th css={thStyle}>호출</th>
              <th css={thStyle}>결과</th>
            </tr>
          </thead>
          <tbody>
            {MONEY_CASES.map(({ call, result }) => (
              <tr key={call}>
                <td css={tdStyle}><span css={codeStyle}>{call}</span></td>
                <td css={tdStyle}>{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PreviewBox>

      <CodeBlock code={`import { formatMoney, formatMoneyShort } from '@mono/shared';

formatMoney(10000)                     // "10,000원"
formatMoney(-50000)                    // "-50,000원"
formatMoney(100, { unit: '달러' })     // "100달러"
formatMoney(1234567, { symbol: false }) // "1,234,567"

formatMoneyShort(150_000_000)          // "1.5억"
formatMoneyShort(35000)                // "3.5만"`} />

      <PreviewBox title="Date Formatter" description="날짜 포맷 및 상대적 시간 표기">
        <table css={tableStyle}>
          <thead>
            <tr>
              <th css={thStyle}>호출</th>
              <th css={thStyle}>결과</th>
            </tr>
          </thead>
          <tbody>
            {DATE_CASES.map(({ call, result }) => (
              <tr key={call}>
                <td css={tdStyle}><span css={codeStyle}>{call}</span></td>
                <td css={tdStyle}>{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PreviewBox>

      <CodeBlock code={`import { formatDate, formatDateTime, formatRelativeTime } from '@mono/shared';

formatDate(new Date())              // "2026.03.26"
formatDate(new Date(), '-')         // "2026-03-26"
formatDateTime(new Date())          // "2026.03.26 14:30"

formatRelativeTime(30초 전)         // "방금 전"
formatRelativeTime(5분 전)          // "5분 전"
formatRelativeTime(3시간 전)        // "3시간 전"
formatRelativeTime(10일 전)         // "2026.03.16"`} />
    </div>
  );
}
