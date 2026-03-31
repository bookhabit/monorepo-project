export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type TransactionStatus = 'normal' | 'suspicious' | 'blocked' | 'reviewing';
export type TransactionType = 'transfer' | 'withdrawal' | 'deposit' | 'payment';
export type UserRole = 'monitor' | 'security_manager' | 'admin';

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: TransactionType;
  amount: number;
  timestamp: string;
  riskLevel: RiskLevel;
  riskScore: number;
  status: TransactionStatus;
  ipAddress: string;
  location: string;
  deviceId: string;
  flags: string[];
}

export interface RiskTimeline {
  timestamp: string;
  riskScore: number;
  event: string;
}

export interface UserRiskProfile {
  userId: string;
  userName: string;
  totalTransactions: number;
  suspiciousTransactions: number;
  blockedTransactions: number;
  avgRiskScore: number;
  timeline: RiskTimeline[];
  recentTransactions: Transaction[];
}

export interface TransactionPage {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
