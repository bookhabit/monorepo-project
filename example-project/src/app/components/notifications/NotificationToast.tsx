import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { X, TrendingUp, TrendingDown, DollarSign, Bell, Info } from 'lucide-react';
import { Notification, NotificationType } from '../../types/notification';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{ isClosing?: boolean }>`
  position: fixed;
  top: 24px;
  right: 24px;
  width: 360px;
  max-width: calc(100vw - 48px);
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  animation: ${(props) => (props.isClosing ? slideOut : slideIn)} 0.3s ease;
  border-left: 4px solid;
  border-left-color: ${(props) => {
    const type = props.theme?.type || 'info';
    switch (type) {
      case 'price_alert':
        return '#f59e0b';
      case 'execution':
        return '#22c55e';
      case 'news':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  }};
`;

const ToastHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
`;

const IconWrapper = styled.div<{ type: NotificationType }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${(props) => {
    switch (props.type) {
      case 'price_alert':
        return 'rgba(245, 158, 11, 0.1)';
      case 'execution':
        return 'rgba(34, 197, 94, 0.1)';
      case 'news':
        return 'rgba(59, 130, 246, 0.1)';
      default:
        return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case 'price_alert':
        return '#f59e0b';
      case 'execution':
        return '#22c55e';
      case 'news':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  }};
`;

const ToastContent = styled.div`
  flex: 1;
`;

const ToastTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
`;

const ToastMessage = styled.div`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const MetadataRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f3f4f6;
`;

const MetadataItem = styled.div`
  font-size: 12px;
  color: #6b7280;

  span {
    font-weight: 600;
    color: #111827;
  }
`;

interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
  isClosing?: boolean;
}

export function NotificationToast({ notification, onClose, isClosing }: NotificationToastProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'price_alert':
        return notification.metadata?.changeRate && notification.metadata.changeRate > 0 ? (
          <TrendingUp size={20} />
        ) : (
          <TrendingDown size={20} />
        );
      case 'execution':
        return <DollarSign size={20} />;
      case 'news':
        return <Info size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  return (
    <ToastContainer isClosing={isClosing} theme={{ type: notification.type }}>
      <ToastHeader>
        <IconWrapper type={notification.type}>{getIcon()}</IconWrapper>
        <ToastContent>
          <ToastTitle>{notification.title}</ToastTitle>
          <ToastMessage>{notification.message}</ToastMessage>
          {notification.metadata && (
            <MetadataRow>
              {notification.metadata.stockSymbol && (
                <MetadataItem>
                  <span>{notification.metadata.stockSymbol}</span>
                </MetadataItem>
              )}
              {notification.metadata.price && (
                <MetadataItem>
                  가격: <span>{notification.metadata.price.toLocaleString()}원</span>
                </MetadataItem>
              )}
              {notification.metadata.quantity && (
                <MetadataItem>
                  수량: <span>{notification.metadata.quantity}주</span>
                </MetadataItem>
              )}
            </MetadataRow>
          )}
        </ToastContent>
        <CloseButton onClick={onClose}>
          <X size={16} />
        </CloseButton>
      </ToastHeader>
    </ToastContainer>
  );
}
