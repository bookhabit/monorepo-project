import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { X, Clock, User, FileText, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useDrawerStore } from '../../store/loan-store';
import { useReviewHistory } from '../../hooks/use-loan-applications';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  max-width: 100%;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease;
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: #f3f4f6;
  border-radius: 8px;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f9fafb;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 32px;

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e5e7eb;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 32px;

  &:last-child {
    padding-bottom: 0;
  }
`;

const TimelineIcon = styled.div<{ type: string }>`
  position: absolute;
  left: -24px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${(props) => {
    switch (props.type) {
      case 'approved':
        return '#22c55e';
      case 'rejected':
        return '#ef4444';
      case 'review_started':
        return '#3b82f6';
      default:
        return '#9ca3af';
    }
  }};
  border: 3px solid white;
  box-shadow: 0 0 0 2px
    ${(props) => {
      switch (props.type) {
        case 'approved':
          return '#dcfce7';
        case 'rejected':
          return '#fee2e2';
        case 'review_started':
          return '#dbeafe';
        default:
          return '#f3f4f6';
      }
    }};
`;

const TimelineContent = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
`;

const TimelineAction = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimelineDetails = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const TimelineTime = styled.div`
  font-size: 12px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #9ca3af;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export function ApplicationDrawer() {
  const { isOpen, applicationId, closeDrawer } = useDrawerStore();
  const { data: history, isLoading } = useReviewHistory(applicationId);

  if (!isOpen) return null;

  const getActionLabel = (action: string) => {
    const labels = {
      submitted: '신청 접수',
      approved: '승인 완료',
      rejected: '거절 처리',
      review_started: '검토 시작',
      document_requested: '서류 요청',
    };
    return labels[action as keyof typeof labels] || action;
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'approved':
        return <CheckCircle2 size={16} color="#22c55e" />;
      case 'rejected':
        return <XCircle size={16} color="#ef4444" />;
      case 'review_started':
        return <FileText size={16} color="#3b82f6" />;
      default:
        return <User size={16} color="#9ca3af" />;
    }
  };

  return (
    <>
      <Overlay onClick={closeDrawer} />
      <Drawer>
        <Header>
          <Title>심사 이력</Title>
          <CloseButton onClick={closeDrawer}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          {isLoading ? (
            <LoadingContainer>
              <Loader2 size={40} />
              <div style={{ marginTop: '16px' }}>이력을 불러오는 중...</div>
            </LoadingContainer>
          ) : history && history.length > 0 ? (
            <Timeline>
              {history.map((item) => (
                <TimelineItem key={item.id}>
                  <TimelineIcon type={item.action} />
                  <TimelineContent>
                    <TimelineAction>
                      {getActionIcon(item.action)}
                      {getActionLabel(item.action)}
                    </TimelineAction>
                    <TimelineDetails>
                      담당자: {item.performedBy}
                      {item.note && (
                        <>
                          <br />
                          {item.note}
                        </>
                      )}
                      {item.previousStatus && item.newStatus && (
                        <>
                          <br />
                          {item.previousStatus} → {item.newStatus}
                        </>
                      )}
                    </TimelineDetails>
                    <TimelineTime>
                      <Clock size={12} />
                      {formatDistanceToNow(new Date(item.performedAt), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </TimelineTime>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9ca3af' }}>
              이력이 없습니다
            </div>
          )}
        </Content>
      </Drawer>
    </>
  );
}
