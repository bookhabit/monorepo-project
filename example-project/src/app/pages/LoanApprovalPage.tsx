import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import styled from '@emotion/styled';
import { ArrowLeft, CheckCheck, X, Monitor, Users, Shield } from 'lucide-react';
import { FilterBar } from '../components/loan/FilterBar';
import { ApplicationTable } from '../components/loan/ApplicationTable';
import { ApplicationDrawer } from '../components/loan/ApplicationDrawer';
import { useLoanApplications, useBatchApprove, useBatchReject } from '../hooks/use-loan-applications';
import { useSelectionStore, useUserStore } from '../store/loan-store';
import { FilterParams, UserRole } from '../types/loan';

const Container = styled.div`
  min-height: 100vh;
  background: #f9fafb;
  padding: 24px;
`;

const Header = styled.div`
  max-width: 1400px;
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
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
    color: #111827;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const RoleSelector = styled.select`
  padding: 10px 16px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ActionButton = styled.button<{ variant?: 'approve' | 'reject' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: ${(props) => (props.variant === 'approve' ? '#22c55e' : '#ef4444')};
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.variant === 'approve' ? '#16a34a' : '#dc2626')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ScreensButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Stats = styled.div`
  max-width: 1400px;
  margin: 0 auto 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SelectionBar = styled.div`
  background: #dbeafe;
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SelectionInfo = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e40af;
`;

const LoadingContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 80px 20px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export function LoanApprovalPage() {
  const [searchParams] = useSearchParams();

  const filters: FilterParams = {
    status: searchParams.get('status') as any,
    riskLevel: searchParams.get('riskLevel') as any,
    minAmount: searchParams.get('minAmount') ? parseInt(searchParams.get('minAmount')!) : undefined,
    maxAmount: searchParams.get('maxAmount') ? parseInt(searchParams.get('maxAmount')!) : undefined,
    minCreditScore: searchParams.get('minCreditScore')
      ? parseInt(searchParams.get('minCreditScore')!)
      : undefined,
    search: searchParams.get('search') || undefined,
  };

  const { data: applications, isLoading } = useLoanApplications(filters);
  const batchApproveMutation = useBatchApprove();
  const batchRejectMutation = useBatchReject();
  
  const { selectedIds, clearSelection } = useSelectionStore();
  const { role, setRole } = useUserStore();

  const stats = useMemo(() => {
    if (!applications) return { total: 0, pending: 0, approved: 0, rejected: 0 };
    
    return {
      total: applications.length,
      pending: applications.filter((a) => a.status === 'pending').length,
      approved: applications.filter((a) => a.status === 'approved').length,
      rejected: applications.filter((a) => a.status === 'rejected').length,
    };
  }, [applications]);

  const handleBatchApprove = () => {
    if (selectedIds.size === 0) return;
    batchApproveMutation.mutate(Array.from(selectedIds), {
      onSuccess: () => clearSelection(),
    });
  };

  const handleBatchReject = () => {
    if (selectedIds.size === 0) return;
    if (role === 'reviewer') {
      alert('일반 심사역은 거절 권한이 없습니다.');
      return;
    }
    batchRejectMutation.mutate(Array.from(selectedIds), {
      onSuccess: () => clearSelection(),
    });
  };

  const canReject = role === 'manager' || role === 'admin';

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BackButton to="/">
            <ArrowLeft size={18} />
            홈으로
          </BackButton>
          <Title>
            <Shield size={32} color="#3b82f6" />
            대출 심사 승인 대시보드
          </Title>
        </HeaderLeft>
        <HeaderActions>
          <RoleSelector value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
            <option value="reviewer">일반 심사역</option>
            <option value="manager">팀장급</option>
            <option value="admin">관리자</option>
          </RoleSelector>
          <ScreensButton to="/loan-approval/screens">
            <Monitor size={18} />
            Screens
          </ScreensButton>
        </HeaderActions>
      </Header>

      <Stats>
        <StatCard>
          <StatLabel>전체 신청</StatLabel>
          <StatValue>{stats.total.toLocaleString()}건</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>대기중</StatLabel>
          <StatValue style={{ color: '#f59e0b' }}>{stats.pending.toLocaleString()}건</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>승인</StatLabel>
          <StatValue style={{ color: '#22c55e' }}>{stats.approved.toLocaleString()}건</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>거절</StatLabel>
          <StatValue style={{ color: '#ef4444' }}>{stats.rejected.toLocaleString()}건</StatValue>
        </StatCard>
      </Stats>

      <ContentContainer>
        <FilterBar />

        {selectedIds.size > 0 && (
          <SelectionBar>
            <SelectionInfo>{selectedIds.size}건 선택됨</SelectionInfo>
            <div style={{ display: 'flex', gap: '8px' }}>
              <ActionButton variant="approve" onClick={handleBatchApprove}>
                <CheckCheck size={16} />
                일괄 승인
              </ActionButton>
              {canReject ? (
                <ActionButton variant="reject" onClick={handleBatchReject}>
                  <X size={16} />
                  일괄 거절
                </ActionButton>
              ) : (
                <ActionButton variant="reject" disabled title="팀장급 이상만 가능">
                  <X size={16} />
                  일괄 거절 (권한 없음)
                </ActionButton>
              )}
            </div>
          </SelectionBar>
        )}

        {isLoading ? (
          <LoadingContainer>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#6b7280' }}>
              대출 신청 데이터를 불러오는 중...
            </div>
          </LoadingContainer>
        ) : (
          <ApplicationTable applications={applications || []} />
        )}
      </ContentContainer>

      <ApplicationDrawer />
    </Container>
  );
}