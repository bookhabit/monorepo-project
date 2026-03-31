/**
 * 정보 입력 단계 - Toss Style
 */

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Button, Input, Select, colors, spacing, borderRadius } from '../../../design-system';

interface InformationInputProps {
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

const AddressGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

export function InformationInput({ onNext, onPrev }: InformationInputProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [income, setIncome] = useState('');

  const steps = [
    { field: 'address', value: address, completed: address.length > 0 },
    { field: 'detailAddress', value: detailAddress, completed: detailAddress.length > 0 },
    { field: 'occupation', value: occupation, completed: occupation !== '' },
    { field: 'income', value: income, completed: income !== '' },
  ];

  const allCompleted = steps.every(s => s.completed);

  // 자동 진행
  useEffect(() => {
    if (currentStep === 0 && address.length > 5) {
      setTimeout(() => setCurrentStep(1), 300);
    } else if (currentStep === 1 && detailAddress.length > 0) {
      setTimeout(() => setCurrentStep(2), 300);
    } else if (currentStep === 2 && occupation !== '') {
      setTimeout(() => setCurrentStep(3), 300);
    } else if (currentStep === 3 && income !== '' && allCompleted) {
      // 모든 정보 입력 완료
      setTimeout(() => {
        onNext();
      }, 500);
    }
  }, [address, detailAddress, occupation, income, currentStep, allCompleted, onNext]);

  const handleAddressSearch = () => {
    // 주소 검색 모달 (실제로는 Daum 우편번호 API 등 사용)
    const mockAddress = '서울특별시 강남구 테헤란로 123';
    setAddress(mockAddress);
  };

  return (
    <Container>
      <Content>
        <Title>추가 정보 입력</Title>
        <Description>
          계좌 개설을 위해 몇 가지 정보가 더 필요해요
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
            <AddressGroup>
              <Input
                label="주소"
                placeholder="주소를 검색하세요"
                value={address}
                readOnly
                onClick={handleAddressSearch}
                leftIcon={<MapPin size={18} />}
                fullWidth
              />
              {address && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddressSearch}
                  type="button"
                >
                  주소 재검색
                </Button>
              )}
            </AddressGroup>
          </InputContainer>

          <InputContainer show={currentStep >= 1}>
            <Input
              label="상세 주소"
              placeholder="동/호수 등 상세 주소를 입력하세요"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              leftIcon={<MapPin size={18} />}
              autoFocus={currentStep === 1}
              fullWidth
            />
          </InputContainer>

          <InputContainer show={currentStep >= 2}>
            <Select
              label="직업"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              fullWidth
            >
              <option value="">선택하세요</option>
              <option value="employee">회사원</option>
              <option value="self-employed">자영업</option>
              <option value="freelancer">프리랜서</option>
              <option value="student">학생</option>
              <option value="housewife">주부</option>
              <option value="etc">기타</option>
            </Select>
          </InputContainer>

          <InputContainer show={currentStep >= 3}>
            <Select
              label="연 소득"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              fullWidth
            >
              <option value="">선택하세요</option>
              <option value="under-20m">2,000만원 미만</option>
              <option value="20m-40m">2,000만원 ~ 4,000만원</option>
              <option value="40m-60m">4,000만원 ~ 6,000만원</option>
              <option value="60m-80m">6,000만원 ~ 8,000만원</option>
              <option value="80m-100m">8,000만원 ~ 1억원</option>
              <option value="over-100m">1억원 이상</option>
            </Select>
          </InputContainer>
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
          disabled={!allCompleted}
          onClick={onNext}
        >
          완료
        </Button>
      </ButtonGroup>
    </Container>
  );
}