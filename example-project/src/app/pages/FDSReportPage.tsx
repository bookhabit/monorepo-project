import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import styled from '@emotion/styled';
import { ArrowLeft, Shield, X, Monitor, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { DarkFilterBar } from '../components/fds/DarkFilterBar';
import { TransactionFeed } from '../components/fds/TransactionFeed';
import { RiskDrawer } from '../components/fds/RiskDrawer';
import { FDSScreensViewer } from '../components/fds/FDSScreensViewer';
import { RoleIndicator } from '../components/fds/RoleIndicator';
import { useFDSTransactions, useBatchBlock, useBatchUnblock } from '../hooks/use-fds-transactions';
import { useSelectionStore, useUserStore, useStreamStore } from '../store/fds-store';
import { FilterParams, UserRole, Transaction } from '../types/fds';
import { fdsStreaming } from '../services/fds-streaming';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0f172a, #1e293b);
  padding: 24px;
`;

const Header = styled.div`
  max-width: 1600px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid #334155;
  border-radius: 10px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(30, 41, 59, 1);
    border-color: #475569;
    color: #e2e8f0;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
  color: #f1f5f9;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const LiveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #fca5a5;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ef4444;
    box-shadow: 0 0 10px #ef4444;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const RoleSelector = styled.select`
  padding: 10px 16px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid #334155;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  option {
    background: #1e293b;
    color: #e2e8f0;
  }
`;

const ActionButton = styled.button<{ variant?: 'block' | 'unblock' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: ${(props) => 
    props.variant === 'block' 
      ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
      : 'linear-gradient(135deg, #22c55e, #16a34a)'};
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${(props) => 
    props.variant === 'block' 
      ? 'rgba(239, 68, 68, 0.3)' 
      : 'rgba(34, 197, 94, 0.3)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${(props) => 
      props.variant === 'block' 
        ? 'rgba(239, 68, 68, 0.4)' 
        : 'rgba(34, 197, 94, 0.4)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ScreensButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }
`;

const Stats = styled.div`
  max-width: 1600px;
  margin: 0 auto 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const StatCard = styled.div<{ gradient: string }>`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #334155;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.gradient};
  }
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: #f1f5f9;
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const StatTrend = styled.div<{ positive?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.positive ? '#22c55e' : '#ef4444'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MainContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
`;

const SelectionBar = styled.div`
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2));
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
`;

const SelectionInfo = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #93c5fd;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export function FDSReportPage() {
  const [searchParams] = useSearchParams();
  const [realtimeTransactions, setRealtimeTransactions] = useState<Transaction[]>([]);
  const [newTransactionIds, setNewTransactionIds] = useState<Set<string>>(new Set());
  const [showScreens, setShowScreens] = useState(false);

  const { isStreaming } = useStreamStore();

  const filters: FilterParams = {
    status: searchParams.get('status') as any,
    riskLevel: searchParams.get('riskLevel') as any,
    type: searchParams.get('type') as any,
    minAmount: searchParams.get('minAmount') ? parseInt(searchParams.get('minAmount')!) : undefined,
    maxAmount: searchParams.get('maxAmount') ? parseInt(searchParams.get('maxAmount')!) : undefined,
    minRiskScore: searchParams.get('minRiskScore')
      ? parseInt(searchParams.get('minRiskScore')!)
      : undefined,
    search: searchParams.get('search') || undefined,
  };

  const { data: baseTransactions = [], isLoading } = useFDSTransactions(filters);
  const batchBlockMutation = useBatchBlock();
  const batchUnblockMutation = useBatchUnblock();

  const { selectedIds, clearSelection } = useSelectionStore();
  const { role, setRole } = useUserStore();

  // Real-time streaming
  useEffect(() => {
    if (!isStreaming) {
      fdsStreaming.disconnect();
      return;
    }

    fdsStreaming.connect();

    const unsubscribe = fdsStreaming.subscribe((transaction) => {
      setRealtimeTransactions((prev) => [transaction, ...prev].slice(0, 100));
      setNewTransactionIds((prev) => new Set(prev).add(transaction.id));

      // Remove new indicator after 3 seconds
      setTimeout(() => {
        setNewTransactionIds((prev) => {
          const next = new Set(prev);
          next.delete(transaction.id);
          return next;
        });
      }, 3000);
    });

    return () => {
      unsubscribe();
      fdsStreaming.disconnect();
    };
  }, [isStreaming]);

  const allTransactions = useMemo(() => {
    return [...realtimeTransactions, ...baseTransactions];
  }, [realtimeTransactions, baseTransactions]);

  const stats = useMemo(() => {
    const total = allTransactions.length;
    const suspicious = allTransactions.filter((t) => t.status === 'suspicious').length;
    const blocked = allTransactions.filter((t) => t.status === 'blocked').length;
    const critical = allTransactions.filter((t) => t.riskLevel === 'critical').length;

    return { total, suspicious, blocked, critical };
  }, [allTransactions]);

  const handleBatchBlock = () => {
    if (selectedIds.size === 0) return;
    batchBlockMutation.mutate(Array.from(selectedIds), {
      onSuccess: () => clearSelection(),
    });
  };

  const handleBatchUnblock = () => {
    if (selectedIds.size === 0) return;
    if (role === 'monitor') {
      alert('일반 모니터링 요원은 차단 해제 권한이 없습니다.');
      return;
    }
    batchUnblockMutation.mutate(Array.from(selectedIds), {
      onSuccess: () => clearSelection(),
    });
  };

  const canUnblock = role === 'security_manager' || role === 'admin';

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BackButton to="/">
            <ArrowLeft size={18} />
            홈으로
          </BackButton>
          <Title>
            <Shield size={32} color="#ef4444" />
            실시간 이상 거래 탐지
          </Title>
          {isStreaming && (
            <LiveIndicator>
              <Activity size={14} />
              실시간 모니터링
            </LiveIndicator>
          )}
        </HeaderLeft>
        <HeaderActions>
          <RoleIndicator role={role} showPermissions />
          <RoleSelector value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
            <option value="monitor">일반 모니터링 요원</option>
            <option value="security_manager">보안 팀장</option>
            <option value="admin">관리자</option>
          </RoleSelector>
          <ScreensButton onClick={() => setShowScreens(true)}>
            <Monitor size={18} />
            Screens
          </ScreensButton>
        </HeaderActions>
      </Header>

      <Stats>
        <StatCard gradient="#22c55e">
          <StatLabel>전체 거래</StatLabel>
          <StatValue>{stats.total.toLocaleString()}건</StatValue>
        </StatCard>
        <StatCard gradient="#f59e0b">
          <StatLabel>의심 거래</StatLabel>
          <StatValue style={{ color: '#f59e0b' }}>{stats.suspicious.toLocaleString()}건</StatValue>
        </StatCard>
        <StatCard gradient="#ef4444">
          <StatLabel>차단 거래</StatLabel>
          <StatValue style={{ color: '#ef4444' }}>{stats.blocked.toLocaleString()}건</StatValue>
        </StatCard>
        <StatCard gradient="#dc2626">
          <StatLabel>고위험 거래</StatLabel>
          <StatValue style={{ color: '#dc2626' }}>{stats.critical.toLocaleString()}건</StatValue>
        </StatCard>
      </Stats>

      <MainContent>
        <DarkFilterBar />

        {selectedIds.size > 0 && (
          <SelectionBar>
            <SelectionInfo>
              <AlertTriangle size={16} />
              {selectedIds.size}건 선택됨
              {role === 'monitor' && (
                <span style={{ fontSize: '13px', color: '#fcd34d', marginLeft: '8px' }}>
                  (일반 요원: 차단만 가능)
                </span>
              )}
            </SelectionInfo>
            <div style={{ display: 'flex', gap: '8px' }}>
              <ActionButton variant="block" onClick={handleBatchBlock}>
                <Shield size={16} />
                일괄 차단
              </ActionButton>
              {canUnblock ? (
                <ActionButton variant="unblock" onClick={handleBatchUnblock}>
                  <X size={16} />
                  차단 해제
                </ActionButton>
              ) : null}
            </div>
          </SelectionBar>
        )}

        <TransactionFeed
          transactions={allTransactions}
          newTransactionIds={newTransactionIds}
        />
      </MainContent>

      <RiskDrawer />
      
      {showScreens && <FDSScreensViewer onClose={() => setShowScreens(false)} />}
    </Container>
  );
}