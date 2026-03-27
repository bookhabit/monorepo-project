/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { IconButton, colors, typography, spacing } from '@mono/ui';
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

const rowStyle = css`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  flex-wrap: wrap;
`;

export function IconButtonSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>IconButton</h1>
      <p css={subheadingStyle}>
        Accessible icon-only button with three variants. Supports icon registry names, SVG URLs
        with color masking, and raw image URLs.
      </p>

      <PreviewBox title="Variants" description="clear, fill, border">
        <div css={rowStyle}>
          <IconButton variant="clear" name="Search" aria-label="검색" />
          <IconButton variant="fill" name="Plus" bgColor={colors.blue500} color="#fff" aria-label="추가" />
          <IconButton variant="border" name="Settings" aria-label="설정" />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<IconButton variant="clear" name="Search" aria-label="검색" />
<IconButton variant="fill" name="Plus" bgColor={colors.blue500} color="#fff" aria-label="추가" />
<IconButton variant="border" name="Settings" aria-label="설정" />`}
      />

      <PreviewBox title="Icon Registry Names" description="name prop으로 @mono/ui 아이콘 참조">
        <div css={rowStyle}>
          <IconButton name="Home" aria-label="홈" />
          <IconButton name="Notification" aria-label="알림" />
          <IconButton name="Calendar" aria-label="캘린더" />
          <IconButton name="ChevronLeft" aria-label="뒤로" />
          <IconButton name="ChevronRight" aria-label="앞으로" />
          <IconButton name="Close" aria-label="닫기" />
          <IconButton name="Delete" aria-label="삭제" />
          <IconButton name="Edit" aria-label="편집" />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<IconButton name="Home" aria-label="홈" />
<IconButton name="Calendar" aria-label="캘린더" />
<IconButton name="Close" aria-label="닫기" />`}
      />

      <PreviewBox title="Colors" description="color + bgColor 조합">
        <div css={rowStyle}>
          <IconButton
            variant="fill"
            name="AlertCircle"
            color="#fff"
            bgColor={colors.red500}
            aria-label="경고"
          />
          <IconButton
            variant="fill"
            name="CheckCircle"
            color="#fff"
            bgColor={colors.green500}
            aria-label="완료"
          />
          <IconButton
            variant="fill"
            name="InfoCircle"
            color="#fff"
            bgColor={colors.blue500}
            aria-label="정보"
          />
          <IconButton
            variant="border"
            name="Notification"
            color={colors.blue500}
            aria-label="알림"
          />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<IconButton variant="fill" name="AlertCircle" color="#fff" bgColor={colors.red500} aria-label="경고" />
<IconButton variant="fill" name="CheckCircle" color="#fff" bgColor={colors.green500} aria-label="완료" />
<IconButton variant="border" name="Notification" color={colors.blue500} aria-label="알림" />`}
      />

      <PreviewBox title="Sizes" description="iconSize prop (default: 24)">
        <div css={rowStyle}>
          <IconButton name="Search" iconSize={16} aria-label="검색 (소)" />
          <IconButton name="Search" iconSize={20} aria-label="검색 (중소)" />
          <IconButton name="Search" iconSize={24} aria-label="검색 (기본)" />
          <IconButton name="Search" iconSize={32} aria-label="검색 (대)" />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<IconButton name="Search" iconSize={16} aria-label="검색" />
<IconButton name="Search" iconSize={20} aria-label="검색" />
<IconButton name="Search" iconSize={24} aria-label="검색" />
<IconButton name="Search" iconSize={32} aria-label="검색" />`}
      />

      <PreviewBox title="Disabled" description="disabled 상태 — opacity 0.4, cursor not-allowed">
        <div css={rowStyle}>
          <IconButton variant="clear" name="Edit" aria-label="편집" disabled />
          <IconButton variant="fill" name="Plus" bgColor={colors.blue500} color="#fff" aria-label="추가" disabled />
          <IconButton variant="border" name="Settings" aria-label="설정" disabled />
        </div>
      </PreviewBox>

      <CodeBlock
        code={`<IconButton variant="clear" name="Edit" aria-label="편집" disabled />
<IconButton variant="fill" name="Plus" bgColor={colors.blue500} color="#fff" aria-label="추가" disabled />
<IconButton variant="border" name="Settings" aria-label="설정" disabled />`}
      />

      <PreviewBox
        title="Props"
        description="IconButtonProps 전체 목록"
      >
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13 }}>
          <thead>
            <tr style={{ background: colors.grey100 }}>
              {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: colors.grey700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['aria-label', 'string', '(required)', '접근성 필수값'],
              ['variant', "'clear' | 'fill' | 'border'", "'clear'", '버튼 형태'],
              ['name', 'string', '—', '@mono/ui 아이콘 이름 (e.g. "Search")'],
              ['src', 'string', '—', '아이콘 이미지 URL'],
              ['color', 'string', '—', '아이콘 색상 (CSS mask 적용)'],
              ['bgColor', 'string', 'colors.grey100', '배경색'],
              ['iconSize', 'number', '24', '아이콘 크기(px)'],
            ].map(([prop, type, def, desc]) => (
              <tr key={prop} style={{ borderBottom: `1px solid ${colors.grey100}` }}>
                <td style={{ padding: '8px 12px', color: colors.blue600, fontFamily: 'monospace' }}>{prop}</td>
                <td style={{ padding: '8px 12px', color: colors.grey600, fontFamily: 'monospace' }}>{type}</td>
                <td style={{ padding: '8px 12px', color: colors.grey500 }}>{def}</td>
                <td style={{ padding: '8px 12px', color: colors.grey700 }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PreviewBox>
    </div>
  );
}
