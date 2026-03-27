/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { SearchField, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`padding: ${spacing[8]};`;
const headingStyle = css`${typography.heading1}; color: ${colors.grey900}; margin: 0 0 ${spacing[2]};`;
const subheadingStyle = css`${typography.body1}; color: ${colors.grey500}; margin: 0 0 ${spacing[8]};`;

export function SearchFieldSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>SearchField</h1>
      <p css={subheadingStyle}>
        검색 입력창을 구현할 때 사용하는 컴포넌트예요. 검색어 삭제와 상단 고정 기능을 포함해요.
      </p>

      <PreviewBox title="Basic" description="기본 검색 필드">
        <div style={{ position: 'relative', width: '100%' }}>
          <SearchField placeholder="검색어를 입력하세요" />
        </div>
      </PreviewBox>

      <CodeBlock code={`<SearchField placeholder="검색어를 입력하세요" />`} />

      <PreviewBox title="onDeleteClick" description="삭제 버튼 클릭 콜백">
        <div style={{ position: 'relative', width: '100%' }}>
          <SearchField
            placeholder="검색어를 입력하고 오른쪽 버튼을 클릭해보세요"
            onDeleteClick={() => alert('삭제!')}
          />
        </div>
      </PreviewBox>

      <CodeBlock code={`<SearchField placeholder="..." onDeleteClick={() => alert('삭제!')} />`} />

      <PreviewBox title="fixed + takeSpace" description="상단 고정 — fixed와 takeSpace 조합">
        <p css={css`${typography.body2}; color: ${colors.grey500}; margin: 0;`}>
          fixed=true로 설정하면 position: fixed로 상단에 고정돼요.
          takeSpace=true (기본값)이면 아래 콘텐츠가 가려지지 않도록 빈 공간을 남겨요.
        </p>
        <CodeBlock
          code={`<SearchField placeholder="검색어를 입력하세요" fixed takeSpace />`}
        />
      </PreviewBox>
    </div>
  );
}
