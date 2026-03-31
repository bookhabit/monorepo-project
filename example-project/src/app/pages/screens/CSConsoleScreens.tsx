import { Link } from 'react-router';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, Headphones, Loader2, User } from 'lucide-react';

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

const ConsoleLayout = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CustomerPanel = styled.div`
  background: #1f2937;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #374151;
`;

const CustomerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #374151;
`;

const CustomerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const CustomerInfo = styled.div`
  flex: 1;
`;

const CustomerName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #f9fafb;
  margin-bottom: 4px;
`;

const CustomerID = styled.div`
  font-size: 13px;
  color: #9ca3af;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 6px;
`;

const InfoValue = styled.div`
  font-size: 14px;
  color: #f9fafb;
  font-weight: 500;
`;

const HistoryPanel = styled.div`
  background: #1f2937;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #374151;
`;

const HistoryTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #f9fafb;
  margin: 0 0 16px 0;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HistoryItem = styled.div`
  padding: 16px;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
`;

const HistoryDate = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 6px;
`;

const HistoryContent = styled.div`
  font-size: 14px;
  color: #f9fafb;
`;

const ConsultationForm = styled.div`
  background: #1f2937;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #374151;
  margin-top: 24px;
`;

const FormTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #f9fafb;
  margin: 0 0 16px 0;
`;

const FormField = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 8px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #f9fafb;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
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

export function CSConsoleScreens() {
  return (
    <Container>
      <Header>
        <BackButton to="/cs-console">
          <ArrowLeft size={20} />
        </BackButton>
        <Title>고객 상담 콘솔 - 사용자 시나리오별 화면</Title>
      </Header>

      <Content>
        {/* 정상 상태 - 상담 중 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>
            <SectionTitle>
              <Headphones size={28} color="#22c55e" />
              정상 상태 - 상담 진행 중
            </SectionTitle>
            <SectionDescription>
              고객 정보와 상담 이력이 정상적으로 로드되어 상담이 진행되는 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="success">
              <CheckCircle size={16} />
              고객 정보 로드 완료
            </StateLabel>
            <ConsoleLayout>
              <div>
                <CustomerPanel>
                  <CustomerHeader>
                    <CustomerAvatar>
                      <User size={24} />
                    </CustomerAvatar>
                    <CustomerInfo>
                      <CustomerName>김철수</CustomerName>
                      <CustomerID>고객번호: C-1234567</CustomerID>
                    </CustomerInfo>
                  </CustomerHeader>
                  <InfoSection>
                    <InfoLabel>연락처</InfoLabel>
                    <InfoValue>010-1234-5678</InfoValue>
                  </InfoSection>
                  <InfoSection>
                    <InfoLabel>이메일</InfoLabel>
                    <InfoValue>chulsoo@example.com</InfoValue>
                  </InfoSection>
                  <InfoSection>
                    <InfoLabel>가입일</InfoLabel>
                    <InfoValue>2024-01-15</InfoValue>
                  </InfoSection>
                  <InfoSection>
                    <InfoLabel>등급</InfoLabel>
                    <InfoValue>VIP</InfoValue>
                  </InfoSection>
                </CustomerPanel>
              </div>
              <div>
                <HistoryPanel>
                  <HistoryTitle>상담 이력</HistoryTitle>
                  <HistoryList>
                    <HistoryItem>
                      <HistoryDate>2026-03-20 14:30</HistoryDate>
                      <HistoryContent>
                        계좌 이체 관련 문의 - 정상 처리 완료
                      </HistoryContent>
                    </HistoryItem>
                    <HistoryItem>
                      <HistoryDate>2026-02-15 10:15</HistoryDate>
                      <HistoryContent>
                        대출 상품 안내 - 신청 진행 중
                      </HistoryContent>
                    </HistoryItem>
                    <HistoryItem>
                      <HistoryDate>2026-01-28 16:45</HistoryDate>
                      <HistoryContent>
                        카드 발급 문의 - 발급 완료
                      </HistoryContent>
                    </HistoryItem>
                  </HistoryList>
                </HistoryPanel>
                <ConsultationForm>
                  <FormTitle>상담 내용 작성</FormTitle>
                  <FormField>
                    <FormLabel>상담 내용</FormLabel>
                    <FormTextarea placeholder="고객과의 상담 내용을 입력하세요..." />
                  </FormField>
                  <SubmitButton>상담 내용 저장</SubmitButton>
                </ConsultationForm>
              </div>
            </ConsoleLayout>
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
              고객 정보 및 상담 이력을 불러오는 중
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="loading">
              <Loader2 size={16} className="animate-spin" />
              데이터 로딩 중
            </StateLabel>
            <LoadingSpinner>
              <Loader2 size={40} color="#3b82f6" />
              <LoadingText>고객 정보를 불러오는 중...</LoadingText>
            </LoadingSpinner>
          </ScreenPreview>
        </MotionSection>

        {/* 고객 없음 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionHeader>
            <SectionTitle>
              <XCircle size={28} color="#9ca3af" />
              고객 정보 없음
            </SectionTitle>
            <SectionDescription>
              조회된 고객 정보가 없는 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="info">
              고객 미선택
            </StateLabel>
            <div style={{ 
              padding: '64px 24px', 
              textAlign: 'center',
              background: 'rgba(156, 163, 175, 0.05)',
              borderRadius: '12px'
            }}>
              <User size={64} color="#9ca3af" style={{ margin: '0 auto 24px', opacity: 0.5 }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f9fafb', marginBottom: '12px' }}>
                고객을 선택해주세요
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                상담할 고객을 검색하거나 선택하세요
              </p>
            </div>
          </ScreenPreview>
        </MotionSection>

        {/* 상담 저장 성공 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionHeader>
            <SectionTitle>
              <CheckCircle size={28} color="#22c55e" />
              상담 저장 성공
            </SectionTitle>
            <SectionDescription>
              상담 내용이 정상적으로 저장된 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="success">
              <CheckCircle size={16} />
              저장 완료
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
                상담 내용이 저장되었습니다
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                김철수 고객의 상담 내용이 정상적으로 기록되었습니다.
              </p>
            </div>
          </ScreenPreview>
        </MotionSection>
      </Content>
    </Container>
  );
}
