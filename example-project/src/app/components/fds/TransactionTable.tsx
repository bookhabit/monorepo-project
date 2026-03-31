import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Shield, Eye, AlertTriangle } from 'lucide-react';
import { Transaction } from '../../types/fds';
import { useSelectionStore, useDrawerStore } from '../../store/fds-store';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const fadeIn = keyframes`
  from {
    opacity: 0;
    background: #fef3c7;
  }
  to {
    opacity: 1;
    background: white;
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 130px 120px 100px 120px 80px 100px 120px 120px 80px;
  gap: 12px;
  padding: 16px 20px;
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const VirtualList = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  overflow: auto;
  position: relative;

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

const VirtualRow = styled.div<{ height: number; top: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.height}px;
  transform: translateY(${(props) => props.top}px);
`;

const TableRow = styled.div<{ isSelected?: boolean; isNew?: boolean }>`
  display: grid;
  grid-template-columns: 50px 130px 120px 100px 120px 80px 100px 120px 120px 80px;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  transition: all 0.2s ease;
  background: ${(props) => (props.isSelected ? '#eff6ff' : 'white')};
  animation: ${(props) => (props.isNew ? fadeIn : 'none')} 0.5s ease;

  &:hover {
    background: ${(props) => (props.isSelected ? '#dbeafe' : '#f9fafb')};
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  
  ${(props) => {
    switch (props.status) {
      case 'normal':
        return `
          background: #dcfce7;
          color: #16a34a;
        `;
      case 'blocked':
        return `
          background: #fee2e2;
          color: #dc2626;
        `;
      case 'suspicious':
        return `
          background: #fef3c7;
          color: #d97706;
        `;
      default:
        return `
          background: #e5e7eb;
          color: #6b7280;
        `;
    }
  }}
`;

const RiskBadge = styled.span<{ level: string }>`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  
  ${(props) => {
    switch (props.level) {
      case 'critical':
        return `
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #dc2626;
        `;
      case 'high':
        return `
          background: #fed7aa;
          color: #c2410c;
        `;
      case 'medium':
        return `
          background: #fef3c7;
          color: #d97706;
        `;
      default:
        return `
          background: #dcfce7;
          color: #16a34a;
        `;
    }
  }}
`;

const RiskScore = styled.div<{ score: number }>`
  font-weight: 700;
  color: ${(props) =>
    props.score >= 80 ? '#dc2626' : props.score >= 60 ? '#f59e0b' : '#16a34a'};
`;

const ViewButton = styled.button`
  padding: 6px 12px;
  background: #3b82f6;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

const FlagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const FlagChip = styled.span`
  padding: 2px 6px;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
`;

const EmptyState = styled.div`
  padding: 80px 20px;
  text-align: center;
  color: #9ca3af;
`;

interface TransactionTableProps {
  transactions: Transaction[];
  newTransactionIds?: Set<string>;
  height?: number;
}

export function TransactionTable({ transactions, newTransactionIds, height = 600 }: TransactionTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const { selectedIds, toggleSelection, isSelected } = useSelectionStore();
  const { openDrawer } = useDrawerStore();

  const virtualizer = useVirtualizer({
    count: transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 10,
  });

  const getStatusLabel = (status: string) => {
    const labels = {
      normal: '정상',
      suspicious: '의심',
      blocked: '차단',
      reviewing: '검토중',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getRiskLabel = (level: string) => {
    const labels = {
      low: '낮음',
      medium: '중간',
      high: '높음',
      critical: '심각',
    };
    return labels[level as keyof typeof labels] || level;
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
      <TableContainer>
        <TableHeader>
          <div></div>
          <div>거래ID</div>
          <div>사용자</div>
          <div>유형</div>
          <div>금액</div>
          <div>위험점수</div>
          <div>위험도</div>
          <div>상태</div>
          <div>시간</div>
          <div>상세</div>
        </TableHeader>
        <EmptyState>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
          <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
            검색 결과가 없습니다
          </div>
          <div style={{ fontSize: '14px' }}>필터 조건을 변경해보세요</div>
        </EmptyState>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <TableHeader>
        <div></div>
        <div>거래ID</div>
        <div>사용자</div>
        <div>유형</div>
        <div>금액</div>
        <div>위험점수</div>
        <div>위험도</div>
        <div>상태</div>
        <div>시간</div>
        <div>상세</div>
      </TableHeader>

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
            
            return (
              <VirtualRow
                key={virtualRow.key}
                height={virtualRow.size}
                top={virtualRow.start}
              >
                <TableRow isSelected={isSelected(transaction.id)} isNew={isNew}>
                  <div>
                    <Checkbox
                      type="checkbox"
                      checked={isSelected(transaction.id)}
                      onChange={() => toggleSelection(transaction.id)}
                    />
                  </div>
                  <div style={{ fontWeight: 600, color: '#111827', fontSize: '13px' }}>
                    {transaction.id}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{transaction.userName}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      {transaction.userId}
                    </div>
                  </div>
                  <div style={{ color: '#6b7280' }}>{getTypeLabel(transaction.type)}</div>
                  <div style={{ fontWeight: 600 }}>
                    {transaction.amount.toLocaleString()}원
                  </div>
                  <div>
                    <RiskScore score={transaction.riskScore}>{transaction.riskScore}</RiskScore>
                  </div>
                  <div>
                    <RiskBadge level={transaction.riskLevel}>
                      {getRiskLabel(transaction.riskLevel)}
                    </RiskBadge>
                  </div>
                  <div>
                    <StatusBadge status={transaction.status}>
                      {transaction.status === 'blocked' && <Shield size={12} />}
                      {transaction.status === 'suspicious' && <AlertTriangle size={12} />}
                      {getStatusLabel(transaction.status)}
                    </StatusBadge>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>
                    {formatDistanceToNow(new Date(transaction.timestamp), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </div>
                  <div>
                    <ViewButton onClick={() => openDrawer(transaction.userId)}>
                      <Eye size={14} />
                      보기
                    </ViewButton>
                  </div>
                </TableRow>
              </VirtualRow>
            );
          })}
        </div>
      </VirtualList>
    </TableContainer>
  );
}
