/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import type { FC } from 'react';
import { colors } from '../../../foundation/colors';
import type { IconProps } from '../.././../icons/types';
import type { IconButtonProps } from './IconButton.types';

// ─── 아이콘 레지스트리 ─────────────────────────────────────────────────────
// name prop으로 @mono/ui 아이콘을 참조할 때 사용
// 동적 import 없이 트리쉐이킹 유지
import { AlertCircleIcon } from '../../../icons/generated/AlertCircle';
import { AlertTriangleIcon } from '../../../icons/generated/AlertTriangle';
import { ArrowLeftIcon } from '../../../icons/generated/ArrowLeft';
import { ArrowRightIcon } from '../../../icons/generated/ArrowRight';
import { BankIcon } from '../../../icons/generated/Bank';
import { CalendarIcon } from '../../../icons/generated/Calendar';
import { CameraIcon } from '../../../icons/generated/Camera';
import { CardIcon } from '../../../icons/generated/Card';
import { ChartBarIcon } from '../../../icons/generated/ChartBar';
import { ChartLineIcon } from '../../../icons/generated/ChartLine';
import { CheckIcon } from '../../../icons/generated/Check';
import { CheckCircleIcon } from '../../../icons/generated/CheckCircle';
import { ChevronDownIcon } from '../../../icons/generated/ChevronDown';
import { ChevronLeftIcon } from '../../../icons/generated/ChevronLeft';
import { ChevronRightIcon } from '../../../icons/generated/ChevronRight';
import { ChevronUpIcon } from '../../../icons/generated/ChevronUp';
import { ClipboardIcon } from '../../../icons/generated/Clipboard';
import { CloseIcon } from '../../../icons/generated/Close';
import { CoinIcon } from '../../../icons/generated/Coin';
import { CopyIcon } from '../../../icons/generated/Copy';
import { DeleteIcon } from '../../../icons/generated/Delete';
import { DocumentIcon } from '../../../icons/generated/Document';
import { DownloadIcon } from '../../../icons/generated/Download';
import { EditIcon } from '../../../icons/generated/Edit';
import { ExchangeIcon } from '../../../icons/generated/Exchange';
import { EyeIcon } from '../../../icons/generated/Eye';
import { EyeOffIcon } from '../../../icons/generated/EyeOff';
import { FilterIcon } from '../../../icons/generated/Filter';
import { HistoryIcon } from '../../../icons/generated/History';
import { HomeIcon } from '../../../icons/generated/Home';
import { InfoCircleIcon } from '../../../icons/generated/InfoCircle';
import { LockIcon } from '../../../icons/generated/Lock';
import { MailIcon } from '../../../icons/generated/Mail';
import { MenuIcon } from '../../../icons/generated/Menu';
import { MinusIcon } from '../../../icons/generated/Minus';
import { MoreHorizontalIcon } from '../../../icons/generated/MoreHorizontal';
import { MoreVerticalIcon } from '../../../icons/generated/MoreVertical';
import { NotificationIcon } from '../../../icons/generated/Notification';
import { PhoneIcon } from '../../../icons/generated/Phone';
import { PlusIcon } from '../../../icons/generated/Plus';
import { ProfileIcon } from '../../../icons/generated/Profile';
import { ReceiptIcon } from '../../../icons/generated/Receipt';
import { RefreshIcon } from '../../../icons/generated/Refresh';
import { SearchIcon } from '../../../icons/generated/Search';
import { SettingsIcon } from '../../../icons/generated/Settings';
import { ShareIcon } from '../../../icons/generated/Share';
import { StockDownIcon } from '../../../icons/generated/StockDown';
import { StockUpIcon } from '../../../icons/generated/StockUp';
import { TransferIcon } from '../../../icons/generated/Transfer';
import { UploadIcon } from '../../../icons/generated/Upload';
import { WalletIcon } from '../../../icons/generated/Wallet';
import { XCircleIcon } from '../../../icons/generated/XCircle';

const iconRegistry: Record<string, FC<IconProps>> = {
  AlertCircle: AlertCircleIcon,
  AlertTriangle: AlertTriangleIcon,
  ArrowLeft: ArrowLeftIcon,
  ArrowRight: ArrowRightIcon,
  Bank: BankIcon,
  Calendar: CalendarIcon,
  Camera: CameraIcon,
  Card: CardIcon,
  ChartBar: ChartBarIcon,
  ChartLine: ChartLineIcon,
  Check: CheckIcon,
  CheckCircle: CheckCircleIcon,
  ChevronDown: ChevronDownIcon,
  ChevronLeft: ChevronLeftIcon,
  ChevronRight: ChevronRightIcon,
  ChevronUp: ChevronUpIcon,
  Clipboard: ClipboardIcon,
  Close: CloseIcon,
  Coin: CoinIcon,
  Copy: CopyIcon,
  Delete: DeleteIcon,
  Document: DocumentIcon,
  Download: DownloadIcon,
  Edit: EditIcon,
  Exchange: ExchangeIcon,
  Eye: EyeIcon,
  EyeOff: EyeOffIcon,
  Filter: FilterIcon,
  History: HistoryIcon,
  Home: HomeIcon,
  InfoCircle: InfoCircleIcon,
  Lock: LockIcon,
  Mail: MailIcon,
  Menu: MenuIcon,
  Minus: MinusIcon,
  MoreHorizontal: MoreHorizontalIcon,
  MoreVertical: MoreVerticalIcon,
  Notification: NotificationIcon,
  Phone: PhoneIcon,
  Plus: PlusIcon,
  Profile: ProfileIcon,
  Receipt: ReceiptIcon,
  Refresh: RefreshIcon,
  Search: SearchIcon,
  Settings: SettingsIcon,
  Share: ShareIcon,
  StockDown: StockDownIcon,
  StockUp: StockUpIcon,
  Transfer: TransferIcon,
  Upload: UploadIcon,
  Wallet: WalletIcon,
  XCircle: XCircleIcon,
};

// ─── 스타일 ────────────────────────────────────────────────────────────────

const baseStyle = (iconSize: number) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 8px;
  width: ${iconSize + 16}px;
  height: ${iconSize + 16}px;
  flex-shrink: 0;
  transition: background-color 0.1s ease, opacity 0.1s ease;
  background: none;
  outline: none;
  font-family: inherit;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const variantStyle = (
  variant: 'clear' | 'fill' | 'border',
  bgColor: string,
) => {
  if (variant === 'fill') {
    return css`
      background-color: ${bgColor};
      &:hover:not(:disabled) {
        opacity: 0.85;
      }
      &:active:not(:disabled) {
        background-color: transparent;
      }
    `;
  }
  if (variant === 'border') {
    return css`
      border: 1.5px solid ${colors.grey200};
      &:hover:not(:disabled) {
        background-color: ${bgColor}80;
      }
      &:active:not(:disabled) {
        background-color: ${bgColor};
      }
    `;
  }
  // clear
  return css`
    &:hover:not(:disabled) {
      background-color: ${bgColor}80;
    }
    &:active:not(:disabled) {
      background-color: ${bgColor};
    }
  `;
};

// ─── 아이콘 렌더러 ─────────────────────────────────────────────────────────

function renderIcon(
  props: Pick<IconButtonProps, 'src' | 'name' | 'color' | 'iconSize'>,
) {
  const { src, name, color, iconSize = 24 } = props;

  // name → 레지스트리 조회
  if (name) {
    const IconComponent = iconRegistry[name];
    if (!IconComponent) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[IconButton] Unknown icon name: "${name}"`);
      }
      return null;
    }
    return <IconComponent size={iconSize} color={color ?? 'currentColor'} />;
  }

  // src + color → CSS mask로 색상 적용
  if (src && color) {
    return (
      <span
        style={{
          display: 'inline-block',
          width: iconSize,
          height: iconSize,
          backgroundColor: color,
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          flexShrink: 0,
        }}
        aria-hidden
      />
    );
  }

  // src 단독 → img 태그
  if (src) {
    return (
      <img
        src={src}
        width={iconSize}
        height={iconSize}
        alt=""
        aria-hidden
        style={{ display: 'block', flexShrink: 0 }}
      />
    );
  }

  return null;
}

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────

export function IconButton({
  variant = 'clear',
  src,
  name,
  color,
  bgColor = colors.grey100,
  iconSize = 24,
  'aria-label': ariaLabel,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      css={[baseStyle(iconSize), variantStyle(variant, bgColor)]}
      aria-label={ariaLabel}
      {...rest}
    >
      {renderIcon({ src, name, color, iconSize })}
      {children}
    </button>
  );
}
