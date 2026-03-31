import styled from '@emotion/styled';
import { MessageSquare, Clock, AlertCircle, CheckCircle, User } from 'lucide-react';
import { useCustomerConsultations } from '../../hooks/use-cs-console';
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
  background: linear-gradient(135deg, #10b981, #059669);
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

const ConsultationItem = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s ease;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ConsultationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ConsultationTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
`;

const ConsultationMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #64748b;
`;

const ConsultationContent = styled.div`
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 12px;
`;

const BadgeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const CategoryBadge = styled.div<{ category: string }>`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  
  ${props => {
    switch (props.category) {
      case 'account':
        return `
          background: rgba(59, 130, 246, 0.1);
          color: #2563eb;
          border: 1px solid rgba(59, 130, 246, 0.3);
        `;
      case 'loan':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
          border: 1px solid rgba(245, 158, 11, 0.3);
        `;
      case 'card':
        return `
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
          border: 1px solid rgba(139, 92, 246, 0.3);
        `;
      case 'investment':
        return `
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.3);
        `;
      case 'technical':
        return `
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
          border: 1px solid rgba(100, 116, 139, 0.3);
        `;
      case 'complaint':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.3);
        `;
      default:
        return `
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
          border: 1px solid rgba(100, 116, 139, 0.3);
        `;
    }
  }}
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  
  ${props => {
    switch (props.status) {
      case 'open':
        return `
          background: rgba(59, 130, 246, 0.1);
          color: #2563eb;
          border: 1px solid rgba(59, 130, 246, 0.3);
        `;
      case 'in-progress':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
          border: 1px solid rgba(245, 158, 11, 0.3);
        `;
      case 'resolved':
        return `
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          border: 1px solid rgba(34, 197, 94, 0.3);
        `;
      case 'closed':
        return `
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
          border: 1px solid rgba(100, 116, 139, 0.3);
        `;
      default:
        return `
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
          border: 1px solid rgba(100, 116, 139, 0.3);
        `;
    }
  }}
`;

const PriorityBadge = styled.div<{ priority: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  
  ${props => {
    switch (props.priority) {
      case 'urgent':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.3);
        `;
      case 'high':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
          border: 1px solid rgba(245, 158, 11, 0.3);
        `;
      case 'medium':
        return `
          background: rgba(59, 130, 246, 0.1);
          color: #2563eb;
          border: 1px solid rgba(59, 130, 246, 0.3);
        `;
      case 'low':
        return `
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
          border: 1px solid rgba(100, 116, 139, 0.3);
        `;
      default:
        return `
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
          border: 1px solid rgba(100, 116, 139, 0.3);
        `;
    }
  }}
`;

interface ConsultationHistorySectionProps {
  customerId: string;
}

export function ConsultationHistorySection({ customerId }: ConsultationHistorySectionProps) {
  const { data: consultations = [] } = useCustomerConsultations(customerId);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'account': return '계좌';
      case 'loan': return '대출';
      case 'card': return '카드';
      case 'investment': return '투자';
      case 'technical': return '기술지원';
      case 'complaint': return '불만';
      default: return category;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return '신규';
      case 'in-progress': return '처리중';
      case 'resolved': return '해결';
      case 'closed': return '종료';
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return '긴급';
      case 'high': return '높음';
      case 'medium': return '보통';
      case 'low': return '낮음';
      default: return priority;
    }
  };

  return (
    <Section>
      <SectionHeader>
        <MessageSquare size={20} />
        <SectionTitle>상담 이력</SectionTitle>
      </SectionHeader>
      <SectionBody>
        {consultations.map(consultation => (
          <ConsultationItem key={consultation.id}>
            <ConsultationHeader>
              <div style={{ flex: 1 }}>
                <ConsultationTitle>{consultation.subject}</ConsultationTitle>
                <ConsultationMeta>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={12} />
                    {consultation.agentName}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {format(new Date(consultation.createdAt), 'PPp', { locale: ko })}
                  </span>
                </ConsultationMeta>
              </div>
            </ConsultationHeader>
            <ConsultationContent>
              {consultation.content}
            </ConsultationContent>
            <BadgeGroup>
              <CategoryBadge category={consultation.category}>
                {getCategoryLabel(consultation.category)}
              </CategoryBadge>
              <StatusBadge status={consultation.status}>
                {getStatusLabel(consultation.status)}
              </StatusBadge>
              <PriorityBadge priority={consultation.priority}>
                <AlertCircle size={10} />
                {getPriorityLabel(consultation.priority)}
              </PriorityBadge>
            </BadgeGroup>
          </ConsultationItem>
        ))}
        {consultations.length === 0 && (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: '#94a3b8' }}>
            상담 이력이 없습니다
          </div>
        )}
      </SectionBody>
    </Section>
  );
}
