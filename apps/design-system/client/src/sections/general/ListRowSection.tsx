/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { ListRow, colors, typography, spacing } from '@mono/ui';
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

const listContainerStyle = css`
  width: 100%;
  border: 1px solid ${colors.grey200};
  border-radius: 12px;
  overflow: hidden;
  background-color: ${colors.background};

  & > * + * {
    border-top: 1px solid ${colors.grey100};
  }
`;

const avatarStyle = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${colors.blue100};
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography.body2Bold};
  color: ${colors.blue600};
  flex-shrink: 0;
`;

const badgeStyle = css`
  ${typography.caption};
  background-color: ${colors.blue500};
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
`;

const arrowStyle = css`
  ${typography.body1};
  color: ${colors.grey400};
`;

export function ListRowSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>ListRow</h1>
      <p css={subheadingStyle}>
        A row component with left/right slots for building lists and menus.
      </p>

      <PreviewBox title="Basic rows" description="Title only" background="white" padding="0">
        <div css={[listContainerStyle, css`width: 100%;`]}>
          <ListRow title="프로필 설정" />
          <ListRow title="알림 설정" />
          <ListRow title="개인정보 처리방침" />
        </div>
      </PreviewBox>

      <CodeBlock code={`<ListRow title="프로필 설정" />`} />

      <PreviewBox title="With description" background="white" padding="0">
        <div css={[listContainerStyle, css`width: 100%;`]}>
          <ListRow title="이메일" description="hong@example.com" />
          <ListRow title="전화번호" description="010-1234-5678" />
          <ListRow title="생년월일" description="1990년 1월 1일" />
        </div>
      </PreviewBox>

      <CodeBlock code={`<ListRow title="이메일" description="hong@example.com" />`} />

      <PreviewBox title="With left/right slots" background="white" padding="0">
        <div css={[listContainerStyle, css`width: 100%;`]}>
          <ListRow
            left={<div css={avatarStyle}>홍</div>}
            title="홍길동"
            description="hong@example.com"
            right={<span css={arrowStyle}>›</span>}
            onClick={() => alert('클릭!')}
          />
          <ListRow
            left={<div css={avatarStyle}>김</div>}
            title="김철수"
            description="kim@example.com"
            right={<span css={badgeStyle}>NEW</span>}
            onClick={() => alert('클릭!')}
          />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<ListRow\n  left={<Avatar />}\n  title="홍길동"\n  description="hong@example.com"\n  right={<span>›</span>}\n  onClick={() => {}}\n/>`}
      />

      <PreviewBox title="Clickable rows" description="Hover to see background change" background="white" padding="0">
        <div css={[listContainerStyle, css`width: 100%;`]}>
          {['계정 관리', '보안', '언어 설정', '도움말'].map((label) => (
            <ListRow
              key={label}
              title={label}
              right={<span css={arrowStyle}>›</span>}
              onClick={() => alert(label)}
            />
          ))}
        </div>
      </PreviewBox>
    </div>
  );
}
