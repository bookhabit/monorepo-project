import styled from '@emotion/styled';
import { X, Monitor, Smartphone, FileText, FileCheck, CheckCircle2, Loader2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 90vh;
  background: #111827;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  padding: 20px 24px;
  background: #1f2937;
  border-bottom: 1px solid #374151;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  padding: 8px;
  background: transparent;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #374151;
    color: #f9fafb;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1f2937;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }
`;

const Section = styled.div`
  margin-bottom: 48px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
  line-height: 1.6;
`;

const ScreenPreview = styled.div`
  background: linear-gradient(to bottom right, #0f172a, #1e293b);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #374151;
`;

const StateLabel = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' | 'loading' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 16px;
  
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

const DemoBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  margin: 0 auto;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 32px;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transition: width 0.3s ease;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const StepItem = styled.div<{ active?: boolean; completed?: boolean }>`
  flex: 1;
  text-align: center;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    width: 100%;
    height: 2px;
    background: ${props => props.completed ? '#3b82f6' : '#e5e7eb'};
    z-index: 0;
  }
`;

const StepCircle = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.completed ? '#3b82f6' : props.active ? '#3b82f6' : '#e5e7eb'};
  color: ${props => props.completed || props.active ? 'white' : '#6b7280'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  z-index: 1;
`;

const StepLabel = styled.div<{ active?: boolean }>`
  font-size: 12px;
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  font-weight: ${props => props.active ? 600 : 400};
`;

const FormDemo = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 8px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  ${props => props.variant === 'primary' ? `
    background: #3b82f6;
    color: white;
  ` : `
    background: #f3f4f6;
    color: #374151;
  `}
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  
  input {
    width: 20px;
    height: 20px;
  }
`;

const AccountNumberBox = styled.div`
  padding: 32px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #3b82f6;
  border-radius: 16px;
  text-align: center;
`;

const AccountNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #3b82f6;
  letter-spacing: 2px;
  margin: 16px 0;
`;

const GridDemo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ErrorBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 2px dashed #ef4444;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  gap: 16px;
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const HighlightBox = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 2px solid #3b82f6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

interface ScreensViewerProps {
  onClose: () => void;
}

export function ScreensViewer({ onClose }: ScreensViewerProps) {
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <Monitor size={24} />
            계좌 개설 워크플로우 - 사용자 시나리오별 화면
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          {/* 1. 진행 상황 표시 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Monitor size={24} />
                1. 진행 상황 표시 (Progress)
              </SectionTitle>
              <SectionDescription>
                사용자가 현재 어느 단계에 있는지, 전체 진행률은 얼마인지 시각적으로 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Monitor size={14} />
                Progress Indicator
              </StateLabel>
              <DemoBox>
                <ProgressBar>
                  <ProgressFill progress={50} />
                </ProgressBar>
                <StepIndicator>
                  <StepItem completed>
                    <StepCircle completed>1</StepCircle>
                    <StepLabel>본인인증</StepLabel>
                  </StepItem>
                  <StepItem active>
                    <StepCircle active>2</StepCircle>
                    <StepLabel active>정보입력</StepLabel>
                  </StepItem>
                  <StepItem>
                    <StepCircle>3</StepCircle>
                    <StepLabel>약관동의</StepLabel>
                  </StepItem>
                  <StepItem>
                    <StepCircle>4</StepCircle>
                    <StepLabel>완료</StepLabel>
                  </StepItem>
                </StepIndicator>
              </DemoBox>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ Jotai의 progressAtom으로 자동 계산<br />
                ✓ 완료된 단계는 파란색, 현재 단계는 강조<br />
                ✓ 단계 간 연결선으로 흐름 표현
              </div>
            </ScreenPreview>
          </Section>

          {/* 2. 본인인증 단계 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Smartphone size={24} />
                2. 본인인증 (Step 1)
              </SectionTitle>
              <SectionDescription>
                휴대폰 번호 입력 → 인증번호 발송 → 인증번호 확인 → 검증 완료
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="loading">
                <Smartphone size={14} />
                Identity Verification
              </StateLabel>
              <DemoBox>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>본인인증</h3>
                <FormDemo>
                  <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    휴대폰 번호
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Input type="tel" placeholder="01012345678" value="01012345678" readOnly />
                    <button style={{ padding: '12px 20px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      인증번호 발송
                    </button>
                  </div>
                </FormDemo>
                <FormDemo>
                  <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    인증번호 <span style={{ color: '#ef4444' }}>(2:45)</span>
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Input type="text" placeholder="000000" />
                    <button style={{ padding: '12px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600 }}>
                      확인
                    </button>
                  </div>
                </FormDemo>
                <Button variant="primary" disabled style={{ opacity: 0.5 }}>
                  다음 단계로
                </Button>
              </DemoBox>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ API 호출로 실제 인증번호 발송 (Mock)<br />
                ✓ 3분 타이머 실행 (180초 카운트다운)<br />
                ✓ 인증 완료 시 녹색 체크 메시지<br />
                ✓ React-Query로 API 상태 관리
              </div>
            </ScreenPreview>
          </Section>

          {/* 3. 정보 입력 단계 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <FileText size={24} />
                3. 정보 입력 (Step 2)
              </SectionTitle>
              <SectionDescription>
                이름, 생년월일, 주소, 직업, 연소득 등 필수/선택 정보 입력
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <FileText size={14} />
                Information Input
              </StateLabel>
              <DemoBox>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>정보 입력</h3>
                <FormDemo>
                  <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    이름 <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <Input type="text" placeholder="홍길동" value="홍길동" readOnly />
                </FormDemo>
                <FormDemo>
                  <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    생년월일 <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <Input type="date" value="1990-01-01" readOnly />
                </FormDemo>
                <FormDemo>
                  <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    직업
                  </label>
                  <select style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px' }}>
                    <option>회사원</option>
                  </select>
                </FormDemo>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <Button variant="secondary">이전</Button>
                  <Button variant="primary">다음</Button>
                </div>
              </DemoBox>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 필수 항목은 * 표시<br />
                ✓ Select 박스로 선택형 입력<br />
                ✓ 유효성 검사 후 다음 단계 이동<br />
                ✓ Jotai로 입력값 자동 저장
              </div>
            </ScreenPreview>
          </Section>

          {/* 4. 약관 동의 단계 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <FileCheck size={24} />
                4. 약관 동의 (Step 3)
              </SectionTitle>
              <SectionDescription>
                필수 약관 3개, 선택 약관 2개, 전체 동의 체크박스, 약관 내용 펼치기/접기
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <FileCheck size={14} />
                Terms Agreement
              </StateLabel>
              <DemoBox>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>약관 동의</h3>
                <div style={{ padding: '20px', background: '#f0f9ff', border: '2px solid #3b82f6', borderRadius: '12px', marginBottom: '24px' }}>
                  <Checkbox>
                    <input type="checkbox" checked readOnly />
                    <span style={{ fontWeight: 600, fontSize: '16px' }}>전체 약관에 동의합니다</span>
                  </Checkbox>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                    필수 약관
                  </div>
                  <Checkbox>
                    <input type="checkbox" checked readOnly />
                    <span>서비스 이용약관 <span style={{ color: '#ef4444', fontSize: '12px' }}>필수</span></span>
                  </Checkbox>
                  <Checkbox>
                    <input type="checkbox" checked readOnly />
                    <span>개인정보 수집 및 이용 동의 <span style={{ color: '#ef4444', fontSize: '12px' }}>필수</span></span>
                  </Checkbox>
                  <Checkbox>
                    <input type="checkbox" checked readOnly />
                    <span>금융거래 정보 제공 동의 <span style={{ color: '#ef4444', fontSize: '12px' }}>필수</span></span>
                  </Checkbox>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                    선택 약관
                  </div>
                  <Checkbox>
                    <input type="checkbox" readOnly />
                    <span>마케팅 정보 수신 동의 (선택)</span>
                  </Checkbox>
                  <Checkbox>
                    <input type="checkbox" readOnly />
                    <span>제3자 정보 제공 동의 (선택)</span>
                  </Checkbox>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button variant="secondary">이전</Button>
                  <Button variant="primary">동의하고 계좌 개설</Button>
                </div>
              </DemoBox>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 전체 동의 체크 시 모든 약관 자동 체크<br />
                ✓ 필수 약관 미동의 시 다음 버튼 비활성화<br />
                ✓ ChevronDown 아이콘으로 약관 내용 펼치기<br />
                ✓ 약관별 개별 토글 상태 관리
              </div>
            </ScreenPreview>
          </Section>

          {/* 5. 완료 단계 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <CheckCircle2 size={24} />
                5. 계좌 개설 완료 (Step 4)
              </SectionTitle>
              <SectionDescription>
                API 호출로 계좌번호 발급, 애니메이션 효과, 계좌번호 복사, 확인서 다운로드
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <CheckCircle2 size={14} />
                Complete
              </StateLabel>
              <DemoBox>
                <div style={{ width: '80px', height: '80px', margin: '0 auto 24px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={48} color="white" />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '16px' }}>
                  계좌 개설이 완료되었습니다!
                </h2>
                <p style={{ fontSize: '16px', color: '#6b7280', textAlign: 'center', marginBottom: '32px' }}>
                  축하합니다! 주식 계좌가 성공적으로 개설되었습니다.
                </p>
                <AccountNumberBox>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>계좌번호</div>
                  <AccountNumber>110-123456789</AccountNumber>
                  <button style={{ padding: '10px 20px', background: 'white', border: '2px solid #3b82f6', borderRadius: '8px', color: '#3b82f6', fontWeight: 600, cursor: 'pointer' }}>
                    계좌번호 복사
                  </button>
                </AccountNumberBox>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <Button variant="secondary">확인서 다운로드</Button>
                  <Button variant="primary">홈으로 이동</Button>
                </div>
              </DemoBox>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 성공 아이콘 scaleIn 애니메이션<br />
                ✓ submitAccountApplication API로 계좌번호 생성<br />
                ✓ Clipboard API로 계좌번호 복사<br />
                ✓ Toast 알림으로 사용자 피드백
              </div>
            </ScreenPreview>
          </Section>

          {/* 6. 데이터 퍼시스턴스 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                6. 데이터 퍼시스턴스 (Jotai + LocalStorage)
              </SectionTitle>
              <SectionDescription>
                새로고침 또는 브라우저 종료 후에도 입력 데이터 유지
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Monitor size={14} />
                Data Persistence
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  Jotai atomWithStorage 활용
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  ✓ identityDataAtom - 휴대폰 번호, 인증 상태<br />
                  ✓ informationDataAtom - 개인 정보<br />
                  ✓ termsDataAtom - 약관 동의 상태<br />
                  ✓ currentStepAtom - 현재 단계<br />
                  ✓ completeDataAtom - 발급된 계좌번호
                </div>
              </HighlightBox>
              <div style={{ background: '#1f2937', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f9fafb', marginBottom: '12px' }}>
                  LocalStorage 키
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af', fontFamily: 'monospace' }}>
                  account_opening_currentStep: "information"<br />
                  account_opening_identityData: {`{"phoneNumber":"...", "isVerified":true}`}<br />
                  account_opening_informationData: {`{"name":"홍길동", ...}`}<br />
                  account_opening_termsData: {`{"requiredTerms":{...}}`}
                </div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 7. 에러 처리 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <AlertCircle size={24} />
                7. 선언적 에러 처리 (ErrorBoundary)
              </SectionTitle>
              <SectionDescription>
                API 호출 실패, 런타임 에러 발생 시 ErrorBoundary가 캐치하여 재시도 UI 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="error">
                <AlertCircle size={14} />
                Error Handling
              </StateLabel>
              <ErrorBox>
                <div style={{ width: '80px', height: '80px', margin: '0 auto 24px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertCircle size={40} color="#ef4444" />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#ef4444', marginBottom: '12px' }}>
                  문제가 발생했습니다
                </h3>
                <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
                  계좌 개설 신청에 실패했습니다.<br />
                  잠시 후 다시 시도해주세요.
                </p>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', margin: '0 auto' }}>
                  <RefreshCw size={18} />
                  다시 시도
                </button>
              </ErrorBox>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ ErrorBoundary 컴포넌트로 전역 에러 캐치<br />
                ✓ componentDidCatch로 에러 로깅<br />
                ✓ 재시도 버튼 클릭 시 컴포넌트 리셋<br />
                ✓ API 실패 시 10% 확률로 에러 발생 (Mock)
              </div>
            </ScreenPreview>
          </Section>

          {/* 8. 로딩 상태 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Loader2 size={24} />
                8. 로딩 상태 (Suspense)
              </SectionTitle>
              <SectionDescription>
                API 호출 중 로딩 스피너 표시, 인증번호 발송, 계좌 개설 등
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="loading">
                <Loader2 size={14} />
                Loading State
              </StateLabel>
              <GridDemo>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>인증번호 발송 중</div>
                  <DemoBox style={{ textAlign: 'center', padding: '48px 32px' }}>
                    <Loader2 size={32} color="#3b82f6" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>인증번호를 발송하고 있습니다...</div>
                  </DemoBox>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>계좌 개설 중</div>
                  <DemoBox style={{ textAlign: 'center', padding: '48px 32px' }}>
                    <Loader2 size={32} color="#3b82f6" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>계좌를 개설하고 있습니다...</div>
                  </DemoBox>
                </div>
              </GridDemo>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ useState로 로딩 상태 관리<br />
                ✓ 버튼 비활성화 및 스피너 표시<br />
                ✓ API 호출 중 사용자 인터랙션 차단<br />
                ✓ 완료 후 자동으로 로딩 해제
              </div>
            </ScreenPreview>
          </Section>

          {/* 9. 뒤��� 가기 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                9. 뒤로 가기 대응
              </SectionTitle>
              <SectionDescription>
                각 단계에서 "이전" 버튼 클릭 시 입력 데이터 유지하며 이전 단계로 이동
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <ArrowRight size={14} />
                Navigation
              </StateLabel>
              <div style={{ background: '#1f2937', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f9fafb', marginBottom: '12px' }}>
                  useFunnel 훅
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af', fontFamily: 'monospace', marginBottom: '16px' }}>
                  {`const { currentStep, goToNextStep, goToPreviousStep } = useFunnel();`}
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  ✓ goToNextStep() - 다음 단계로 이동<br />
                  ✓ goToPreviousStep() - 이전 단계로 이동<br />
                  ✓ canGoBack - 첫 단계인지 확인<br />
                  ✓ 모든 입력 데이터는 Jotai에 저장되어 유지
                </div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 10. Funnel 패턴 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                10. 선언적 Funnel 패턴
              </SectionTitle>
              <SectionDescription>
                단계별 UI를 선언적으로 정의하여 가독성 향상
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Monitor size={14} />
                Funnel Pattern
              </StateLabel>
              <div style={{ background: '#1f2937', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f9fafb', marginBottom: '12px' }}>
                  선언적 코드 구조
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af', fontFamily: 'monospace', lineHeight: 1.8 }}>
                  {`<Funnel step={currentStep}>`}<br />
                  {`  <Funnel.Step name="identity">`}<br />
                  {`    <IdentityVerification onNext={goToNextStep} />`}<br />
                  {`  </Funnel.Step>`}<br />
                  {`  <Funnel.Step name="information">`}<br />
                  {`    <InformationInput onNext={...} onBack={...} />`}<br />
                  {`  </Funnel.Step>`}<br />
                  {`  <Funnel.Step name="terms">`}<br />
                  {`    <TermsAgreement onNext={...} onBack={...} />`}<br />
                  {`  </Funnel.Step>`}<br />
                  {`  <Funnel.Step name="complete">`}<br />
                  {`    <Complete />`}<br />
                  {`  </Funnel.Step>`}<br />
                  {`</Funnel>`}
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 조건문 없이 선언적으로 단계 정의<br />
                ✓ 현재 step에 해당하는 컴포넌트만 렌더링<br />
                ✓ 단계 추가/삭제 용이<br />
                ✓ 코드 가독성 및 유지보수성 향상
              </div>
            </ScreenPreview>
          </Section>
        </Content>
      </Container>
    </Overlay>
  );
}
