/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import {
  MobileLayout,
  AppHeader,
  BottomTabBar,
  SafeAreaWrapper,
  colors,
  typography,
  spacing,
  type TabItem,
} from '@mono/ui';
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

/* 모바일 프리뷰 프레임 */
const phoneFrameStyle = css`
  width: 375px;
  height: 668px;
  border: 2px solid ${colors.grey200};
  border-radius: 40px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
  background-color: ${colors.background};
`;

const tabContentStyle = css`
  padding: ${spacing[5]};
`;

const tabContentTitleStyle = css`
  ${typography.heading3};
  color: ${colors.grey900};
  margin: 0 0 ${spacing[3]};
`;

const tabContentBodyStyle = css`
  ${typography.body2};
  color: ${colors.grey500};
`;

const DEMO_TABS: TabItem[] = [
  {
    key: 'home',
    label: '홈',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: 'history',
    label: '내역',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path d="M7 9H17M7 13H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'settings',
    label: '설정',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path
          d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const TAB_LABELS: Record<string, string> = {
  home: '홈 화면',
  history: '거래 내역',
  settings: '설정',
};

function MobilePreview() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div css={phoneFrameStyle}>
      <MobileLayout
        header={{
          title: TAB_LABELS[activeTab] ?? '홈',
          ...(activeTab !== 'home' && { onBack: () => setActiveTab('home') }),
          rightSlot: (
            <button
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: colors.grey600,
              }}
              type="button"
              aria-label="설정"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <path
                  d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ),
        }}
        tabs={{ tabs: DEMO_TABS, activeKey: activeTab, onChange: setActiveTab }}
      >
        <div css={tabContentStyle}>
          <h2 css={tabContentTitleStyle}>{TAB_LABELS[activeTab] ?? '홈'}</h2>
          <p css={tabContentBodyStyle}>
            {activeTab === 'home' && '주식 계좌 잔고, 보유 종목 요약이 여기에 표시됩니다.'}
            {activeTab === 'history' && '최근 거래 내역 목록이 여기에 표시됩니다.'}
            {activeTab === 'settings' && '알림, 보안, 앱 정보 설정이 여기에 표시됩니다.'}
          </p>
        </div>
      </MobileLayout>
    </div>
  );
}

function AppHeaderPreview() {
  return (
    <div css={css`width: 375px; border: 2px solid ${colors.grey200}; border-radius: 12px; overflow: hidden;`}>
      <AppHeader
        title="주식 계좌 개설"
        onBack={() => {}}
        rightSlot={
          <button
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '8px', color: colors.grey600 }}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="7" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="17" r="1.5" fill="currentColor" />
            </svg>
          </button>
        }
      />
    </div>
  );
}

function BottomTabPreview() {
  const [active, setActive] = useState('home');
  return (
    <div css={css`width: 375px; border: 2px solid ${colors.grey200}; border-radius: 12px; overflow: hidden; position: relative;`}>
      <BottomTabBar tabs={DEMO_TABS} activeKey={active} onChange={setActive} />
    </div>
  );
}

function SafeAreaPreview() {
  return (
    <SafeAreaWrapper edges={['top', 'bottom']}>
      <div css={css`
        padding: ${spacing[4]};
        background-color: ${colors.blue50};
        border-radius: 8px;
        ${typography.body2};
        color: ${colors.blue700};
      `}>
        SafeAreaWrapper: env(safe-area-inset-*) 패딩 자동 적용
      </div>
    </SafeAreaWrapper>
  );
}

export function MobileLayoutSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>MobileLayout</h1>
      <p css={subheadingStyle}>
        모바일 웹뷰를 앱처럼 만드는 레이아웃 컴포넌트. AppHeader + BottomTabBar + SafeAreaWrapper로 구성됩니다.
      </p>

      <PreviewBox
        title="MobileLayout (전체 조합)"
        description="AppHeader + BottomTabBar + 콘텐츠 영역. 탭을 클릭해 전환해보세요."
      >
        <MobilePreview />
      </PreviewBox>

      <CodeBlock code={`<MobileLayout
  header={{
    title: "홈 화면",
    onBack: () => router.back(),
    rightSlot: <SettingsIcon />,
  }}
  tabs={{
    tabs: [
      { key: "home", label: "홈", icon: <HomeIcon /> },
      { key: "history", label: "내역", icon: <ListIcon /> },
      { key: "settings", label: "설정", icon: <SettingsIcon /> },
    ],
    activeKey: activeTab,
    onChange: setActiveTab,
  }}
>
  {children}
</MobileLayout>`} />

      <PreviewBox title="AppHeader" description="뒤로가기 · 타이틀 · 우측 액션 슬롯">
        <AppHeaderPreview />
      </PreviewBox>

      <CodeBlock code={`<AppHeader
  title="주식 계좌 개설"
  onBack={() => router.back()}
  rightSlot={<MoreIcon />}
/>`} />

      <PreviewBox title="BottomTabBar" description="활성 탭은 파란색으로 표시됩니다.">
        <BottomTabPreview />
      </PreviewBox>

      <CodeBlock code={`<BottomTabBar
  tabs={tabs}
  activeKey={activeTab}
  onChange={setActiveTab}
/>`} />

      <PreviewBox title="SafeAreaWrapper" description="iOS 노치·홈바 영역을 안전하게 피합니다.">
        <SafeAreaPreview />
      </PreviewBox>

      <CodeBlock code={`// 기본: top + bottom 모두 적용
<SafeAreaWrapper>...</SafeAreaWrapper>

// 특정 방향만
<SafeAreaWrapper edges={["bottom"]}>...</SafeAreaWrapper>`} />
    </div>
  );
}
