import { useState, Suspense } from 'react';
import { Link } from 'react-router';
import styled from '@emotion/styled';
import { ArrowLeft, Monitor } from 'lucide-react';
import { useFunnel } from '../hooks/use-funnel';
import { useAtomValue } from 'jotai';
import { progressAtom } from '../store/account-opening';
import { Funnel } from '../components/funnel/Funnel';
import { IdentityVerification } from '../components/account-opening/IdentityVerification';
import { InformationInput } from '../components/account-opening/InformationInput';
import { TermsAgreement } from '../components/account-opening/TermsAgreement';
import { Complete } from '../components/account-opening/Complete';
import { ErrorBoundary } from '../components/ErrorBoundary';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
  max-width: 428px;
  margin: 0 auto;
  position: relative;
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

const Header = styled.div`
  padding: 12px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(139, 92, 246, 0.95);
  backdrop-filter: blur(10px);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const ScreensButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:active {
    transform: scale(0.95);
  }
`;

const ProgressBarContainer = styled.div`
  padding: 0 16px 16px;
  background: rgba(139, 92, 246, 0.95);
`;

const ProgressBarTrack = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  height: 100%;
  background: white;
  border-radius: 3px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${props => props.progress}%;
`;

const StepIndicator = styled.div`
  padding: 16px 16px 20px;
  background: rgba(139, 92, 246, 0.95);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 13px;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  background: white;
  min-height: calc(100vh - 180px);
  border-radius: 24px 24px 0 0;
  padding: 24px 16px;
  margin-top: -8px;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #9ca3af;
`;

export function AccountOpeningPage() {
  const progress = useAtomValue(progressAtom);
  
  const steps = ['약관동의', '본인인증', '정보입력', '완료'];
  const funnel = useFunnel(steps, steps[0]);

  const getProgressPercentage = () => {
    const currentIndex = steps.indexOf(funnel.step);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <Container>
      <StatusBar>9:41</StatusBar>
      <Header>
        <HeaderLeft>
          <BackButton to="/">
            <ArrowLeft size={20} />
          </BackButton>
          <Title>계좌 개설</Title>
        </HeaderLeft>
        <ScreensButton to="/account-opening/screens">
          <Monitor size={20} />
        </ScreensButton>
      </Header>
      
      <ProgressBarContainer>
        <ProgressBarTrack>
          <ProgressBarFill progress={getProgressPercentage()} />
        </ProgressBarTrack>
      </ProgressBarContainer>
      
      <StepIndicator>
        <span>단계 {steps.indexOf(funnel.step) + 1} / {steps.length}</span>
        <span>{funnel.step}</span>
      </StepIndicator>

      <ContentContainer>
        <ErrorBoundary>
          <Suspense fallback={<LoadingContainer>로딩 중...</LoadingContainer>}>
            <Funnel step={funnel.step}>
              <Funnel.Step name="약관동의">
                <TermsAgreement onNext={() => funnel.setStep('본인인증')} />
              </Funnel.Step>
              <Funnel.Step name="본인인증">
                <IdentityVerification 
                  onNext={() => funnel.setStep('정보입력')}
                  onPrev={() => funnel.setStep('약관동의')}
                />
              </Funnel.Step>
              <Funnel.Step name="정보입력">
                <InformationInput 
                  onNext={() => funnel.setStep('완료')}
                  onPrev={() => funnel.setStep('본인인증')}
                />
              </Funnel.Step>
              <Funnel.Step name="완료">
                <Complete />
              </Funnel.Step>
            </Funnel>
          </Suspense>
        </ErrorBoundary>
      </ContentContainer>
    </Container>
  );
}