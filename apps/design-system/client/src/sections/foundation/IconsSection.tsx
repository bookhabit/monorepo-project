/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import React, { useState } from 'react';
import {
  // Navigation
  HomeIcon, HistoryIcon, SettingsIcon, ProfileIcon, NotificationIcon, SearchIcon, MenuIcon,
  // Chevron
  ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, ArrowLeftIcon, ArrowRightIcon,
  // Action
  CloseIcon, CheckIcon, PlusIcon, MinusIcon, EditIcon, DeleteIcon,
  MoreVerticalIcon, MoreHorizontalIcon, FilterIcon, UploadIcon, DownloadIcon, CopyIcon, RefreshIcon, ShareIcon,
  // Status
  CheckCircleIcon, XCircleIcon, AlertCircleIcon, InfoCircleIcon, AlertTriangleIcon, LockIcon, EyeIcon, EyeOffIcon,
  // Finance
  WalletIcon, CardIcon, TransferIcon, ChartLineIcon, ChartBarIcon, ExchangeIcon, BankIcon, ReceiptIcon, CoinIcon, StockUpIcon, StockDownIcon,
  // Media
  ImageIcon, CameraIcon, DocumentIcon, CalendarIcon, ClipboardIcon, PhoneIcon, MailIcon,
  colors, typography, spacing,
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

const sectionLabelStyle = css`
  ${typography.captionBold};
  color: ${colors.grey500};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin: 0 0 ${spacing[3]};
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: ${spacing[2]};
`;

const iconCardStyle = (copied: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[2]};
  border-radius: 10px;
  border: 1.5px solid ${copied ? colors.blue200 : colors.grey100};
  background-color: ${copied ? colors.blue50 : colors.background};
  cursor: pointer;
  transition: all 0.15s ease;
  min-height: 76px;

  &:hover {
    border-color: ${colors.blue200};
    background-color: ${colors.blue50};
  }
`;

const iconNameStyle = css`
  ${typography.caption};
  color: ${colors.grey500};
  text-align: center;
  word-break: break-all;
  font-size: 10px;
  line-height: 1.4;
`;

const sizeControlStyle = css`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[5]};
`;

const sizeButtonStyle = (active: boolean) => css`
  padding: ${spacing[1]} ${spacing[3]};
  border-radius: 6px;
  border: 1.5px solid ${active ? colors.blue500 : colors.grey200};
  background-color: ${active ? colors.blue500 : colors.background};
  color: ${active ? '#fff' : colors.grey700};
  ${typography.captionBold};
  cursor: pointer;
  transition: all 0.15s ease;
`;

const colorSelectorStyle = css`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;

const colorDotStyle = (color: string, active: boolean) => css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${color};
  cursor: pointer;
  border: 2px solid ${active ? colors.grey900 : 'transparent'};
  transition: border-color 0.15s;
`;

type IconEntry = { name: string; component: React.ReactElement };

const ICON_GROUPS: { label: string; icons: IconEntry[] }[] = [
  {
    label: 'Navigation',
    icons: [
      { name: 'HomeIcon', component: <HomeIcon /> },
      { name: 'HistoryIcon', component: <HistoryIcon /> },
      { name: 'SettingsIcon', component: <SettingsIcon /> },
      { name: 'ProfileIcon', component: <ProfileIcon /> },
      { name: 'NotificationIcon', component: <NotificationIcon /> },
      { name: 'SearchIcon', component: <SearchIcon /> },
      { name: 'MenuIcon', component: <MenuIcon /> },
    ],
  },
  {
    label: 'Chevron & Arrow',
    icons: [
      { name: 'ChevronLeftIcon', component: <ChevronLeftIcon /> },
      { name: 'ChevronRightIcon', component: <ChevronRightIcon /> },
      { name: 'ChevronDownIcon', component: <ChevronDownIcon /> },
      { name: 'ChevronUpIcon', component: <ChevronUpIcon /> },
      { name: 'ArrowLeftIcon', component: <ArrowLeftIcon /> },
      { name: 'ArrowRightIcon', component: <ArrowRightIcon /> },
    ],
  },
  {
    label: 'Action',
    icons: [
      { name: 'CloseIcon', component: <CloseIcon /> },
      { name: 'CheckIcon', component: <CheckIcon /> },
      { name: 'PlusIcon', component: <PlusIcon /> },
      { name: 'MinusIcon', component: <MinusIcon /> },
      { name: 'EditIcon', component: <EditIcon /> },
      { name: 'DeleteIcon', component: <DeleteIcon /> },
      { name: 'MoreVerticalIcon', component: <MoreVerticalIcon /> },
      { name: 'MoreHorizontalIcon', component: <MoreHorizontalIcon /> },
      { name: 'FilterIcon', component: <FilterIcon /> },
      { name: 'UploadIcon', component: <UploadIcon /> },
      { name: 'DownloadIcon', component: <DownloadIcon /> },
      { name: 'CopyIcon', component: <CopyIcon /> },
      { name: 'RefreshIcon', component: <RefreshIcon /> },
      { name: 'ShareIcon', component: <ShareIcon /> },
    ],
  },
  {
    label: 'Status',
    icons: [
      { name: 'CheckCircleIcon', component: <CheckCircleIcon /> },
      { name: 'XCircleIcon', component: <XCircleIcon /> },
      { name: 'AlertCircleIcon', component: <AlertCircleIcon /> },
      { name: 'InfoCircleIcon', component: <InfoCircleIcon /> },
      { name: 'AlertTriangleIcon', component: <AlertTriangleIcon /> },
      { name: 'LockIcon', component: <LockIcon /> },
      { name: 'EyeIcon', component: <EyeIcon /> },
      { name: 'EyeOffIcon', component: <EyeOffIcon /> },
    ],
  },
  {
    label: 'Finance',
    icons: [
      { name: 'WalletIcon', component: <WalletIcon /> },
      { name: 'CardIcon', component: <CardIcon /> },
      { name: 'TransferIcon', component: <TransferIcon /> },
      { name: 'ChartLineIcon', component: <ChartLineIcon /> },
      { name: 'ChartBarIcon', component: <ChartBarIcon /> },
      { name: 'ExchangeIcon', component: <ExchangeIcon /> },
      { name: 'BankIcon', component: <BankIcon /> },
      { name: 'ReceiptIcon', component: <ReceiptIcon /> },
      { name: 'CoinIcon', component: <CoinIcon /> },
      { name: 'StockUpIcon', component: <StockUpIcon /> },
      { name: 'StockDownIcon', component: <StockDownIcon /> },
    ],
  },
  {
    label: 'Media & Content',
    icons: [
      { name: 'ImageIcon', component: <ImageIcon /> },
      { name: 'CameraIcon', component: <CameraIcon /> },
      { name: 'DocumentIcon', component: <DocumentIcon /> },
      { name: 'CalendarIcon', component: <CalendarIcon /> },
      { name: 'ClipboardIcon', component: <ClipboardIcon /> },
      { name: 'PhoneIcon', component: <PhoneIcon /> },
      { name: 'MailIcon', component: <MailIcon /> },
    ],
  },
];

const SIZES = [16, 20, 24, 32];
const COLOR_OPTIONS = [
  { label: 'default', value: colors.grey700 },
  { label: 'blue', value: colors.blue500 },
  { label: 'red', value: colors.red500 },
  { label: 'green', value: colors.green500 },
];

function IconCard({ name, component, size, color }: IconEntry & { size: number; color: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(`<${name} size={${size}} />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button css={iconCardStyle(copied)} onClick={handleClick} type="button" title={`클릭해서 복사: <${name} />`}>
      <span style={{ color, display: 'flex' }}>
        {/* size/color props를 동적으로 주입 */}
        {React.cloneElement(component, { size, color })}
      </span>
      <span css={iconNameStyle}>{name.replace('Icon', '')}</span>
    </button>
  );
}

export function IconsSection() {
  const [size, setSize] = useState(24);
  const [color, setColor] = useState(colors.grey700);

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Icons</h1>
      <p css={subheadingStyle}>
        <code>@mono/ui</code>에서 제공하는 45개 아이콘. 클릭하면 JSX 코드가 클립보드에 복사됩니다.
      </p>

      <div css={sizeControlStyle}>
        <span css={css`${typography.captionBold}; color: ${colors.grey600};`}>Size</span>
        {SIZES.map((s) => (
          <button key={s} css={sizeButtonStyle(size === s)} onClick={() => setSize(s)} type="button">
            {s}
          </button>
        ))}
        <span css={css`${typography.captionBold}; color: ${colors.grey600}; margin-left: ${spacing[3]};`}>Color</span>
        <div css={colorSelectorStyle}>
          {COLOR_OPTIONS.map((opt) => (
            <div
              key={opt.label}
              css={colorDotStyle(opt.value, color === opt.value)}
              onClick={() => setColor(opt.value)}
              title={opt.label}
            />
          ))}
        </div>
      </div>

      {ICON_GROUPS.map((group) => (
        <div key={group.label} css={css`margin-bottom: ${spacing[8]};`}>
          <p css={sectionLabelStyle}>{group.label}</p>
          <div css={gridStyle}>
            {group.icons.map((icon) => (
              <IconCard key={icon.name} {...icon} size={size} color={color} />
            ))}
          </div>
        </div>
      ))}

      <PreviewBox title="사용 예시" description="size, color, strokeWidth props">
        <div css={css`display: flex; gap: ${spacing[4]}; align-items: center; flex-wrap: wrap;`}>
          <CheckCircleIcon size={32} color={colors.success} />
          <XCircleIcon size={32} color={colors.error} />
          <AlertTriangleIcon size={32} color={colors.warning} />
          <InfoCircleIcon size={32} color={colors.blue500} />
          <StockUpIcon size={28} color={colors.green500} />
          <StockDownIcon size={28} color={colors.red500} />
          <TransferIcon size={28} color={colors.blue600} />
          <WalletIcon size={28} color={colors.purple500} />
        </div>
      </PreviewBox>

      <CodeBlock code={`import { HomeIcon, ChevronLeftIcon, WalletIcon } from '@mono/ui';

// 기본 (24px, currentColor)
<HomeIcon />

// 크기, 색상 지정
<WalletIcon size={28} color={colors.blue500} />

// strokeWidth 조정
<ChevronLeftIcon size={20} strokeWidth={2.5} />

// aria-label (접근성)
<SearchIcon aria-label="검색" />`} />
    </div>
  );
}
