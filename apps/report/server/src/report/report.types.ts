export type TimeRange = 'daily' | 'weekly' | 'monthly';

export interface ProductType {
  id: string;
  name: string;
  category: 'savings' | 'loan' | 'card' | 'investment';
}

export interface KPIMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  unit: string;
  trend: number[];
}

export interface SubscriberTrend {
  date: string;
  subscribers: number;
  newSubscribers: number;
  churnRate: number;
  productId?: string;
}

export interface SystemMetrics {
  timestamp: string;
  tps: number;
  errorRate: number;
  avgResponseTime: number;
  activeUsers: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface ReportData {
  kpis: KPIMetric[];
  subscriberTrends: SubscriberTrend[];
  systemMetrics: SystemMetrics[];
}

export interface ReportQueryDto {
  timeRange?: TimeRange;
  startDate?: string;
  endDate?: string;
  productId?: string;
  segment?: 'all' | 'vip' | 'general';
}
