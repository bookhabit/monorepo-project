import {
  // Navigation
  HomeIcon,
  SettingsIcon,
  // Chevron
  ChevronUpIcon,
} from '@mono/ui';
import AccountCard from '../components/AccountCard';

/**
 *
 * @param {object} props - 컴포넌트 props
 * @param {number} props.cash - 보유 현금
 * @param {number} props.stockQuantity - 보유 주식 수량
 * @returns
 */

interface AccountViewProps {
  cash: number;
  stockQuantity: number;
}

export default function AccountView({ cash, stockQuantity }: AccountViewProps) {
  return (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      {/* 보유 현금 */}
      <AccountCard
        type="cash"
        icon={<HomeIcon />}
        title="보유 현금"
        value={cash}
        unit="원"
        subText="주문 가능 금액"
      />

      {/* 보유 주식 */}
      <AccountCard
        type="stock"
        icon={<ChevronUpIcon />}
        title="보유 주식"
        value={stockQuantity}
        unit="주"
        subText="KOSPI200"
      />

      {/* 총 평가액 - type="total"로 초록색 하이라이트 적용 */}
      <AccountCard
        type="total"
        icon={<SettingsIcon />}
        title="총 평가액"
        value={10000000}
        unit="원"
        subText="+0원 (+0.00%)"
      />
    </div>
  );
}
