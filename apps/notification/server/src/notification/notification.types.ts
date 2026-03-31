export type NotificationType = 'price_alert' | 'execution' | 'news' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  metadata?: {
    stockSymbol?: string;
    price?: number;
    quantity?: number;
    changeRate?: number;
  };
}

export interface NotificationPage {
  notifications: Notification[];
  nextCursor: string | null;
  hasMore: boolean;
}
