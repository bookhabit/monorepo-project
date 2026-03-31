import { useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { X, TrendingUp, Activity, Clock, Loader2 } from 'lucide-react';
import { useDrawerStore } from '../../store/fds-store';
import { useUserRiskProfile } from '../../hooks/use-fds-transactions';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 600px;
  max-width: 100%;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease;
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: #f3f4f6;
  border-radius: 8px;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f9fafb;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }
`;

const Section = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const StatCard = styled.div`
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`;

const ChartContainer = styled.div`
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const ChartCanvas = styled.svg`
  width: 100%;
  height: 200px;
`;

const TransactionItem = styled.div`
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 8px;
  border-left: 4px solid #3b82f6;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const TransactionType = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const TransactionAmount = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #111827;
`;

const TransactionMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #6b7280;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #9ca3af;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export function RiskDrawer() {
  const { isOpen, userId, closeDrawer } = useDrawerStore();
  const { data: profile, isLoading } = useUserRiskProfile(userId);

  // Cleanup on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      // Zustand will automatically clean up when component unmounts
    };
  }, []);

  if (!isOpen) return null;

  const renderChart = () => {
    if (!profile?.timeline) return null;

    const maxScore = Math.max(...profile.timeline.map((t) => t.riskScore));
    const points = profile.timeline.map((item, index) => {
      const x = (index / (profile.timeline.length - 1)) * 500;
      const y = 180 - (item.riskScore / maxScore) * 160;
      return `${x},${y}`;
    }).join(' ');

    return (
      <ChartCanvas viewBox="0 0 500 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value) => (
          <line
            key={value}
            x1="0"
            y1={180 - (value / 100) * 160}
            x2="500"
            y2={180 - (value / 100) * 160}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Area under line */}
        <polygon
          points={`0,180 ${points} 500,180`}
          fill="url(#gradient)"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {profile.timeline.map((item, index) => {
          const x = (index / (profile.timeline.length - 1)) * 500;
          const y = 180 - (item.riskScore / maxScore) * 160;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill={item.riskScore > 70 ? '#ef4444' : item.riskScore > 50 ? '#f59e0b' : '#3b82f6'}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </ChartCanvas>
    );
  };

  return (
    <>
      <Overlay onClick={closeDrawer} />
      <Drawer>
        <Header>
          <Title>위험도 분석</Title>
          <CloseButton onClick={closeDrawer}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          {isLoading ? (
            <LoadingContainer>
              <Loader2 size={40} />
              <div style={{ marginTop: '16px' }}>프로필을 불러오는 중...</div>
            </LoadingContainer>
          ) : profile ? (
            <>
              <Section>
                <SectionTitle>
                  <Activity size={20} />
                  사용자 통계
                </SectionTitle>
                <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
                  {profile.userName} ({profile.userId})
                </div>
                <StatsGrid>
                  <StatCard>
                    <StatLabel>전체 거래</StatLabel>
                    <StatValue>{profile.totalTransactions}건</StatValue>
                  </StatCard>
                  <StatCard>
                    <StatLabel>의심 거래</StatLabel>
                    <StatValue style={{ color: '#f59e0b' }}>
                      {profile.suspiciousTransactions}건
                    </StatValue>
                  </StatCard>
                  <StatCard>
                    <StatLabel>차단 거래</StatLabel>
                    <StatValue style={{ color: '#ef4444' }}>
                      {profile.blockedTransactions}건
                    </StatValue>
                  </StatCard>
                  <StatCard>
                    <StatLabel>평균 위험점수</StatLabel>
                    <StatValue
                      style={{
                        color:
                          profile.avgRiskScore >= 70
                            ? '#ef4444'
                            : profile.avgRiskScore >= 50
                            ? '#f59e0b'
                            : '#22c55e',
                      }}
                    >
                      {profile.avgRiskScore}
                    </StatValue>
                  </StatCard>
                </StatsGrid>
              </Section>

              <Section>
                <SectionTitle>
                  <TrendingUp size={20} />
                  24시간 위험도 추이
                </SectionTitle>
                <ChartContainer>
                  {renderChart()}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '12px',
                      fontSize: '12px',
                      color: '#6b7280',
                    }}
                  >
                    <span>24시간 전</span>
                    <span>현재</span>
                  </div>
                </ChartContainer>
              </Section>

              <Section>
                <SectionTitle>
                  <Clock size={20} />
                  최근 거래 내역
                </SectionTitle>
                {profile.recentTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id}>
                    <TransactionHeader>
                      <TransactionType>
                        {transaction.type === 'transfer'
                          ? '송금'
                          : transaction.type === 'withdrawal'
                          ? '출금'
                          : transaction.type === 'deposit'
                          ? '입금'
                          : '결제'}
                      </TransactionType>
                      <TransactionAmount>
                        {transaction.amount.toLocaleString()}원
                      </TransactionAmount>
                    </TransactionHeader>
                    <TransactionMeta>
                      <span>위험점수: {transaction.riskScore}</span>
                      <span>
                        {formatDistanceToNow(new Date(transaction.timestamp), {
                          addSuffix: true,
                          locale: ko,
                        })}
                      </span>
                    </TransactionMeta>
                  </TransactionItem>
                ))}
              </Section>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9ca3af' }}>
              프로필을 찾을 수 없습니다
            </div>
          )}
        </Content>
      </Drawer>
    </>
  );
}
