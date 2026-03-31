import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  KPIMetric,
  ProductType,
  ReportData,
  ReportQueryDto,
  SubscriberTrend,
  SystemMetrics,
  TimeRange,
} from './report.types';

export const PRODUCTS: ProductType[] = [
  { id: 'savings-001', name: '토스 적금 플러스', category: 'savings' },
  { id: 'savings-002', name: '청년 우대 적금', category: 'savings' },
  { id: 'loan-001', name: '토스 신용대출', category: 'loan' },
  { id: 'loan-002', name: '주택담보대출', category: 'loan' },
  { id: 'card-001', name: '토스 체크카드', category: 'card' },
  { id: 'card-002', name: '토스 신용카드', category: 'card' },
  { id: 'invest-001', name: '토스 증권 계좌', category: 'investment' },
];

function subDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

function subWeeks(date: Date, weeks: number): Date {
  return subDays(date, weeks * 7);
}

function subMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() - months);
  return d;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function generateKPIs(): KPIMetric[] {
  return [
    {
      id: 'total-subscribers',
      title: '총 가입자 수',
      value: 1847293,
      change: 12.5,
      changeType: 'increase',
      unit: '명',
      trend: [1650000, 1680000, 1720000, 1760000, 1800000, 1847293],
    },
    {
      id: 'monthly-new',
      title: '월 신규 가입',
      value: 47293,
      change: 8.3,
      changeType: 'increase',
      unit: '명',
      trend: [38000, 40000, 42000, 44000, 46000, 47293],
    },
    {
      id: 'churn-rate',
      title: '이탈률',
      value: 2.1,
      change: -0.5,
      changeType: 'decrease',
      unit: '%',
      trend: [2.8, 2.6, 2.5, 2.3, 2.2, 2.1],
    },
    {
      id: 'avg-revenue',
      title: '평균 수익',
      value: 125800,
      change: 15.2,
      changeType: 'increase',
      unit: '원',
      trend: [95000, 102000, 110000, 117000, 122000, 125800],
    },
    {
      id: 'conversion-rate',
      title: '전환율',
      value: 34.5,
      change: 4.2,
      changeType: 'increase',
      unit: '%',
      trend: [28, 29.5, 31, 32.5, 33.8, 34.5],
    },
    {
      id: 'satisfaction',
      title: '고객 만족도',
      value: 4.7,
      change: 0.2,
      changeType: 'increase',
      unit: '/5.0',
      trend: [4.3, 4.4, 4.5, 4.6, 4.65, 4.7],
    },
  ];
}

function generateSubscriberTrends(
  timeRange: TimeRange,
  endDate?: string,
): SubscriberTrend[] {
  const end = endDate ? new Date(endDate) : new Date();
  const trends: SubscriberTrend[] = [];

  let periods: number;
  let dateFn: (d: Date, n: number) => Date;

  if (timeRange === 'weekly') {
    periods = 12;
    dateFn = subWeeks;
  } else if (timeRange === 'monthly') {
    periods = 12;
    dateFn = subMonths;
  } else {
    periods = 30;
    dateFn = subDays;
  }

  for (let i = periods - 1; i >= 0; i--) {
    const date = dateFn(end, i);
    const growth = (periods - i) * 20000;
    trends.push({
      date: formatDate(date),
      subscribers: Math.floor(1500000 + growth + Math.random() * 10000),
      newSubscribers: Math.floor(1000 + Math.random() * 2000),
      churnRate: parseFloat((2 + Math.random() * 1.5).toFixed(2)),
    });
  }

  return trends;
}

function generateSystemMetrics(): SystemMetrics[] {
  const metrics: SystemMetrics[] = [];
  const now = new Date();

  for (let i = 59; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 1000);
    metrics.push({
      timestamp: timestamp.toISOString(),
      tps: Math.floor(800 + Math.random() * 400),
      errorRate: parseFloat((Math.random() * 3 + (Math.random() > 0.9 ? 3 : 0)).toFixed(2)),
      avgResponseTime: Math.floor(50 + Math.random() * 100),
      activeUsers: Math.floor(50000 + Math.random() * 20000),
      cpuUsage: Math.floor(40 + Math.random() * 30),
      memoryUsage: Math.floor(50 + Math.random() * 25),
    });
  }

  return metrics;
}

function generateRealtimeMetrics(): SystemMetrics {
  return {
    timestamp: new Date().toISOString(),
    tps: Math.floor(800 + Math.random() * 400),
    errorRate: parseFloat((Math.random() * 3 + (Math.random() > 0.95 ? 3 : 0)).toFixed(2)),
    avgResponseTime: Math.floor(50 + Math.random() * 100),
    activeUsers: Math.floor(50000 + Math.random() * 20000),
    cpuUsage: Math.floor(40 + Math.random() * 30),
    memoryUsage: Math.floor(50 + Math.random() * 25),
  };
}

@Injectable()
export class ReportService {
  private readonly metricsStream$ = new Subject<SystemMetrics>();
  private intervalId!: NodeJS.Timeout;

  constructor() {
    this.startMetricsBroadcast();
  }

  private startMetricsBroadcast(): void {
    this.intervalId = setInterval(() => {
      this.metricsStream$.next(generateRealtimeMetrics());
    }, 2000);
  }

  onModuleDestroy(): void {
    clearInterval(this.intervalId);
  }

  getProducts(): ProductType[] {
    return PRODUCTS;
  }

  getReportData(query: ReportQueryDto): ReportData {
    const timeRange: TimeRange = query.timeRange ?? 'daily';
    return {
      kpis: generateKPIs(),
      subscriberTrends: generateSubscriberTrends(timeRange, query.endDate),
      systemMetrics: generateSystemMetrics(),
    };
  }

  getMetricsStream(): Observable<MessageEvent> {
    return this.metricsStream$.pipe(
      map((metrics) => ({ data: metrics }) as MessageEvent),
    );
  }

  exportCSV(query: ReportQueryDto): string {
    const timeRange: TimeRange = query.timeRange ?? 'daily';
    const trends = generateSubscriberTrends(timeRange, query.endDate);
    const header = 'Date,Subscribers,New Subscribers,Churn Rate\n';
    const rows = trends
      .map((t) => `${t.date},${t.subscribers},${t.newSubscribers},${t.churnRate}%`)
      .join('\n');
    return header + rows;
  }
}
