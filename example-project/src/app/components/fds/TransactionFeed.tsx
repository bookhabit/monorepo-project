import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Shield, Eye, AlertTriangle, MapPin, Smartphone, Clock, TrendingUp, CreditCard, ArrowDownLeft, ArrowUpRight, Zap } from 'lucide-react';
import { Transaction } from '../../types/fds';
import { useSelectionStore, useDrawerStore } from '../../store/fds-store';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
`;

const FeedContainer = styled.div`
  background: #0f172a;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #1e293b;
`;

const FeedHeader = styled.div`
  padding: 20px 24px;
  background: #1e293b;
  border-bottom: 1px solid #334155;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FeedTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #f1f5f9;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #ef4444;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ef4444;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const VirtualList = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  overflow: auto;
  position: relative;
  background: #0f172a;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #1e293b;
  }

  &::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 3px;
  }
`;

const VirtualRow = styled.div<{ height: number; top: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.height}px;
  transform: translateY(${(props) => props.top}px);
`;

const TransactionCard = styled.div<{ isSelected?: boolean; isNew?: boolean; riskLevel: string }>`
  margin: 12px 16px;
  padding: 20px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 12px;
  border: 2px solid ${(props) => {
    if (props.isSelected) return '#3b82f6';
    switch (props.riskLevel) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#6366f1';
      default: return '#334155';
    }
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${(props) => (props.isNew ? slideInRight : 'none')} 0.5s ease;

  &:hover {
    transform: translateX(-4px);
    border-color: #3b82f6;
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
  }

  ${(props) => props.riskLevel === 'critical' && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(to right, #ef4444, #dc2626);
    }
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserId = styled.div`
  font-size: 13px;
  color: #94a3b8;
`;

const RiskIndicator = styled.div<{ level: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const RiskScore = styled.div<{ score: number }>`
  font-size: 32px;
  font-weight: 900;
  background: ${(props) =>
    props.score >= 80
      ? 'linear-gradient(135deg, #ef4444, #dc2626)'
      : props.score >= 60
      ? 'linear-gradient(135deg, #f59e0b, #d97706)'
      : 'linear-gradient(135deg, #22c55e, #16a34a)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

const RiskLabel = styled.div<{ level: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${(props) => {
    switch (props.level) {
      case 'critical':
        return `
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.5);
        `;
      case 'high':
        return `
          background: rgba(245, 158, 11, 0.2);
          color: #fcd34d;
          border: 1px solid rgba(245, 158, 11, 0.5);
        `;
      case 'medium':
        return `
          background: rgba(99, 102, 241, 0.2);
          color: #a5b4fc;
          border: 1px solid rgba(99, 102, 241, 0.5);
        `;
      default:
        return `
          background: rgba(34, 197, 94, 0.2);
          color: #86efac;
          border: 1px solid rgba(34, 197, 94, 0.5);
        `;
    }
  }}
`;

const TransactionDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
`;

const DetailContent = styled.div`
  flex: 1;
`;

const DetailLabel = styled.div`
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const DetailValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
`;

const FlagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
`;

const FlagChip = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #fca5a5;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #334155;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  
  ${(props) => {
    switch (props.status) {
      case 'blocked':
        return `
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.5);
        `;
      case 'suspicious':
        return `
          background: rgba(245, 158, 11, 0.2);
          color: #fcd34d;
          border: 1px solid rgba(245, 158, 11, 0.5);
        `;
      default:
        return `
          background: rgba(34, 197, 94, 0.2);
          color: #86efac;
          border: 1px solid rgba(34, 197, 94, 0.5);
        `;
    }
  }}
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }
`;

const Checkbox = styled.input`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #3b82f6;
  z-index: 10;
`;

const EmptyState = styled.div`
  padding: 120px 20px;
  text-align: center;
  color: #64748b;
`;

interface TransactionFeedProps {
  transactions: Transaction[];
  newTransactionIds?: Set<string>;
  height?: number;
}

export function TransactionFeed({ transactions, newTransactionIds, height = 700 }: TransactionFeedProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const { selectedIds, toggleSelection, isSelected } = useSelectionStore();
  const { openDrawer } = useDrawerStore();

  const virtualizer = useVirtualizer({
    count: transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 320,
    overscan: 5,
  });

  const getStatusLabel = (status: string) => {
    const labels = {
      normal: '정상',
      suspicious: '의심',
      blocked: '차단됨',
      reviewing: '검토중',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getRiskLabel = (level: string) => {
    const labels = {
      low: 'Low Risk',
      medium: 'Medium Risk',
      high: 'High Risk',
      critical: 'Critical',
    };
    return labels[level as keyof typeof labels] || level;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transfer': return ArrowUpRight;
      case 'withdrawal': return ArrowDownLeft;
      case 'deposit': return TrendingUp;
      case 'payment': return CreditCard;
      default: return Zap;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      transfer: '송금',
      withdrawal: '출금',
      deposit: '입금',
      payment: '결제',
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (transactions.length === 0) {
    return (
      <FeedContainer>
        <FeedHeader>
          <FeedTitle>
            <Shield size={20} />
            실시간 거래 피드
          </FeedTitle>
        </FeedHeader>
        <EmptyState>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🛡️</div>
          <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#94a3b8' }}>
            검색 결과가 없습니다
          </div>
          <div style={{ fontSize: '14px' }}>필터 조건을 변경해보세요</div>
        </EmptyState>
      </FeedContainer>
    );
  }

  return (
    <FeedContainer>
      <FeedHeader>
        <FeedTitle>
          <Shield size={20} />
          실시간 거래 피드
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 400 }}>
            ({transactions.length.toLocaleString()}건)
          </span>
        </FeedTitle>
        <LiveBadge>
          LIVE
        </LiveBadge>
      </FeedHeader>

      <VirtualList ref={parentRef} height={height}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const transaction = transactions[virtualRow.index];
            const isNew = newTransactionIds?.has(transaction.id);
            const TypeIcon = getTypeIcon(transaction.type);
            
            return (
              <VirtualRow
                key={virtualRow.key}
                height={virtualRow.size}
                top={virtualRow.start}
              >
                <TransactionCard
                  isSelected={isSelected(transaction.id)}
                  isNew={isNew}
                  riskLevel={transaction.riskLevel}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).tagName !== 'INPUT') {
                      openDrawer(transaction.userId);
                    }
                  }}
                >
                  <Checkbox
                    type="checkbox"
                    checked={isSelected(transaction.id)}
                    onChange={() => toggleSelection(transaction.id)}
                    onClick={(e) => e.stopPropagation()}
                  />

                  <CardHeader>
                    <UserInfo>
                      <UserName>
                        {transaction.userName}
                        {transaction.riskLevel === 'critical' && (
                          <AlertTriangle size={16} color="#ef4444" />
                        )}
                      </UserName>
                      <UserId>{transaction.id}</UserId>
                    </UserInfo>
                    <RiskIndicator level={transaction.riskLevel}>
                      <RiskScore score={transaction.riskScore}>
                        {transaction.riskScore}
                      </RiskScore>
                      <RiskLabel level={transaction.riskLevel}>
                        {getRiskLabel(transaction.riskLevel)}
                      </RiskLabel>
                    </RiskIndicator>
                  </CardHeader>

                  <TransactionDetails>
                    <DetailItem>
                      <DetailIcon>
                        <TypeIcon size={16} />
                      </DetailIcon>
                      <DetailContent>
                        <DetailLabel>거래 유형</DetailLabel>
                        <DetailValue>{getTypeLabel(transaction.type)}</DetailValue>
                      </DetailContent>
                    </DetailItem>

                    <DetailItem>
                      <DetailIcon>
                        <TrendingUp size={16} />
                      </DetailIcon>
                      <DetailContent>
                        <DetailLabel>금액</DetailLabel>
                        <DetailValue>{transaction.amount.toLocaleString()}원</DetailValue>
                      </DetailContent>
                    </DetailItem>

                    <DetailItem>
                      <DetailIcon>
                        <MapPin size={16} />
                      </DetailIcon>
                      <DetailContent>
                        <DetailLabel>위치</DetailLabel>
                        <DetailValue>{transaction.location}</DetailValue>
                      </DetailContent>
                    </DetailItem>

                    <DetailItem>
                      <DetailIcon>
                        <Clock size={16} />
                      </DetailIcon>
                      <DetailContent>
                        <DetailLabel>시간</DetailLabel>
                        <DetailValue>
                          {format(new Date(transaction.timestamp), 'HH:mm:ss', { locale: ko })}
                        </DetailValue>
                      </DetailContent>
                    </DetailItem>
                  </TransactionDetails>

                  {transaction.flags.length > 0 && (
                    <FlagsContainer>
                      {transaction.flags.map((flag, idx) => (
                        <FlagChip key={idx}>
                          <Zap size={12} />
                          {flag}
                        </FlagChip>
                      ))}
                    </FlagsContainer>
                  )}

                  <CardFooter>
                    <StatusBadge status={transaction.status}>
                      {transaction.status === 'blocked' && <Shield size={14} />}
                      {transaction.status === 'suspicious' && <AlertTriangle size={14} />}
                      {getStatusLabel(transaction.status)}
                    </StatusBadge>
                    <ActionButton onClick={() => openDrawer(transaction.userId)}>
                      <Eye size={14} />
                      상세 분석
                    </ActionButton>
                  </CardFooter>
                </TransactionCard>
              </VirtualRow>
            );
          })}
        </div>
      </VirtualList>
    </FeedContainer>
  );
}