export type LoanStatus = 'pending' | 'reviewing' | 'approved' | 'rejected';
export type RiskLevel = 'low' | 'medium' | 'high';
export type UserRole = 'reviewer' | 'manager' | 'admin';

export interface LoanApplication {
  id: string;
  applicantName: string;
  applicantId: string;
  amount: number;
  purpose: string;
  creditScore: number;
  monthlyIncome: number;
  employmentYears: number;
  status: LoanStatus;
  appliedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  riskLevel: RiskLevel;
  documents: string[];
}

export interface LoanReviewHistory {
  id: string;
  applicationId: string;
  action: 'submitted' | 'approved' | 'rejected' | 'review_started' | 'rejection_cancelled';
  performedBy: string;
  performedAt: string;
  note?: string;
  previousStatus?: LoanStatus;
  newStatus?: LoanStatus;
}

export interface LoanPage {
  data: LoanApplication[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
