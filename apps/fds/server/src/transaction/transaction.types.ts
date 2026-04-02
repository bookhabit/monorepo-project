import { ApiProperty } from '@nestjs/swagger';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type TransactionStatus = 'normal' | 'suspicious' | 'blocked' | 'reviewing';
export type TransactionType = 'transfer' | 'withdrawal' | 'deposit' | 'payment';
export type UserRole = 'monitor' | 'security_manager' | 'admin';

export class Transaction {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  userName!: string;

  @ApiProperty({ enum: ['transfer', 'withdrawal', 'deposit', 'payment'] })
  type!: TransactionType;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  timestamp!: string;

  @ApiProperty({ enum: ['low', 'medium', 'high', 'critical'] })
  riskLevel!: RiskLevel;

  @ApiProperty()
  riskScore!: number;

  @ApiProperty({ enum: ['normal', 'suspicious', 'blocked', 'reviewing'] })
  status!: TransactionStatus;

  @ApiProperty()
  ipAddress!: string;

  @ApiProperty()
  location!: string;

  @ApiProperty()
  deviceId!: string;

  @ApiProperty({ type: [String] })
  flags!: string[];
}

export class RiskTimeline {
  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  riskScore!: number;

  @ApiProperty()
  event!: string;
}

export class UserRiskProfile {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  userName!: string;

  @ApiProperty()
  totalTransactions!: number;

  @ApiProperty()
  suspiciousTransactions!: number;

  @ApiProperty()
  blockedTransactions!: number;

  @ApiProperty()
  avgRiskScore!: number;

  @ApiProperty({ type: () => [RiskTimeline] })
  timeline!: RiskTimeline[];

  @ApiProperty({ type: () => [Transaction] })
  recentTransactions!: Transaction[];
}

export class TransactionPage {
  @ApiProperty({ type: () => [Transaction] })
  data!: Transaction[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  pageSize!: number;

  @ApiProperty()
  totalPages!: number;
}
