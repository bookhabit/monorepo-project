import { create } from 'zustand';
import { SystemMetrics, AlertRule } from '../types/performance-dashboard';

interface PerformanceDashboardState {
  currentMetrics: SystemMetrics | null;
  metricsHistory: SystemMetrics[];
  alerts: Array<{ id: string; message: string; severity: AlertRule['severity']; timestamp: string }>;
  
  setCurrentMetrics: (metrics: SystemMetrics) => void;
  addMetricsToHistory: (metrics: SystemMetrics) => void;
  checkAlerts: (metrics: SystemMetrics) => void;
  clearAlert: (id: string) => void;
}

const alertRules: AlertRule[] = [
  { metric: 'errorRate', threshold: 5, condition: 'above', severity: 'critical' },
  { metric: 'avgResponseTime', threshold: 200, condition: 'above', severity: 'warning' },
  { metric: 'cpuUsage', threshold: 80, condition: 'above', severity: 'warning' },
  { metric: 'memoryUsage', threshold: 85, condition: 'above', severity: 'critical' },
  { metric: 'tps', threshold: 500, condition: 'below', severity: 'info' },
];

export const usePerformanceDashboardStore = create<PerformanceDashboardState>((set, get) => ({
  currentMetrics: null,
  metricsHistory: [],
  alerts: [],

  setCurrentMetrics: (metrics) => {
    set({ currentMetrics: metrics });
    get().checkAlerts(metrics);
  },

  addMetricsToHistory: (metrics) => {
    set((state) => ({
      metricsHistory: [...state.metricsHistory.slice(-59), metrics], // Keep last 60 entries
    }));
  },

  checkAlerts: (metrics) => {
    const newAlerts: Array<{ id: string; message: string; severity: AlertRule['severity']; timestamp: string }> = [];

    alertRules.forEach((rule) => {
      const value = metrics[rule.metric];
      let triggered = false;

      if (rule.condition === 'above' && value > rule.threshold) {
        triggered = true;
      } else if (rule.condition === 'below' && value < rule.threshold) {
        triggered = true;
      }

      if (triggered) {
        const metricLabels: Record<keyof SystemMetrics, string> = {
          timestamp: '',
          tps: 'TPS',
          errorRate: '에러율',
          avgResponseTime: '평균 응답시간',
          activeUsers: '활성 사용자',
          cpuUsage: 'CPU 사용률',
          memoryUsage: '메모리 사용률',
        };

        newAlerts.push({
          id: `${rule.metric}-${Date.now()}`,
          message: `${metricLabels[rule.metric]}이(가) ${rule.threshold}${rule.condition === 'above' ? ' 초과' : ' 미만'}입니다 (현재: ${value.toFixed(1)})`,
          severity: rule.severity,
          timestamp: new Date().toISOString(),
        });
      }
    });

    if (newAlerts.length > 0) {
      set((state) => ({
        alerts: [...state.alerts, ...newAlerts].slice(-10), // Keep last 10 alerts
      }));
    }
  },

  clearAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },
}));