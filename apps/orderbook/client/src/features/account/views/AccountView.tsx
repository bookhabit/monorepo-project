import {
  // Navigation
  HomeIcon,
  SettingsIcon,
  // Chevron
  ChevronUpIcon,
} from '@mono/ui';
import AccountCard from '../components/AccountCard';

export default function AccountView() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      {/* 보유 현금 */}
      <AccountCard
        type="cash"
        icon={<HomeIcon />}
        title="보유 현금"
        value={10000000}
        unit="원"
        subText="주문 가능 금액"
      />

      {/* 보유 주식 */}
      <AccountCard
        type="stock"
        icon={<ChevronUpIcon />}
        title="보유 주식"
        value={0}
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
