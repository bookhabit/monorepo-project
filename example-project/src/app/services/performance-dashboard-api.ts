import {
  ProductType,
  KPIMetric,
  SubscriberTrend,
  SystemMetrics,
  DashboardFilters,
  ReportData,
  TimeRange,
} from '../types/performance-dashboard';
import { format, subDays, subWeeks, subMonths } from 'date-fns';

// Mock Products
export const products: ProductType[] = [
  { id: 'savings-001', name: '토스 적금 플러스', category: 'savings' },
  { id: 'savings-002', name: '청년 우대 적금', category: 'savings' },
  { id: 'loan-001', name: '토스 신용대출', category: 'loan' },
  { id: 'loan-002', name: '주택담보대출', category: 'loan' },
  { id: 'card-001', name: '토스 체크카드', category: 'card' },
  { id: 'card-002', name: '토스 신용카드', category: 'card' },
  { id: 'invest-001', name: '토스 증권 계좌', category: 'investment' },
];

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
  startDate?: string,
  endDate?: string
): SubscriberTrend[] {
  const trends: SubscriberTrend[] = [];
  const end = endDate ? new Date(endDate) : new Date();
  
  let periods = 30;
  let dateFn: (date: Date, amount: number) => Date = subDays;
  
  if (timeRange === 'weekly') {
    periods = 12;
    dateFn = subWeeks;
  } else if (timeRange === 'monthly') {
    periods = 12;
    dateFn = subMonths;
  }

  for (let i = periods - 1; i >= 0; i--) {
    const date = dateFn(end, i);
    const baseSubscribers = 1500000;
    const growth = (periods - i) * 20000;
    const variance = Math.random() * 10000;
    
    trends.push({
      date: format(date, 'yyyy-MM-dd'),
      subscribers: Math.floor(baseSubscribers + growth + variance),
      newSubscribers: Math.floor(1000 + Math.random() * 2000),
      churnRate: 2 + Math.random() * 1.5,
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
      errorRate: Math.random() * 3 + (Math.random() > 0.9 ? 3 : 0), // Occasional spikes
      avgResponseTime: Math.floor(50 + Math.random() * 100),
      activeUsers: Math.floor(50000 + Math.random() * 20000),
      cpuUsage: Math.floor(40 + Math.random() * 30),
      memoryUsage: Math.floor(50 + Math.random() * 25),
    });
  }

  return metrics;
}

export async function fetchReportData(filters: DashboardFilters): Promise<ReportData> {
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

  return {
    kpis: generateKPIs(),
    subscriberTrends: generateSubscriberTrends(
      filters.timeRange,
      filters.startDate,
      filters.endDate
    ),
    systemMetrics: generateSystemMetrics(),
  };
}

export async function exportToCSV(filters: DashboardFilters): Promise<Blob> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const data = await fetchReportData(filters);
  
  // Generate CSV content
  let csv = 'Date,Subscribers,New Subscribers,Churn Rate\n';
  
  data.subscriberTrends.forEach(trend => {
    csv += `${trend.date},${trend.subscribers},${trend.newSubscribers},${trend.churnRate.toFixed(2)}%\n`;
  });

  return new Blob([csv], { type: 'text/csv' });
}

export async function exportToExcel(filters: DashboardFilters): Promise<Blob> {
  await new Promise(resolve => setTimeout(resolve, 700));

  // In a real app, you'd use a library like xlsx
  // For now, return CSV as mock Excel
  return exportToCSV(filters);
}

// Real-time metrics stream (mock)
export function subscribeToSystemMetrics(
  callback: (metrics: SystemMetrics) => void
): () => void {
  const interval = setInterval(() => {
    const metrics: SystemMetrics = {
      timestamp: new Date().toISOString(),
      tps: Math.floor(800 + Math.random() * 400),
      errorRate: Math.random() * 3 + (Math.random() > 0.95 ? 3 : 0),
      avgResponseTime: Math.floor(50 + Math.random() * 100),
      activeUsers: Math.floor(50000 + Math.random() * 20000),
      cpuUsage: Math.floor(40 + Math.random() * 30),
      memoryUsage: Math.floor(50 + Math.random() * 25),
    };

    callback(metrics);
  }, 2000); // Update every 2 seconds

  return () => clearInterval(interval);
}
