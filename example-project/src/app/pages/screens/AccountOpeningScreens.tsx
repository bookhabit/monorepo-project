import { Link } from 'react-router';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { TermsAgreement } from '../../components/account-opening/TermsAgreement';
import { IdentityVerification } from '../../components/account-opening/IdentityVerification';
import { InformationInput } from '../../components/account-opening/InformationInput';
import { Complete } from '../../components/account-opening/Complete';

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
  max-width: 900px;
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
  max-width: 480px;
  margin: 0 auto;
`;

const MobileFrame = styled.div`
  background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
  border-radius: 24px;
  overflow: hidden;
`;

const StatusBar = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding-top: 8px;
`;

const PhoneContent = styled.div`
  background: white;
  border-radius: 24px 24px 0 0;
  padding: 24px 16px;
  min-height: 600px;
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

const MotionSection = motion.create(Section);

export function AccountOpeningScreens() {
  return (
    <Container>
      <Header>
        <BackButton to="/account-opening">
          <ArrowLeft size={20} />
        </BackButton>
        <Title>계좌 개설 Funnel - 사용자 시나리오별 화면</Title>
      </Header>

      <Content>
        {/* 단계 1: 약관 동의 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>
            <SectionTitle>
              <CheckCircle size={28} color="#22c55e" />
              단계 1: 약관 동의
            </SectionTitle>
            <SectionDescription>
              서비스 이용약관, 개인정보 처리방침 등 필수/선택 약관 동의
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="info">
              단계 1 / 4
            </StateLabel>
            <MobileFrame>
              <StatusBar>9:41</StatusBar>
              <PhoneContent>
                <TermsAgreement onNext={() => {}} />
              </PhoneContent>
            </MobileFrame>
          </ScreenPreview>
        </MotionSection>

        {/* 단계 2: 본인 인증 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader>
            <SectionTitle>
              <CheckCircle size={28} color="#22c55e" />
              단계 2: 본인 인증
            </SectionTitle>
            <SectionDescription>
              휴대폰 번호 입력 및 인증번호 확인
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="info">
              단계 2 / 4
            </StateLabel>
            <MobileFrame>
              <StatusBar>9:41</StatusBar>
              <PhoneContent>
                <IdentityVerification onNext={() => {}} onPrev={() => {}} />
              </PhoneContent>
            </MobileFrame>
          </ScreenPreview>
        </MotionSection>

        {/* 단계 3: 정보 입력 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionHeader>
            <SectionTitle>
              <CheckCircle size={28} color="#22c55e" />
              단계 3: 정보 입력
            </SectionTitle>
            <SectionDescription>
              개인정보 및 투자 목적 등 상세 정보 입력
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="info">
              단계 3 / 4
            </StateLabel>
            <MobileFrame>
              <StatusBar>9:41</StatusBar>
              <PhoneContent>
                <InformationInput onNext={() => {}} onPrev={() => {}} />
              </PhoneContent>
            </MobileFrame>
          </ScreenPreview>
        </MotionSection>

        {/* 단계 4: 완료 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionHeader>
            <SectionTitle>
              <CheckCircle size={28} color="#22c55e" />
              단계 4: 완료
            </SectionTitle>
            <SectionDescription>
              계좌 개설이 성공적으로 완료된 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="success">
              <CheckCircle size={16} />
              계좌 개설 완료
            </StateLabel>
            <MobileFrame>
              <StatusBar>9:41</StatusBar>
              <PhoneContent>
                <Complete />
              </PhoneContent>
            </MobileFrame>
          </ScreenPreview>
        </MotionSection>

        {/* 에러 상태 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <SectionHeader>
            <SectionTitle>
              <XCircle size={28} color="#ef4444" />
              에러 상태
            </SectionTitle>
            <SectionDescription>
              본인 인증 실패, 중복 계좌 등의 사유로 진행이 중단된 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="error">
              <XCircle size={16} />
              인증 실패
            </StateLabel>
            <MobileFrame>
              <StatusBar>9:41</StatusBar>
              <PhoneContent>
                <div style={{ padding: '48px 16px', textAlign: 'center' }}>
                  <XCircle size={64} color="#ef4444" style={{ margin: '0 auto 24px' }} />
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                    본인 인증에 실패했습니다
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
                    인증번호가 일치하지 않습니다.<br />
                    다시 시도해주세요.
                  </p>
                  <button
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    다시 시도
                  </button>
                </div>
              </PhoneContent>
            </MobileFrame>
          </ScreenPreview>
        </MotionSection>
      </Content>
    </Container>
  );
}
