import styled from '@emotion/styled';
import { Loader2 } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  gap: 16px;
`;

const Spinner = styled(Loader2)`
  animation: spin 1s linear infinite;
  color: #3b82f6;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Text = styled.div`
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
`;

interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text = '데이터를 불러오는 중...' }: LoadingSpinnerProps) {
  return (
    <Container>
      <Spinner size={32} />
      <Text>{text}</Text>
    </Container>
  );
}
