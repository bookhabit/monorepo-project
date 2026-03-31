export interface OrderBookLevel {
  price: number;
  quantity: number;
  total: number;
}

export interface OrderBookData {
  symbol: string;
  timestamp: number;
  bids: OrderBookLevel[]; // 매수 호가
  asks: OrderBookLevel[]; // 매도 호가
}

// 실시간 호가 데이터 시뮬레이션
export class WebSocketMock {
  private intervalId: NodeJS.Timeout | null = null;
  private basePrice = 50000; // 기준 가격
  private listeners: Array<(data: OrderBookData) => void> = [];

  connect(callback: (data: OrderBookData) => void) {
    this.listeners.push(callback);

    // 초기 데이터 전송
    callback(this.generateOrderBook());

    // 500ms마다 업데이트 (초당 2회)
    this.intervalId = setInterval(() => {
      const data = this.generateOrderBook();
      this.listeners.forEach((listener) => listener(data));
    }, 500);
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.listeners = [];
  }

  private generateOrderBook(): OrderBookData {
    // 기준가를 랜덤하게 약간 변동
    this.basePrice += (Math.random() - 0.5) * 100;
    this.basePrice = Math.max(45000, Math.min(55000, this.basePrice));

    const bids: OrderBookLevel[] = [];
    const asks: OrderBookLevel[] = [];

    // 매수 호가 10단계 생성 (기준가보다 낮은 가격)
    for (let i = 0; i < 10; i++) {
      const price = Math.floor(this.basePrice - (i + 1) * 50);
      const quantity = Math.floor(Math.random() * 1000) + 100;
      const total = price * quantity;
      bids.push({ price, quantity, total });
    }

    // 매도 호가 10단계 생성 (기준가보다 높은 가격)
    for (let i = 0; i < 10; i++) {
      const price = Math.floor(this.basePrice + (i + 1) * 50);
      const quantity = Math.floor(Math.random() * 1000) + 100;
      const total = price * quantity;
      asks.push({ price, quantity, total });
    }

    return {
      symbol: 'KOSPI200',
      timestamp: Date.now(),
      bids,
      asks,
    };
  }
}

// 싱글톤 인스턴스
export const websocketMock = new WebSocketMock();
