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
  change: number; // percentage
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
  tps: number; // Transactions Per Second
  errorRate: number; // percentage
  avgResponseTime: number; // milliseconds
  activeUsers: number;
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
}

export interface AlertRule {
  metric: keyof SystemMetrics;
  threshold: number;
  condition: 'above' | 'below';
  severity: 'info' | 'warning' | 'critical';
}

export interface DashboardFilters {
  timeRange: TimeRange;
  startDate?: string;
  endDate?: string;
  productId?: string;
  segment?: 'all' | 'vip' | 'general';
}

export interface ReportData {
  kpis: KPIMetric[];
  subscriberTrends: SubscriberTrend[];
  systemMetrics: SystemMetrics[];
}
