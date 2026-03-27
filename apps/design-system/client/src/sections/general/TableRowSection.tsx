/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { TableRow, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;
const dividerStyle = css`height: 1px; background: ${colors.grey100}; margin: 0;`;

export function TableRowSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>TableRow</h1>
      <p css={subheadingStyle}>
        데이터를 간결하고 읽기 쉽게 좌우로 배치할 때 사용해요. 정보 제목과 내용을 나란히 배치해요.
      </p>

      <PreviewBox title="space-between" description="양끝 정렬 — 제목과 내용을 명확히 분리">
        <div css={css`width: 100%;`}>
          <TableRow align="space-between" left="김토스" right="받는 분" />
          <div css={dividerStyle} />
          <TableRow align="space-between" left="강토스" right="받는 분 통장표시" />
          <div css={dividerStyle} />
          <TableRow align="space-between" left="이체 1일 전" right="미리알림" />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<TableRow align="space-between" left="김토스" right="받는 분" />
<TableRow align="space-between" left="강토스" right="받는 분 통장표시" />
<TableRow align="space-between" left="이체 1일 전" right="미리알림" />`}
      />

      <PreviewBox title="left" description="왼쪽 정렬">
        <div css={css`width: 100%;`}>
          <TableRow align="left" left="김토스" right="받는 분" />
          <div css={dividerStyle} />
          <TableRow align="left" left="강토스" right="받는 분 통장표시" />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<TableRow align="left" left="김토스" right="받는 분" />
<TableRow align="left" left="강토스" right="받는 분 통장표시" />`}
      />

      <PreviewBox title="leftRatio" description="왼쪽 너비 비율 고정 (예: 30%)">
        <div css={css`width: 100%;`}>
          <TableRow align="left" left="김토스" right="받는 분" leftRatio={30} />
          <div css={dividerStyle} />
          <TableRow align="left" left="강토스" right="받는 분 통장표시" leftRatio={30} />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<TableRow align="left" left="김토스" right="받는 분" leftRatio={30} />
<TableRow align="left" left="강토스" right="받는 분 통장표시" leftRatio={30} />`}
      />

      <PreviewBox title="ReactNode left/right" description="문자열 외에 컴포넌트도 전달 가능">
        <div css={css`width: 100%;`}>
          <TableRow
            align="space-between"
            left={<strong style={{ color: colors.blue500 }}>총 금액</strong>}
            right={<span style={{ color: colors.grey900, fontWeight: 700 }}>₩ 120,000</span>}
          />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<TableRow
  align="space-between"
  left={<strong style={{ color: colors.blue500 }}>총 금액</strong>}
  right={<span style={{ fontWeight: 700 }}>₩ 120,000</span>}
/>`}
      />
    </div>
  );
}
