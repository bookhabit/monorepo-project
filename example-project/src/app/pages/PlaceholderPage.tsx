import { Link } from 'react-router';
import styled from '@emotion/styled';
import { ArrowLeft, Construction } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0f172a, #1e293b);
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  margin-bottom: 48px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #9ca3af;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: #374151;
    border-color: #3b82f6;
    color: #f9fafb;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 120px;
  height: 120px;
  border-radius: 24px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #f9fafb;
  margin: 0 0 16px 0;
`;

const Description = styled.p`
  font-size: 18px;
  color: #9ca3af;
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

const ComingSoonBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: any;
  iconColor: string;
}

export function PlaceholderPage({
  title,
  description,
  icon: Icon,
  iconColor,
}: PlaceholderPageProps) {
  return (
    <Container>
      <Header>
        <BackButton to="/">
          <ArrowLeft size={18} />
          홈으로
        </BackButton>
      </Header>

      <Content>
        <IconWrapper color={iconColor}>
          <Icon size={56} color="white" strokeWidth={2} />
        </IconWrapper>
        
        <Title>{title}</Title>
        <Description>{description}</Description>
        
        <ComingSoonBadge>
          <Construction size={18} />
          준비 중
        </ComingSoonBadge>
      </Content>
    </Container>
  );
}
