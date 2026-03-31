import { Link } from 'react-router';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Loader2, Shield } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: #0f172a;
  padding: 0;
`;

const Header = styled.div`
  padding: 20px 24px;
  background: #1f2937;
  border-bottom: 1px solid #374151;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackButton = styled(Link)`
  padding: 8px;
  background: transparent;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    background: #374151;
    color: #f9fafb;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const Section = styled.div`
  margin-bottom: 64px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: #9ca3af;
  margin: 0;
  line-height: 1.6;
`;

const ScreenPreview = styled.div`
  background: linear-gradient(to bottom right, #1e293b, #0f172a);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #374151;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

const StateLabel = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' | 'loading' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return 'rgba(34, 197, 94, 0.1)';
      case 'error': return 'rgba(239, 68, 68, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'loading': return 'rgba(59, 130, 246, 0.1)';
      default: return 'rgba(156, 163, 175, 0.1)';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'loading': return '#3b82f6';
      default: return '#9ca3af';
    }
  }};
  
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return 'rgba(34, 197, 94, 0.2)';
      case 'error': return 'rgba(239, 68, 68, 0.2)';
      case 'warning': return 'rgba(245, 158, 11, 0.2)';
      case 'loading': return 'rgba(59, 130, 246, 0.2)';
      default: return 'rgba(156, 163, 175, 0.2)';
    }
  }};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: #1f2937;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #374151;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #f9fafb;
`;

const LoanTable = styled.div`
  background: #1f2937;
  border-radius: 12px;
  border: 1px solid #374151;
  overflow: hidden;
`;

const TableRow = styled.div<{ status?: 'pending' | 'approved' | 'rejected' }>`
  display: grid;
  grid-template-columns: 120px 1fr 140px 120px 100px;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #374151;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:first-of-type {
    background: #111827;
    font-weight: 600;
    color: #f9fafb;
  }
  
  ${props => props.status && `
    background: ${
      props.status === 'pending' ? 'rgba(59, 130, 246, 0.05)' :
      props.status === 'approved' ? 'rgba(34, 197, 94, 0.05)' :
      'rgba(239, 68, 68, 0.05)'
    };
  `}
`;

const StatusBadge = styled.div<{ status: 'pending' | 'approved' | 'rejected' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  
  background: ${props => {
    switch (props.status) {
      case 'pending': return 'rgba(59, 130, 246, 0.2)';
      case 'approved': return 'rgba(34, 197, 94, 0.2)';
      case 'rejected': return 'rgba(239, 68, 68, 0.2)';
    }
  }};
  
  color: ${props => {
    switch (props.status) {
      case 'pending': return '#3b82f6';
      case 'approved': return '#22c55e';
      case 'rejected': return '#ef4444';
    }
  }};
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #2563eb;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px;
  gap: 16px;
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #9ca3af;
  font-size: 14px;
`;

const MotionSection = motion.create(Section);

export function LoanApprovalScreens() {
  return (
    <Container>
      <Header>
        <BackButton to="/loan-approval">
          <ArrowLeft size={20} />
        </BackButton>
        <Title>대출 심사 대시보드 - 사용자 시나리오별 화면</Title>
      </Header>

      <Content>
        {/* 정상 상태 - 심사자 뷰 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>
            <SectionTitle>
              <Shield size={28} color="#22c55e" />
              정상 상태 - 심사자 대시보드
            </SectionTitle>
            <SectionDescription>
              대출 신청 목록과 통계를 확인하고 승인/거부할 수 있는 관리자 뷰
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="success">
              <CheckCircle size={16} />
              실시간 동기화 중
            </StateLabel>
            <DashboardGrid>
              <StatCard>
                <StatLabel>대기 중</StatLabel>
                <StatValue>23</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>승인됨</StatLabel>
                <StatValue style={{ color: '#22c55e' }}>142</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>거부됨</StatLabel>
                <StatValue style={{ color: '#ef4444' }}>18</StatValue>
              </StatCard>
            </DashboardGrid>
            <LoanTable>
              <TableRow>
                <div>신청일</div>
                <div>신청자</div>
                <div>대출금액</div>
                <div>상태</div>
                <div>액션</div>
              </TableRow>
              <TableRow status="pending">
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>2026-03-27</div>
                <div style={{ fontSize: '14px', color: '#f9fafb' }}>김철수</div>
                <div style={{ fontSize: '14px', color: '#f9fafb' }}>50,000,000원</div>
                <div><StatusBadge status="pending">대기중</StatusBadge></div>
                <div><ActionButton>검토</ActionButton></div>
              </TableRow>
              <TableRow status="approved">
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>2026-03-26</div>
                <div style={{ fontSize: '14px', color: '#f9fafb' }}>이영희</div>
                <div style={{ fontSize: '14px', color: '#f9fafb' }}>30,000,000원</div>
                <div><StatusBadge status="approved">승인됨</StatusBadge></div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>-</div>
              </TableRow>
              <TableRow status="rejected">
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>2026-03-26</div>
                <div style={{ fontSize: '14px', color: '#f9fafb' }}>박민수</div>
                <div style={{ fontSize: '14px', color: '#f9fafb' }}>100,000,000원</div>
                <div><StatusBadge status="rejected">거부됨</StatusBadge></div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>-</div>
              </TableRow>
            </LoanTable>
          </ScreenPreview>
        </MotionSection>

        {/* 로딩 상태 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader>
            <SectionTitle>
              <Loader2 size={28} color="#3b82f6" />
              로딩 상태
            </SectionTitle>
            <SectionDescription>
              대출 신청 데이터를 불러오는 중
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="loading">
              <Loader2 size={16} className="animate-spin" />
              데이터 로딩 중
            </StateLabel>
            <LoadingSpinner>
              <Loader2 size={40} color="#3b82f6" />
              <LoadingText>대출 신청 목록을 불러오는 중...</LoadingText>
            </LoadingSpinner>
          </ScreenPreview>
        </MotionSection>

        {/* 권한 부족 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionHeader>
            <SectionTitle>
              <AlertTriangle size={28} color="#f59e0b" />
              권한 부족
            </SectionTitle>
            <SectionDescription>
              RBAC 권한 제어에 의해 접근이 제한된 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="warning">
              <AlertTriangle size={16} />
              접근 제한
            </StateLabel>
            <div style={{ 
              padding: '64px 24px', 
              textAlign: 'center',
              background: 'rgba(245, 158, 11, 0.05)',
              borderRadius: '12px'
            }}>
              <Shield size={64} color="#f59e0b" style={{ margin: '0 auto 24px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f9fafb', marginBottom: '12px' }}>
                접근 권한이 없습니다
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                이 페이지에 접근하려면 관리자 권한이 필요합니다.
              </p>
            </div>
          </ScreenPreview>
        </MotionSection>

        {/* 승인 성공 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionHeader>
            <SectionTitle>
              <CheckCircle size={28} color="#22c55e" />
              승인 성공
            </SectionTitle>
            <SectionDescription>
              대출 신청이 정상적으로 승인된 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="success">
              <CheckCircle size={16} />
              승인 완료
            </StateLabel>
            <div style={{ 
              padding: '48px 24px', 
              textAlign: 'center',
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}>
              <CheckCircle size={64} color="#22c55e" style={{ margin: '0 auto 24px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f9fafb', marginBottom: '12px' }}>
                대출 승인이 완료되었습니다
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                김철수님의 50,000,000원 대출 신청이 승인되었습니다.
              </p>
            </div>
          </ScreenPreview>
        </MotionSection>
      </Content>
    </Container>
  );
}
