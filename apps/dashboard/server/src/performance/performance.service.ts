import { Injectable } from '@nestjs/common';

export interface PerformanceData {
  date: string;
  value: number;
  profit: number;
}

@Injectable()
export class PerformanceService {
  getByPeriod(period: '1D' | '1W' | '1M'): PerformanceData[] {
    switch (period) {
      case '1D':
        return this.generateDaily();
      case '1W':
        return this.generateWeekly();
      case '1M':
        return this.generateMonthly();
    }
  }

  private generateDaily(): PerformanceData[] {
    const data: PerformanceData[] = [];
    const now = new Date();
    let value = 30_000_000;

    for (let i = 24; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 60 * 60 * 1000);
      value += (Math.random() - 0.5) * 200_000;
      data.push({
        date: date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        value: Math.floor(value),
        profit: Math.floor(value - 30_000_000),
      });
    }

    return data;
  }

  private generateWeekly(): PerformanceData[] {
    const data: PerformanceData[] = [];
    const now = new Date();
    let value = 28_000_000;

    for (let i = 7; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      value += (Math.random() - 0.4) * 500_000;
      data.push({
        date: date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
        value: Math.floor(value),
        profit: Math.floor(value - 28_000_000),
      });
    }

    return data;
  }

  private generateMonthly(): PerformanceData[] {
    const data: PerformanceData[] = [];
    const now = new Date();
    let value = 25_000_000;

    for (let i = 30; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      value += (Math.random() - 0.3) * 300_000;
      data.push({
        date: date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
        value: Math.floor(value),
        profit: Math.floor(value - 25_000_000),
      });
    }

    return data;
  }
}
