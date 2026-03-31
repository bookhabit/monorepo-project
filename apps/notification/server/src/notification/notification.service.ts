import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Notification, NotificationPage, NotificationType } from './notification.types';

const PAGE_SIZE = 10;

const SSE_TEMPLATES: Record<NotificationType, Array<{ title: string; message: string; metadata: object }>> = {
  price_alert: [
    { title: '목표가 도달 알림', message: 'AAPL이 목표가 $175에 도달했습니다.', metadata: { stockSymbol: 'AAPL', price: 175000, changeRate: 2.5 } },
    { title: '가격 급등 알림', message: 'TSLA이 10% 이상 상승했습니다.', metadata: { stockSymbol: 'TSLA', price: 215000, changeRate: 12.3 } },
    { title: '가격 급락 알림', message: 'NFLX이 5% 이상 하락했습니다.', metadata: { stockSymbol: 'NFLX', price: 225000, changeRate: -6.7 } },
  ],
  execution: [
    { title: '매수 체결 완료', message: 'MSFT 30주가 $320에 체결되었습니다.', metadata: { stockSymbol: 'MSFT', price: 320000, quantity: 30 } },
    { title: '매도 체결 완료', message: 'GOOGL 25주가 $145에 체결되었습니다.', metadata: { stockSymbol: 'GOOGL', price: 145000, quantity: 25 } },
  ],
  news: [
    { title: '주요 뉴스', message: 'Apple, 새로운 iPhone 출시 발표', metadata: { stockSymbol: 'AAPL' } },
    { title: '시장 동향', message: 'NASDAQ 지수 사상 최고치 경신', metadata: {} },
  ],
  system: [
    { title: '시스템 점검 안내', message: '오늘 23:00~24:00 시스템 점검이 예정되어 있습니다.', metadata: {} },
    { title: '보안 업데이트', message: '2단계 인증이 활성화되었습니다.', metadata: {} },
  ],
};

@Injectable()
export class NotificationService {
  private notifications: Notification[] = this.generateInitialData();
  private readonly stream$ = new Subject<Notification>();
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    this.startSSEBroadcast();
  }

  // ── REST ──────────────────────────────────────────────

  findPage(cursor: string | null): NotificationPage {
    const startIndex = cursor ? parseInt(cursor, 10) : 0;
    const endIndex = startIndex + PAGE_SIZE;
    const slice = this.notifications.slice(startIndex, endIndex);

    return {
      notifications: slice,
      nextCursor: endIndex < this.notifications.length ? String(endIndex) : null,
      hasMore: endIndex < this.notifications.length,
    };
  }

  markAsRead(id: string): Notification {
    const notification = this.notifications.find((n) => n.id === id);
    if (!notification) throw new NotFoundException('알림을 찾을 수 없습니다.');

    if (Math.random() < 0.05) throw new Error('읽음 처리에 실패했습니다.');

    notification.isRead = true;
    return notification;
  }

  markAllAsRead(): void {
    if (Math.random() < 0.05) throw new Error('전체 읽음 처리에 실패했습니다.');
    this.notifications.forEach((n) => { n.isRead = true; });
  }

  remove(id: string): void {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index === -1) throw new NotFoundException('알림을 찾을 수 없습니다.');

    if (Math.random() < 0.05) throw new Error('삭제에 실패했습니다.');

    this.notifications.splice(index, 1);
  }

  // ── SSE ──────────────────────────────────────────────

  getStream(): Observable<Notification> {
    return this.stream$.asObservable();
  }

  // ── Private ──────────────────────────────────────────

  private startSSEBroadcast(): void {
    const schedule = () => {
      const delay = Math.random() * 10_000 + 5_000; // 5~15초
      this.intervalId = setTimeout(() => {
        const notification = this.generateRandomNotification();
        this.notifications.unshift(notification); // 목록 상단에도 추가
        this.stream$.next(notification);
        schedule();
      }, delay);
    };
    schedule();
  }

  private generateRandomNotification(): Notification {
    const types = Object.keys(SSE_TEMPLATES) as NotificationType[];
    const type = types[Math.floor(Math.random() * types.length)];
    const templates = SSE_TEMPLATES[type];
    const template = templates[Math.floor(Math.random() * templates.length)];

    return {
      id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      type,
      title: template.title,
      message: template.message,
      timestamp: new Date().toISOString(),
      isRead: false,
      metadata: template.metadata,
    };
  }

  private generateInitialData(): Notification[] {
    const types: NotificationType[] = ['price_alert', 'execution', 'news', 'system'];
    return Array.from({ length: 50 }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        id: `notif_${i}`,
        type,
        title: `알림 ${i + 1}`,
        message: `테스트 알림 메시지입니다. (${i + 1})`,
        timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
        isRead: Math.random() > 0.5,
        metadata: {
          stockSymbol: ['AAPL', 'MSFT', 'GOOGL', 'TSLA'][Math.floor(Math.random() * 4)],
          price: Math.floor(Math.random() * 200_000) + 100_000,
        },
      };
    });
  }
}
