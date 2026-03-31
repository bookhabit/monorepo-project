import { LoanApplication, LoanReviewHistory, LoanStatus, FilterParams } from '../types/loan';

// Generate mock data
const generateMockApplications = (count: number): LoanApplication[] => {
  const statuses: LoanStatus[] = ['pending', 'approved', 'rejected', 'reviewing'];
  const riskLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  const purposes = ['주택구입', '전세자금', '생활자금', '사업자금', '자동차구입', '교육자금'];
  const names = ['김철수', '이영희', '박민수', '최지영', '정현우', '강서연', '조민재', '윤수정'];

  return Array.from({ length: count }, (_, i) => ({
    id: `LOAN-${String(i + 1).padStart(6, '0')}`,
    applicantName: names[Math.floor(Math.random() * names.length)],
    applicantId: `${Math.floor(Math.random() * 900000) + 100000}`,
    amount: Math.floor(Math.random() * 50000000) + 5000000,
    purpose: purposes[Math.floor(Math.random() * purposes.length)],
    creditScore: Math.floor(Math.random() * 500) + 500,
    monthlyIncome: Math.floor(Math.random() * 5000000) + 2000000,
    employmentYears: Math.floor(Math.random() * 20),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    appliedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
    documents: ['신분증', '재직증명서', '소득증빙'],
  }));
};

const mockApplications = generateMockApplications(10000);

export async function fetchLoanApplications(filters: FilterParams = {}): Promise<LoanApplication[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...mockApplications];

  if (filters.status) {
    filtered = filtered.filter((app) => app.status === filters.status);
  }

  if (filters.riskLevel) {
    filtered = filtered.filter((app) => app.riskLevel === filters.riskLevel);
  }

  if (filters.minAmount) {
    filtered = filtered.filter((app) => app.amount >= filters.minAmount!);
  }

  if (filters.maxAmount) {
    filtered = filtered.filter((app) => app.amount <= filters.maxAmount!);
  }

  if (filters.minCreditScore) {
    filtered = filtered.filter((app) => app.creditScore >= filters.minCreditScore!);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (app) =>
        app.applicantName.toLowerCase().includes(searchLower) ||
        app.id.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
}

export async function batchApprove(applicationIds: string[]): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Random failure (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('일괄 승인 처리에 실패했습니다.');
  }

  applicationIds.forEach((id) => {
    const app = mockApplications.find((a) => a.id === id);
    if (app) {
      app.status = 'approved';
      app.reviewedAt = new Date().toISOString();
      app.reviewedBy = '심사역';
    }
  });
}

export async function batchReject(applicationIds: string[]): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Random failure (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('일괄 거절 처리에 실패했습니다.');
  }

  applicationIds.forEach((id) => {
    const app = mockApplications.find((a) => a.id === id);
    if (app) {
      app.status = 'rejected';
      app.reviewedAt = new Date().toISOString();
      app.reviewedBy = '심사역';
    }
  });
}

export async function approveApplication(applicationId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const app = mockApplications.find((a) => a.id === applicationId);
  if (app) {
    app.status = 'approved';
    app.reviewedAt = new Date().toISOString();
    app.reviewedBy = '심사역';
  }
}

export async function rejectApplication(applicationId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const app = mockApplications.find((a) => a.id === applicationId);
  if (app) {
    app.status = 'rejected';
    app.reviewedAt = new Date().toISOString();
    app.reviewedBy = '심사역';
  }
}

export async function fetchReviewHistory(applicationId: string): Promise<LoanReviewHistory[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const app = mockApplications.find((a) => a.id === applicationId);
  if (!app) return [];

  // Generate mock history
  return [
    {
      id: '1',
      applicationId,
      action: 'submitted',
      performedBy: app.applicantName,
      performedAt: app.appliedAt,
      newStatus: 'pending',
    },
    {
      id: '2',
      applicationId,
      action: 'review_started',
      performedBy: '심사역',
      performedAt: new Date(new Date(app.appliedAt).getTime() + 3600000).toISOString(),
      previousStatus: 'pending',
      newStatus: 'reviewing',
    },
    ...(app.reviewedAt
      ? [
          {
            id: '3',
            applicationId,
            action: app.status === 'approved' ? ('approved' as const) : ('rejected' as const),
            performedBy: app.reviewedBy || '심사역',
            performedAt: app.reviewedAt,
            previousStatus: 'reviewing' as LoanStatus,
            newStatus: app.status,
            note:
              app.status === 'approved'
                ? '신용도 및 소득 검증 완료'
                : '신용점수 기준 미달',
          },
        ]
      : []),
  ];
}
