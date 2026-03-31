/**
 * 약관 동의 단계 - Toss Style
 */

import { useState } from 'react';
import styled from '@emotion/styled';
import { Check, ChevronRight } from 'lucide-react';
import { Button, colors, spacing, borderRadius } from '../../../design-system';

interface TermsAgreementProps {
  onNext: () => void;
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

const AllAgreeBox = styled.div<{ checked: boolean }>`
  padding: ${spacing[5]};
  background: ${props => props.checked ? colors.primary50 : colors.gray50};
  border: 2px solid ${props => props.checked ? colors.primary500 : colors.gray200};
  border-radius: ${borderRadius.xl};
  margin-bottom: ${spacing[6]};
  transition: all 0.2s ease;
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }
`;

const AllAgreeLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  font-size: 17px;
  font-weight: 700;
  color: ${colors.gray900};
`;

const CheckboxIcon = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.checked ? colors.primary600 : colors.white};
  border: 2px solid ${props => props.checked ? colors.primary600 : colors.gray300};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  svg {
    color: white;
    opacity: ${props => props.checked ? 1 : 0};
    transform: scale(${props => props.checked ? 1 : 0.5});
    transition: all 0.2s ease;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${colors.gray200};
  margin: ${spacing[6]} 0;
`;

const TermsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const TermItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[4]};
  background: white;
  border: 1px solid ${colors.gray200};
  border-radius: ${borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.gray50};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const TermItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  flex: 1;
`;

const TermLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TermTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.gray900};
`;

const TermRequired = styled.span<{ required: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.required ? colors.primary600 : colors.gray500};
`;

const ViewDetailButton = styled.button`
  background: none;
  border: none;
  color: ${colors.gray400};
  cursor: pointer;
  padding: ${spacing[1]};
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  padding-top: ${spacing[6]};
`;

interface Term {
  id: string;
  title: string;
  required: boolean;
}

const terms: Term[] = [
  { id: 'service', title: '서비스 이용약관', required: true },
  { id: 'privacy', title: '개인정보 수집 및 이용', required: true },
  { id: 'thirdParty', title: '개인정보 제3자 제공', required: true },
  { id: 'marketing', title: '마케팅 정보 수신', required: false },
];

export function TermsAgreement({ onNext }: TermsAgreementProps) {
  const [agreedTerms, setAgreedTerms] = useState<Set<string>>(new Set());

  const allAgreed = terms.every(term => agreedTerms.has(term.id));
  const requiredAgreed = terms.filter(t => t.required).every(term => agreedTerms.has(term.id));

  const toggleAllTerms = () => {
    if (allAgreed) {
      setAgreedTerms(new Set());
    } else {
      setAgreedTerms(new Set(terms.map(t => t.id)));
    }
  };

  const toggleTerm = (id: string) => {
    const newAgreed = new Set(agreedTerms);
    if (newAgreed.has(id)) {
      newAgreed.delete(id);
    } else {
      newAgreed.add(id);
    }
    setAgreedTerms(newAgreed);
  };

  const handleNext = () => {
    if (requiredAgreed) {
      onNext();
    }
  };

  return (
    <Container>
      <Content>
        <Title>약관에 동의해주세요</Title>
        <Description>
          주식 계좌 개설을 위해 필수 약관에 동의해주세요
        </Description>

        <AllAgreeBox checked={allAgreed} onClick={toggleAllTerms}>
          <AllAgreeLabel>
            <CheckboxIcon checked={allAgreed}>
              <Check size={16} strokeWidth={3} />
            </CheckboxIcon>
            전체 동의
          </AllAgreeLabel>
        </AllAgreeBox>

        <Divider />

        <TermsList>
          {terms.map(term => (
            <TermItem key={term.id} onClick={() => toggleTerm(term.id)}>
              <TermItemLeft>
                <CheckboxIcon checked={agreedTerms.has(term.id)}>
                  <Check size={14} strokeWidth={3} />
                </CheckboxIcon>
                <TermLabel>
                  <TermTitle>{term.title}</TermTitle>
                  <TermRequired required={term.required}>
                    {term.required ? '필수' : '선택'}
                  </TermRequired>
                </TermLabel>
              </TermItemLeft>
              <ViewDetailButton onClick={(e) => e.stopPropagation()}>
                <ChevronRight size={18} />
              </ViewDetailButton>
            </TermItem>
          ))}
        </TermsList>
      </Content>

      <ButtonContainer>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!requiredAgreed}
          onClick={handleNext}
        >
          다음
        </Button>
      </ButtonContainer>
    </Container>
  );
}