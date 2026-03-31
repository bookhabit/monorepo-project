import { Notification, NotificationType } from '../types/notification';

// Mock SSE service for real-time notifications
class NotificationSSE {
  private listeners: ((notification: Notification) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private isConnected = false;

  connect() {
    if (this.isConnected) return;

    this.isConnected = true;
    console.log('SSE: Connected to notification stream');

    // Simulate SSE messages every 5-15 seconds
    this.intervalId = setInterval(() => {
      const notification = this.generateRandomNotification();
      this.emit(notification);
    }, Math.random() * 10000 + 5000);
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isConnected = false;
    console.log('SSE: Disconnected from notification stream');
  }

  subscribe(listener: (notification: Notification) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private emit(notification: Notification) {
    this.listeners.forEach((listener) => listener(notification));
  }

  private generateRandomNotification(): Notification {
    const types: NotificationType[] = ['price_alert', 'execution', 'news', 'system'];
    const type = types[Math.floor(Math.random() * types.length)];

    const templates = {
      price_alert: [
        {
          title: '목표가 도달 알림',
          message: 'AAPL이 목표가 $175에 도달했습니다.',
          metadata: { stockSymbol: 'AAPL', price: 175000, changeRate: 2.5 },
        },
        {
          title: '가격 급등 알림',
          message: 'TSLA이 10% 이상 상승했습니다.',
          metadata: { stockSymbol: 'TSLA', price: 215000, changeRate: 12.3 },
        },
        {
          title: '가격 급락 알림',
          message: 'NFLX이 5% 이상 하락했습니다.',
          metadata: { stockSymbol: 'NFLX', price: 225000, changeRate: -6.7 },
        },
      ],
      execution: [
        {
          title: '매수 체결 완료',
          message: 'MSFT 30주가 $320에 체결되었습니다.',
          metadata: { stockSymbol: 'MSFT', price: 320000, quantity: 30 },
        },
        {
          title: '매도 체결 완료',
          message: 'GOOGL 25주가 $145에 체결되었습니다.',
          metadata: { stockSymbol: 'GOOGL', price: 145000, quantity: 25 },
        },
      ],
      news: [
        {
          title: '주요 뉴스',
          message: 'Apple, 새로운 iPhone 출시 발표',
          metadata: { stockSymbol: 'AAPL' },
        },
        {
          title: '시장 동향',
          message: 'NASDAQ 지수 사상 최고치 경신',
          metadata: {},
        },
      ],
      system: [
        {
          title: '시스템 점검 안내',
          message: '오늘 23:00~24:00 시스템 점검이 예정되어 있습니다.',
          metadata: {},
        },
        {
          title: '보안 업데이트',
          message: '2단계 인증이 활성화되었습니다.',
          metadata: {},
        },
      ],
    };

    const template = templates[type][Math.floor(Math.random() * templates[type].length)];

    return {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: template.title,
      message: template.message,
      timestamp: new Date().toISOString(),
      isRead: false,
      metadata: template.metadata,
    };
  }
}

export const notificationSSE = new NotificationSSE();
