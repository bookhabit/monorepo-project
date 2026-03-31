import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { Search, Crown, Award, Circle, UserCircle } from 'lucide-react';
import { useCustomers } from '../../hooks/use-cs-console';
import { useCSConsoleStore } from '../../store/cs-console-store';
import { CustomerFilters } from '../../types/cs-console';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-right: 1px solid #e2e8f0;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px 0;
`;

const SearchBox = styled.div`
  position: relative;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${props => props.active ? '#3b82f6' : '#e2e8f0'};
  border-radius: 6px;
  background: ${props => props.active ? 'rgba(59, 130, 246, 0.1)' : 'white'};
  color: ${props => props.active ? '#3b82f6' : '#64748b'};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }
`;

const CustomerListContainer = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
`;

const CustomerItem = styled.div<{ selected?: boolean }>`
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? 'rgba(59, 130, 246, 0.05)' : 'white'};
  border-left: 3px solid ${props => props.selected ? '#3b82f6' : 'transparent'};

  &:hover {
    background: rgba(59, 130, 246, 0.05);
  }
`;

const CustomerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CustomerName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TierBadge = styled.div<{ tier: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  
  ${props => {
    switch (props.tier) {
      case 'vip':
        return `
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: white;
        `;
      case 'gold':
        return `
          background: linear-gradient(135deg, #fcd34d, #fbbf24);
          color: #92400e;
        `;
      case 'silver':
        return `
          background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
          color: #475569;
        `;
      default:
        return `
          background: linear-gradient(135deg, #d6bcfa, #a78bfa);
          color: white;
        `;
    }
  }}
`;

const CustomerInfo = styled.div`
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
`;

const StatusDot = styled.div<{ status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch (props.status) {
      case 'active': return '#22c55e';
      case 'dormant': return '#f59e0b';
      case 'restricted': return '#ef4444';
      default: return '#94a3b8';
    }
  }};
`;

function CustomerListContent({ filters }: { filters: CustomerFilters }) {
  const { data: customers = [] } = useCustomers(filters);
  const { selectedCustomerId, selectCustomer } = useCSConsoleStore();

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'vip': return <Crown size={14} />;
      case 'gold': return <Award size={14} />;
      default: return <Circle size={14} />;
    }
  };

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'vip': return 'VIP';
      case 'gold': return 'GOLD';
      case 'silver': return 'SILVER';
      case 'bronze': return 'BRONZE';
      default: return tier.toUpperCase();
    }
  };

  return (
    <CustomerListContainer>
      {customers.map(customer => (
        <CustomerItem
          key={customer.id}
          selected={selectedCustomerId === customer.id}
          onClick={() => selectCustomer(customer.id)}
        >
          <CustomerHeader>
            <CustomerName>
              <UserCircle size={20} />
              {customer.name}
            </CustomerName>
            <TierBadge tier={customer.tier}>
              {getTierIcon(customer.tier)}
              {getTierLabel(customer.tier)}
            </TierBadge>
          </CustomerHeader>
          <CustomerInfo>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <StatusDot status={customer.status} />
              {customer.email}
            </div>
            <div>{customer.phone}</div>
            <div style={{ marginTop: '4px', fontSize: '12px', color: '#94a3b8' }}>
              자산: {customer.totalAssets.toLocaleString()}원
            </div>
          </CustomerInfo>
        </CustomerItem>
      ))}
      {customers.length === 0 && (
        <div style={{ padding: '48px 20px', textAlign: 'center', color: '#94a3b8' }}>
          검색 결과가 없습니다
        </div>
      )}
    </CustomerListContainer>
  );
}

export function CustomerList() {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const filters: CustomerFilters = {
    search: search || undefined,
    tier: tierFilter as any,
    status: statusFilter as any,
  };

  return (
    <Container>
      <Header>
        <Title>고객 목록</Title>
        <SearchBox>
          <SearchIcon size={18} />
          <SearchInput
            type="text"
            placeholder="이름, 이메일, 전화번호로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>
        <Filters>
          <FilterButton
            active={tierFilter === 'vip'}
            onClick={() => setTierFilter(tierFilter === 'vip' ? undefined : 'vip')}
          >
            VIP
          </FilterButton>
          <FilterButton
            active={statusFilter === 'active'}
            onClick={() => setStatusFilter(statusFilter === 'active' ? undefined : 'active')}
          >
            활성
          </FilterButton>
          <FilterButton
            active={!!tierFilter || !!statusFilter}
            onClick={() => {
              setTierFilter(undefined);
              setStatusFilter(undefined);
            }}
          >
            초기화
          </FilterButton>
        </Filters>
      </Header>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner text="고객 목록 불러오는 중..." />}>
          <CustomerListContent filters={filters} />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
}
