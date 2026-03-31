/**
 * 본인 인증 단계 - Toss Style
 */

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { User, Calendar, Smartphone } from 'lucide-react';
import { Button, Input, colors, spacing, borderRadius } from '../../../design-system';

interface IdentityVerificationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 500px;
`;

const Content = styled.div`
  flex: 1;
  padding: ${spacing[6]} 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.gray900};
  margin: 0 0 ${spacing[2]} 0;
`;

const Description = styled.p`
  font-size: 15px;
  color: ${colors.gray600};
  margin: 0 0 ${spacing[8]} 0;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

const StepIndicator = styled.div`
  display: flex;
  gap: ${spacing[2]};
  margin-bottom: ${spacing[6]};
`;

const StepDot = styled.div<{ active: boolean; completed: boolean }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${props => 
    props.completed ? colors.primary600 : 
    props.active ? colors.primary300 : 
    colors.gray200};
  transition: all 0.3s ease;
`;

const InputContainer = styled.div<{ show: boolean }>`
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? 0 : '8px'});
  transition: all 0.3s ease;
  pointer-events: ${props => props.show ? 'auto' : 'none'};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing[3]};
  padding-top: ${spacing[6]};
`;

const HelperBox = styled.div`
  padding: ${spacing[4]};
  background: ${colors.gray50};
  border-radius: ${borderRadius.lg};
  margin-top: ${spacing[4]};
`;

const HelperText = styled.p`
  font-size: 13px;
  color: ${colors.gray600};
  margin: 0;
  line-height: 1.5;
`;

export function IdentityVerification({ onNext, onPrev }: IdentityVerificationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const steps = [
    { field: 'name', value: name, completed: name.length > 0 },
    { field: 'birthdate', value: birthdate, completed: birthdate.length === 8 },
    { field: 'phone', value: phone, completed: phone.length === 11 },
    { field: 'verification', value: verificationCode, completed: verificationCode.length === 6 },
  ];

  // 자동 진행
  useEffect(() => {
    if (currentStep === 0 && name.length >= 2) {
      setTimeout(() => setCurrentStep(1), 300);
    } else if (currentStep === 1 && birthdate.length === 8) {
      setTimeout(() => setCurrentStep(2), 300);
    } else if (currentStep === 2 && phone.length === 11 && !codeSent) {
      // 인증번호 발송
      setTimeout(() => {
        setCodeSent(true);
        setCurrentStep(3);
      }, 500);
    } else if (currentStep === 3 && verificationCode.length === 6) {
      // 인증 완료
      setTimeout(() => {
        onNext();
      }, 500);
    }
  }, [name, birthdate, phone, verificationCode, currentStep, codeSent, onNext]);

  const formatBirthdate = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    return numbers.slice(0, 8);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    return numbers.slice(0, 11);
  };

  const formatVerificationCode = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    return numbers.slice(0, 6);
  };

  return (
    <Container>
      <Content>
        <Title>본인 인증</Title>
        <Description>
          안전한 계좌 개설을 위해 본인 정보를 입력해주세요
        </Description>

        <StepIndicator>
          {steps.map((step, index) => (
            <StepDot
              key={index}
              active={index === currentStep}
              completed={step.completed}
            />
          ))}
        </StepIndicator>

        <Form onSubmit={(e) => e.preventDefault()}>
          <InputContainer show={currentStep >= 0}>
            <Input
              label="이름"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User size={18} />}
              autoFocus
              fullWidth
            />
          </InputContainer>

          <InputContainer show={currentStep >= 1}>
            <Input
              label="생년월일"
              placeholder="19900101"
              value={birthdate}
              onChange={(e) => setBirthdate(formatBirthdate(e.target.value))}
              leftIcon={<Calendar size={18} />}
              helperText="8자리 숫자로 입력해주세요"
              fullWidth
            />
          </InputContainer>

          <InputContainer show={currentStep >= 2}>
            <Input
              label="휴대폰 번호"
              placeholder="01012345678"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              leftIcon={<Smartphone size={18} />}
              helperText="'-' 없이 숫자만 입력해주세요"
              fullWidth
            />
          </InputContainer>

          {codeSent && (
            <InputContainer show={currentStep >= 3}>
              <Input
                label="인증번호"
                placeholder="6자리 인증번호"
                value={verificationCode}
                onChange={(e) => setVerificationCode(formatVerificationCode(e.target.value))}
                helperText="휴대폰으로 전송된 인증번호를 입력해주세요"
                fullWidth
              />
              <HelperBox>
                <HelperText>
                  💬 {phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}로 인증번호를 발송했습니다
                </HelperText>
              </HelperBox>
            </InputContainer>
          )}
        </Form>
      </Content>

      <ButtonGroup>
        <Button
          variant="ghost"
          size="lg"
          onClick={onPrev}
          style={{ width: '100px' }}
        >
          이전
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!steps.every(s => s.completed)}
          onClick={onNext}
        >
          {verificationCode.length === 6 ? '인증 완료' : '다음'}
        </Button>
      </ButtonGroup>
    </Container>
  );
}