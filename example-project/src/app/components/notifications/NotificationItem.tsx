import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { TrendingUp, TrendingDown, DollarSign, Info, Bell, Trash2 } from 'lucide-react';
import { Notification, NotificationType } from '../../types/notification';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ItemContainer = styled.div<{ isRead: boolean; isNew?: boolean }>`
  padding: 16px;
  background: ${(props) => (props.isRead ? 'white' : '#f0f9ff')};
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: ${(props) => (props.isNew ? fadeIn : 'none')} 0.3s ease;

  &:hover {
    background: ${(props) => (props.isRead ? '#f9fafb' : '#e0f2fe')};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ItemContent = styled.div`
  display: flex;
  gap: 12px;
`;

const IconWrapper = styled.div<{ type: NotificationType }>`
  width: 40px;
  height: 40px;
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

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
`;

const ItemTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const ItemTime = styled.div`
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;
`;

const ItemMessage = styled.div`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 8px;
`;

const ItemMetadata = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const MetadataTag = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  background: #f3f4f6;
  border-radius: 4px;
  color: #6b7280;

  strong {
    color: #111827;
    font-weight: 600;
  }
`;

const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3b82f6;
  flex-shrink: 0;
  margin-top: 6px;
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
    color: #ef4444;
  }
`;

interface NotificationItemProps {
  notification: Notification;
  isNew?: boolean;
  onRead: () => void;
  onDelete: () => void;
}

export function NotificationItem({ notification, isNew, onRead, onDelete }: NotificationItemProps) {
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

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <ItemContainer isRead={notification.isRead} isNew={isNew} onClick={onRead}>
      <ItemContent>
        {!notification.isRead && <UnreadDot />}
        <IconWrapper type={notification.type}>{getIcon()}</IconWrapper>
        <ItemInfo>
          <ItemHeader>
            <ItemTitle>{notification.title}</ItemTitle>
            <ItemTime>
              {formatDistanceToNow(new Date(notification.timestamp), {
                addSuffix: true,
                locale: ko,
              })}
            </ItemTime>
          </ItemHeader>
          <ItemMessage>{notification.message}</ItemMessage>
          {notification.metadata && (
            <ItemMetadata>
              {notification.metadata.stockSymbol && (
                <MetadataTag>
                  <strong>{notification.metadata.stockSymbol}</strong>
                </MetadataTag>
              )}
              {notification.metadata.price && (
                <MetadataTag>
                  가격: <strong>{notification.metadata.price.toLocaleString()}원</strong>
                </MetadataTag>
              )}
              {notification.metadata.quantity && (
                <MetadataTag>
                  수량: <strong>{notification.metadata.quantity}주</strong>
                </MetadataTag>
              )}
              {notification.metadata.changeRate && (
                <MetadataTag>
                  <strong
                    style={{
                      color: notification.metadata.changeRate > 0 ? '#22c55e' : '#ef4444',
                    }}
                  >
                    {notification.metadata.changeRate > 0 ? '+' : ''}
                    {notification.metadata.changeRate.toFixed(2)}%
                  </strong>
                </MetadataTag>
              )}
            </ItemMetadata>
          )}
        </ItemInfo>
        <ActionButton onClick={handleDelete}>
          <Trash2 size={16} />
        </ActionButton>
      </ItemContent>
    </ItemContainer>
  );
}
