import styled from '@emotion/styled';
import { User, Mail, Phone, CreditCard, MapPin, Calendar, TrendingUp, Shield } from 'lucide-react';
import { useCustomer } from '../../hooks/use-cs-console';
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
  background: linear-gradient(135deg, #3b82f6, #2563eb);
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
  padding: 24px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoValue = styled.div`
  font-size: 15px;
  color: #1e293b;
  font-weight: 600;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  
  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          border: 1px solid rgba(34, 197, 94, 0.3);
        `;
      case 'dormant':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
          border: 1px solid rgba(245, 158, 11, 0.3);
        `;
      case 'restricted':
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

const Divider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin: 20px 0;
`;

interface CustomerInfoSectionProps {
  customerId: string;
}

export function CustomerInfoSection({ customerId }: CustomerInfoSectionProps) {
  const { data: customer } = useCustomer(customerId);

  if (!customer) return null;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return '활성';
      case 'dormant': return '휴면';
      case 'restricted': return '제한';
      default: return status;
    }
  };

  return (
    <Section>
      <SectionHeader>
        <User size={20} />
        <SectionTitle>고객 기본 정보</SectionTitle>
      </SectionHeader>
      <SectionBody>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>
              <User size={14} />
              고객명
            </InfoLabel>
            <InfoValue>{customer.name}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>
              <CreditCard size={14} />
              고객번호
            </InfoLabel>
            <InfoValue>{customer.customerId}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>
              <Mail size={14} />
              이메일
            </InfoLabel>
            <InfoValue style={{ fontSize: '13px' }}>{customer.email}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>
              <Phone size={14} />
              연락처
            </InfoLabel>
            <InfoValue>{customer.phone}</InfoValue>
          </InfoItem>
        </InfoGrid>

        <Divider />

        <InfoGrid>
          <InfoItem>
            <InfoLabel>
              <Shield size={14} />
              계좌번호
            </InfoLabel>
            <InfoValue style={{ fontSize: '13px' }}>{customer.accountNumber}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>
              <TrendingUp size={14} />
              총 자산
            </InfoLabel>
            <InfoValue style={{ color: '#3b82f6' }}>
              {customer.totalAssets.toLocaleString()}원
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>
              <Calendar size={14} />
              가입일
            </InfoLabel>
            <InfoValue style={{ fontSize: '13px' }}>
              {format(new Date(customer.registeredAt), 'PPP', { locale: ko })}
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>
              상태
            </InfoLabel>
            <StatusBadge status={customer.status}>
              {getStatusLabel(customer.status)}
            </StatusBadge>
          </InfoItem>
        </InfoGrid>

        {customer.address && (
          <>
            <Divider />
            <InfoItem>
              <InfoLabel>
                <MapPin size={14} />
                주소
              </InfoLabel>
              <InfoValue style={{ fontSize: '14px' }}>{customer.address}</InfoValue>
            </InfoItem>
          </>
        )}
      </SectionBody>
    </Section>
  );
}
