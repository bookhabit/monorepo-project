import styled from '@emotion/styled';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const Container = styled.div`
  padding: 32px;
  text-align: center;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
`;

const Icon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

const Message = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0 0 20px 0;
`;

const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #3b82f6;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Container>
      <Icon>
        <AlertTriangle size={32} />
      </Icon>
      <Title>데이터를 불러오는 중 오류가 발생했습니다</Title>
      <Message>{error.message || '알 수 없는 오류가 발생했습니다.'}</Message>
      {resetErrorBoundary && (
        <RetryButton onClick={resetErrorBoundary}>
          <RefreshCw size={16} />
          다시 시도
        </RetryButton>
      )}
    </Container>
  );
}
