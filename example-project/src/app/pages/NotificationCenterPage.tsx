import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import styled from '@emotion/styled';
import { ArrowLeft, Monitor, Bell, CheckCheck, Loader2 } from 'lucide-react';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import {
  realtimeNotificationsAtom,
  addNotificationAtom,
  markNotificationReadAtom,
  deleteNotificationAtom,
  unreadCountAtom,
  markAllReadAtom,
} from '../store/notifications';
import { useNotifications, useMarkAsRead, useDeleteNotification, useMarkAllAsRead } from '../hooks/use-notifications';
import { notificationSSE } from '../services/notification-sse';
import { NotificationItem } from '../components/notifications/NotificationItem';
import { NotificationToast } from '../components/notifications/NotificationToast';
import { Notification } from '../types/notification';

const Container = styled.div`
  min-height: 100vh;
  background: #f9fafb;
  max-width: 428px;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatusBar = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  padding-top: 8px;
`;

const HeaderContent = styled.div`
  padding: 12px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #ef4444;
  color: white;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ScreensButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ContentContainer = styled.div`
  padding-bottom: 80px;
`;

const Section = styled.div`
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 16px 8px;
  margin: 0;
`;

const NotificationList = styled.div`
  background: white;
  overflow: hidden;
`;

const EmptyState = styled.div`
  padding: 48px 16px;
  text-align: center;
  color: #9ca3af;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const EmptyText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 6px;
`;

const EmptySubtext = styled.div`
  font-size: 13px;
  color: #9ca3af;
`;

const LoadMoreContainer = styled.div`
  padding: 16px;
  text-align: center;
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
    background: #f9fafb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
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

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 428px;
  width: 100%;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 12px 16px;
  padding-bottom: max(12px, env(safe-area-inset-bottom));
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
`;

const MarkAllReadButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function NotificationCenterPage() {
  const [toastNotification, setToastNotification] = useState<Notification | null>(null);
  const [toastClosing, setToastClosing] = useState(false);
  const [newNotificationIds, setNewNotificationIds] = useState<Set<string>>(new Set());

  const realtimeNotifications = useAtomValue(realtimeNotificationsAtom);
  const addNotification = useSetAtom(addNotificationAtom);
  const markNotificationRead = useSetAtom(markNotificationReadAtom);
  const deleteNotificationLocal = useSetAtom(deleteNotificationAtom);
  const markAllRead = useSetAtom(markAllReadAtom);
  const unreadCount = useAtomValue(unreadCountAtom);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useNotifications();
  const markAsReadMutation = useMarkAsRead();
  const deleteNotificationMutation = useDeleteNotification();
  const markAllAsReadMutation = useMarkAllAsRead();

  const observerTarget = useRef<HTMLDivElement>(null);

  // SSE connection
  useEffect(() => {
    notificationSSE.connect();

    const unsubscribe = notificationSSE.subscribe((notification) => {
      console.log('New notification received:', notification);
      addNotification(notification);
      setToastNotification(notification);
      setToastClosing(false);
      setNewNotificationIds((prev) => new Set(prev).add(notification.id));

      // Auto-hide toast after 5 seconds
      setTimeout(() => {
        setToastClosing(true);
        setTimeout(() => {
          setToastNotification(null);
          setToastClosing(false);
        }, 300);
      }, 5000);
    });

    return () => {
      unsubscribe();
      notificationSSE.disconnect();
    };
  }, [addNotification]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationRead(notificationId);
    markAsReadMutation.mutate(notificationId);
    setNewNotificationIds((prev) => {
      const next = new Set(prev);
      next.delete(notificationId);
      return next;
    });
  };

  const handleDelete = (notificationId: string) => {
    deleteNotificationLocal(notificationId);
    deleteNotificationMutation.mutate(notificationId);
    setNewNotificationIds((prev) => {
      const next = new Set(prev);
      next.delete(notificationId);
      return next;
    });
  };

  const handleMarkAllAsRead = () => {
    markAllRead();
    markAllAsReadMutation.mutate();
    setNewNotificationIds(new Set());
  };

  const handleCloseToast = () => {
    setToastClosing(true);
    setTimeout(() => {
      setToastNotification(null);
      setToastClosing(false);
    }, 300);
  };

  const allNotifications = data?.pages.flatMap((page) => page.notifications) || [];

  return (
    <Container>
      <Header>
        <StatusBar>9:41</StatusBar>
        <HeaderContent>
          <HeaderLeft>
            <BackButton to="/">
              <ArrowLeft size={20} />
            </BackButton>
            <Title>
              알림
              {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
            </Title>
          </HeaderLeft>
          <HeaderActions>
            <ScreensButton to="/notification-center/screens">
              <Monitor size={20} />
            </ScreensButton>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <ContentContainer>
        {realtimeNotifications.length > 0 && (
          <Section>
            <SectionTitle>실시간 알림 ({realtimeNotifications.length})</SectionTitle>
            <NotificationList>
              {realtimeNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  isNew={newNotificationIds.has(notification.id)}
                  onRead={() => handleMarkAsRead(notification.id)}
                  onDelete={() => handleDelete(notification.id)}
                />
              ))}
            </NotificationList>
          </Section>
        )}

        <Section>
          <SectionTitle>과거 알림</SectionTitle>
          {isLoading ? (
            <LoadingSpinner>
              <Loader2 size={32} />
            </LoadingSpinner>
          ) : allNotifications.length > 0 ? (
            <>
              <NotificationList>
                {allNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={() => handleMarkAsRead(notification.id)}
                    onDelete={() => handleDelete(notification.id)}
                  />
                ))}
              </NotificationList>
              {hasNextPage && (
                <LoadMoreContainer>
                  <div ref={observerTarget} />
                  {isFetchingNextPage ? (
                    <LoadingSpinner>
                      <Loader2 size={24} />
                    </LoadingSpinner>
                  ) : (
                    <LoadMoreButton onClick={() => fetchNextPage()}>더 보기</LoadMoreButton>
                  )}
                </LoadMoreContainer>
              )}
            </>
          ) : (
            <NotificationList>
              <EmptyState>
                <EmptyIcon>🔔</EmptyIcon>
                <EmptyText>알림이 없습니다</EmptyText>
                <EmptySubtext>새로운 알림이 도착하면 여기에 표시됩니다</EmptySubtext>
              </EmptyState>
            </NotificationList>
          )}
        </Section>
      </ContentContainer>

      {unreadCount > 0 && (
        <BottomBar>
          <MarkAllReadButton onClick={handleMarkAllAsRead}>
            <CheckCheck size={20} />
            모두 읽음 ({unreadCount})
          </MarkAllReadButton>
        </BottomBar>
      )}

      {toastNotification && (
        <NotificationToast
          notification={toastNotification}
          onClose={handleCloseToast}
          isClosing={toastClosing}
        />
      )}
    </Container>
  );
}