/**
 * 완료 단계 - Toss Style
 */

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router';
import { Button, colors, spacing, borderRadius, gradients } from '../../../design-system';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  text-align: center;
  padding: ${spacing[8]} 0;
`;

const IconWrapper = styled.div<{ show: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${gradients.success};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing[6]};
  opacity: ${props => props.show ? 1 : 0};
  transform: scale(${props => props.show ? 1 : 0.5});
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const Title = styled.h2<{ show: boolean }>`
  font-size: 28px;
  font-weight: 900;
  color: ${colors.gray900};
  margin: 0 0 ${spacing[3]} 0;
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? 0 : '16px'});
  transition: all 0.4s ease 0.2s;
`;

const Description = styled.p<{ show: boolean }>`
  font-size: 16px;
  color: ${colors.gray600};
  margin: 0 0 ${spacing[8]} 0;
  line-height: 1.6;
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? 0 : '16px'});
  transition: all 0.4s ease 0.3s;
`;

const InfoBox = styled.div<{ show: boolean }>`
  width: 100%;
  padding: ${spacing[6]};
  background: ${colors.gray50};
  border-radius: ${borderRadius.xl};
  margin-bottom: ${spacing[6]};
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? 0 : '16px'});
  transition: all 0.4s ease 0.4s;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacing[3]} 0;
  border-bottom: 1px solid ${colors.gray200};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: ${colors.gray600};
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.gray900};
`;

const AccountNumber = styled.div<{ show: boolean }>`
  padding: ${spacing[5]};
  background: white;
  border: 2px dashed ${colors.primary300};
  border-radius: ${borderRadius.lg};
  margin-bottom: ${spacing[8]};
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? 0 : '16px'});
  transition: all 0.4s ease 0.5s;
`;

const AccountLabel = styled.div`
  font-size: 13px;
  color: ${colors.gray600};
  margin-bottom: ${spacing[2]};
`;

const AccountValue = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: ${colors.primary600};
  font-family: 'SF Mono', monospace;
  letter-spacing: 2px;
`;

const ButtonGroup = styled.div<{ show: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? 0 : '16px'});
  transition: all 0.4s ease 0.6s;
`;

const generateAccountNumber = () => {
  const prefix = '110';
  const random = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  const checkDigit = Math.floor(Math.random() * 10);
  return `${prefix}-${random}-${checkDigit}`;
};

export function Complete() {
  const [show, setShow] = useState(false);
  const [accountNumber] = useState(generateAccountNumber());

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <Container>
      <IconWrapper show={show}>
        <CheckCircle2 size={64} color="white" strokeWidth={2.5} />
      </IconWrapper>

      <Title show={show}>계좌 개설 완료!</Title>
      <Description show={show}>
        주식 계좌가 성공적으로 개설되었습니다<br />
        이제 투자를 시작할 수 있어요
      </Description>

      <InfoBox show={show}>
        <InfoRow>
          <InfoLabel>계좌 유형</InfoLabel>
          <InfoValue>주식 투자 계좌</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>개설일</InfoLabel>
          <InfoValue>{new Date().toLocaleDateString('ko-KR')}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>초기 예수금</InfoLabel>
          <InfoValue>0원</InfoValue>
        </InfoRow>
      </InfoBox>

      <AccountNumber show={show}>
        <AccountLabel>계좌번호</AccountLabel>
        <AccountValue>{accountNumber}</AccountValue>
      </AccountNumber>

      <ButtonGroup show={show}>
        <Button
          as={Link}
          to="/"
          variant="primary"
          size="lg"
          fullWidth
        >
          <Home size={20} />
          홈으로 이동
        </Button>
        <Button
          as={Link}
          to="/orderbook"
          variant="outline"
          size="lg"
          fullWidth
        >
          거래 시작하기
          <ArrowRight size={20} />
        </Button>
      </ButtonGroup>
    </Container>
  );
}