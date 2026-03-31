import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styled from '@emotion/styled';
import { Check, Eye, AlertTriangle } from 'lucide-react';
import { LoanApplication } from '../../types/loan';
import { useSelectionStore } from '../../store/loan-store';
import { useDrawerStore } from '../../store/loan-store';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 120px 140px 1fr 120px 100px 100px 120px 100px 80px;
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

const TableRow = styled.div<{ isSelected?: boolean }>`
  display: grid;
  grid-template-columns: 50px 120px 140px 1fr 120px 100px 100px 120px 100px 80px;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  transition: all 0.2s ease;
  background: ${(props) => (props.isSelected ? '#eff6ff' : 'white')};

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
      case 'approved':
        return `
          background: #dcfce7;
          color: #16a34a;
        `;
      case 'rejected':
        return `
          background: #fee2e2;
          color: #dc2626;
        `;
      case 'reviewing':
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
      case 'high':
        return `
          background: #fee2e2;
          color: #dc2626;
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

const EmptyState = styled.div`
  padding: 80px 20px;
  text-align: center;
  color: #9ca3af;
`;

interface ApplicationTableProps {
  applications: LoanApplication[];
  height?: number;
}

export function ApplicationTable({ applications, height = 600 }: ApplicationTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const { selectedIds, toggleSelection, isSelected } = useSelectionStore();
  const { openDrawer } = useDrawerStore();

  const virtualizer = useVirtualizer({
    count: applications.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: '대기',
      approved: '승인',
      rejected: '거절',
      reviewing: '검토중',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getRiskLabel = (level: string) => {
    const labels = {
      low: '낮음',
      medium: '중간',
      high: '높음',
    };
    return labels[level as keyof typeof labels] || level;
  };

  if (applications.length === 0) {
    return (
      <TableContainer>
        <TableHeader>
          <div></div>
          <div>신청번호</div>
          <div>신청자</div>
          <div>대출 목적</div>
          <div>금액</div>
          <div>신용점수</div>
          <div>위험도</div>
          <div>상태</div>
          <div>신청일</div>
          <div>상세</div>
        </TableHeader>
        <EmptyState>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
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
        <div>신청번호</div>
        <div>신청자</div>
        <div>대출 목적</div>
        <div>금액</div>
        <div>신용점수</div>
        <div>위험도</div>
        <div>상태</div>
        <div>신청일</div>
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
            const application = applications[virtualRow.index];
            return (
              <VirtualRow
                key={virtualRow.key}
                height={virtualRow.size}
                top={virtualRow.start}
              >
                <TableRow isSelected={isSelected(application.id)}>
                  <div>
                    <Checkbox
                      type="checkbox"
                      checked={isSelected(application.id)}
                      onChange={() => toggleSelection(application.id)}
                    />
                  </div>
                  <div style={{ fontWeight: 600, color: '#111827' }}>{application.id}</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{application.applicantName}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      {application.applicantId}
                    </div>
                  </div>
                  <div style={{ color: '#6b7280' }}>{application.purpose}</div>
                  <div style={{ fontWeight: 600 }}>
                    {application.amount.toLocaleString()}원
                  </div>
                  <div style={{ fontWeight: 600, color: application.creditScore >= 700 ? '#16a34a' : '#dc2626' }}>
                    {application.creditScore}
                  </div>
                  <div>
                    <RiskBadge level={application.riskLevel}>
                      {getRiskLabel(application.riskLevel)}
                    </RiskBadge>
                  </div>
                  <div>
                    <StatusBadge status={application.status}>
                      {application.status === 'approved' && <Check size={12} />}
                      {application.status === 'rejected' && <AlertTriangle size={12} />}
                      {getStatusLabel(application.status)}
                    </StatusBadge>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>
                    {formatDistanceToNow(new Date(application.appliedAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </div>
                  <div>
                    <ViewButton onClick={() => openDrawer(application.id)}>
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
