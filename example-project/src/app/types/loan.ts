export type LoanStatus = 'pending' | 'approved' | 'rejected' | 'reviewing';
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
  riskLevel: 'low' | 'medium' | 'high';
  documents: string[];
}

export interface LoanReviewHistory {
  id: string;
  applicationId: string;
  action: 'submitted' | 'approved' | 'rejected' | 'review_started' | 'document_requested';
  performedBy: string;
  performedAt: string;
  note?: string;
  previousStatus?: LoanStatus;
  newStatus?: LoanStatus;
}

export interface FilterParams {
  status?: LoanStatus;
  riskLevel?: 'low' | 'medium' | 'high';
  minAmount?: number;
  maxAmount?: number;
  minCreditScore?: number;
  search?: string;
}
