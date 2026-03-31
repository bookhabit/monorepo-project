import { Transaction, RiskLevel, TransactionStatus, TransactionType } from '../types/fds';

// Mock streaming service for real-time transactions
class FDSStreaming {
  private listeners: ((transaction: Transaction) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private isConnected = false;
  private transactionCount = 0;

  connect() {
    if (this.isConnected) return;

    this.isConnected = true;
    console.log('FDS Stream: Connected');

    // Simulate real-time transactions every 1-3 seconds
    this.intervalId = setInterval(() => {
      const transaction = this.generateRandomTransaction();
      this.emit(transaction);
    }, Math.random() * 2000 + 1000);
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isConnected = false;
    console.log('FDS Stream: Disconnected');
  }

  subscribe(listener: (transaction: Transaction) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private emit(transaction: Transaction) {
    this.listeners.forEach((listener) => listener(transaction));
  }

  private generateRandomTransaction(): Transaction {
    this.transactionCount++;
    
    const types: TransactionType[] = ['transfer', 'withdrawal', 'deposit', 'payment'];
    const riskLevels: RiskLevel[] = ['low', 'low', 'low', 'medium', 'medium', 'high', 'critical'];
    const statuses: TransactionStatus[] = ['normal', 'suspicious', 'reviewing'];
    const names = ['김철수', '이영희', '박민수', '최지영', '정현우', '강서연', '조민재', '윤수정'];
    const locations = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종'];

    const type = types[Math.floor(Math.random() * types.length)];
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const riskScore = riskLevel === 'critical' ? Math.random() * 20 + 80 :
                      riskLevel === 'high' ? Math.random() * 20 + 60 :
                      riskLevel === 'medium' ? Math.random() * 20 + 40 :
                      Math.random() * 40;

    const flags: string[] = [];
    if (riskScore > 70) flags.push('대량 출금');
    if (riskScore > 60) flags.push('새로운 수취인');
    if (Math.random() > 0.5) flags.push('비정상 시간대');
    if (riskScore > 80) flags.push('해외 IP');

    return {
      id: `TXN-${Date.now()}-${this.transactionCount}`,
      userId: `USER-${Math.floor(Math.random() * 1000)}`,
      userName: names[Math.floor(Math.random() * names.length)],
      type,
      amount: Math.floor(Math.random() * 10000000) + 100000,
      timestamp: new Date().toISOString(),
      riskLevel,
      riskScore: Math.floor(riskScore),
      status: riskScore > 70 ? 'suspicious' : statuses[Math.floor(Math.random() * statuses.length)],
      ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      deviceId: `DEV-${Math.floor(Math.random() * 10000)}`,
      flags,
    };
  }
}

export const fdsStreaming = new FDSStreaming();
