import styled from '@emotion/styled';
import { ArrowUpRight, ArrowDownLeft, CreditCard, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useCustomerTransactions } from '../../hooks/use-cs-console';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const Section = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 16px 20px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

const SectionBody = styled.div`
  max-height: 400px;
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

const TransactionItem = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: background 0.2s ease;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionIcon = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${props => {
    switch (props.type) {
      case 'deposit':
        return `
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
        `;
      case 'withdrawal':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
        `;
      case 'transfer':
        return `
          background: rgba(59, 130, 246, 0.1);
          color: #2563eb;
        `;
      case 'payment':
        return `
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
        `;
      default:
        return `
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
        `;
    }
  }}
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`;

const TransactionMeta = styled.div`
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TransactionAmount = styled.div<{ type: string }>`
  font-size: 16px;
  font-weight: 700;
  text-align: right;
  
  ${props => {
    switch (props.type) {
      case 'deposit':
        return `color: #16a34a;`;
      case 'withdrawal':
      case 'payment':
      case 'transfer':
        return `color: #dc2626;`;
      default:
        return `color: #1e293b;`;
    }
  }}
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  
  ${props => {
    switch (props.status) {
      case 'completed':
        return `
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
        `;
      case 'pending':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
        `;
      case 'failed':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
        `;
      default:
        return `
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
        `;
    }
  }}
`;

interface TransactionSectionProps {
  customerId: string;
}

export function TransactionSection({ customerId }: TransactionSectionProps) {
  const { data: transactions = [] } = useCustomerTransactions(customerId);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft size={20} />;
      case 'withdrawal': return <ArrowUpRight size={20} />;
      case 'transfer': return <DollarSign size={20} />;
      case 'payment': return <CreditCard size={20} />;
      default: return <DollarSign size={20} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'deposit': return '입금';
      case 'withdrawal': return '출금';
      case 'transfer': return '이체';
      case 'payment': return '결제';
      default: return type;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={12} />;
      case 'pending': return <Clock size={12} />;
      case 'failed': return <XCircle size={12} />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'pending': return '대기';
      case 'failed': return '실패';
      default: return status;
    }
  };

  return (
    <Section>
      <SectionHeader>
        <DollarSign size={20} />
        <SectionTitle>최근 거래 내역</SectionTitle>
      </SectionHeader>
      <SectionBody>
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id}>
            <TransactionIcon type={transaction.type}>
              {getTypeIcon(transaction.type)}
            </TransactionIcon>
            <TransactionInfo>
              <TransactionTitle>
                {getTypeLabel(transaction.type)}
                {transaction.counterparty && ` - ${transaction.counterparty}`}
              </TransactionTitle>
              <TransactionMeta>
                <span>{format(new Date(transaction.timestamp), 'PPp', { locale: ko })}</span>
                <StatusBadge status={transaction.status}>
                  {getStatusIcon(transaction.status)}
                  {getStatusLabel(transaction.status)}
                </StatusBadge>
              </TransactionMeta>
            </TransactionInfo>
            <TransactionAmount type={transaction.type}>
              {transaction.type === 'deposit' ? '+' : '-'}
              {transaction.amount.toLocaleString()}원
            </TransactionAmount>
          </TransactionItem>
        ))}
        {transactions.length === 0 && (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: '#94a3b8' }}>
            거래 내역이 없습니다
          </div>
        )}
      </SectionBody>
    </Section>
  );
}
