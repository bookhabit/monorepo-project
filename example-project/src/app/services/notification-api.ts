import { Notification, NotificationPage } from '../types/notification';

// Mock notification data
const mockNotifications: Notification[] = [];

// Generate initial mock data
for (let i = 0; i < 50; i++) {
  const types: Array<'price_alert' | 'execution' | 'news' | 'system'> = [
    'price_alert',
    'execution',
    'news',
    'system',
  ];
  const type = types[Math.floor(Math.random() * types.length)];

  mockNotifications.push({
    id: `notif_${i}`,
    type,
    title: `알림 ${i + 1}`,
    message: `이것은 테스트 알림 메시지입니다. (${i + 1})`,
    timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
    isRead: Math.random() > 0.5,
    metadata: {
      stockSymbol: ['AAPL', 'MSFT', 'GOOGL', 'TSLA'][Math.floor(Math.random() * 4)],
      price: Math.floor(Math.random() * 200000) + 100000,
    },
  });
}

const PAGE_SIZE = 10;

export async function fetchNotifications(
  cursor: string | null = null
): Promise<NotificationPage> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const startIndex = cursor ? parseInt(cursor, 10) : 0;
  const endIndex = startIndex + PAGE_SIZE;
  const notifications = mockNotifications.slice(startIndex, endIndex);

  return {
    notifications,
    nextCursor: endIndex < mockNotifications.length ? endIndex.toString() : null,
    hasMore: endIndex < mockNotifications.length,
  };
}

export async function markAsRead(notificationId: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const notification = mockNotifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.isRead = true;
  }

  // Random failure (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('읽음 처리에 실패했습니다.');
  }
}

export async function markAllAsRead(): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  mockNotifications.forEach((n) => {
    n.isRead = true;
  });

  // Random failure (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('전체 읽음 처리에 실패했습니다.');
  }
}

export async function deleteNotification(notificationId: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = mockNotifications.findIndex((n) => n.id === notificationId);
  if (index !== -1) {
    mockNotifications.splice(index, 1);
  }

  // Random failure (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('알림 삭제에 실패했습니다.');
  }
}
